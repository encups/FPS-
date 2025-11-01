// API route for managing user criteria/preferences

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { JobCriteria } from '@/lib/types';

const STORAGE_DIR = join(process.cwd(), 'data');
const CRITERIA_FILE = join(STORAGE_DIR, 'criteria.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(STORAGE_DIR);
  } catch {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  }
}

// Get user criteria
export async function GET(request: NextRequest) {
  try {
    await ensureDataDir();

    try {
      const data = await fs.readFile(CRITERIA_FILE, 'utf-8');
      const criteria = JSON.parse(data);
      return NextResponse.json({ criteria });
    } catch {
      // File doesn't exist yet, return default criteria
      const defaultCriteria: JobCriteria = {
        keywords: [],
        remoteOnly: false,
        postedWithinDays: 30
      };
      return NextResponse.json({ criteria: defaultCriteria });
    }
  } catch (error) {
    console.error('Error reading criteria:', error);
    return NextResponse.json(
      { error: 'Failed to read criteria' },
      { status: 500 }
    );
  }
}

// Save user criteria
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { criteria } = body;

    if (!criteria) {
      return NextResponse.json(
        { error: 'Criteria data is required' },
        { status: 400 }
      );
    }

    await ensureDataDir();

    // Save to file
    await fs.writeFile(CRITERIA_FILE, JSON.stringify(criteria, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Criteria saved successfully'
    });

  } catch (error) {
    console.error('Error saving criteria:', error);
    return NextResponse.json(
      { error: 'Failed to save criteria' },
      { status: 500 }
    );
  }
}
