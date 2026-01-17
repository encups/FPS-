import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { nanoid } from 'nanoid'
import { hash } from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      name,
      sport,
      season,
      duesCents,
      teamCount,
      draftDate,
      pickTimerSeconds,
      password,
      rosterSettings,
    } = await req.json()

    // Validation
    if (!name || !sport || !season || duesCents === undefined || !teamCount || !draftDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate sport
    const validSports = ['NFL', 'NBA', 'MLB', 'NHL', 'SOCCER']
    if (!validSports.includes(sport)) {
      return NextResponse.json(
        { error: 'Invalid sport. Must be one of: NFL, NBA, MLB, NHL, SOCCER' },
        { status: 400 }
      )
    }

    // Generate unique invite code
    const inviteCode = nanoid(10)

    // Hash password if provided
    const passwordHash = password ? await hash(password, 12) : null

    // Create league with commissioner membership and draft
    const league = await prisma.$transaction(async (tx) => {
      // Create league
      const newLeague = await tx.league.create({
        data: {
          name,
          sport,
          season: parseInt(season),
          duesCents: parseInt(duesCents),
          inviteCode,
          password: passwordHash,
          commissionerId: session.user.id,
          settingsJson: JSON.stringify({
            teamCount: parseInt(teamCount),
            rosterSettings: rosterSettings || {
              QB: 1,
              RB: 2,
              WR: 2,
              TE: 1,
              FLEX: 1,
              K: 1,
              DEF: 1,
              BENCH: 7,
            },
          }),
        },
      })

      // Create commissioner membership
      const membership = await tx.membership.create({
        data: {
          leagueId: newLeague.id,
          userId: session.user.id,
          teamName: `${session.user.name}'s Team`,
          role: 'COMMISSIONER',
          paidStatus: false, // Even commissioner must pay
        },
      })

      // Calculate rounds based on roster settings
      const roster = rosterSettings || {
        QB: 1,
        RB: 2,
        WR: 2,
        TE: 1,
        FLEX: 1,
        K: 1,
        DEF: 1,
        BENCH: 7,
      }
      const totalRounds = Object.values(roster).reduce(
        (sum: number, count) => sum + (count as number),
        0
      )

      // Create draft
      const draft = await tx.draft.create({
        data: {
          leagueId: newLeague.id,
          startsAt: new Date(draftDate),
          pickTimerSeconds: parseInt(pickTimerSeconds) || 90,
          rounds: totalRounds,
          orderJson: JSON.stringify([membership.id]), // Initial order with just commissioner
          status: 'SCHEDULED',
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          entityType: 'LEAGUE',
          entityId: newLeague.id,
          action: 'CREATED',
          userId: session.user.id,
          metadata: JSON.stringify({
            name,
            season,
            duesCents,
            teamCount,
          }),
        },
      })

      return { ...newLeague, draft, membership }
    })

    return NextResponse.json(
      {
        league: {
          id: league.id,
          name: league.name,
          inviteCode: league.inviteCode,
          draftId: league.draft.id,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create league error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
