// Manages all job scrapers and coordinates scraping

import { Job, JobCriteria, ScrapeResult } from './types';
import { RemoteOKScraper } from './scrapers/remoteok-scraper';
import { AdzunaScraper } from './scrapers/adzuna-scraper';
import { USAJobsScraper } from './scrapers/usajobs-scraper';
import { GitHubJobsScraper } from './scrapers/github-jobs-scraper';
import { JobFilter } from './job-filter';

export class ScraperManager {
  private scrapers: any[];
  private cache: Map<string, { jobs: Job[], timestamp: Date }>;
  private cacheDuration: number = 30 * 60 * 1000; // 30 minutes

  constructor(
    adzunaAppId?: string,
    adzunaAppKey?: string
  ) {
    this.scrapers = [
      new RemoteOKScraper(),
      new AdzunaScraper(adzunaAppId, adzunaAppKey),
      new USAJobsScraper(),
      new GitHubJobsScraper(),
    ];
    this.cache = new Map();
  }

  /**
   * Scrape jobs from all enabled sources
   */
  async scrapeAll(keywords: string[], location?: string): Promise<{
    jobs: Job[];
    results: ScrapeResult[];
    totalFound: number;
  }> {
    const cacheKey = `${keywords.join(',')}-${location || 'all'}`;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp.getTime()) < this.cacheDuration) {
      return {
        jobs: cached.jobs,
        results: [],
        totalFound: cached.jobs.length
      };
    }

    const results: ScrapeResult[] = [];
    const allJobs: Job[] = [];

    // Run all scrapers in parallel
    const promises = this.scrapers
      .filter(scraper => scraper.config.enabled)
      .map(scraper => scraper.scrapeJobs(keywords, location));

    const scrapeResults = await Promise.allSettled(promises);

    scrapeResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
        allJobs.push(...result.value.jobs);
      } else {
        console.error(`Scraper ${index} failed:`, result.reason);
      }
    });

    // Remove duplicates
    const uniqueJobs = JobFilter.removeDuplicates(allJobs);

    // Update cache
    this.cache.set(cacheKey, {
      jobs: uniqueJobs,
      timestamp: new Date()
    });

    return {
      jobs: uniqueJobs,
      results,
      totalFound: uniqueJobs.length
    };
  }

  /**
   * Scrape and filter jobs in one operation
   */
  async scrapeAndFilter(
    keywords: string[],
    criteria: JobCriteria,
    location?: string
  ): Promise<{
    jobs: Job[];
    totalScraped: number;
    totalMatched: number;
  }> {
    const { jobs, totalFound } = await this.scrapeAll(keywords, location);

    // Apply filtering
    const filtered = JobFilter.filterJobs(jobs, criteria);

    // Sort by relevance
    const sorted = JobFilter.sortByRelevance(filtered, criteria);

    return {
      jobs: sorted,
      totalScraped: totalFound,
      totalMatched: sorted.length
    };
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    entries: number;
    oldestEntry?: Date;
  } {
    const entries = this.cache.size;
    let oldestEntry: Date | undefined;

    this.cache.forEach(value => {
      if (!oldestEntry || value.timestamp < oldestEntry) {
        oldestEntry = value.timestamp;
      }
    });

    return { entries, oldestEntry };
  }
}
