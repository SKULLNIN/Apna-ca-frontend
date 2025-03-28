import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, interests } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if this email already exists
    const allKeys = await redis.keys('newsletter:*');
    const existingEmailKeys = allKeys.filter(key => 
      key.includes(':email:') && key.split(':email:')[1] === email
    );

    if (existingEmailKeys.length > 0) {
      return NextResponse.json({ error: 'This email is already subscribed' }, { status: 400 });
    }

    // Create a timestamp-based entry ID
    const timestamp = Date.now();
    const id = timestamp.toString();

    // Store the main newsletter entry
    const entryKey = `newsletter:${id}`;
    await redis.hset(entryKey, {
      name,
      email,
      timestamp,
      interest: interests && interests.length > 0 ? interests[0] : '' // Store primary interest in main record
    });

    // Store interests separately if provided
    if (interests && Array.isArray(interests) && interests.length > 0) {
      for (const interest of interests) {
        // Create an interest-specific key
        const interestKey = `newsletter:interest:${interest}:${id}`;
        await redis.set(interestKey, email);
      }
    }

    // Add to email collection for easier lookups
    await redis.sadd('newsletter:emails', email);

    // Log successful subscription
    console.log(`New newsletter subscription: ${email} with interests: ${interests?.join(', ') || 'none'}`);

    return NextResponse.json({ 
      success: true,
      message: 'Subscription successful',
      timestamp,
      interests: interests || []
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process your subscription' },
      { status: 500 }
    );
  }
} 