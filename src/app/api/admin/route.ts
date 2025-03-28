import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Initialize the Redis client
const redis = new Redis({
  url: 'https://pleased-vulture-34934.upstash.io',
  token: 'AYh2AAIjcDE2YTExYzQxMjVlOGI0NjI3YWY4NWY0ZjBhN2QyMmU5ZnAxMA',
});

// Simple check to see if user is authenticated
function isAuthorized() {
  const cookieStore = cookies();
  return cookieStore.has('adminSession');
}

export async function GET() {
  // Check authorization
  if (!isAuthorized()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all keys
    const allKeys = await redis.keys('*');

    // Get waitlist data
    const waitlistKeys = allKeys.filter(key => 
      key.startsWith('waitlist:') && 
      !key.startsWith('waitlist:email:') && 
      !key.startsWith('waitlist:name:')
    );
    
    // Get waitlist emails and names
    const waitlistEmailKeys = allKeys.filter(key => key.startsWith('waitlist:email:'));
    const waitlistNameKeys = allKeys.filter(key => key.startsWith('waitlist:name:'));
    
    // Extract email and name values without the prefix
    const waitlistEmails = waitlistEmailKeys.map(key => key.replace('waitlist:email:', ''));
    const waitlistNames = waitlistNameKeys.map(key => key.replace('waitlist:name:', ''));
    
    // Get newsletter data
    const newsletterKeys = allKeys.filter(key => 
      key.startsWith('newsletter:') && 
      !key.startsWith('newsletter:email:') && 
      !key.startsWith('newsletter:name:') &&
      !key.startsWith('newsletter:interest:')
    );
    
    // Get newsletter emails and names
    const newsletterEmailKeys = allKeys.filter(key => key.startsWith('newsletter:email:'));
    const newsletterNameKeys = allKeys.filter(key => key.startsWith('newsletter:name:'));
    
    // Extract email and name values without the prefix
    const newsletterEmails = newsletterEmailKeys.map(key => key.replace('newsletter:email:', ''));
    const newsletterNames = newsletterNameKeys.map(key => key.replace('newsletter:name:', ''));

    // Build the response
    return NextResponse.json({
      allKeys,
      waitlist: {
        keys: waitlistKeys,
        emails: waitlistEmails,
        names: waitlistNames,
        emailCount: waitlistEmails.length,
        nameCount: waitlistNames.length,
        entryCount: waitlistKeys.length
      },
      newsletter: {
        keys: newsletterKeys,
        emails: newsletterEmails,
        names: newsletterNames,
        emailCount: newsletterEmails.length,
        nameCount: newsletterNames.length,
        entryCount: newsletterKeys.length
      }
    });
  } catch (error) {
    console.error('Error fetching Redis data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Redis' },
      { status: 500 }
    );
  }
} 