import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

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
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all keys
    const allKeys = await redis.keys('*');
    
    // Filter newsletter keys - explicitly exclude collection keys
    const newsletterKeys = allKeys.filter(key => 
      key.startsWith('newsletter:') && 
      !key.includes(':email:') && 
      !key.includes(':name:') && 
      !key.includes(':interest:') &&
      key !== 'newsletter:emails' && 
      key !== 'newsletter:names' && 
      key !== 'newsletter:interests'
    );
    
    // Process entries
    const entries: {
      id: string;
      email: string;
      name: string;
      timestamp: number;
      interests: string[];
    }[] = [];
    
    for (const key of newsletterKeys) {
      try {
        console.log(`Processing newsletter entry ${key}...`);
        
        // First, check if this is the problematic key
        if (key === 'newsletter:1742347874919') {
          console.log('Found problematic key, attempting repair...');
          try {
            // Try to get the key type to see if it exists
            const keyType = await redis.type(key);
            console.log(`Key type: ${keyType}`);
            
            // If it's not a hash or doesn't exist, skip it
            if (keyType !== 'hash') {
              console.log(`Skipping non-hash key: ${key}`);
              continue;
            }
          } catch (keyError) {
            console.error(`Error checking key type for ${key}:`, keyError);
            continue;
          }
        }
        
        // Get hash data with error handling
        let hashData;
        try {
          hashData = await redis.hgetall(key);
          
          // Skip if hash data is undefined or malformed
          if (!hashData || typeof hashData !== 'object') {
            console.warn(`Skipping malformed newsletter entry: ${key}`, hashData);
            continue;
          }
        } catch (hashError) {
          console.error(`Error fetching hash data for ${key}:`, hashError);
          continue; // Skip this problematic entry
        }
        
        // Extract ID from key
        const id = key.split(':')[1];
        
        // Extract interests if they exist
        let interests: string[] = [];
        try {
          const interestKeys = allKeys.filter(k => k.startsWith(`newsletter:interest:`) && k.endsWith(`:${id}`));
          interests = interestKeys.map(k => k.split(':')[2]);
        } catch (interestError) {
          console.warn(`Error processing interests for ${key}:`, interestError);
          // Continue with empty interests array
        }
        
        // Add entry with proper type checking
        entries.push({
          id,
          email: typeof hashData.email === 'string' ? hashData.email : '',
          name: typeof hashData.name === 'string' ? hashData.name : '',
          timestamp: parseInt(String(hashData.timestamp) || '0'),
          interests
        });
      } catch (entryError) {
        console.error(`Error processing newsletter entry ${key}:`, entryError);
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
    console.error('Error fetching newsletter data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 