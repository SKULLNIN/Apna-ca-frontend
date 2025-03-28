import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Simple check to see if user is authenticated
function isAuthorized() {
  const cookieStore = cookies();
  return cookieStore.has('adminSession');
}

export async function GET(request: NextRequest) {
  // Check authorization
  if (!isAuthorized()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get all keys
    const allKeys = await redis.keys('*');
    
    // Filter waitlist keys - explicitly exclude special collection keys
    const waitlistKeys = allKeys.filter(key => 
      key.startsWith('waitlist:') && 
      !key.includes(':email:') && 
      !key.includes(':name:') &&
      key !== 'waitlist:emails' && 
      key !== 'waitlist:names' &&
      key !== 'waitlist:nameemails'
    );
    
    // Process entries
    const entries: {
      id: string;
      email: string;
      name: string;
      timestamp: number;
    }[] = [];
    
    for (const key of waitlistKeys) {
      try {
        // Get hash data with error handling
        const hashData = await redis.hgetall(key);
        
        // Skip if hash data is undefined or malformed
        if (!hashData || typeof hashData !== 'object') {
          console.warn(`Skipping malformed waitlist entry: ${key}`);
          continue;
        }
        
        // Extract ID from key
        const id = key.split(':')[1];
        
        // Add entry with proper type checking
        entries.push({
          id,
          email: hashData.email as string || '',
          name: hashData.name as string || '',
          timestamp: parseInt(String(hashData.timestamp) || '0')
        });
      } catch (entryError) {
        console.error(`Error processing waitlist entry ${key}:`, entryError);
        // Skip problematic entries but continue processing others
        continue;
      }
    }
    
    // Sort by timestamp descending (newest first)
    entries.sort((a, b) => b.timestamp - a.timestamp);
    
    return NextResponse.json({ 
      entries,
      count: entries.length
    });
  } catch (error) {
    console.error('Error fetching waitlist data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist data' },
      { status: 500 }
    );
  }
} 