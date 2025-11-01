// USAJobs scraper - US Government jobs
// Uses public API (no auth required for basic searches)

import { BaseJobScraper } from './base-scraper';
import { Job, ScrapeResult } from '../types';

export class USAJobsScraper extends BaseJobScraper {
  constructor() {
    super('USAJobs', 'https://data.usajobs.gov/api/search', {
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
      const keywordQuery = keywords.join(' OR ');
      const params = new URLSearchParams({
        Keyword: keywordQuery,
        ResultsPerPage: '100',
        Page: '1'
      });

      if (location) {
        params.set('LocationName', location);
      }

      // USAJobs requires a User-Agent and Host header
      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: {
          'User-Agent': '[email protected]',
          'Authorization-Key': 'YOUR_API_KEY' // Optional for higher rate limits
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      result.totalFound = data.SearchResult?.SearchResultCount || 0;

      const jobs = data.SearchResult?.SearchResultItems || [];

      for (const item of jobs) {
        const jobData = item.MatchedObjectDescriptor;
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
        id: this.generateJobId(data.PositionTitle, data.OrganizationName, data.PositionURI),
        title: data.PositionTitle || 'Unknown',
        company: data.OrganizationName || 'US Government',
        location: data.PositionLocationDisplay || 'Various',
        description: this.cleanText(data.UserArea?.Details?.JobSummary || data.QualificationSummary || ''),
        requirements: data.QualificationSummary ? [data.QualificationSummary] : [],
        jobType: this.determineJobType(data.PositionSchedule?.[0]?.Name || ''),
        source: this.name,
        url: data.PositionURI || data.ApplyURI?.[0] || '',
        postedDate: data.PublicationStartDate ? new Date(data.PublicationStartDate) : new Date(),
        scrapedDate: new Date(),
        tags: this.extractTags(data.UserArea?.Details?.JobSummary || '')
      };

      // USAJobs uses pay grades
      if (data.PositionRemuneration) {
        const remuneration = data.PositionRemuneration[0];
        if (remuneration.MinimumRange || remuneration.MaximumRange) {
          job.salary = {
            min: parseFloat(remuneration.MinimumRange),
            max: parseFloat(remuneration.MaximumRange),
            currency: 'USD',
            period: 'annually'
          };
        }
      }

      return job;
    } catch (error) {
      console.error('Error parsing USAJobs job:', error);
      return null;
    }
  }
}
