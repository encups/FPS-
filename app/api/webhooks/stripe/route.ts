import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailed(paymentIntent)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        await handleChargeRefunded(charge)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { leagueId, userId, membershipId, paymentId } = session.metadata || {}

  if (!leagueId || !userId || !membershipId || !paymentId) {
    console.error('Missing metadata in checkout session')
    return
  }

  // Update payment record
  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: 'COMPLETED',
      stripePaymentIntentId: session.payment_intent as string,
    },
  })

  // Mark membership as paid
  await prisma.membership.update({
    where: { id: membershipId },
    data: {
      paidStatus: true,
      paidAt: new Date(),
    },
  })

  // Create audit log
  await prisma.auditLog.create({
    data: {
      entityType: 'PAYMENT',
      entityId: paymentId,
      action: 'COMPLETED',
      userId,
      metadata: JSON.stringify({
        leagueId,
        membershipId,
        sessionId: session.id,
      }),
    },
  })

  console.log(`Payment completed for membership ${membershipId}`)
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const payment = await prisma.payment.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
  })

  if (!payment) {
    console.error('Payment not found for failed payment intent')
    return
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: 'FAILED' },
  })

  // Create audit log
  await prisma.auditLog.create({
    data: {
      entityType: 'PAYMENT',
      entityId: payment.id,
      action: 'FAILED',
      userId: payment.userId,
      metadata: JSON.stringify({
        reason: paymentIntent.last_payment_error?.message,
      }),
    },
  })

  console.log(`Payment failed for payment ${payment.id}`)
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const payment = await prisma.payment.findFirst({
    where: { stripePaymentIntentId: charge.payment_intent as string },
    include: { league: true },
  })

  if (!payment) {
    console.error('Payment not found for refunded charge')
    return
  }

  // Update payment status
  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: 'REFUNDED' },
  })

  // Revoke paid status for membership
  const membership = await prisma.membership.findFirst({
    where: {
      leagueId: payment.leagueId,
      userId: payment.userId,
    },
  })

  if (membership) {
    await prisma.membership.update({
      where: { id: membership.id },
      data: {
        paidStatus: false,
        paidAt: null,
      },
    })
  }

  // Create audit log
  await prisma.auditLog.create({
    data: {
      entityType: 'PAYMENT',
      entityId: payment.id,
      action: 'REFUNDED',
      userId: payment.userId,
      metadata: JSON.stringify({
        chargeId: charge.id,
        amount: charge.amount_refunded,
      }),
    },
  })

  console.log(`Payment refunded for payment ${payment.id}`)
}
