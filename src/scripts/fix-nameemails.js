// Script to fix the waitlist:nameemails Redis key
require('dotenv').config({ path: '.env.local' });
const { Redis } = require('@upstash/redis');

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

async function fixNameEmailsKey() {
  console.log('🔧 Starting fix for waitlist:nameemails key...');
  
  try {
    // Check if the key exists
    const exists = await redis.exists('waitlist:nameemails');
    console.log(`Key waitlist:nameemails exists: ${exists}`);
    
    // Delete the problematic key
    await redis.del('waitlist:nameemails');
    console.log('Deleted waitlist:nameemails key');
    
    // Create a new empty set
    await redis.sadd('waitlist:nameemails', 'placeholder');
    await redis.srem('waitlist:nameemails', 'placeholder');
    console.log('Created new empty set for waitlist:nameemails');
    
    // Test the key to make sure it works
    const members = await redis.smembers('waitlist:nameemails');
    console.log('Testing smembers on the key:', members);
    
    // Try to add some data to it
    const waitlistKeys = await redis.keys('waitlist:*');
    const entryKeys = waitlistKeys.filter(key => !key.includes(':') || key.split(':').length === 2);
    
    console.log(`Found ${entryKeys.length} waitlist entries to process`);
    
    for (const key of entryKeys) {
      try {
        // Get the hash data
        const data = await redis.hgetall(key);
        
        if (data && data.email && data.name) {
          // Add the name:email pair to the set
          const nameEmailPair = `${data.name}:${data.email}`;
          await redis.sadd('waitlist:nameemails', nameEmailPair);
          console.log(`Added pair to set: ${nameEmailPair}`);
        }
      } catch (error) {
        console.log(`Error processing entry ${key}: ${error.message}`);
      }
    }
    
    // Verify the set
    const finalMembers = await redis.smembers('waitlist:nameemails');
    console.log(`✅ Final set contains ${finalMembers.length} members`);
    
    console.log('🎉 waitlist:nameemails key fix completed successfully');
  } catch (error) {
    console.error('❌ Error fixing waitlist:nameemails key:', error.message);
  }
}

// Run the fix
fixNameEmailsKey(); 