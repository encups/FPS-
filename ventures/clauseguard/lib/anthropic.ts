import Anthropic from "@anthropic-ai/sdk";

export interface Finding {
  title: string;
  quote: string;
  riskLevel: "high" | "medium" | "low";
  explanation: string;
}

export interface ContractAnalysis {
  documentType: string;
  summary: string;
  findings: Finding[];
}

const SYSTEM_PROMPT = `You are a contract risk-review assistant. You are not a lawyer and must not give legal advice or state whether a clause is enforceable in any jurisdiction — you flag clauses worth a human's attention and explain them in plain English.

Analyze the contract, lease, or agreement text the user provides. Identify clauses that are risky, unusual, one-sided, or worth double-checking before signing.

Respond with ONLY valid JSON, no prose, no markdown code fences, matching exactly this schema:
{
  "documentType": string (e.g. "Residential Lease Agreement", "Freelance Services Contract"),
  "summary": string (2-3 plain-English sentences on overall risk level and what kind of document this is),
  "findings": [
    {
      "title": string (short label for the issue),
      "quote": string (short verbatim excerpt from the text, under 200 characters),
      "riskLevel": "high" | "medium" | "low",
      "explanation": string (1-3 plain-English sentences on why this matters)
    }
  ]
}

Identify between 3 and 10 findings, ordered by severity with "high" first. If the text doesn't look like a contract, still do your best with what's there and say so in the summary.`;

export async function analyzeContract(text: string): Promise<ContractAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return demoAnalysis();
  }

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929";

  const message = await client.messages.create({
    model,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: text.slice(0, 30000) }],
  });

  const raw = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  return parseAnalysis(raw);
}

function parseAnalysis(raw: string): ContractAnalysis {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "");

  try {
    const parsed = JSON.parse(cleaned);
    if (!parsed.findings || !Array.isArray(parsed.findings)) {
      throw new Error("Unexpected response shape");
    }
    return parsed as ContractAnalysis;
  } catch {
    return {
      documentType: "Unknown",
      summary:
        "We couldn't fully parse the AI's analysis for this document. Please try again, or paste a shorter excerpt.",
      findings: [],
    };
  }
}

function demoAnalysis(): ContractAnalysis {
  return {
    documentType: "Residential Lease Agreement (demo)",
    summary:
      "This is demo data, shown because no ANTHROPIC_API_KEY is configured. In live mode, this summary and every finding below is generated fresh from the document you paste in.",
    findings: [
      {
        title: "Automatic renewal with a short opt-out window",
        quote:
          "This lease shall automatically renew for successive 12-month terms unless written notice is given at least 90 days prior to expiration.",
        riskLevel: "high",
        explanation:
          "You could be locked into another full year if you miss a narrow 90-day notice window most tenants never track.",
      },
      {
        title: "Landlord may enter with only \"reasonable\" notice",
        quote:
          "Landlord may enter the premises upon reasonable notice to Tenant for inspection or repair.",
        riskLevel: "medium",
        explanation:
          "\"Reasonable\" is left undefined, which favors whoever wrote the lease if there's ever a dispute about short-notice entry.",
      },
      {
        title: "Tenant pays landlord's legal fees regardless of outcome",
        quote:
          "Tenant shall reimburse Landlord for all attorney's fees incurred in enforcing this Agreement.",
        riskLevel: "high",
        explanation:
          "This clause isn't mutual — only the tenant is on the hook for legal fees, even in disputes the tenant wins.",
      },
      {
        title: "Security deposit deductions are broadly defined",
        quote:
          "Landlord may deduct from the security deposit for any damage beyond normal wear and tear, as determined by Landlord.",
        riskLevel: "medium",
        explanation:
          "Letting the landlord unilaterally decide what counts as damage removes a protection tenants usually have.",
      },
      {
        title: "Uncapped daily late fees",
        quote:
          "A late fee of $50 plus $10 per day shall accrue until rent is paid in full.",
        riskLevel: "low",
        explanation:
          "Uncapped daily late fees can compound quickly — worth checking your local rent-control or landlord-tenant statutes for caps.",
      },
    ],
  };
}
