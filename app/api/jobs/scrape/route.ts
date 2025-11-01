// API route for scraping jobs

import { NextRequest, NextResponse } from 'next/server';
import { ScraperManager } from '@/lib/scraper-manager';
import { JobCriteria } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords, location, criteria } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: 'Keywords are required and must be a non-empty array' },
        { status: 400 }
      );
    }

    // Initialize scraper manager
    const scraperManager = new ScraperManager(
      process.env.ADZUNA_APP_ID,
      process.env.ADZUNA_APP_KEY
    );

    let result;

    if (criteria) {
      // Scrape and filter
      result = await scraperManager.scrapeAndFilter(
        keywords,
        criteria as JobCriteria,
        location
      );
    } else {
      // Just scrape
      const scrapeResult = await scraperManager.scrapeAll(keywords, location);
      result = {
        jobs: scrapeResult.jobs,
        totalScraped: scrapeResult.totalFound,
        totalMatched: scrapeResult.totalFound
      };
    }

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error scraping jobs:', error);
    return NextResponse.json(
      {
        error: 'Failed to scrape jobs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Simple GET endpoint for testing
  return NextResponse.json({
    message: 'Job scraper API is running',
    endpoints: {
      POST: '/api/jobs/scrape - Scrape jobs with keywords and criteria',
      GET: '/api/jobs/saved - Get saved jobs',
      POST: '/api/jobs/save - Save a job'
    }
  });
}
