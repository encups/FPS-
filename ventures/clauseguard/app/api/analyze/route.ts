import { NextRequest, NextResponse } from "next/server";
import { analyzeContract } from "@/lib/anthropic";
import { saveReport } from "@/lib/store";

const PREVIEW_COUNT = 2;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Paste at least a few sentences of contract text to analyze." },
        { status: 400 }
      );
    }
    if (text.length > 50000) {
      return NextResponse.json(
        {
          error:
            "That document is too long. Paste up to ~50,000 characters (roughly 15 pages).",
        },
        { status: 400 }
      );
    }

    const analysis = await analyzeContract(text);
    const report = saveReport(analysis);

    return NextResponse.json({
      id: report.id,
      documentType: report.documentType,
      summary: report.summary,
      totalFindings: report.findings.length,
      preview: report.findings.slice(0, PREVIEW_COUNT),
      lockedCount: Math.max(report.findings.length - PREVIEW_COUNT, 0),
      priceCents: report.priceCents,
      demo: !process.env.ANTHROPIC_API_KEY,
    });
  } catch (err) {
    console.error("analyze error", err);
    return NextResponse.json(
      { error: "Something went wrong analyzing this document. Please try again." },
      { status: 500 }
    );
  }
}
