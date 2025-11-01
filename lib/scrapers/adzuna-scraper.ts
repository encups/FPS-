// Adzuna scraper - aggregates jobs from multiple sources
// Note: Requires API key (free tier available)

import { BaseJobScraper } from './base-scraper';
import { Job, ScrapeResult } from '../types';

export class AdzunaScraper extends BaseJobScraper {
  private appId: string;
  private appKey: string;

  constructor(appId: string = '', appKey: string = '') {
    super('Adzuna', 'https://api.adzuna.com/v1/api/jobs', {
      enabled: appId && appKey ? true : false,
      rateLimit: 60,
      maxResults: 50
    });
    this.appId = appId;
    this.appKey = appKey;
  }

  async scrapeJobs(keywords: string[], location?: string): Promise<ScrapeResult> {
    const result: ScrapeResult = {
      jobs: [],
      source: this.name,
      timestamp: new Date(),
      success: false,
      totalFound: 0
    };

    if (!this.appId || !this.appKey) {
      result.error = 'Adzuna API credentials not configured';
      return result;
    }

    try {
      const what = keywords.join(' ');
      const where = location || 'remote';
      const country = 'us'; // Can be made configurable

      const url = `${this.baseUrl}/${country}/search/1?app_id=${this.appId}&app_key=${this.appKey}&what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}&results_per_page=50`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      result.totalFound = data.count || 0;

      for (const jobData of data.results || []) {
        const job = this.parseJob(jobData);
        if (job) {
          result.jobs.push(job);
        }

        if (this.config.maxResults && result.jobs.length >= this.config.maxResults) {
          break;
        }
      }

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
        id: this.generateJobId(data.title, data.company.display_name, data.redirect_url),
        title: data.title || 'Unknown',
        company: data.company?.display_name || 'Unknown',
        location: data.location?.display_name || 'Unknown',
        description: data.description || '',
        requirements: [],
        jobType: this.determineJobType(data.description || ''),
        source: this.name,
        url: data.redirect_url || '',
        postedDate: data.created ? new Date(data.created) : new Date(),
        scrapedDate: new Date(),
        tags: this.extractTags(data.description || '')
      };

      // Extract salary
      if (data.salary_min || data.salary_max) {
        job.salary = {
          min: data.salary_min,
          max: data.salary_max,
          currency: 'USD',
          period: 'annually'
        };
      }

      // Extract contract type
      if (data.contract_time) {
        if (data.contract_time.toLowerCase().includes('part')) {
          job.jobType = 'part-time';
        }
      }

      return job;
    } catch (error) {
      console.error('Error parsing Adzuna job:', error);
      return null;
    }
  }
}
