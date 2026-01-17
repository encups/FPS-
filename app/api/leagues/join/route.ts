import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { inviteCode, password, teamName, avatarUrl } = await req.json()

    if (!inviteCode || !teamName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find league by invite code
    const league = await prisma.league.findUnique({
      where: { inviteCode },
      include: {
        memberships: true,
        draft: true,
      },
    })

    if (!league) {
      return NextResponse.json({ error: 'League not found' }, { status: 404 })
    }

    // Check if league is password protected
    if (league.password) {
      if (!password) {
        return NextResponse.json(
          { error: 'Password required' },
          { status: 400 }
        )
      }

      const isValidPassword = await compare(password, league.password)
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }
    }

    // Check if user already in league
    const existingMembership = league.memberships.find(
      (m: any) => m.userId === session.user.id
    )

    if (existingMembership) {
      return NextResponse.json(
        { error: 'Already a member of this league' },
        { status: 400 }
      )
    }

    // Check if league is full
    const settings = JSON.parse(league.settingsJson)
    const teamCount = settings.teamCount || 10

    if (league.memberships.length >= teamCount) {
      return NextResponse.json({ error: 'League is full' }, { status: 400 })
    }

    // Create membership and update draft order
    const result = await prisma.$transaction(async (tx) => {
      // Create membership
      const membership = await tx.membership.create({
        data: {
          leagueId: league.id,
          userId: session.user.id,
          teamName,
          avatarUrl,
          role: 'MEMBER',
          paidStatus: false,
        },
      })

      // Update draft order to include new member
      if (league.draft && league.draft.status === 'SCHEDULED') {
        const currentOrder = JSON.parse(league.draft.orderJson)
        const newOrder = [...currentOrder, membership.id]

        await tx.draft.update({
          where: { id: league.draft.id },
          data: { orderJson: JSON.stringify(newOrder) },
        })
      }

      // Create audit log
      await tx.auditLog.create({
        data: {
          entityType: 'MEMBERSHIP',
          entityId: membership.id,
          action: 'JOINED',
          userId: session.user.id,
          metadata: JSON.stringify({
            leagueId: league.id,
            teamName,
          }),
        },
      })

      return membership
    })

    return NextResponse.json(
      {
        membership: {
          id: result.id,
          leagueId: result.leagueId,
          teamName: result.teamName,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Join league error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
