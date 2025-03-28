// Test script to verify Redis connection and data retrieval
require('dotenv').config({ path: '.env.local' });
const { Redis } = require('@upstash/redis');

// Initialize Redis client with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Function to test basic Redis connection
async function testConnection() {
  try {
    const ping = await redis.ping();
    console.log('✅ Redis connection test:', ping === 'PONG' ? 'Successful' : 'Failed');
    return ping === 'PONG';
  } catch (error) {
    console.error('❌ Redis connection error:', error.message);
    return false;
  }
}

// Function to list all keys
async function listAllKeys() {
  try {
    const keys = await redis.keys('*');
    console.log(`✅ Found ${keys.length} keys in Redis`);
    console.log('Keys:', keys);
    return keys;
  } catch (error) {
    console.error('❌ Error fetching keys:', error.message);
    return [];
  }
}

// Function to test retrieving specific data types
async function testDataRetrieval(keys) {
  // Test retrieving a hash
  const hashKeys = keys.filter(key => 
    key.startsWith('newsletter:') && 
    !key.includes(':email:') && 
    !key.includes(':name:') && 
    !key.includes(':interest:')
  );
  
  if (hashKeys.length > 0) {
    console.log('\nTesting hash retrieval:');
    for (const key of hashKeys.slice(0, 3)) { // Test first 3 hash keys
      try {
        console.log(`\nFetching hash: ${key}`);
        const hashData = await redis.hgetall(key);
        console.log('Hash data type:', typeof hashData);
        console.log('Hash data:', hashData);
        
        // Check if we got a valid hash
        if (hashData && typeof hashData === 'object') {
          console.log('✅ Successfully retrieved hash data');
        } else {
          console.log('⚠️ Retrieved hash data is null or not an object');
        }
      } catch (error) {
        console.error(`❌ Error retrieving hash ${key}:`, error.message);
      }
    }
  } else {
    console.log('No hash keys found to test');
  }
  
  // Test retrieving a string
  const stringKeys = keys.filter(key => 
    (key.includes(':email:') || key.includes(':name:'))
  );
  
  if (stringKeys.length > 0) {
    console.log('\nTesting string retrieval:');
    for (const key of stringKeys.slice(0, 3)) { // Test first 3 string keys
      try {
        console.log(`\nFetching string: ${key}`);
        const stringData = await redis.get(key);
        console.log('String data type:', typeof stringData);
        console.log('String data:', stringData);
        
        if (stringData !== null) {
          console.log('✅ Successfully retrieved string data');
        } else {
          console.log('⚠️ Retrieved string data is null');
        }
      } catch (error) {
        console.error(`❌ Error retrieving string ${key}:`, error.message);
      }
    }
  } else {
    console.log('No string keys found to test');
  }
}

// Function to test fixing a problematic entry
async function testFixProblematicEntry(keys) {
  // Find a newsletter entry to test
  const newsletterKey = keys.find(key => 
    key.startsWith('newsletter:') && 
    !key.includes(':email:') && 
    !key.includes(':name:') && 
    !key.includes(':interest:')
  );
  
  if (newsletterKey) {
    console.log(`\nTesting fix for problematic entry: ${newsletterKey}`);
    try {
      // Try to get the hash data
      const hashData = await redis.hgetall(newsletterKey);
      
      if (!hashData || typeof hashData !== 'object') {
        console.log('⚠️ Found a corrupted hash, attempting to fix it');
        
        // Extract the ID
        const id = newsletterKey.split(':')[1];
        
        // Check if there are string keys for this entry
        const emailKey = `newsletter:email:${id}`;
        const nameKey = `newsletter:name:${id}`;
        
        const emailExists = keys.includes(emailKey);
        const nameExists = keys.includes(nameKey);
        
        console.log(`Email key exists: ${emailExists}`);
        console.log(`Name key exists: ${nameExists}`);
        
        if (emailExists || nameExists) {
          // We can recreate this hash
          const email = emailExists ? await redis.get(emailKey) : '';
          const name = nameExists ? await redis.get(nameKey) : '';
          
          // Create a new hash
          console.log('Recreating hash with:', { email, name });
          await redis.hset(newsletterKey, {
            email: email || '',
            name: name || '',
            timestamp: parseInt(id) || Date.now()
          });
          
          // Verify the fix
          const fixedHash = await redis.hgetall(newsletterKey);
          console.log('Fixed hash:', fixedHash);
          
          if (fixedHash && typeof fixedHash === 'object') {
            console.log('✅ Successfully fixed corrupted hash');
          } else {
            console.log('❌ Failed to fix corrupted hash');
          }
        } else {
          console.log('❌ Cannot fix this hash as no related keys exist');
        }
      } else {
        console.log('✅ Hash data is valid:', hashData);
      }
    } catch (error) {
      console.error('❌ Error fixing problematic entry:', error.message);
    }
  } else {
    console.log('No newsletter entries found to test fixing');
  }
}

// Main function to run all tests
async function runTests() {
  console.log('🔍 Starting Redis tests...');
  console.log('Redis URL:', process.env.UPSTASH_REDIS_REST_URL ? '✓ Set' : '✗ Not set');
  console.log('Redis Token:', process.env.UPSTASH_REDIS_REST_TOKEN ? '✓ Set' : '✗ Not set');
  
  const connected = await testConnection();
  
  if (connected) {
    const keys = await listAllKeys();
    
    if (keys.length > 0) {
      await testDataRetrieval(keys);
      await testFixProblematicEntry(keys);
    }
  }
  
  console.log('\n🏁 Redis tests completed');
}

// Run the tests
runTests(); 