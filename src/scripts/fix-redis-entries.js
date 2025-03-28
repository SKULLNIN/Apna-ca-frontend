// Script to fix problematic Redis entries
require('dotenv').config({ path: '.env.local' });
const { Redis } = require('@upstash/redis');

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Helper function to check if a key is a set
async function isSet(key) {
  try {
    // Try to use a SET operation (SCARD) to check if it's a set
    const count = await redis.client.scard(key);
    return count !== null;
  } catch (error) {
    return false;
  }
}

// Helper function to check if a key is a hash
async function isHash(key) {
  try {
    // Try to use a HASH operation (HLEN) to check if it's a hash
    const count = await redis.client.hlen(key);
    return count !== null;
  } catch (error) {
    return false;
  }
}

// Helper function to check if a key is a string
async function isString(key) {
  try {
    // Try to get the value as a string
    const value = await redis.get(key);
    return value !== null;
  } catch (error) {
    return false;
  }
}

// Function to fix a single problematic entry
async function fixEntry(key) {
  console.log(`Checking entry: ${key}`);
  
  // Determine the key type
  let keyType;
  
  if (await isSet(key)) {
    keyType = 'set';
  } else if (await isHash(key)) {
    keyType = 'hash';
  } else if (await isString(key)) {
    keyType = 'string';
  } else {
    keyType = 'unknown';
  }
  
  console.log(`  Type: ${keyType}`);
  
  // Check if the key is expected to be a hash but isn't
  if (
    !key.includes(':email:') && 
    !key.includes(':name:') && 
    !key.includes(':interest:') &&
    !key.endsWith(':emails') && 
    !key.endsWith(':names') && 
    !key.endsWith(':interests') && 
    !key.endsWith(':nameemails') &&
    keyType !== 'hash'
  ) {
    console.log(`  ⚠️ Entry should be a hash but is ${keyType}`);
    
    // Try to extract ID
    const parts = key.split(':');
    if (parts.length >= 2) {
      const id = parts[1];
      
      if (!isNaN(parseInt(id))) {
        // This is likely a timestamp-based entry that should be a hash
        console.log(`  Attempting to fix entry ${key} with id ${id}`);
        
        // Try to find corresponding email and name
        const prefix = parts[0];
        const emailKey = `${prefix}:email:${id}`;
        const nameKey = `${prefix}:name:${id}`;
        
        let email = null;
        let name = null;
        
        try {
          email = await redis.get(emailKey);
        } catch (error) {
          console.log(`  Could not get email from ${emailKey}`);
        }
        
        try {
          name = await redis.get(nameKey);
        } catch (error) {
          console.log(`  Could not get name from ${nameKey}`);
        }
        
        // If we don't have the data, check if we can extract from a set
        if (!email || !name) {
          try {
            const allEmails = await redis.smembers(`${prefix}:emails`);
            const allNames = await redis.smembers(`${prefix}:names`);
            
            // Just pick the first available email and name if we have them
            email = email || (allEmails && allEmails.length > 0 ? allEmails[0] : '');
            name = name || (allNames && allNames.length > 0 ? allNames[0] : '');
          } catch (error) {
            console.log(`  Could not get data from sets: ${error.message}`);
          }
        }
        
        // Create a hash with the data we have
        try {
          const hashData = {
            email: email || '',
            name: name || '',
            timestamp: parseInt(id)
          };
          
          console.log(`  Creating hash for ${key}:`, hashData);
          
          // Delete the key first if it exists
          await redis.del(key);
          
          // Create the hash
          await redis.hset(key, hashData);
          
          // Verify
          const newData = await redis.hgetall(key);
          if (newData && typeof newData === 'object') {
            console.log(`  ✅ Successfully fixed entry ${key}`);
          } else {
            console.log(`  ❌ Failed to verify fixed entry ${key}`);
          }
        } catch (error) {
          console.log(`  ❌ Error fixing entry ${key}: ${error.message}`);
        }
      }
    }
  }
  // Check if the key is expected to be a set but isn't
  else if (
    (key.endsWith(':emails') || key.endsWith(':names') || key.endsWith(':interests')) &&
    keyType !== 'set'
  ) {
    console.log(`  ⚠️ Entry should be a set but is ${keyType}`);
    
    // Try to create a set with empty data if it doesn't exist
    try {
      // Delete the key first
      await redis.del(key);
      
      // Create an empty set
      await redis.sadd(key, 'placeholder');
      await redis.srem(key, 'placeholder');
      
      console.log(`  ✅ Created empty set for ${key}`);
    } catch (error) {
      console.log(`  ❌ Error creating set for ${key}: ${error.message}`);
    }
  }
}

// Main function to fix problematic entries
async function fixRedisEntries() {
  console.log('🔧 Starting Redis database fix process...');
  
  try {
    // Get all keys
    const keys = await redis.keys('*');
    console.log(`Found ${keys.length} keys in Redis`);
    
    // Fix each key
    for (const key of keys) {
      await fixEntry(key);
    }
    
    console.log('🎉 Redis database fix process completed');
  } catch (error) {
    console.error('❌ Error during Redis fix process:', error.message);
  }
}

// Run the fix process
fixRedisEntries(); 