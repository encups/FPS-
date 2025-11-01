// Core types for the job scraper app

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'annually' | 'monthly';
  };
  description: string;
  requirements: string[];
  benefits?: string[];
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  source: string; // Which job board it came from
  url: string;
  postedDate: Date;
  scrapedDate: Date;
  tags: string[];
}

export interface JobCriteria {
  keywords: string[]; // Required keywords in title or description
  excludeKeywords?: string[]; // Keywords to exclude
  locations?: string[]; // Preferred locations
  remoteOnly?: boolean;
  minSalary?: number;
  maxSalary?: number;
  jobTypes?: ('full-time' | 'part-time' | 'contract' | 'internship' | 'remote')[];
  companies?: string[]; // Specific companies to include
  excludeCompanies?: string[]; // Companies to exclude
  experienceLevel?: ('entry' | 'mid' | 'senior' | 'lead')[];
  requiredSkills?: string[];
  postedWithinDays?: number; // Only jobs posted within X days
}

export interface ScraperConfig {
  enabled: boolean;
  rateLimit?: number; // Requests per minute
  maxResults?: number; // Max jobs per scrape
}

export interface JobSource {
  name: string;
  enabled: boolean;
  config: ScraperConfig;
}

export interface ScrapeResult {
  jobs: Job[];
  source: string;
  timestamp: Date;
  success: boolean;
  error?: string;
  totalFound: number;
}
