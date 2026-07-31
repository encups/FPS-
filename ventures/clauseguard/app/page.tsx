"use client";

import { useState } from "react";

interface Finding {
  title: string;
  quote: string;
  riskLevel: "high" | "medium" | "low";
  explanation: string;
}

interface AnalyzeResponse {
  id: string;
  documentType: string;
  summary: string;
  totalFindings: number;
  preview: Finding[];
  lockedCount: number;
  priceCents: number;
  demo: boolean;
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

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

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

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  async function handleAnalyze() {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlock() {
    if (!result) return;
    setUnlocking(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: result.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not start checkout.");
        return;
      }
      window.location.href = data.redirectUrl;
    } catch {
      setError("Network error — please try again.");
    } finally {
      setUnlocking(false);
    }
  }

  return (
    <main className="min-h-screen">
      <nav className="border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg">🛡️ ClauseGuard</span>
          <span className="text-sm text-brand-muted">AI contract red-flag scanner</span>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Know what you&apos;re signing before you sign it.
        </h1>
        <p className="text-brand-muted text-lg">
          Paste a lease, freelance contract, or NDA. Get an instant, plain-English
          breakdown of the clauses worth a second look — in under a minute.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="card p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your contract text here..."
            rows={10}
            className="w-full bg-brand-bg border border-brand-border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-brand-muted">{text.length.toLocaleString()} characters</span>
            <button
              onClick={handleAnalyze}
              disabled={loading || text.trim().length < 50}
              className="bg-brand-accent text-brand-bg font-semibold px-5 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Scanning..." : "Scan for Red Flags"}
            </button>
          </div>
          {error && <p className="text-brand-danger text-sm mt-3">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 space-y-4">
            {result.demo && (
              <div className="card border-brand-warn p-3 text-sm text-brand-warn">
                Demo mode: no ANTHROPIC_API_KEY is configured, so this is sample
                output, not a real analysis of your text.
              </div>
            )}
            <div className="card p-4">
              <p className="text-xs uppercase tracking-wide text-brand-muted mb-1">
                {result.documentType}
              </p>
              <p>{result.summary}</p>
            </div>

            <div className="space-y-3">
              {result.preview.map((finding, i) => (
                <FindingCard key={i} finding={finding} />
              ))}
            </div>

            {result.lockedCount > 0 && (
              <div className="card p-5 text-center">
                <p className="mb-3">
                  🔒 {result.lockedCount} more flagged clause
                  {result.lockedCount === 1 ? "" : "s"} found — unlock the full
                  report to see all {result.totalFindings}.
                </p>
                <button
                  onClick={handleUnlock}
                  disabled={unlocking}
                  className="bg-brand-accent text-brand-bg font-semibold px-6 py-2 rounded-lg disabled:opacity-40"
                >
                  {unlocking
                    ? "Redirecting..."
                    : `Unlock Full Report — ${formatPrice(result.priceCents)}`}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold mb-4 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="card p-4">
            <p className="font-semibold mb-1">1. Paste your document</p>
            <p className="text-brand-muted">Lease, freelance contract, NDA, terms of service — anything in text.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold mb-1">2. AI scans every clause</p>
            <p className="text-brand-muted">Flags what&apos;s risky, one-sided, or unusual — with a plain-English reason.</p>
          </div>
          <div className="card p-4">
            <p className="font-semibold mb-1">3. Unlock the full report</p>
            <p className="text-brand-muted">See every flagged clause for a one-time fee. No account needed.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 py-6 text-xs text-brand-muted text-center space-y-1">
          <p>ClauseGuard is not a law firm and does not provide legal advice. Reports are AI-generated and may be incomplete or inaccurate — for anything important, consult a licensed attorney.</p>
          <p>© {new Date().getFullYear()} ClauseGuard</p>
        </div>
      </footer>
    </main>
  );
}
