// Script to fix problematic newsletter interest keys
require('dotenv').config({ path: '.env.local' });
const { Redis } = require('@upstash/redis');

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

async function fixInterestKeys() {
  console.log('🔧 Starting fix for newsletter interest keys...');
  
  try {
    // Get all keys
    const allKeys = await redis.keys('*');
    
    // Filter for interest keys
    const interestKeys = allKeys.filter(key => 
      key.startsWith('newsletter:interest:') ||
      key === 'newsletter:interests'
    );
    
    console.log(`Found ${interestKeys.length} interest-related keys to process`);
    
    // Fix each interest key
    for (const key of interestKeys) {
      try {
        console.log(`Processing key: ${key}`);
        
        // Check the current type of the key
        let keyType = 'unknown';
        
        // Try to read as a string
        try {
          const stringValue = await redis.get(key);
          if (stringValue !== null) {
            keyType = 'string';
            console.log(`  Key is a string with value: ${stringValue}`);
          }
        } catch (error) {
          // Not a string, continue checking
        }
        
        // Try to read as a hash
        if (keyType === 'unknown') {
          try {
            const hashValue = await redis.client.hgetall(key);
            if (hashValue !== null) {
              keyType = 'hash';
              console.log(`  Key is a hash`);
            }
          } catch (error) {
            // Not a hash, continue checking
          }
        }
        
        // Try to read as a set
        if (keyType === 'unknown') {
          try {
            const setSize = await redis.client.scard(key);
            if (setSize !== null) {
              keyType = 'set';
              console.log(`  Key is a set with ${setSize} members`);
            }
          } catch (error) {
            // Not a set, continue checking
          }
        }
        
        console.log(`  Key type: ${keyType}`);
        
        // Fix based on key pattern
        if (key === 'newsletter:interests') {
          // This should be a set of all interests
          console.log(`  Fixing newsletter:interests as a set`);
          
          // Delete existing key
          await redis.del(key);
          
          // Create an empty set
          await redis.sadd(key, 'placeholder');
          await redis.srem(key, 'placeholder');
          
          // Add some interests (these are examples)
          const interests = ['tax', 'accounting', 'gst', 'business', 'finance'];
          for (const interest of interests) {
            await redis.sadd(key, interest);
          }
          
          console.log(`  ✅ Fixed newsletter:interests as a set`);
        } else if (key.startsWith('newsletter:interest:')) {
          // These should be string values
          const interestName = key.split(':')[2];
          console.log(`  Fixing interest key for: ${interestName}`);
          
          // Delete existing key
          await redis.del(key);
          
          // Create a new string value
          await redis.set(key, interestName);
          
          console.log(`  ✅ Fixed newsletter:interest:${interestName} as a string`);
        }
      } catch (error) {
        console.log(`  ❌ Error processing key ${key}: ${error.message}`);
      }
    }
    
    console.log('🎉 Interest keys fixed successfully');
  } catch (error) {
    console.error('❌ Error fixing interest keys:', error.message);
  }
}

// Run the fix
fixInterestKeys(); 