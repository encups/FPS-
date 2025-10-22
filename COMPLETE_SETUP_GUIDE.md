# 🏰 Frame Fables - Complete Setup Guide

## Quick Copy-Paste Setup (Choose One Method)

### Method 1: For Mac/Linux (Bash/Zsh)

**Step 1:** Open Terminal and run these commands:

```bash
# Create project folder
mkdir frame-fables
cd frame-fables

# Download the setup files from your repository
# Replace <YOUR-REPO-URL> with your actual GitHub repo URL
git clone <YOUR-REPO-URL> .
git checkout claude/frame-fables-marketing-app-011CUKa8pfz5g5CnZR9kQzsa

# Install dependencies
npm install

# Run the app
npm run dev
```

**Step 2:** Open browser to http://localhost:3000

---

### Method 2: For Windows (Command Prompt/PowerShell)

**Step 1:** Open Command Prompt or PowerShell and run:

```cmd
# Create project folder
mkdir frame-fables
cd frame-fables

# Download from your repository
git clone <YOUR-REPO-URL> .
git checkout claude/frame-fables-marketing-app-011CUKa8pfz5g5CnZR9kQzsa

# Install dependencies
npm install

# Run the app
npm run dev
```

**Step 2:** Open browser to http://localhost:3000

---

### Method 3: Manual Setup (If Git Not Available)

I've created 4 setup files you can run sequentially:

1. **SETUP_PART1.sh** - Configuration files (package.json, tsconfig, etc.)
2. **SETUP_PART2_PAGES.txt** - Landing page
3. **SETUP_PART3_DASHBOARD.txt** - Dashboard page
4. **SETUP_PART4_AUTH_AND_API.txt** - Login, Signup, API routes

**For Mac/Linux:**
```bash
# Make executable and run
chmod +x SETUP_PART1.sh
./SETUP_PART1.sh

# Then copy-paste commands from each .txt file
cat SETUP_PART2_PAGES.txt
cat SETUP_PART3_DASHBOARD.txt
cat SETUP_PART4_AUTH_AND_API.txt

# Install and run
npm install
npm run dev
```

**For Windows:**
- Open each `.txt` file in Notepad
- Copy the `cat > filename` commands
- Convert to PowerShell format (use `@" "@ | Out-File -FilePath filename`)
- Or manually create each file by copying the content

---

## What Gets Created

```
frame-fables/
├── app/
│   ├── api/generate/route.ts    # AI generation API
│   ├── dashboard/page.tsx        # Dashboard page
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── globals.css              # Styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── public/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## After Setup

### 1. Test the App

Visit these pages:
- **Homepage**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup

### 2. Try AI Generation (Demo Mode)

1. Go to Dashboard
2. Click any content type tab
3. Type a prompt or use a template
4. Click "Generate"
5. See medieval-themed demo content!

### 3. Add Real AI (Optional)

To use actual OpenAI:
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your key:
# OPENAI_API_KEY=sk-your-key-here

# Restart dev server
npm run dev
```

### 4. Build for Production

```bash
# Test production build
npm run build

# Run production server
npm start
```

### 5. Deploy to Vercel

```bash
# Option A: Use Vercel CLI
npm i -g vercel
vercel

# Option B: Use Vercel Dashboard
# 1. Go to https://vercel.com/new
# 2. Import your GitHub repo
# 3. Click Deploy
```

---

## Troubleshooting

### "npm not found"
- Install Node.js from https://nodejs.org (v18 or higher)

### "command not found: cat" (Windows)
- Use PowerShell or Git Bash instead of Command Prompt
- Or manually copy file contents

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

---

## Features You Get

✅ **4 Complete Pages**
- Landing page with pricing
- AI content dashboard
- Login/signup (demo mode)

✅ **AI Content Generation**
- Social media posts
- Email campaigns
- Ad copy
- Blog posts
- Medieval-themed prompts

✅ **Beautiful UI**
- 8-bit pixel aesthetic
- Medieval gold/bronze theme
- Fully responsive
- Custom fonts

✅ **Ready to Deploy**
- Vercel-optimized
- Environment variables setup
- Production build tested

✅ **Works Without API Keys**
- Demo mode with pre-written content
- Test everything before buying API access

---

## Next Steps

1. ✅ **Customize branding** - Change colors in `tailwind.config.ts`
2. ✅ **Add real auth** - Implement NextAuth.js
3. ✅ **Add database** - Use Supabase/PostgreSQL
4. ✅ **Add payments** - Integrate Stripe
5. ✅ **Deploy live** - Push to Vercel
6. ✅ **Start marketing!** - Share with customers

---

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production server
npm run lint         # Check code quality

# Deployment
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production

# Cleanup
rm -rf node_modules  # Remove dependencies
npm install          # Reinstall dependencies
```

---

## Your Live App

Your app is already deployed at:
**https://framefables-5lhadtilm-encups-projects.vercel.app/**

To run it locally, follow the setup steps above!

---

## Support Files in Repository

- `README.md` - Full project documentation
- `PROJECT_OVERVIEW.md` - Complete build details
- `VERCEL_TROUBLESHOOTING.md` - Deployment help
- `DEPLOY.md` - Deployment instructions
- `COMPLETE_SETUP_GUIDE.md` - This file!

---

**Questions?** Check the documentation files or review the live deployed version!

*Built with ⚔️ by Claude Code*
*May your setup be swift and your builds successful!*
