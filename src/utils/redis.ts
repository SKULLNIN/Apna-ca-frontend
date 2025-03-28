import { Redis } from '@upstash/redis';

// Initialize the Redis client with lazy-loading pattern
// This ensures the Redis client is only initialized once
let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (redisClient) {
    return redisClient;
  }

  // Check multiple possible environment variable names
  const url = process.env.UPSTASH_REDIS_REST_URL || 
              process.env.KV_REST_API_URL || 
              process.env.REDIS_URL;
              
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || 
                process.env.KV_REST_API_TOKEN;
  
  console.log('Trying Redis URLs:', { 
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? 'Set' : 'Not set',
    KV_REST_API_URL: process.env.KV_REST_API_URL ? 'Set' : 'Not set',
    REDIS_URL: process.env.REDIS_URL ? 'Set' : 'Not set'
  });
  console.log('Trying Redis tokens:', {
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? 'Set' : 'Not set',
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set'
  });
  
  if (!url || !token) {
    console.error('Redis configuration missing. No valid Redis URL or token found.');
    
    // Fallback to a dummy Redis client that logs errors
    return new Proxy({} as Redis, {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return (...args: any[]) => {
            console.error(`Redis operation '${prop}' failed: Redis is not configured. Args:`, args);
            return Promise.reject(new Error('Redis is not configured'));
          };
        }
        return undefined;
      }
    });
  }

  try {
    // Initialize the Redis client
    redisClient = new Redis({
      url,
      token,
      retry: {
        retries: 3,
        backoff: (retryCount) => Math.min(Math.exp(retryCount) * 50, 1000)
      }
    });

    console.log('Redis client initialized with URL:', url.substring(0, 20) + '...');
    return redisClient;
  } catch (error) {
    console.error('Failed to initialize Redis client:', error);
    
    // Throw error to prevent app from continuing with broken Redis
    throw new Error('Failed to initialize Redis client');
  }
}

// Helper function to check Redis connection status
export async function checkRedisConnection() {
  try {
    const redis = getRedisClient();
    const startTime = Date.now();
    const pingResult = await redis.ping();
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    // Use the same fallback logic for environment variables as in getRedisClient
    const url = process.env.UPSTASH_REDIS_REST_URL || 
                process.env.KV_REST_API_URL || 
                process.env.REDIS_URL;
                
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || 
                  process.env.KV_REST_API_TOKEN;
    
    return {
      connected: pingResult === 'PONG',
      latency: `${latency}ms`,
      url: url ? url.substring(0, 20) + '...' : 'Not set',
      tokenSet: !!token,
      env: {
        nodeEnv: process.env.NODE_ENV || 'development',
        vercel: !!process.env.VERCEL,
        region: process.env.VERCEL_REGION || 'unknown'
      }
    };
  } catch (error) {
    console.error('Redis connection check failed:', error);
    
    // Use the same fallback logic for environment variables
    const url = process.env.UPSTASH_REDIS_REST_URL || 
                process.env.KV_REST_API_URL || 
                process.env.REDIS_URL;
                
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || 
                  process.env.KV_REST_API_TOKEN;
    
    return {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
      url: url ? url.substring(0, 20) + '...' : 'Not set',
      tokenSet: !!token,
      env: {
        nodeEnv: process.env.NODE_ENV || 'development',
        vercel: !!process.env.VERCEL,
        region: process.env.VERCEL_REGION || 'unknown'
      }
    };
  }
} 