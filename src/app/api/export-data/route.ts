import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getRedisClient, checkRedisConnection } from '@/utils/redis';

// Function to export Redis data to files
async function exportRedisData() {
  try {
    console.log("Starting Redis data export...");
    console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL ? "Set" : "Not set");
    console.log("Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN ? "Set" : "Not set");

    // Initialize Redis client
    const redis = getRedisClient();

    // Create export directory if it doesn't exist
    let exportDir;
    try {
      // In production/Vercel, use /tmp directory
      exportDir = path.join(process.env.NODE_ENV === 'production' ? '/tmp' : process.cwd(), 'public', 'exports');
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir, { recursive: true });
      }
    } catch (dirError) {
      console.error("Error creating export directory:", dirError);
      // Fallback to tmp if available
      exportDir = '/tmp';
      if (!fs.existsSync(exportDir)) {
        try {
          fs.mkdirSync(exportDir, { recursive: true });
        } catch (tmpError) {
          console.error("Error creating fallback directory:", tmpError);
        }
      }
    }

    // Test Redis connection first
    try {
      await redis.ping();
      console.log("Redis connection successful");
    } catch (redisConnectionError) {
      console.error("Redis connection failed:", redisConnectionError);
      throw new Error("Failed to connect to Redis database");
    }

    // Get all keys
    let allKeys;
    try {
      allKeys = await redis.keys('*');
      console.log(`Found ${allKeys.length} keys in Redis`);
    } catch (keysError) {
      console.error("Error fetching keys from Redis:", keysError);
      throw new Error("Failed to fetch keys from Redis database");
    }

    // Filter keys by type and exclude problematic keys
    const waitlistKeys = allKeys.filter(key => 
      key.startsWith('waitlist:') && 
      key !== 'waitlist:emails' && 
      key !== 'waitlist:names' && 
      key !== 'waitlist:nameemails'
    );
    
    const newsletterKeys = allKeys.filter(key => 
      key.startsWith('newsletter:') && 
      key !== 'newsletter:emails' && 
      key !== 'newsletter:names' && 
      key !== 'newsletter:interests'
    );

    console.log(`Found ${waitlistKeys.length} waitlist keys and ${newsletterKeys.length} newsletter keys`);

    // Get waitlist emails and names from hash entries
    const waitlistEmails: string[] = [];
    const waitlistNames: string[] = [];

    for (const key of waitlistKeys) {
      try {
        // Check key type first
        const keyType = await redis.type(key);
        
        if (key.includes(':email:') && keyType === 'string') {
          const email = await redis.get(key) as string;
          if (email) waitlistEmails.push(email);
        } else if (key.includes(':name:') && keyType === 'string') {
          const name = await redis.get(key) as string;
          if (name) waitlistNames.push(name);
        } else if (keyType === 'hash') {
          // Try to get email and name from hash entries
          try {
            const data = await redis.hgetall(key);
            if (data && typeof data === 'object') {
              if (data.email && typeof data.email === 'string') {
                waitlistEmails.push(data.email);
              }
              if (data.name && typeof data.name === 'string') {
                waitlistNames.push(data.name);
              }
            }
          } catch (hashError) {
            console.warn(`Error extracting data from hash ${key}:`, hashError);
          }
        } else {
          console.log(`Skipping ${key} because it's not a suitable type (type: ${keyType})`);
        }
      } catch (error) {
        console.warn(`Error processing waitlist key ${key}:`, error);
      }
    }

    // Get newsletter emails and names
    const newsletterEmails: string[] = [];
    const newsletterNames: string[] = [];
    const interests: Record<string, number> = {};

    // Process newsletter entries
    for (const key of newsletterKeys) {
      try {
        // Skip the known problematic key
        if (key === 'newsletter:1742347874919') {
          console.log(`Skipping known problematic newsletter key: ${key}`);
          continue;
        }
        
        // Check key type before processing
        const keyType = await redis.type(key);
        
        if (keyType === 'hash') {
          try {
            const data = await redis.hgetall(key);
            // Validate data structure and types
            if (data && typeof data === 'object' && data.email) {
              // Extract timestamp from key (newsletter:1234567890)
              const timestamp = key.split(':')[1] || '';
              const name = data.name ? String(data.name) : '';
              const email = String(data.email);
              const interest = data.interest ? String(data.interest) : '';
              
              // Only add valid email addresses
              if (email.includes('@')) {
                newsletterEmails.push(email);
                if (name) newsletterNames.push(name);
                if (interest) {
                  const count = interests[interest] || 0;
                  interests[interest] = count + 1;
                }
                
                // We don't have a newsletterStream in this function, just collect data
              }
            }
          } catch (hashError) {
            console.warn(`Error getting hash data for key ${key}:`, hashError);
          }
        } else if (key.includes(':email:') && keyType === 'string') {
          const email = await redis.get(key) as string;
          if (email) newsletterEmails.push(email);
        } else if (key.includes(':name:') && keyType === 'string') {
          const name = await redis.get(key) as string;
          if (name) newsletterNames.push(name);
        } else if (key.includes(':interest:') && keyType === 'string') {
          // Extract interest from key name
          try {
            const interestPart = key.split(':interest:')[1]?.split(':')[0];
            if (interestPart) {
              // Add interest to count
              interests[interestPart] = (interests[interestPart] || 0) + 1;
            }
          } catch (interestError) {
            console.warn(`Error processing interest key ${key}:`, interestError);
          }
        } else {
          console.log(`Skipping ${key} because it's not a suitable type (type: ${keyType})`);
        }
      } catch (error) {
        console.warn(`Error processing newsletter key ${key}:`, error);
      }
    }

    console.log(`Processed ${waitlistEmails.length} waitlist emails and ${newsletterEmails.length} newsletter emails`);
    console.log(`Found ${Object.keys(interests).length} unique interests`);

    // Create combined unique emails list
    const allEmails = [...new Set([...waitlistEmails, ...newsletterEmails])];

    // Create email-name pairs
    const emailNamePairs: { email: string; name: string; interest?: string }[] = [];

    // Create pairs from waitlist data
    const waitlistHashKeys = waitlistKeys.filter(key => 
      !key.includes(':email:') && 
      !key.includes(':name:')
    );
    
    for (const key of waitlistHashKeys) {
      try {
        // Check the type first
        const keyType = await redis.type(key);
        if (keyType !== 'hash') continue;
        
        const data = await redis.hgetall(key);
        if (data && typeof data === 'object' && data.email && data.name) {
          emailNamePairs.push({ 
            email: data.email as string, 
            name: data.name as string 
          });
        }
      } catch (error) {
        console.warn(`Error creating pair from ${key}:`, error);
      }
    }
    
    // Create pairs from newsletter data
    const newsletterHashKeys = newsletterKeys.filter(key => 
      !key.includes(':email:') && 
      !key.includes(':name:') && 
      !key.includes(':interest:')
    );
    
    for (const key of newsletterHashKeys) {
      try {
        // Check the type first
        const keyType = await redis.type(key);
        if (keyType !== 'hash') continue;
        
        const data = await redis.hgetall(key);
        if (data && typeof data === 'object' && data.email && data.name) {
          const pair: { email: string; name: string; interest?: string } = { 
            email: data.email as string, 
            name: data.name as string 
          };
          
          if (data.interest && typeof data.interest === 'string') {
            pair.interest = data.interest;
          }
          
          emailNamePairs.push(pair);
        }
      } catch (error) {
        console.warn(`Error creating pair from ${key}:`, error);
      }
    }

    console.log(`Created ${emailNamePairs.length} email-name pairs`);

    // Define timestamp and file paths
    const timestamp = Date.now();
    const publicPath = process.env.NODE_ENV === 'production' ? '' : '/public';
    const fileBasePath = `${publicPath}/exports`;
    
    // Define files with both filesystem and URL paths
    const files = {
      waitlistEmails: {
        fsPath: path.join(exportDir, `waitlist-emails-${timestamp}.txt`),
        urlPath: `/exports/waitlist-emails-${timestamp}.txt`
      },
      waitlistNames: {
        fsPath: path.join(exportDir, `waitlist-names-${timestamp}.txt`),
        urlPath: `/exports/waitlist-names-${timestamp}.txt`
      },
      newsletterEmails: {
        fsPath: path.join(exportDir, `newsletter-emails-${timestamp}.txt`),
        urlPath: `/exports/newsletter-emails-${timestamp}.txt`
      },
      newsletterNames: {
        fsPath: path.join(exportDir, `newsletter-names-${timestamp}.txt`),
        urlPath: `/exports/newsletter-names-${timestamp}.txt`
      },
      allEmails: {
        fsPath: path.join(exportDir, `all-emails-${timestamp}.txt`),
        urlPath: `/exports/all-emails-${timestamp}.txt`
      },
      emailNamePairs: {
        fsPath: path.join(exportDir, `email-name-pairs-${timestamp}.csv`),
        urlPath: `/exports/email-name-pairs-${timestamp}.csv`
      },
      interests: {
        fsPath: path.join(exportDir, `interests-${timestamp}.csv`),
        urlPath: `/exports/interests-${timestamp}.csv`
      }
    };

    try {
      // Write all files
      fs.writeFileSync(files.waitlistEmails.fsPath, waitlistEmails.join('\n'));
      fs.writeFileSync(files.waitlistNames.fsPath, waitlistNames.join('\n'));
      fs.writeFileSync(files.newsletterEmails.fsPath, newsletterEmails.join('\n'));
      fs.writeFileSync(files.newsletterNames.fsPath, newsletterNames.join('\n'));
      fs.writeFileSync(files.allEmails.fsPath, allEmails.join('\n'));
      fs.writeFileSync(
        files.emailNamePairs.fsPath,
        'Email,Name,Interest\n' + emailNamePairs.map(pair => 
          `${pair.email},${pair.name},${pair.interest || ''}`
        ).join('\n')
      );

      // Write interests to CSV
      fs.writeFileSync(
        files.interests.fsPath,
        'Interest,Count\n' + Object.entries(interests)
          .map(([interest, count]) => `${interest},${count}`)
          .join('\n')
      );
      
      console.log("Files written successfully");
    } catch (fileError) {
      console.error("Error writing files:", fileError);
      throw new Error("Failed to write export files: " + (fileError instanceof Error ? fileError.message : String(fileError)));
    }

    // Create manifest file
    const manifestFile = `/exports/manifest-${timestamp}.json`;
    const manifestFsPath = path.join(exportDir, `manifest-${timestamp}.json`);
    const manifest = {
      timestamp,
      files: Object.keys(files).map(key => files[key as keyof typeof files].urlPath),
      stats: {
        waitlistEmails: waitlistEmails.length,
        waitlistNames: waitlistNames.length,
        newsletterEmails: newsletterEmails.length,
        newsletterNames: newsletterNames.length,
        uniqueEmails: allEmails.length,
        interests: Object.keys(interests).length
      },
    };

    try {
      fs.writeFileSync(
        manifestFsPath,
        JSON.stringify(manifest, null, 2)
      );
    } catch (manifestError) {
      console.error("Error writing manifest file:", manifestError);
    }

    console.log("Export completed successfully");

    return {
      success: true,
      message: 'Data exported successfully',
      timestamp,
      stats: manifest.stats,
      files: {
        waitlistEmails: files.waitlistEmails.urlPath,
        waitlistNames: files.waitlistNames.urlPath,
        newsletterEmails: files.newsletterEmails.urlPath,
        newsletterNames: files.newsletterNames.urlPath,
        allEmails: files.allEmails.urlPath,
        emailNamePairs: files.emailNamePairs.urlPath,
        interests: files.interests.urlPath
      },
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to export data');
  }
}

// GET request handler
export async function GET(request: NextRequest) {
  try {
    // Check for admin cookie instead of API key
    const cookies = request.cookies;
    const adminSession = cookies.get('adminSession')?.value;
    
    console.log('Admin session cookie:', adminSession);

    // Check if user is authenticated
    if (!adminSession) {
      console.log('Authentication failed: No admin session cookie');
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized access',
        message: 'Authentication required' 
      }, { status: 401 });
    }

    console.log('Authentication successful, exporting data...');
    
    // Export the data
    const exportResult = await exportRedisData();
    
    console.log('Export completed successfully');
    return NextResponse.json(exportResult);
  } catch (error) {
    console.error('Error in export-data route:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to export data',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 