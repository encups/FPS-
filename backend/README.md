# 🏰 Frame Fables Backend

**Medieval-Themed AI Marketing Platform with Multi-Agent Orchestration**

Frame Fables is a production-grade SaaS platform that automates client onboarding, content generation, scheduling, and analytics using a sophisticated multi-agent system.

## 🎭 Multi-Agent Architecture

The platform uses a **cast of specialized agents** orchestrated by the **Dungeon Master**:

| Agent | Role | Capabilities |
|-------|------|--------------|
| **Dungeon Master** | Central Orchestrator | Coordinates all agents, manages complex workflows |
| **Royal Archivist** | Database Operations | CRUD operations, data persistence |
| **Social Scribe** | Content Generation | Creates social media & email content using AI |
| **Audit Alchemist** | Marketing Analysis | Runs audits, recommends subscription tiers |
| **Scheduler Bard** | Content Planning | Creates calendars, optimizes posting times |
| **Insight Oracle** | Analytics & Insights | Generates recommendations from data |
| **Brand Knight** | Medieval Theming | Applies Frame Fables branding |
| **Auto-Wirer** | Integration Management | Handles external API connections |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis (optional, for job queues)
- OpenAI API key

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your values
nano .env

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The server will start on `http://localhost:3001`

## 📋 Environment Setup

Required environment variables in `.env`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/frame_fables"

# OpenAI
OPENAI_API_KEY="sk-your-openai-key"

# Server
PORT=3001
NODE_ENV=development

# Optional
REDIS_HOST=localhost
REDIS_PORT=6379
STRIPE_SECRET_KEY=sk_test_your-stripe-key
```

## 🎯 API Endpoints

### Client Onboarding

**POST** `/api/clients/onboard`

Onboard a new client, run audit, assign tier, and generate initial content.

```json
{
  "email": "hero@business.com",
  "name": "Hero Name",
  "businessName": "Hero's Quest LLC",
  "niche": "E-commerce",
  "size": "small",
  "goals": ["Increase engagement", "Build email list"],
  "socialHandles": [
    { "platform": "INSTAGRAM", "handle": "@heroquest" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "🏰 Client onboarded successfully!",
  "data": {
    "client": {...},
    "subscription": {
      "tier": "SQUIRE",
      "price": "$249.99/mo"
    },
    "audit": {...},
    "welcomeMessage": "...",
    "initialContent": [...],
    "calendar": {...}
  }
}
```

### Generate Content

**POST** `/api/clients/:id/generate-content`

Generate social media and email content.

```json
{
  "count": 10,
  "platforms": ["INSTAGRAM", "FACEBOOK", "EMAIL"],
  "topic": "Summer product launch",
  "callToAction": "Shop now"
}
```

### Run Audit

**POST** `/api/clients/:id/run-audit`

Run a comprehensive marketing audit.

```json
{
  "includeRecommendations": true
}
```

### Schedule Content

**POST** `/api/clients/:id/schedule-content`

Schedule content for publishing.

```json
{
  "contentIds": ["uuid1", "uuid2", "uuid3"]
}
```

### Get Analytics

**GET** `/api/clients/:id/analytics`

Retrieve performance analytics and insights.

## 🔄 Example Workflow: Complete Client Onboarding

Here's what happens when a new client onboards:

```
1. Dungeon Master receives onboard request
   └─ Delegates to Royal Archivist
      └─ Creates client record in database

2. Dungeon Master calls Audit Alchemist
   └─ Analyzes business profile
   └─ Recommends subscription tier (SQUIRE/KNIGHT/KING)
   └─ Generates audit report

3. Dungeon Master calls Royal Archivist
   └─ Creates subscription with recommended tier
   └─ Sets 7-day trial period

4. Dungeon Master calls Brand Knight
   └─ Formats welcome message with medieval theme

5. Dungeon Master calls Social Scribe
   └─ Generates 5 pieces of initial content
   └─ Adapts to brand voice from client profile

6. Dungeon Master calls Scheduler Bard
   └─ Creates 7-day content calendar
   └─ Optimizes posting times by platform

7. Returns complete onboarding package to client
```

## 🗄️ Database Schema

Key models:

- **clients** - Client information
- **subscriptions** - Subscription tiers and billing
- **brand_profiles** - Brand voice and identity
- **content_items** - Generated content
- **content_calendars** - Scheduling plans
- **analytics** - Performance metrics
- **audit_reports** - Marketing audits
- **agent_logs** - Agent execution logs

## 💰 Subscription Tiers

| Tier | Price | Description |
|------|-------|-------------|
| **Squire's Start** | $249.99/mo | Perfect for solo entrepreneurs & small businesses |
| **Knight's Climb** | $499.99/mo | Growing businesses needing more content |
| **King's Command** | $999.99/mo | Enterprise-level marketing automation |

## 🛠️ Development Scripts

```bash
# Development with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Run tests
npm test

# Lint code
npm run lint
```

## 📊 Monitoring & Logs

Logs are stored in:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

Agent execution is logged to `agent_logs` table for:
- Performance monitoring
- Debugging
- Analytics

## 🔐 Security Features

- Environment variable configuration
- Input validation
- Error handling
- Rate limiting (coming soon)
- JWT authentication (coming soon)

## 🚦 Production Deployment

### Environment Variables

Set these in production:

```bash
NODE_ENV=production
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_live_..."
JWT_SECRET="strong-random-secret"
```

### Database

```bash
# Run migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate
```

### Server

```bash
# Build TypeScript
npm run build

# Start server
npm start
```

## 📈 Next Steps & Roadmap

### Phase 1: Core Platform ✅
- [x] Multi-agent orchestration system
- [x] Client onboarding workflow
- [x] Content generation (AI-powered)
- [x] Marketing audit system
- [x] Content scheduling
- [x] Analytics framework

### Phase 2: Integration Layer 🚧
- [ ] Stripe billing integration
- [ ] Real social media API publishing (Meta, TikTok, LinkedIn)
- [ ] Tally form integration for lead capture
- [ ] Notion CRM sync
- [ ] Webhook system for external tools

### Phase 3: Advanced Features 📋
- [ ] Background job processing (BullMQ)
- [ ] Real-time analytics dashboard
- [ ] A/B testing for content
- [ ] AI-powered trend detection
- [ ] Multi-language support
- [ ] White-label options (King tier)

### Phase 4: Scale & Optimize 📋
- [ ] Caching layer (Redis)
- [ ] Rate limiting
- [ ] Queue management
- [ ] Performance monitoring
- [ ] Auto-scaling infrastructure

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- agents/DungeonMaster.test.ts

# Watch mode
npm test -- --watch
```

## 📚 Documentation

- Architecture diagrams in `/docs/architecture`
- Agent interaction flows in `/docs/agents`
- API documentation (OpenAPI/Swagger) - Coming soon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file

## 🏰 About Frame Fables

Frame Fables transforms marketing into an epic quest. We believe great marketing starts with great stories, and we help businesses tell theirs with AI-powered tools wrapped in a medieval adventure theme.

**May your campaigns be legendary!** ⚔️
