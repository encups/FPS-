// Job filtering utilities

import { Job, JobCriteria } from './types';

export class JobFilter {
  /**
   * Filter jobs based on criteria
   */
  static filterJobs(jobs: Job[], criteria: JobCriteria): Job[] {
    return jobs.filter(job => this.matchesCriteria(job, criteria));
  }

  /**
   * Check if a job matches the given criteria
   */
  static matchesCriteria(job: Job, criteria: JobCriteria): boolean {
    // Check required keywords
    if (criteria.keywords && criteria.keywords.length > 0) {
      const hasKeyword = criteria.keywords.some(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          job.title.toLowerCase().includes(lowerKeyword) ||
          job.description.toLowerCase().includes(lowerKeyword) ||
          job.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
        );
      });
      if (!hasKeyword) return false;
    }

    // Check exclude keywords
    if (criteria.excludeKeywords && criteria.excludeKeywords.length > 0) {
      const hasExcludedKeyword = criteria.excludeKeywords.some(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          job.title.toLowerCase().includes(lowerKeyword) ||
          job.description.toLowerCase().includes(lowerKeyword)
        );
      });
      if (hasExcludedKeyword) return false;
    }

    // Check location
    if (criteria.locations && criteria.locations.length > 0) {
      const matchesLocation = criteria.locations.some(location =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
      if (!matchesLocation && job.jobType !== 'remote') return false;
    }

    // Check remote only
    if (criteria.remoteOnly && job.jobType !== 'remote') {
      return false;
    }

    // Check salary
    if (criteria.minSalary && job.salary) {
      const annualSalary = this.convertToAnnual(job.salary.min || 0, job.salary.period);
      if (annualSalary < criteria.minSalary) return false;
    }

    if (criteria.maxSalary && job.salary) {
      const annualSalary = this.convertToAnnual(job.salary.max || job.salary.min || 0, job.salary.period);
      if (annualSalary > criteria.maxSalary) return false;
    }

    // Check job types
    if (criteria.jobTypes && criteria.jobTypes.length > 0) {
      if (!criteria.jobTypes.includes(job.jobType)) return false;
    }

    // Check companies
    if (criteria.companies && criteria.companies.length > 0) {
      const matchesCompany = criteria.companies.some(company =>
        job.company.toLowerCase().includes(company.toLowerCase())
      );
      if (!matchesCompany) return false;
    }

    // Check excluded companies
    if (criteria.excludeCompanies && criteria.excludeCompanies.length > 0) {
      const isExcluded = criteria.excludeCompanies.some(company =>
        job.company.toLowerCase().includes(company.toLowerCase())
      );
      if (isExcluded) return false;
    }

    // Check required skills
    if (criteria.requiredSkills && criteria.requiredSkills.length > 0) {
      const hasAllSkills = criteria.requiredSkills.every(skill => {
        const lowerSkill = skill.toLowerCase();
        return (
          job.tags.some(tag => tag.toLowerCase().includes(lowerSkill)) ||
          job.description.toLowerCase().includes(lowerSkill) ||
          job.requirements.some(req => req.toLowerCase().includes(lowerSkill))
        );
      });
      if (!hasAllSkills) return false;
    }

    // Check posted date
    if (criteria.postedWithinDays) {
      const daysAgo = this.getDaysAgo(job.postedDate);
      if (daysAgo > criteria.postedWithinDays) return false;
    }

    return true;
  }

  /**
   * Convert salary to annual amount
   */
  private static convertToAnnual(amount: number, period: 'hourly' | 'annually' | 'monthly'): number {
    switch (period) {
      case 'hourly':
        return amount * 40 * 52; // 40 hours/week, 52 weeks/year
      case 'monthly':
        return amount * 12;
      case 'annually':
      default:
        return amount;
    }
  }

  /**
   * Get days since a date
   */
  private static getDaysAgo(date: Date): number {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Sort jobs by relevance score
   */
  static sortByRelevance(jobs: Job[], criteria: JobCriteria): Job[] {
    return jobs.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, criteria);
      const scoreB = this.calculateRelevanceScore(b, criteria);
      return scoreB - scoreA;
    });
  }

  /**
   * Calculate relevance score for a job
   */
  private static calculateRelevanceScore(job: Job, criteria: JobCriteria): number {
    let score = 0;

    // Keyword matches in title are worth more
    if (criteria.keywords) {
      criteria.keywords.forEach(keyword => {
        if (job.title.toLowerCase().includes(keyword.toLowerCase())) {
          score += 10;
        }
        if (job.description.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
        }
      });
    }

    // Recent posts get higher scores
    const daysAgo = this.getDaysAgo(job.postedDate);
    if (daysAgo < 7) score += 5;
    else if (daysAgo < 30) score += 3;
    else if (daysAgo < 90) score += 1;

    // Salary information adds value
    if (job.salary) score += 2;

    // Required skills matches
    if (criteria.requiredSkills) {
      const matchingSkills = criteria.requiredSkills.filter(skill =>
        job.tags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
      );
      score += matchingSkills.length * 5;
    }

    return score;
  }

  /**
   * Remove duplicate jobs
   */
  static removeDuplicates(jobs: Job[]): Job[] {
    const seen = new Set<string>();
    return jobs.filter(job => {
      const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}
