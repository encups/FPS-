"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Finding {
  title: string;
  quote: string;
  riskLevel: "high" | "medium" | "low";
  explanation: string;
}

interface ReportResponse {
  id: string;
  documentType: string;
  summary: string;
  unlocked: boolean;
  findings?: Finding[];
  preview?: Finding[];
  totalFindings?: number;
  lockedCount?: number;
  priceCents?: number;
  error?: string;
}

const RISK_LABEL: Record<Finding["riskLevel"], string> = {
  high: "High risk",
  medium: "Medium risk",
  low: "Low risk",
};

const RISK_CLASS: Record<Finding["riskLevel"], string> = {
  high: "risk-high",
  medium: "risk-medium",
  low: "risk-low",
};

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div className={`card ${RISK_CLASS[finding.riskLevel]} p-4`}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <h4 className="font-semibold">{finding.title}</h4>
        <span className="text-xs uppercase tracking-wide text-brand-muted whitespace-nowrap">
          {RISK_LABEL[finding.riskLevel]}
        </span>
      </div>
      <p className="text-sm text-brand-muted italic mb-2">&ldquo;{finding.quote}&rdquo;</p>
      <p className="text-sm">{finding.explanation}</p>
    </div>
  );
}

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const qs = new URLSearchParams({ id: params.id });
    if (sessionId) qs.set("session_id", sessionId);

    fetch(`/api/report?${qs.toString()}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Report not found.");
          return;
        }
        setReport(data);
      })
      .catch(() => setError("Network error — please refresh."))
      .finally(() => setLoading(false));
  }, [params.id, searchParams]);

  return (
    <main className="min-h-screen">
      <nav className="border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">🛡️ ClauseGuard</Link>
          <span className="text-sm text-brand-muted">Contract Report</span>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-10 space-y-4">
        {loading && <p className="text-brand-muted">Loading report...</p>}
        {error && <p className="text-brand-danger">{error}</p>}

        {report && (
          <>
            {searchParams.get("canceled") && !report.unlocked && (
              <div className="card border-brand-warn p-3 text-sm text-brand-warn">
                Checkout was canceled. You can unlock the full report any time below.
              </div>
            )}

            <div className="card p-4">
              <p className="text-xs uppercase tracking-wide text-brand-muted mb-1">
                {report.documentType}
              </p>
              <p>{report.summary}</p>
            </div>

            {report.unlocked ? (
              <div className="space-y-3">
                {(report.findings || []).map((finding, i) => (
                  <FindingCard key={i} finding={finding} />
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {(report.preview || []).map((finding, i) => (
                    <FindingCard key={i} finding={finding} />
                  ))}
                </div>
                <div className="card p-5 text-center">
                  <p>
                    🔒 {report.lockedCount} more flagged clause
                    {report.lockedCount === 1 ? "" : "s"} in this report. Head back
                    to the homepage to unlock the full analysis.
                  </p>
                  <Link
                    href="/"
                    className="inline-block mt-3 bg-brand-accent text-brand-bg font-semibold px-6 py-2 rounded-lg"
                  >
                    Scan a Contract
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
