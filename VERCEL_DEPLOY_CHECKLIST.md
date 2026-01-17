# Vercel Deployment Troubleshooting

## Quick Checklist

### 1. Check Build Logs in Vercel
- Go to your Vercel deployment
- Click on the failed deployment
- Check the "Build Logs" tab
- Look for the specific error message

### 2. Common Issues & Solutions

#### Error: "Module not found: Can't resolve '@prisma/client'"
**Solution**: Already fixed with `postinstall` script, but verify:
- Vercel should run `prisma generate` during install
- Check logs for "prisma generate" output

#### Error: "DATABASE_URL environment variable not found"
**Solution**: 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `DATABASE_URL` with your Postgres connection string
3. Redeploy

#### Error: "NEXTAUTH_SECRET is not set"
**Solution**: 
1. Generate secret: `openssl rand -base64 32`
2. Add to Vercel env vars
3. Redeploy

#### Error: TypeScript errors during build
**Solution**: Already fixed, but if you see new ones:
- Share the specific error message
- May need to add more type annotations

### 3. Required Environment Variables

Make sure ALL of these are set in Vercel:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (can be empty initially)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. How to Deploy

If you haven't deployed yet:

**Option A: Import from GitHub**
1. Go to vercel.com/new
2. Import your GitHub repo
3. Select the branch: `claude/pay-to-draft-fantasy-CadqB`
4. Add environment variables
5. Click Deploy

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 5. After First Deploy

1. Get your deployment URL (e.g., `https://your-app.vercel.app`)
2. Update these env vars with the real URL:
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_APP_URL`
3. Set up Stripe webhook:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
   - Copy webhook secret
   - Add to Vercel as `STRIPE_WEBHOOK_SECRET`
4. Redeploy to apply changes

### 6. Database Setup

After successful deployment:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

Or manually:
- Connect to your database
- Run migrations from Prisma Studio or SQL client
- Seed players

## Still Having Issues?

Please share:
1. The exact error message from Vercel build logs
2. Screenshot of the error (if possible)
3. Which step is failing (Build, Install, or Runtime)

I can then provide a specific fix!
