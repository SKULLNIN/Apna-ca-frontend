// Script to check the Redis database for waitlist and newsletter data
const { Redis } = require('@upstash/redis');

async function checkRedisData() {
  try {
    // Initialize Redis client
    const redis = new Redis({
      url: 'https://pleased-vulture-34934.upstash.io',
      token: 'AYh2AAIjcDE2YTExYzQxMjVlOGI0NjI3YWY4NWY0ZjBhN2QyMmU5ZnAxMA',
    });
    
    // Check waitlist data
    console.log('\n--- CHECKING WAITLIST DATA ---');
    const waitlistEmails = await redis.smembers('waitlist:emails');
    const waitlistNames = await redis.smembers('waitlist:names');
    
    console.log(`Waitlist emails count: ${waitlistEmails.length}`);
    console.log('Waitlist emails:', waitlistEmails);
    
    console.log(`Waitlist names count: ${waitlistNames.length}`);
    console.log('Waitlist names:', waitlistNames);
    
    // Check newsletter data
    console.log('\n--- CHECKING NEWSLETTER DATA ---');
    const newsletterEmails = await redis.smembers('newsletter:emails');
    const newsletterNames = await redis.smembers('newsletter:names');
    
    console.log(`Newsletter emails count: ${newsletterEmails.length}`);
    console.log('Newsletter emails:', newsletterEmails);
    
    console.log(`Newsletter names count: ${newsletterNames.length}`);
    console.log('Newsletter names:', newsletterNames);
    
    // Check newsletter interests
    const interests = await redis.smembers('newsletter:interests');
    console.log('\nNewsletter interests:', interests);
    
    // Check all keys in Redis
    console.log('\n--- ALL KEYS IN REDIS ---');
    const allKeys = await redis.keys('*');
    console.log('All keys:', allKeys);
    
  } catch (error) {
    console.error('Error checking Redis data:', error);
  }
}

// Run the function
checkRedisData(); 