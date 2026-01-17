# League Locker Setup Guide

## Current Status
You got an internal server error because the database isn't configured yet.

## Steps to Fix

### 1. Set Up Database (Choose one option)

#### Option A: Neon (Recommended - Free Cloud PostgreSQL)
1. Go to https://neon.tech
2. Sign up for free
3. Create a new project
4. Copy the connection string
5. Update `DATABASE_URL` in `.env` file

#### Option B: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database: `createdb league_locker`
3. Update `.env` with: `DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/league_locker"`

### 2. Push Schema to Database
```bash
cd /home/user/FPS-
npx prisma db push
```

### 3. Seed the Database with Multi-Sport Players
```bash
npm run db:seed
```

This will add 145 players across all sports:
- 🏈 25 NFL players
- 🏀 25 NBA players
- ⚾ 35 MLB players
- 🏒 25 NHL players
- ⚽ 25 Soccer players

### 4. Restart Your Dev Server
```bash
npm run dev
```

### 5. Try Signing Up Again
Go to http://localhost:3000/signup and create an account!

## Optional: Set Up Stripe (For Payment Features)

If you want to test payments:

1. Go to https://dashboard.stripe.com
2. Create a free account
3. Get your test API keys
4. Update `.env` with:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
5. Set up Stripe CLI for webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
6. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in `.env`

## Current Environment Variables

✅ NEXTAUTH_SECRET - Already generated
✅ NEXTAUTH_URL - Set to http://localhost:3000
❌ DATABASE_URL - **YOU NEED TO SET THIS**
❌ Stripe keys - Optional, only needed for payments

## Need Help?

- Database connection issues? Check your DATABASE_URL format
- Prisma errors? Run `npx prisma generate` then `npx prisma db push`
- Still getting errors? Check the terminal output for specific error messages
