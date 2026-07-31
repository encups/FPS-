import { NextRequest, NextResponse } from "next/server";
import { getReport, unlockReport } from "@/lib/store";
import { getStripeClient } from "@/lib/stripe";

const PREVIEW_COUNT = 2;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const sessionId = searchParams.get("session_id");

  if (!id) {
    return NextResponse.json({ error: "Missing report id." }, { status: 400 });
  }

  let report = getReport(id);
  if (!report) {
    return NextResponse.json(
      { error: "Report not found or expired." },
      { status: 404 }
    );
  }

  if (!report.unlocked && sessionId) {
    const stripe = getStripeClient();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (
          session.payment_status === "paid" &&
          session.metadata?.reportId === id
        ) {
          report = unlockReport(id) ?? report;
        }
      } catch (err) {
        console.error("stripe session retrieve error", err);
      }
    }
  }

  if (!report.unlocked) {
    return NextResponse.json({
      id: report.id,
      documentType: report.documentType,
      summary: report.summary,
      preview: report.findings.slice(0, PREVIEW_COUNT),
      totalFindings: report.findings.length,
      lockedCount: Math.max(report.findings.length - PREVIEW_COUNT, 0),
      priceCents: report.priceCents,
      unlocked: false,
    });
  }

  return NextResponse.json({
    id: report.id,
    documentType: report.documentType,
    summary: report.summary,
    findings: report.findings,
    unlocked: true,
  });
}
