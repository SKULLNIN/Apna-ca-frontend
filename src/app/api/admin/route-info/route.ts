import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { getRedisClient, checkRedisConnection } from '@/utils/redis';

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
    // Initialize Redis client
    const redis = getRedisClient();
    
    // Check Redis connection first
    const redisStatus = await checkRedisConnection();
    
    if (!redisStatus.connected) {
      return NextResponse.json({ 
        error: 'Redis connection failed',
        redisStatus,
        env: {
          nodeEnv: process.env.NODE_ENV || 'development',
          vercel: !!process.env.VERCEL,
          region: process.env.VERCEL_REGION || 'unknown'
        }
      }, { status: 500 });
    }
    
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
    
    // Filter waitlist keys
    const waitlistKeys = allKeys.filter(key => 
      key.startsWith('waitlist:') && 
      !key.includes(':email:') && 
      !key.includes(':name:') &&
      key !== 'waitlist:emails' && 
      key !== 'waitlist:names' && 
      key !== 'waitlist:nameemails'
    );
    
    // Get unique emails
    const emails = new Set<string>();
    const names = new Set<string>();
    
    // Process newsletter entries for emails
    for (const key of newsletterKeys) {
      try {
        // Skip the known problematic key
        if (key === 'newsletter:1742347874919') {
          console.log(`Skipping known problematic newsletter key: ${key}`);
          continue;
        }
        
        // Check key type before processing
        const keyType = await redis.type(key);
        
        if (keyType === 'hash') {
          try {
            const data = await redis.hgetall(key);
            if (data && typeof data === 'object' && data.email) {
              emails.add(data.email as string);
            }
            if (data && typeof data === 'object' && data.name) {
              names.add(data.name as string);
            }
          } catch (hashError) {
            console.error(`Error processing hash data for newsletter key ${key}:`, hashError);
          }
        }
      } catch (error) {
        console.warn(`Error processing newsletter key ${key}:`, error);
      }
    }
    
    // Process waitlist entries for emails
    for (const key of waitlistKeys) {
      try {
        // Check key type before processing
        const keyType = await redis.type(key);
        
        if (keyType === 'hash') {
          const data = await redis.hgetall(key);
          if (data && typeof data === 'object' && data.email) {
            emails.add(data.email as string);
          }
          if (data && typeof data === 'object' && data.name) {
            names.add(data.name as string);
          }
        }
      } catch (error) {
        console.warn(`Error processing waitlist key ${key}:`, error);
      }
    }
    
    // Get separate string keys for emails and names
    try {
      const emailKeys = allKeys.filter(key => key.includes(':email:'));
      const nameKeys = allKeys.filter(key => key.includes(':name:'));
      
      for (const key of emailKeys) {
        try {
          const email = await redis.get(key);
          if (email && typeof email === 'string') {
            emails.add(email);
          }
        } catch (error) {
          console.warn(`Error getting email from ${key}:`, error);
        }
      }
      
      for (const key of nameKeys) {
        try {
          const name = await redis.get(key);
          if (name && typeof name === 'string') {
            names.add(name);
          }
        } catch (error) {
          console.warn(`Error getting name from ${key}:`, error);
        }
      }
    } catch (error) {
      console.warn('Error processing string keys:', error);
    }

    // Get interest information
    const interests: Record<string, number> = {};
    try {
      // Look for interest-specific keys
      const interestKeys = allKeys.filter(key => key.includes(':interest:'));
      
      for (const key of interestKeys) {
        try {
          // Extract interest name from key
          const parts = key.split(':interest:');
          if (parts.length >= 2) {
            const interestName = parts[1].split(':')[0];
            if (interestName) {
              interests[interestName] = (interests[interestName] || 0) + 1;
            }
          }
        } catch (error) {
          console.warn(`Error processing interest key ${key}:`, error);
        }
      }
      
      // Also check hash entries for interests
      for (const key of newsletterKeys) {
        try {
          const keyType = await redis.type(key);
          if (keyType === 'hash') {
            const data = await redis.hgetall(key);
            if (data && typeof data === 'object' && data.interest) {
              const interestName = data.interest as string;
              interests[interestName] = (interests[interestName] || 0) + 1;
            }
          }
        } catch (error) {
          console.warn(`Error extracting interest from hash ${key}:`, error);
        }
      }
    } catch (error) {
      console.warn('Error processing interests:', error);
    }
    
    return NextResponse.json({ 
      redisKeys: allKeys,
      newsletterKeys,
      waitlistKeys,
      emails: Array.from(emails),
      names: Array.from(names),
      interests,
      count: {
        total: allKeys.length,
        newsletter: newsletterKeys.length,
        waitlist: waitlistKeys.length,
        emails: emails.size,
        names: names.size,
        interests: Object.keys(interests).length
      },
      redisStatus,
      env: {
        nodeEnv: process.env.NODE_ENV || 'development',
        vercel: !!process.env.VERCEL,
        region: process.env.VERCEL_REGION || 'unknown'
      }
    });
  } catch (error) {
    console.error('Error fetching route info:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        redisStatus: await checkRedisConnection(),
        env: {
          nodeEnv: process.env.NODE_ENV || 'development',
          vercel: !!process.env.VERCEL,
          region: process.env.VERCEL_REGION || 'unknown'
        }
      },
      { status: 500 }
    );
  }
} 