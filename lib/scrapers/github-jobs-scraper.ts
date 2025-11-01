// GitHub Jobs alternative - uses various GitHub job RSS feeds and repos

import { BaseJobScraper } from './base-scraper';
import { Job, ScrapeResult } from '../types';

export class GitHubJobsScraper extends BaseJobScraper {
  constructor() {
    super('GitHub', 'https://api.github.com/repos', {
      enabled: true,
      rateLimit: 60,
      maxResults: 50
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
      // Scrape from various GitHub job boards
      const jobRepos = [
        'remoteintech/remote-jobs',
        'j-delaney/easy-application',
        'engineerapart/TheRemoteFreelancer',
      ];

      for (const repo of jobRepos) {
        try {
          const [owner, name] = repo.split('/');
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${name}/readme`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3.raw'
              }
            }
          );

          if (response.ok) {
            const content = await response.text();
            const jobs = this.parseMarkdownJobs(content, repo);

            // Filter by keywords
            const filtered = jobs.filter(job => {
              if (keywords.length === 0) return true;
              return keywords.some(keyword =>
                job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                job.description.toLowerCase().includes(keyword.toLowerCase())
              );
            });

            result.jobs.push(...filtered);
          }

          await this.delay(1000); // Rate limiting
        } catch (error) {
          console.error(`Error scraping ${repo}:`, error);
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
    // This method is not used for GitHub scraper
    // We use parseMarkdownJobs instead
    return null;
  }

  private parseMarkdownJobs(markdown: string, source: string): Job[] {
    const jobs: Job[] = [];

    // Match common patterns in job board markdown files
    // Pattern: [Company Name](url) | Job Title | Location
    const patterns = [
      /\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\s*\|\s*([^|\n]+)/g,
      /\*\*([^*]+)\*\*\s*-\s*\[([^\]]+)\]\(([^)]+)\)/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(markdown)) !== null) {
        try {
          const job: Job = {
            id: this.generateJobId(match[3] || match[2], match[1], match[2]),
            title: (match[3] || match[2] || '').trim(),
            company: match[1].trim(),
            location: match[4] || 'Remote',
            description: '',
            requirements: [],
            jobType: 'remote',
            source: `GitHub:${source}`,
            url: match[2],
            postedDate: new Date(),
            scrapedDate: new Date(),
            tags: []
          };

          jobs.push(job);
        } catch (error) {
          continue;
        }
      }
    }

    return jobs;
  }
}
