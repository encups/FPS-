// API route for managing saved jobs

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Job } from '@/lib/types';

const STORAGE_DIR = join(process.cwd(), 'data');
const SAVED_JOBS_FILE = join(STORAGE_DIR, 'saved-jobs.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(STORAGE_DIR);
  } catch {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  }
}

// Get saved jobs
export async function GET(request: NextRequest) {
  try {
    await ensureDataDir();

    try {
      const data = await fs.readFile(SAVED_JOBS_FILE, 'utf-8');
      const jobs = JSON.parse(data);
      return NextResponse.json({ jobs });
    } catch {
      // File doesn't exist yet
      return NextResponse.json({ jobs: [] });
    }
  } catch (error) {
    console.error('Error reading saved jobs:', error);
    return NextResponse.json(
      { error: 'Failed to read saved jobs' },
      { status: 500 }
    );
  }
}

// Save a job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { job } = body;

    if (!job || !job.id) {
      return NextResponse.json(
        { error: 'Invalid job data' },
        { status: 400 }
      );
    }

    await ensureDataDir();

    // Read existing jobs
    let jobs: Job[] = [];
    try {
      const data = await fs.readFile(SAVED_JOBS_FILE, 'utf-8');
      jobs = JSON.parse(data);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Check if job already saved
    if (jobs.some(j => j.id === job.id)) {
      return NextResponse.json(
        { error: 'Job already saved' },
        { status: 400 }
      );
    }

    // Add new job
    jobs.push(job);

    // Save to file
    await fs.writeFile(SAVED_JOBS_FILE, JSON.stringify(jobs, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Job saved successfully',
      totalSaved: jobs.length
    });

  } catch (error) {
    console.error('Error saving job:', error);
    return NextResponse.json(
      { error: 'Failed to save job' },
      { status: 500 }
    );
  }
}

// Delete a saved job
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    await ensureDataDir();

    // Read existing jobs
    let jobs: Job[] = [];
    try {
      const data = await fs.readFile(SAVED_JOBS_FILE, 'utf-8');
      jobs = JSON.parse(data);
    } catch {
      return NextResponse.json(
        { error: 'No saved jobs found' },
        { status: 404 }
      );
    }

    // Filter out the job to delete
    const filteredJobs = jobs.filter(j => j.id !== jobId);

    if (filteredJobs.length === jobs.length) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Save updated list
    await fs.writeFile(SAVED_JOBS_FILE, JSON.stringify(filteredJobs, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
      totalSaved: filteredJobs.length
    });

  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
