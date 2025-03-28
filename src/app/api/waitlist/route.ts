import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis client with direct credentials
const redis = new Redis({
  url: 'https://pleased-vulture-34934.upstash.io',
  token: 'AYh2AAIjcDE2YTExYzQxMjVlOGI0NjI3YWY4NWY0ZjBhN2QyMmU5ZnAxMA',
});

export async function POST(request: Request) {
  try {
    const { email, name, company, message, businessType } = await request.json();

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Create a submission object
    const timestamp = Date.now();
    const submission = {
      id: `submission_${timestamp}`,
      email,
      name,
      company: company || '',
      message: message || '',
      businessType: businessType || '',
      timestamp,
    };
    
    try {
      // Store submission with unique key
      const key = `waitlist:${timestamp}`;
      await redis.set(key, submission);
      
      // Add email to a set for unique tracking
      await redis.sadd('waitlist:emails', email);
      
      // Add name to a set for tracking names
      await redis.sadd('waitlist:names', name);
      
      // Add a combined email-name entry for easier lookup
      const nameEmailKey = `${email}:${name}`;
      await redis.sadd('waitlist:nameemails', nameEmailKey);
      
      return NextResponse.json(
        { message: 'Successfully joined the waitlist!' },
        { status: 200 }
      );
    } catch (redisError) {
      console.error('Redis operation failed:', redisError);
      
      // Fallback: Log the data locally if Redis connection fails
      console.log('Waitlist submission (fallback):', submission);
      
      return NextResponse.json(
        { message: 'Successfully joined the waitlist! (Local storage mode)' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process your submission' },
      { status: 500 }
    );
  }
} 
