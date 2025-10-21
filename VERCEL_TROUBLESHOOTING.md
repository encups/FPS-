# Vercel Deployment Troubleshooting

## Common Vercel Errors & Solutions

### Error: "Build Failed"

#### Solution 1: Check Node.js Version
Vercel requires Node.js 18+. Add to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Solution 2: Check Build Command
In Vercel dashboard:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

### Error: "Module not found" or "Cannot find package"

#### Solution: Clear Cache & Reinstall
1. In Vercel dashboard, go to Settings → General
2. Clear build cache
3. Redeploy

---

### Error: "OPENAI_API_KEY is not defined"

#### Solution: Environment Variables
1. Go to Vercel dashboard → Settings → Environment Variables
2. Add `OPENAI_API_KEY` = `your-key-here`
3. **OR** leave it blank (app works in demo mode!)

**Note**: The app is designed to work WITHOUT the OpenAI key. It will use demo content.

---

### Error: "Failed to compile" with ESLint errors

#### Solution: Temporarily Disable Strict ESLint
Add to `next.config.js`:
```javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Only if necessary
  },
}
```

---

### Error: "Port already in use" (local)

#### Solution:
```bash
# Kill the process
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

---

### Error: "Vercel deployment timeout"

#### Solution:
The build is taking too long. Check:
1. Remove `node_modules` from git (should be in `.gitignore`)
2. Remove `.next` folder from git
3. Ensure only source files are committed

---

## 🔍 Debug Your Specific Error

### Step 1: Get the Error Message
1. Go to your Vercel dashboard
2. Click on your project
3. Click on the failed deployment
4. Scroll to "Build Logs"
5. Copy the error message

### Step 2: Common Error Patterns

**If you see**: `"ENOENT: no such file or directory"`
- **Cause**: Missing file or wrong path
- **Fix**: Check file paths are correct

**If you see**: `"Type error"` or `"TS error"`
- **Cause**: TypeScript compilation error
- **Fix**: Run `npm run build` locally to see the error

**If you see**: `"Cannot find module 'openai'"`
- **Cause**: Dependencies not installed
- **Fix**: Make sure `package.json` and `package-lock.json` are committed

**If you see**: `"Conflicting peer dependencies"`
- **Cause**: Package version conflicts
- **Fix**: Use `npm install --legacy-peer-deps`

---

## ✅ Pre-Deployment Checklist

Before deploying to Vercel, verify:

- [ ] `npm install` works locally
- [ ] `npm run build` succeeds locally
- [ ] `.gitignore` includes `node_modules` and `.next`
- [ ] `package.json` and `package-lock.json` are committed
- [ ] No TypeScript errors (`npm run build`)
- [ ] Environment variables are optional (demo mode works)

---

## 🚀 Successful Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Branch: `claude/frame-fables-marketing-app-011CUKa8pfz5g5CnZR9kQzsa`

3. **Configure**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Environment Variables** (Optional)
   - Skip for now (demo mode works)
   - Or add: `OPENAI_API_KEY` = your key

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your URL!

---

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? frame-fables
# - Directory? ./
```

---

## 📋 What to Send for Help

If you're still stuck, provide:

1. **Error message** (from Vercel build logs)
2. **Screenshot** of the error
3. **Your Node.js version**: Run `node -v`
4. **Local build status**: Does `npm run build` work locally?

---

## 🆘 Emergency Fix: Deploy Different Branch

If the current branch has issues:

```bash
# Create a new branch
git checkout -b deploy-attempt-2

# Make a small change
echo "# Deploy Test" >> DEPLOY.md

# Commit and push
git add .
git commit -m "Test deployment"
git push -u origin deploy-attempt-2

# Deploy this branch on Vercel instead
```

---

## 💡 Pro Tips

1. **Always test locally first**: `npm run build` before deploying
2. **Check build logs**: They show exactly what went wrong
3. **Start simple**: Deploy without environment variables first
4. **Use demo mode**: You don't need OpenAI key to deploy!

---

## 📞 Still Having Issues?

Share the following information:

1. **Exact error message** from Vercel
2. **Build logs** (copy the entire log)
3. **Does it work locally?** (`npm run dev`)
4. **Does local build work?** (`npm run build`)
5. **Your package.json** (to check versions)

I can help debug once I see the specific error!
