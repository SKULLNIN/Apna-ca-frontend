import { NextResponse } from 'next/server';

export async function GET() {
  // Get the launch date from environment variable or set a default
  const launchDate = process.env.LAUNCH_DATE || new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString();
  
  return NextResponse.json({ launchDate });
} 