# Deployment Guide - Pay-to-Draft Fantasy Football

Complete step-by-step guide to deploy your Pay-to-Draft Fantasy Football platform to production.

## Prerequisites

- GitHub account
- Vercel account ([vercel.com](https://vercel.com))
- PostgreSQL database ([Neon](https://neon.tech) or [Supabase](https://supabase.com))
- Stripe account ([stripe.com](https://stripe.com))

---

## Step 1: Database Setup (Neon - Recommended)

### Option A: Neon (Serverless Postgres)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Name it: "pay-to-draft-fantasy"
4. Copy the connection string (starts with `postgresql://`)
5. Save it for later as your `DATABASE_URL`

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com) and create project
2. Go to Settings → Database
3. Copy "Connection string" (Transaction mode)
4. Replace `[YOUR-PASSWORD]` with your actual password

---

## Step 2: Stripe Setup

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com) and sign up
   - Complete business verification (or use test mode)

2. **Get API Keys**
   - Go to Developers → API keys
   - Copy:
     - **Publishable key** (starts with `pk_test_` or `pk_live_`)
     - **Secret key** (starts with `sk_test_` or `sk_live_`)

3. **Don't configure webhook yet** - we'll do this after deployment

---

## Step 3: Prepare Code for Deployment

1. **Generate NextAuth Secret**

```bash
openssl rand -base64 32
```

Copy the output - this is your `NEXTAUTH_SECRET`

2. **Update Environment Variables**

Create `.env.production` (don't commit this!):

```env
DATABASE_URL="postgresql://..." # From Neon/Supabase
NEXTAUTH_SECRET="..." # Generated above
NEXTAUTH_URL="https://your-app-name.vercel.app" # Update after deployment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="" # Leave empty for now
NEXT_PUBLIC_APP_URL="https://your-app-name.vercel.app"
```

3. **Commit to Git**

```bash
git add .
git commit -m "feat: complete pay-to-draft fantasy platform"
git push origin main
```

---

## Step 4: Deploy to Vercel

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

2. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

3. **Add Environment Variables**

   Click "Environment Variables" and add ALL of these:

   ```
   DATABASE_URL = postgresql://...
   NEXTAUTH_SECRET = (your generated secret)
   NEXTAUTH_URL = https://your-app.vercel.app
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_...
   STRIPE_SECRET_KEY = sk_test_...
   STRIPE_WEBHOOK_SECRET = (leave empty for now)
   NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
   ```

   ⚠️ Make sure to add to **all environments** (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Copy your deployment URL (e.g., `https://your-app.vercel.app`)

---

## Step 5: Database Migration

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Link Your Project**

```bash
vercel link
```

4. **Run Migrations**

```bash
# This pushes your Prisma schema to production database
npx prisma db push --skip-generate

# Seed the database with 200 NFL players
npx prisma db seed
```

Alternatively, you can add these as build commands in `package.json`:

```json
"scripts": {
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

---

## Step 6: Configure Stripe Webhook (Production)

This is **CRITICAL** - without this, payments won't work!

1. **Go to Stripe Dashboard**
   - Navigate to Developers → Webhooks
   - Click "Add endpoint"

2. **Configure Endpoint**
   - Endpoint URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Description: "Pay-to-Draft Fantasy - Production"
   - Events to send: Click "Select events"

3. **Select These Events**
   ```
   ✓ checkout.session.completed
   ✓ payment_intent.payment_failed
   ✓ charge.refunded
   ```

4. **Create Endpoint**
   - Click "Add endpoint"
   - Click on the newly created endpoint
   - Reveal "Signing secret" (starts with `whsec_...`)
   - Copy it

5. **Add to Vercel Environment Variables**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Find `STRIPE_WEBHOOK_SECRET`
   - Click "Edit" and paste the signing secret
   - Save
   - **IMPORTANT**: Click "Redeploy" to apply the new env var

---

## Step 7: Update URLs

1. **Update NEXTAUTH_URL in Vercel**
   - Go to Settings → Environment Variables
   - Update `NEXTAUTH_URL` from temp URL to final URL
   - Update `NEXT_PUBLIC_APP_URL` as well
   - Redeploy

2. **Test the Application**
   - Visit your production URL
   - Sign up for an account
   - Create a league
   - Join as another user (use incognito)
   - Test payment flow
   - Verify webhook fires (check Stripe dashboard → Events)

---

## Step 8: Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to Settings → Domains
   - Add your custom domain (e.g., `fantasydraft.com`)
   - Follow DNS instructions

2. **Update Environment Variables**
   ```
   NEXTAUTH_URL = https://fantasydraft.com
   NEXT_PUBLIC_APP_URL = https://fantasydraft.com
   ```

3. **Update Stripe Webhook**
   - Go to Stripe → Webhooks
   - Edit your webhook URL to use custom domain
   - Update endpoint URL to: `https://fantasydraft.com/api/webhooks/stripe`

---

## Troubleshooting

### Build Fails

**Error**: "Cannot find module '@prisma/client'"

```bash
# Add to package.json scripts:
"postinstall": "prisma generate"
```

Then redeploy.

### Webhook Not Firing

1. Check Stripe dashboard → Developers → Events
2. Look for failed webhook deliveries
3. Verify `STRIPE_WEBHOOK_SECRET` is set in Vercel
4. Ensure you redeployed after adding the secret

### Database Connection Issues

**Error**: "Can't reach database server"

- Verify `DATABASE_URL` is correct
- Check if your database provider requires allowlisting Vercel's IP
  - Neon: No allowlisting needed
  - Supabase: Enable "Pooler" mode in connection string

### "NextAuth URL mismatch"

- Ensure `NEXTAUTH_URL` matches your actual deployment URL
- Redeploy after changing env vars

---

## Production Checklist

Before going live, verify:

- [ ] Database is hosted and accessible
- [ ] All environment variables set in Vercel
- [ ] Stripe webhook is configured and firing
- [ ] Webhook secret is in Vercel env vars
- [ ] Database is seeded with players (`npm run db:seed`)
- [ ] Test signup flow works
- [ ] Test league creation works
- [ ] Test payment flow with test card (4242...)
- [ ] Verify webhook sets `paidStatus = true` in database
- [ ] Test draft pick with paid user (works)
- [ ] Test draft pick with unpaid user (blocked)
- [ ] SSL certificate is active (Vercel handles this)

---

## Going from Test to Live Mode

When ready for real payments:

1. **Switch Stripe to Live Mode**
   - Get live API keys from Stripe dashboard
   - Update Vercel env vars:
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
     - `STRIPE_SECRET_KEY` → `sk_live_...`

2. **Create Live Webhook**
   - In Stripe **live mode** → Developers → Webhooks
   - Add endpoint with same URL
   - Get new signing secret
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel

3. **Activate Stripe Account**
   - Complete business verification
   - Add bank account for payouts

4. **Update Legal Pages**
   - Add Terms of Service
   - Add Privacy Policy
   - Add Refund Policy

---

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard → Analytics tab

### Stripe Dashboard

Monitor:
- Payments (Stripe Dashboard → Payments)
- Webhook deliveries (Developers → Events)
- Failed payments (Payments → Failed)

### Database Monitoring

Use Prisma Studio to view data:

```bash
npx prisma studio
```

Or use your database provider's dashboard (Neon/Supabase)

---

## Backup Strategy

### Database Backups

**Neon**: Automatic daily backups (free tier: 7 days retention)

**Supabase**: Automatic daily backups (free tier: 7 days retention)

### Manual Backup

```bash
# Export database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20260117.sql
```

---

## Performance Optimization

### Enable Caching

Add to `next.config.js`:

```javascript
module.exports = {
  cacheMaxMemorySize: 50 * 1024 * 1024, // 50 MB
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}
```

### Database Connection Pooling

Use Prisma Accelerate or PgBouncer for better connection management in serverless.

---

## Security Hardening

1. **Rate Limiting** (implement in future):
   - Add rate limiting to signup/login
   - Use `@upstash/ratelimit` with Redis

2. **CORS**:
   - Already configured for Stripe webhooks
   - Restrict API routes if needed

3. **Input Validation**:
   - Already using Zod for type safety
   - Server-side validation on all inputs

4. **Secrets Rotation**:
   - Rotate `NEXTAUTH_SECRET` every 90 days
   - Update Stripe keys if compromised

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Stripe webhook logs
3. Check database connection
4. Review README.md troubleshooting section

---

**Your Pay-to-Draft Fantasy Football platform is now live! 🏈🎉**
