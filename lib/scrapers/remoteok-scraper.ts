// RemoteOK scraper - uses their public API

import { BaseJobScraper } from './base-scraper';
import { Job, ScrapeResult } from '../types';

export class RemoteOKScraper extends BaseJobScraper {
  constructor() {
    super('RemoteOK', 'https://remoteok.com/api', {
      enabled: true,
      rateLimit: 30,
      maxResults: 100
    });
  }

  async scrapeJobs(keywords: string[], location?: string): Promise<ScrapeResult> {
    const result: ScrapeResult = {
      jobs: [],
      source: this.name,
      timestamp: new Date(),
      success: false,
      totalFound: 0
    };

    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // RemoteOK API returns an array where first item is metadata
      const jobs = data.slice(1);

      for (const jobData of jobs) {
        // Filter by keywords if provided
        if (keywords.length > 0) {
          const matchesKeyword = keywords.some(keyword =>
            jobData.position?.toLowerCase().includes(keyword.toLowerCase()) ||
            jobData.description?.toLowerCase().includes(keyword.toLowerCase())
          );
          if (!matchesKeyword) continue;
        }

        const job = this.parseJob(jobData);
        if (job) {
          result.jobs.push(job);
        }

        // Respect max results
        if (this.config.maxResults && result.jobs.length >= this.config.maxResults) {
          break;
        }
      }

      result.totalFound = result.jobs.length;
      result.success = true;

    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Unknown error';
      result.success = false;
    }

    return result;
  }

  protected parseJob(data: any): Job | null {
    try {
      const job: Job = {
        id: this.generateJobId(data.position, data.company, data.url),
        title: data.position || 'Unknown',
        company: data.company || 'Unknown',
        location: data.location || 'Remote',
        description: data.description || '',
        requirements: [],
        jobType: 'remote',
        source: this.name,
        url: data.url || data.apply_url || '',
        postedDate: data.date ? new Date(data.date * 1000) : new Date(),
        scrapedDate: new Date(),
        tags: data.tags || []
      };

      // Extract salary if available
      if (data.salary_min || data.salary_max) {
        job.salary = {
          min: data.salary_min,
          max: data.salary_max,
          currency: 'USD',
          period: 'annually'
        };
      }

      return job;
    } catch (error) {
      console.error('Error parsing RemoteOK job:', error);
      return null;
    }
  }
}
