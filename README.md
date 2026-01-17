# League Locker 🔒

**Lock It. Draft It. Win It!**

A production-ready fantasy football web application where league members **must pay league dues** before they can draft. Built with Next.js, TypeScript, Prisma, NextAuth, and Stripe.

## 🏆 Overview

**League Locker** enforces payment before drafting through server-side validation. No payment = no draft picks. All payments are processed via Stripe Checkout with webhook verification.

### Key Features

- **🔒 Strict Payment Gating**: Server-side enforcement prevents unpaid users from drafting
- **⚡ Real-time Draft**: Live snake draft with WebSocket updates and pick timer
- **💳 Secure Payments**: Stripe Checkout + webhook verification (platform-collect model)
- **🏈 Complete League Management**: Create leagues, invite members, manage settings
- **🚫 Refund Protection**: Automatic access revocation on refund via webhooks
- **📝 Full Audit Trail**: Complete activity logging for transparency
- **🎯 Auto-pick**: Best available player when timer expires

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js (Credentials provider)
- **Payments**: Stripe Checkout + Webhooks
- **Real-time**: Socket.IO
- **UI**: Tailwind CSS
- **Deployment**: Vercel-ready

### Database Schema

```
users
├── id, email, passwordHash, displayName
├── memberships (1:N)
├── payments (1:N)
└── commissioning leagues (1:N)

leagues
├── id, name, season, duesCents, inviteCode
├── commissionerId → users
├── settingsJson (team count, roster)
├── memberships (1:N)
└── draft (1:1)

memberships
├── id, userId, leagueId, teamName
├── paidStatus ⚠️ CRITICAL - gates draft access
├── paidAt, role (COMMISSIONER | MEMBER)
└── draftPicks (1:N)

payments
├── id, stripeSessionId, stripePaymentIntentId
├── status (PENDING | COMPLETED | FAILED | REFUNDED)
└── Tracks all payment events

drafts
├── id, leagueId, status, startsAt
├── orderJson (snake order as JSON)
├── currentPickIndex, rounds
└── picks (1:N)

draft_picks
├── id, draftId, playerId, membershipId
├── pickNumber, round, autoPicked
└── unique constraints prevent double-picking

players
├── id, name, position, nflTeam, ranking
└── 200+ NFL players seeded

audit_logs
└── Tracks all critical actions
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon, Supabase, or local)
- Stripe account

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd league-locker
npm install
```

### 2. Environment Setup

Create `.env` file:

```env
# Database (use Neon, Supabase, or local PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/fantasy_football"

# NextAuth (generate secret: openssl rand -base64 32)
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (get from dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push schema to database
npm run db:push

# Seed 200 NFL players
npm run db:seed
```

### 4. Stripe Webhook Setup (Local Development)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # or download from stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret (whsec_...) to your .env file
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📋 Core Flows

### 1. Commissioner Creates League

**API**: `POST /api/leagues/create`

```json
{
  "name": "Championship League",
  "season": 2026,
  "duesCents": 5000,
  "teamCount": 10,
  "draftDate": "2026-09-01T18:00:00Z",
  "pickTimerSeconds": 90,
  "rosterSettings": {
    "QB": 1, "RB": 2, "WR": 2, "TE": 1,
    "FLEX": 1, "K": 1, "DEF": 1, "BENCH": 7
  }
}
```

### 2. Member Joins League

**API**: `POST /api/leagues/join`

```json
{
  "inviteCode": "abc123xyz",
  "teamName": "My Team"
}
```

### 3. Member Pays Dues

**API**: `POST /api/payments/create-checkout`

Flow:
1. Creates Stripe Checkout Session
2. Redirects to Stripe-hosted payment page
3. Webhook fires on success: `checkout.session.completed`
4. Server sets `membership.paidStatus = true`
5. User can now draft!

### 4. Draft Pick

**API**: `POST /api/draft/pick`

Server validates:
- User authenticated ✓
- User in league ✓
- **User has paid** ✓ ⚠️ CRITICAL
- User's turn ✓
- Draft live ✓
- Player available ✓

---

## 🔐 Payment Security

### Critical Rules

1. **Never trust client**: `paidStatus` ONLY set by webhooks
2. **Verify signatures**: Prevents fake payment events
3. **Use transactions**: Atomic payment + membership updates
4. **Audit everything**: Log all payment events

### Webhook Handlers

```typescript
checkout.session.completed → paidStatus = true
payment_intent.payment_failed → paidStatus = false
charge.refunded → revoke access
```

---

## 📡 API Reference

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/[...nextauth]` - Login

### Leagues
- `POST /api/leagues/create` - Create league
- `POST /api/leagues/join` - Join via invite
- `GET /api/leagues/[id]` - Get details

### Payments
- `POST /api/payments/create-checkout` - Create Stripe session
- `POST /api/webhooks/stripe` - Webhook handler ⚠️

### Draft
- `POST /api/draft/pick` - Make pick ⚠️
- `POST /api/draft/[id]/start` - Start draft
- `POST /api/draft/[id]/lock` - Lock draft
- `GET /api/draft/[id]/players` - Available players

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Set up Stripe webhook:
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`
5. Run migrations: `npx prisma migrate deploy && npx prisma db seed`

---

## 🧪 Testing

```bash
# Terminal 1: App
npm run dev

# Terminal 2: Stripe webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test cards
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
```

---

## 📁 Project Structure

```
├── app/api/          # API routes
│   ├── auth/         # Signup, NextAuth
│   ├── leagues/      # Create, join, get
│   ├── payments/     # Checkout, webhooks ⚠️
│   └── draft/        # Pick, start, lock ⚠️
├── lib/              # Prisma, auth, Stripe
├── prisma/           # Schema, seed
└── types/            # TypeScript definitions
```

---

## ⚠️ Critical Notes

- **Payment verification**: Only webhooks set `paidStatus`
- **Draft validation**: All checks in server transaction
- **Snake order**: Regenerate on roster changes
- **Webhook signatures**: Always verify Stripe events

---

## 🐛 Troubleshooting

**"Webhook verification failed"**
→ Check `STRIPE_WEBHOOK_SECRET` matches CLI/dashboard

**"Must pay to draft" after paying**
→ Check webhook fired, verify `paidStatus` in DB

**No players**
→ Run `npm run db:seed`

---

## 📊 Production Checklist

- [ ] Database hosted (Neon/Supabase)
- [ ] All env vars in Vercel
- [ ] Stripe webhook configured
- [ ] Database seeded
- [ ] Test full flow

---

## 🔒 Security

✅ Server-side payment verification
✅ Transaction-safe picks
✅ Audit logs
✅ Password hashing
✅ No card storage

---

**League Locker 🔒 - Built with Next.js, Prisma, Stripe, NextAuth, Socket.IO**

Lock it. Draft it. Win it! 🏆
