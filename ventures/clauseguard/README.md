# 🛡️ ClauseGuard

AI contract red-flag scanner. Paste a lease, freelance contract, or NDA and
get an instant, plain-English breakdown of clauses worth a second look.
Free preview of the top 2 findings; pay a small one-time fee to unlock the
full report. No account, no login.

This is the first venture in an "AI agent ecosystem" — a portfolio of
small, mostly-autonomous products run and monitored by AI agents, starting
here with one product proven end to end before any orchestration layer
gets built on top.

## Why this one

- **No login, one-time payment** — the lowest-friction purchase there is,
  which matters more than anything else for time-to-first-dollar.
- **Buying moment has urgency** — people search for this right before
  signing something, not "someday."
- **Underserved niche** — unlike resume checkers or SEO audits, this isn't
  dominated by an incumbent with huge SEO authority.
- **Fully agent-buildable** — the whole loop (analyze → paywall → unlock)
  is software, no manual step required to deliver the product.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Claude (`@anthropic-ai/sdk`) for the contract analysis
- Stripe Checkout for the one-time unlock payment

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (or whatever port you
pass to `next dev`). Works fully in **demo mode** with no keys configured:
analysis returns canned sample findings, and "unlock" is free — so you can
exercise the entire flow, including the report page, before spending
anything on API or Stripe fees.

## Going live

1. **Add `ANTHROPIC_API_KEY`** — turns on real analysis via the Claude API.
   Set `ANTHROPIC_MODEL` to override the default model id if needed.
2. **Add `STRIPE_SECRET_KEY`** — turns on real Stripe Checkout for the
   unlock step (currently uses inline `price_data`, so no pre-created
   Stripe Price object is required).
3. **Set `NEXT_PUBLIC_APP_URL`** to your real deployed domain — it's used
   to build Stripe's `success_url`/`cancel_url`.
4. Deploy anywhere Next.js runs (Vercel is the path of least resistance).

## How the paywall works

`POST /api/analyze` runs the AI analysis, stores the full result
server-side, and returns only the first 2 findings plus a locked count.
`POST /api/checkout` creates a Stripe Checkout Session (or, with no Stripe
key, unlocks for free so the flow stays demoable). `GET /api/report`
verifies the Checkout Session on return and reveals the full findings.

## Known limitations (read before relying on this for real revenue)

- **Report storage is in-memory** (`lib/store.ts`), cached on `globalThis`
  so it survives Next.js's per-route bundling in dev. That's enough for a
  single Node process, but it will **not** survive a server restart or
  work correctly across multiple serverless instances (e.g. Vercel under
  real concurrent traffic). Swap in Redis/KV/a database before this needs
  to hold real paid reports reliably.
- **No Stripe webhook** — payment is verified by re-fetching the Checkout
  Session when the customer lands back on the report page. This is fine
  for "does the user get their report" but means you have no durable
  record of a sale if they never return to that URL. Add a webhook
  handler (`checkout.session.completed`) before treating Stripe as your
  system of record for revenue.
- **No abuse limits** — no rate limiting on `/api/analyze`, so a stranger
  could run up your Anthropic bill. Add rate limiting (by IP, or a simple
  turnstile/captcha) before real traffic.
- **Dependency advisories**: `npm audit` flags a handful of Next.js DoS
  advisories that apply broadly across recent Next versions and require
  specific misconfiguration (custom `remotePatterns`, custom rewrites) to
  be exploitable — neither is used here, but re-check `npm audit` and keep
  `next` current before shipping.
- **Legal-adjacent content**: findings are AI-generated, not legal advice.
  The disclaimer in the footer isn't just liability boilerplate — it's
  accurate. Don't remove it.

## What's next for the "hands-off" part

Once this is taking real payments, the next layer is monitoring, not more
features: a small dashboard pulling from Stripe (revenue, sale count) and
from Anthropic usage (cost), plus alerts if error rates spike — that's
the "visible and manageable from outside" piece of the larger ecosystem
idea. Deliberately not building that yet; it's premature until this
product has proven it can make money on its own.
