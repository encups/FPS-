'use client';

import { useState, useEffect } from 'react';
import { Job, JobCriteria } from '@/lib/types';
import Link from 'next/link';

export default function JobScraperHome() {
  const [keywords, setKeywords] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalScraped: 0, totalMatched: 0 });
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [criteria, setCriteria] = useState<JobCriteria>({
    keywords: [],
    remoteOnly: false,
    postedWithinDays: 30
  });

  // Load saved jobs on mount
  useEffect(() => {
    loadSavedJobs();
    loadCriteria();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const res = await fetch('/api/jobs/saved');
      const data = await res.json();
      setSavedJobs(data.jobs.map((j: Job) => j.id));
    } catch (err) {
      console.error('Failed to load saved jobs:', err);
    }
  };

  const loadCriteria = async () => {
    try {
      const res = await fetch('/api/criteria');
      const data = await res.json();
      if (data.criteria) {
        setCriteria(data.criteria);
      }
    } catch (err) {
      console.error('Failed to load criteria:', err);
    }
  };

  const handleSearch = async () => {
    if (!keywords.trim()) {
      setError('Please enter at least one keyword');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);

      const response = await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: keywordArray,
          location: location || undefined,
          criteria
        })
      });

      if (!response.ok) {
        throw new Error('Failed to scrape jobs');
      }

      const data = await response.json();
      setJobs(data.jobs);
      setStats({
        totalScraped: data.totalScraped,
        totalMatched: data.totalMatched
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (job: Job) => {
    try {
      const response = await fetch('/api/jobs/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job })
      });

      if (response.ok) {
        setSavedJobs([...savedJobs, job.id]);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save job');
      }
    } catch (err) {
      console.error('Failed to save job:', err);
      alert('Failed to save job');
    }
  };

  const formatSalary = (salary?: Job['salary']) => {
    if (!salary) return 'Not specified';
    const { min, max, currency, period } = salary;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0
    });

    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)} ${period}`;
    } else if (min) {
      return `${formatter.format(min)} ${period}`;
    }
    return 'Not specified';
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              🎯 Job Board Scraper
            </h1>
            <div className="flex gap-4">
              <Link
                href="/criteria"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                ⚙️ Settings
              </Link>
              <Link
                href="/saved"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                💾 Saved Jobs ({savedJobs.length})
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Search for Jobs</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., react, python, data science"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, Remote"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? '🔍 Searching...' : '🚀 Search Jobs'}
          </button>

          {stats.totalScraped > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Found <strong>{stats.totalScraped}</strong> jobs, filtered to{' '}
                <strong>{stats.totalMatched}</strong> matches
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>📍 {job.location}</span>
                    <span>💰 {formatSalary(job.salary)}</span>
                    <span>📅 {formatDate(job.postedDate)}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {job.jobType}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {savedJobs.includes(job.id) ? (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                      ✓ Saved
                    </span>
                  ) : (
                    <button
                      onClick={() => saveJob(job)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      💾 Save
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.slice(0, 8).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-500">Source: {job.source}</span>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Job →
                </a>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Enter keywords and click "Search Jobs" to find opportunities
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
