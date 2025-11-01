# 🎯 Job Board Scraper

A comprehensive job aggregation and filtering application that scrapes jobs from multiple online sources and helps you find the perfect opportunities based on your criteria.

## ✨ Features

- **Multi-Source Scraping** - Aggregates jobs from RemoteOK, Adzuna, USAJobs, GitHub, and more
- **Advanced Filtering** - Filter by keywords, salary, location, job type, and skills
- **Smart Matching** - AI-powered relevance scoring to surface the best matches
- **Save Jobs** - Bookmark interesting opportunities for later review
- **Custom Criteria** - Set your preferences once and reuse them for every search
- **Real-time Search** - Get fresh job listings from multiple sources instantly
- **No Database Required** - Simple file-based storage for saved jobs and preferences

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- (Optional) Adzuna API keys for enhanced job search - [Get free API keys](https://developer.adzuna.com/)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# (Optional) Add your Adzuna API keys to .env for more job sources
# ADZUNA_APP_ID=your_app_id
# ADZUNA_APP_KEY=your_app_key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and start searching for jobs!

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Sources**: RemoteOK, Adzuna, USAJobs, GitHub Jobs
- **Storage**: File-based JSON storage
- **Deployment**: Vercel, Netlify, or any Node.js hosting

## 🎨 Pages

- `/` - Main job search interface
- `/saved` - View and manage saved jobs
- `/criteria` - Configure search criteria and preferences

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```env
# Optional - for enhanced job search from Adzuna
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key

# App URL (for production)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Job Sources

The app scrapes from multiple sources:

1. **RemoteOK** - Remote jobs (no API key needed)
2. **Adzuna** - Aggregated jobs from multiple sources (API key required)
3. **USAJobs** - US Government jobs (no API key needed)
4. **GitHub** - Jobs from various GitHub repositories (no API key needed)

You can use the app without any API keys! Adzuna keys are optional and provide additional job sources.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables (if using Adzuna)
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
- Fly.io

**Note**: Make sure the `/data` directory is writable for storing saved jobs and criteria.

## 🎯 How It Works

### 1. Search for Jobs
Enter keywords (e.g., "react developer", "data scientist") and optional location. The app will scrape multiple job boards simultaneously.

### 2. Filter Results
Set up your criteria in the Settings page:
- Required and excluded keywords
- Salary range
- Location preferences
- Job types (full-time, remote, contract, etc.)
- Required skills
- How recent the posting should be

### 3. Save Interesting Jobs
Click the "Save" button on any job to bookmark it for later review.

### 4. Review Saved Jobs
Access all your saved jobs from the "Saved Jobs" page, with options to remove jobs or visit the original posting.

## 🔍 Search Capabilities

### Keyword Matching
- Search by job title, description, or tags
- Support for multiple keywords (comma-separated)
- Exclude specific keywords to filter out unwanted jobs

### Salary Filtering
- Set minimum and maximum annual salary
- Automatic conversion for hourly/monthly salaries
- Filter out jobs without salary information

### Location & Remote
- Search specific locations
- Filter for remote-only positions
- Match jobs in multiple preferred locations

### Skills & Requirements
- Specify required skills
- Match jobs with specific technologies
- Auto-extract common skills from job descriptions

### Freshness
- Filter jobs posted within X days
- Prioritize recent postings in relevance scoring

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

### Add New Job Sources

Create a new scraper by extending `BaseJobScraper`:

```typescript
// lib/scrapers/your-scraper.ts
import { BaseJobScraper } from './base-scraper';
import { Job, ScrapeResult } from '../types';

export class YourJobBoardScraper extends BaseJobScraper {
  async scrapeJobs(keywords: string[], location?: string): Promise<ScrapeResult> {
    // Implement your scraping logic
  }

  protected parseJob(data: any): Job | null {
    // Parse job data
  }
}
```

Then add it to `lib/scraper-manager.ts`:

```typescript
this.scrapers = [
  // existing scrapers...
  new YourJobBoardScraper(),
];
```

### Customize Filtering Logic

Edit `lib/job-filter.ts` to modify how jobs are filtered and scored for relevance.

### Adjust Caching

Modify the cache duration in `lib/scraper-manager.ts`:

```typescript
private cacheDuration: number = 30 * 60 * 1000; // 30 minutes
```

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for all API keys
- Implement rate limiting for production use
- Respect the terms of service of job boards being scraped
- Cached results reduce API calls and prevent rate limiting

## 📈 Future Features

- [ ] Email notifications for new matching jobs
- [ ] Scheduled automatic searches
- [ ] Export saved jobs to CSV/PDF
- [ ] Job application tracking
- [ ] Company research integration
- [ ] Salary comparison analytics
- [ ] User authentication and cloud sync
- [ ] Browser extension for one-click saves
- [ ] API rate limiting and request queuing
- [ ] More job board integrations (Indeed, LinkedIn, etc.)
- [ ] Advanced analytics dashboard
- [ ] Job alert subscriptions

## 🔒 Privacy & Data

- All data is stored locally in the `/data` directory
- No user tracking or analytics
- Job data is cached for 30 minutes to reduce API calls
- Saved jobs and criteria are stored as JSON files
- No external database required

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- Add new job board scrapers
- Improve filtering algorithms
- Enhance the UI/UX
- Add new features
- Report bugs
- Improve documentation

## 📄 License

MIT License - Feel free to use this for personal or commercial projects

## ⚠️ Disclaimer

This tool is for personal use only. Please respect the terms of service of the job boards being scraped. The app implements rate limiting and caching to minimize requests to external APIs.

## 🆘 Support

For issues or questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

## 🎮 Running Without API Keys

The app works great without any API keys:
- RemoteOK API is public (no key needed)
- USAJobs API is public (no key needed)
- GitHub scraping works without authentication
- Only Adzuna requires API keys (optional)

Even without Adzuna, you'll get access to hundreds of remote jobs and government positions!

---

Built with 🎯 for job seekers everywhere

*May your job search be swift and your offers plentiful!*
