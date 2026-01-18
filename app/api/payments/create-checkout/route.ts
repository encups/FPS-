import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { leagueId, membershipId } = await req.json()

    if (!leagueId || !membershipId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify membership exists and belongs to user
    const membership = await prisma.membership.findFirst({
      where: {
        id: membershipId,
        leagueId,
        userId: session.user.id,
      },
      include: {
        league: true,
      },
    })

    if (!membership) {
      return NextResponse.json({ error: 'Membership not found' }, { status: 404 })
    }

    // Check if already paid
    if (membership.paidStatus) {
      return NextResponse.json(
        { error: 'Dues already paid' },
        { status: 400 }
      )
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        leagueId,
        userId: session.user.id,
        amountCents: membership.league.duesCents,
        currency: 'usd',
        status: 'PENDING',
        stripeSessionId: '', // Will be updated after session creation
      },
    })

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${membership.league.name} - League Dues`,
              description: `Season ${membership.league.season} Fantasy Football League Dues`,
            },
            unit_amount: membership.league.duesCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        leagueId,
        userId: session.user.id,
        membershipId,
        paymentId: payment.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/leagues/${leagueId}?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/leagues/${leagueId}?payment=cancelled`,
    })

    // Update payment record with session ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripeSessionId: checkoutSession.id },
    })

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url })
  } catch (error) {
    console.error('Create checkout session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
