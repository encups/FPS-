import { NextRequest, NextResponse } from "next/server";
import { getReport, unlockReport } from "@/lib/store";
import { getStripeClient, stripeConfigured } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const report = id ? getReport(id) : undefined;
    if (!report) {
      return NextResponse.json(
        { error: "Report not found or expired." },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;

    // No Stripe key configured yet: unlock immediately so the flow is
    // fully demoable end to end before payments are wired up.
    if (!stripeConfigured()) {
      unlockReport(id);
      return NextResponse.json({
        demo: true,
        redirectUrl: `${appUrl}/report/${id}?demo_unlocked=1`,
      });
    }

    const stripe = getStripeClient()!;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: report.priceCents,
            product_data: {
              name: `ClauseGuard Full Report — ${report.documentType}`,
              description: "Full AI-generated contract risk report",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/report/${id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/report/${id}?canceled=1`,
      metadata: { reportId: id },
    });

    return NextResponse.json({ demo: false, redirectUrl: session.url });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
