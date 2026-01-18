import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { draftId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { draftId } = params

    const draft = await prisma.draft.findUnique({
      where: { id: draftId },
      include: {
        league: {
          include: {
            memberships: true,
          },
        },
      },
    })

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
    }

    // Verify user is commissioner
    if (draft.league.commissionerId !== session.user.id) {
      return NextResponse.json({ error: 'Only commissioner can start draft' }, { status: 403 })
    }

    // Verify draft is in correct state
    if (draft.status !== 'LOCKED') {
      return NextResponse.json(
        { error: 'Draft must be locked before starting' },
        { status: 400 }
      )
    }

    // Start the draft
    const updatedDraft = await prisma.draft.update({
      where: { id: draftId },
      data: {
        status: 'LIVE',
        startedAt: new Date(),
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        entityType: 'DRAFT',
        entityId: draftId,
        action: 'STARTED',
        userId: session.user.id,
      },
    })

    return NextResponse.json({ draft: updatedDraft })
  } catch (error) {
    console.error('Start draft error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
