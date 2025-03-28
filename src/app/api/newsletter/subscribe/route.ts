import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    // Get data from request body
    const { email, name = 'Newsletter Subscriber' } = await request.json();
    
    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Create a timestamp ID
    const timestamp = Date.now();
    
    // Store data in Redis as a hash
    try {
      // Create a hash with all the subscriber data
      await redis.hset(`newsletter:${timestamp}`, {
        email,
        name,
        timestamp,
        source: 'footer'
      });
      
      // Add to sets for easier querying later
      await redis.sadd('newsletter:emails', email);
      await redis.sadd('newsletter:names', name);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
        timestamp
      });
    } catch (redisError) {
      console.error('Redis error:', redisError);
      return NextResponse.json(
        { success: false, message: 'Database error occurred' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request format' },
      { status: 400 }
    );
  }
} 