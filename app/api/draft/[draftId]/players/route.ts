import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { draftId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { draftId } = params
    const { searchParams } = new URL(req.url)
    const position = searchParams.get('position')

    // Get draft with picks
    const draft = await prisma.draft.findUnique({
      where: { id: draftId },
      include: {
        picks: {
          select: {
            playerId: true,
          },
        },
        league: {
          include: {
            memberships: {
              where: {
                userId: session.user.id,
              },
            },
          },
        },
      },
    })

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
    }

    // Verify user is a member
    if (draft.league.memberships.length === 0) {
      return NextResponse.json(
        { error: 'Not a member of this league' },
        { status: 403 }
      )
    }

    // Get drafted player IDs
    const draftedPlayerIds = draft.picks.map((p) => p.playerId)

    // Get available players
    const where: any = {
      id: {
        notIn: draftedPlayerIds,
      },
    }

    if (position) {
      where.position = position
    }

    const players = await prisma.player.findMany({
      where,
      orderBy: {
        ranking: 'asc',
      },
      take: 100, // Limit results
    })

    return NextResponse.json({ players })
  } catch (error) {
    console.error('Get players error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
