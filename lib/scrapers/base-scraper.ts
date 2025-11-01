// Base scraper class that all job board scrapers extend

import { Job, ScrapeResult, ScraperConfig } from '../types';

export abstract class BaseJobScraper {
  protected name: string;
  protected baseUrl: string;
  protected config: ScraperConfig;

  constructor(name: string, baseUrl: string, config: ScraperConfig) {
    this.name = name;
    this.baseUrl = baseUrl;
    this.config = config;
  }

  /**
   * Main method to scrape jobs - must be implemented by each scraper
   */
  abstract scrapeJobs(keywords: string[], location?: string): Promise<ScrapeResult>;

  /**
   * Parse a single job posting - must be implemented by each scraper
   */
  protected abstract parseJob(element: any): Job | null;

  /**
   * Generate a unique ID for a job
   */
  protected generateJobId(title: string, company: string, url: string): string {
    const combined = `${title}-${company}-${url}`;
    return Buffer.from(combined).toString('base64').slice(0, 32);
  }

  /**
   * Delay between requests to respect rate limits
   */
  protected async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Extract salary from text
   */
  protected extractSalary(text: string): Job['salary'] | undefined {
    // Match patterns like "$50,000 - $70,000", "$25/hr", "£30k-£40k"
    const patterns = [
      /\$?([\d,]+)k?\s*-\s*\$?([\d,]+)k?/i, // $50k - 70k
      /\$?([\d,]+)\/(?:yr|year|annually)/i, // $50,000/year
      /\$?([\d,]+)\/(?:hr|hour)/i, // $25/hr
      /£([\d,]+)k?\s*-\s*£?([\d,]+)k?/i, // £30k-£40k
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const min = parseInt(match[1].replace(/,/g, ''));
        const max = match[2] ? parseInt(match[2].replace(/,/g, '')) : undefined;

        let period: 'hourly' | 'annually' | 'monthly' = 'annually';
        if (text.includes('/hr') || text.includes('/hour')) {
          period = 'hourly';
        }

        return {
          min,
          max,
          currency: text.includes('£') ? 'GBP' : 'USD',
          period
        };
      }
    }

    return undefined;
  }

  /**
   * Clean and normalize text
   */
  protected cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * Determine job type from text
   */
  protected determineJobType(text: string): Job['jobType'] {
    const lower = text.toLowerCase();
    if (lower.includes('remote') || lower.includes('work from home')) return 'remote';
    if (lower.includes('part-time') || lower.includes('part time')) return 'part-time';
    if (lower.includes('contract') || lower.includes('contractor')) return 'contract';
    if (lower.includes('intern')) return 'internship';
    return 'full-time';
  }

  /**
   * Extract tags/skills from job description
   */
  protected extractTags(description: string): string[] {
    const commonSkills = [
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'go', 'rust',
      'react', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'spring',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
      'sql', 'postgresql', 'mysql', 'mongodb', 'redis',
      'git', 'ci/cd', 'agile', 'scrum', 'jira',
      'machine learning', 'ai', 'data science', 'analytics'
    ];

    const found = new Set<string>();
    const lower = description.toLowerCase();

    for (const skill of commonSkills) {
      if (lower.includes(skill.toLowerCase())) {
        found.add(skill);
      }
    }

    return Array.from(found);
  }
}
