'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/lib/types';
import Link from 'next/link';

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const res = await fetch('/api/jobs/saved');
      const data = await res.json();
      setJobs(data.jobs);
    } catch (err) {
      console.error('Failed to load saved jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm('Remove this job from saved jobs?')) return;

    try {
      const res = await fetch(`/api/jobs/saved?id=${jobId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setJobs(jobs.filter(j => j.id !== jobId));
      } else {
        alert('Failed to delete job');
      }
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Failed to delete job');
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
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              💾 Saved Jobs
            </h1>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading saved jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No saved jobs yet</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search for Jobs
            </Link>
          </div>
        ) : (
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
                      <span>📅 Posted {formatDate(job.postedDate)}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {job.jobType}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-4"
                  >
                    🗑️ Remove
                  </button>
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
        )}
      </main>
    </div>
  );
}
