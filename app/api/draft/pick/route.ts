import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { draftId, playerId } = await req.json()

    if (!draftId || !playerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use transaction to ensure pick integrity
    const result = await prisma.$transaction(async (tx) => {
      // Get draft with lock
      const draft = await tx.draft.findUnique({
        where: { id: draftId },
        include: {
          league: {
            include: {
              memberships: {
                include: {
                  user: true,
                },
              },
            },
          },
          picks: true,
        },
      })

      if (!draft) {
        throw new Error('Draft not found')
      }

      // Verify draft is LIVE
      if (draft.status !== 'LIVE') {
        throw new Error('Draft is not live')
      }

      // Get current user's membership
      const membership = draft.league.memberships.find(
        (m: any) => m.userId === session.user.id
      )

      if (!membership) {
        throw new Error('Not a member of this league')
      }

      // CRITICAL: Verify user has paid
      if (!membership.paidStatus) {
        throw new Error('Must pay league dues to draft')
      }

      // Determine whose turn it is
      const draftOrder = JSON.parse(draft.orderJson) as string[]
      const snakeOrder = generateSnakeOrder(draftOrder, draft.rounds)

      const currentPick = draft.currentPickIndex
      const currentMembershipId = snakeOrder[currentPick]

      // Verify it's this user's turn
      if (currentMembershipId !== membership.id) {
        throw new Error('Not your turn to pick')
      }

      // Verify player hasn't been drafted
      const alreadyDrafted = draft.picks.some((p: any) => p.playerId === playerId)
      if (alreadyDrafted) {
        throw new Error('Player already drafted')
      }

      // Verify player exists
      const player = await tx.player.findUnique({
        where: { id: playerId },
      })

      if (!player) {
        throw new Error('Player not found')
      }

      // Calculate round and pick number
      const round = Math.floor(currentPick / draftOrder.length) + 1
      const pickNumber = currentPick + 1

      // Create the pick
      const pick = await tx.draftPick.create({
        data: {
          draftId,
          playerId,
          membershipId: membership.id,
          pickNumber,
          round,
          autoPicked: false,
        },
      })

      // Update draft to next pick
      const nextPickIndex = currentPick + 1
      const isComplete = nextPickIndex >= snakeOrder.length

      await tx.draft.update({
        where: { id: draftId },
        data: {
          currentPickIndex: nextPickIndex,
          status: isComplete ? 'COMPLETE' : 'LIVE',
          completedAt: isComplete ? new Date() : undefined,
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          entityType: 'DRAFT_PICK',
          entityId: pick.id,
          action: 'PICKED',
          userId: session.user.id,
          metadata: JSON.stringify({
            draftId,
            playerId,
            playerName: player.name,
            round,
            pickNumber,
          }),
        },
      })

      return { pick, player, round, pickNumber }
    })

    return NextResponse.json({
      pick: {
        id: result.pick.id,
        player: {
          id: result.player.id,
          name: result.player.name,
          position: result.player.position,
          nflTeam: result.player.nflTeam,
        },
        round: result.round,
        pickNumber: result.pickNumber,
      },
    })
  } catch (error: any) {
    console.error('Draft pick error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message ? 400 : 500 }
    )
  }
}

// Helper function to generate snake draft order
function generateSnakeOrder(baseOrder: string[], rounds: number): string[] {
  const snakeOrder: string[] = []

  for (let round = 0; round < rounds; round++) {
    if (round % 2 === 0) {
      // Even rounds: normal order
      snakeOrder.push(...baseOrder)
    } else {
      // Odd rounds: reverse order
      snakeOrder.push(...[...baseOrder].reverse())
    }
  }

  return snakeOrder
}
