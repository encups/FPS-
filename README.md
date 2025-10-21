# 🏰 Frame Fables - AI Marketing for Small Businesses

A fully automated AI marketing tool with a medieval 8-bit theme. Built for small businesses to quickly generate marketing content with storytelling flair.

## ⚔️ Features

- **Social Media Quest** - Generate engaging social media posts
- **Email Scrolls** - Craft compelling email campaigns
- **Ad Campaigns** - Create conversion-focused ad copy
- **Blog Chronicles** - Write SEO-friendly blog posts
- **Medieval 8-bit Theme** - Unique pixel art aesthetic
- **AI-Powered** - Uses OpenAI GPT-4 for content generation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (optional for demo mode)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Add your OpenAI API key to .env (optional - works in demo mode without it)
# OPENAI_API_KEY=your_key_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4 API
- **Deployment**: Vercel (recommended)

## 🎨 Pages

- `/` - Landing page with pricing
- `/dashboard` - Main content generation interface
- `/login` - User login (demo mode)
- `/signup` - User registration (demo mode)

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```env
# Required for production
OPENAI_API_KEY=your_openai_api_key_here

# Optional - for Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Future: Stripe integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Deploy to Other Platforms

Works with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 💰 Monetization

The app includes three pricing tiers:

1. **Squire** - $29/month (Basic features)
2. **Knight** - $79/month (Popular, full features)
3. **King** - $199/month (Enterprise)

To enable payments:
1. Create a Stripe account
2. Add Stripe API keys to `.env`
3. Implement Stripe checkout (webhook handlers included)

## 🎯 Content Types

### Social Media
- Engagement posts
- Product announcements
- Customer testimonials
- Behind-the-scenes

### Email Campaigns
- Welcome sequences
- Product promotions
- Newsletters
- Re-engagement

### Ad Copy
- Facebook ads
- Google search ads
- Instagram stories
- Landing pages

### Blog Posts
- How-to guides
- Industry trends
- Success stories
- Comparisons

## 🛠️ Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Customization

### Change Theme Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  medieval: {
    gold: "#D4AF37",      // Primary color
    bronze: "#CD7F32",    // Secondary
    stone: "#8B8680",     // Tertiary
    // ... add more
  }
}
```

### Add New Content Types

1. Add type to `app/dashboard/page.tsx`
2. Add system prompt to `app/api/generate/route.ts`
3. Add demo content template

### Customize AI Behavior

Edit system prompts in `app/api/generate/route.ts`:

```typescript
const SYSTEM_PROMPTS = {
  social: `Your custom prompt here...`,
  // ...
}
```

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for all secrets
- Implement proper authentication before production
- Add rate limiting to API routes
- Validate all user inputs

## 📈 Future Features

- [ ] User authentication (NextAuth.js)
- [ ] Stripe payment integration
- [ ] Content scheduling
- [ ] Analytics dashboard
- [ ] Team collaboration
- [ ] Custom brand voice training
- [ ] Image generation (DALL-E)
- [ ] Social media auto-posting
- [ ] Content calendar
- [ ] A/B testing tools

## 🤝 Contributing

This is a commercial project, but suggestions are welcome!

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For issues or questions:
- Check the documentation
- Review the code comments
- Test in demo mode first

## 🎮 Demo Mode

The app works without API keys for testing:
- Uses pre-written demo content
- All features visible
- No API costs
- Perfect for development

Add your OpenAI key to unlock real AI generation!

---

Built with ⚔️ by Frame Fables

*May your conversions be plentiful and your engagement legendary!*
