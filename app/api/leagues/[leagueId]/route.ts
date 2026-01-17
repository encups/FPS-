import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { leagueId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { leagueId } = params

    const league = await prisma.league.findUnique({
      where: { id: leagueId },
      include: {
        commissioner: {
          select: {
            id: true,
            displayName: true,
            email: true,
          },
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true,
              },
            },
          },
        },
        draft: true,
      },
    })

    if (!league) {
      return NextResponse.json({ error: 'League not found' }, { status: 404 })
    }

    // Check if user is a member
    const userMembership = league.memberships.find(
      (m: any) => m.userId === session.user.id
    )

    if (!userMembership) {
      return NextResponse.json({ error: 'Not a member of this league' }, { status: 403 })
    }

    // Parse settings
    const settings = JSON.parse(league.settingsJson)

    return NextResponse.json({
      league: {
        id: league.id,
        name: league.name,
        season: league.season,
        duesCents: league.duesCents,
        inviteCode: league.inviteCode,
        settings,
        commissioner: league.commissioner,
        memberships: league.memberships.map((m: any) => ({
          id: m.id,
          userId: m.userId,
          teamName: m.teamName,
          avatarUrl: m.avatarUrl,
          paidStatus: m.paidStatus,
          paidAt: m.paidAt,
          role: m.role,
          user: m.user,
        })),
        draft: league.draft,
        userMembership: {
          id: userMembership.id,
          teamName: userMembership.teamName,
          paidStatus: userMembership.paidStatus,
          role: userMembership.role,
        },
      },
    })
  } catch (error) {
    console.error('Get league error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
