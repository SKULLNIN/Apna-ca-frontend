import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getRedisClient, checkRedisConnection } from '@/utils/redis';

const execAsync = promisify(exec);

// Function to execute server-side export script
async function runServerExport() {
  try {
    console.log("Starting server export...");
    console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL ? "Set" : "Not set");
    console.log("Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN ? "Set" : "Not set");
    console.log("Node environment:", process.env.NODE_ENV || "development");
    console.log("Working directory:", process.cwd());

    // Initialize Redis client
    const redis = getRedisClient();

    // Create timestamped export directory in server's filesystem
    const timestamp = Date.now().toString();
    const isProduction = process.env.NODE_ENV === 'production';
    const baseDir = isProduction ? '/tmp' : path.join(process.cwd(), 'public');
    const exportDir = path.join(baseDir, 'exports', timestamp);

    console.log(`Creating export directory: ${exportDir}`);
    
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Get all keys from Redis
    console.log("Fetching keys from Redis...");
    let allKeys: string[] = [];
    try {
      allKeys = await redis.keys('*') || [];
      console.log(`Found ${allKeys.length} keys in Redis`);
    } catch (error) {
      console.error("Failed to fetch keys from Redis:", error);
      allKeys = []; // Set to empty array on error
    }

    // Organize the keys - only include valid string keys
    const waitlistKeys = allKeys.filter(key => typeof key === 'string' && key.startsWith('waitlist:'));
    const newsletterKeys = allKeys.filter(key => typeof key === 'string' && key.startsWith('newsletter:'));
    
    // Create stats for summary
    const stats = {
      total: allKeys.length,
      waitlist: waitlistKeys.length,
      newsletter: newsletterKeys.length,
      waitlistEmails: 0,
      newsletterEmails: 0,
      uniqueEmails: 0
    };

    // Extract and save waitlist emails to CSV
    console.log("Processing waitlist entries...");
    const waitlistEmails = new Set<string>();
    const waitlistNames = new Set<string>();
    const waitlistFilePath = path.join(exportDir, 'waitlist-data.csv');
    
    const waitlistStream = fs.createWriteStream(waitlistFilePath);
    waitlistStream.write('Name,Email,Timestamp\n');
    
    // Process waitlist entries
    for (const key of waitlistKeys) {
      try {
        // Check key type before processing
        const keyType = await redis.type(key);
        
        if (keyType === 'hash') {
          try {
            const data = await redis.hgetall(key);
            // Validate data structure and types
            if (data && typeof data === 'object' && data.email) {
              // Extract timestamp from key (waitlist:1234567890)
              const timestamp = key.split(':')[1] || '';
              const name = data.name ? String(data.name) : '';
              const email = String(data.email);
              
              // Only add valid email addresses
              if (email.includes('@')) {
                waitlistEmails.add(email);
                if (name) waitlistNames.add(name);
                
                // Write to CSV
                waitlistStream.write(`"${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}",${timestamp}\n`);
              }
            }
          } catch (hashError) {
            console.warn(`Error getting hash data for key ${key}:`, hashError);
          }
        } else if (keyType === 'string') {
          try {
            // Handle string type keys that might contain email addresses
            if (key.includes(':email:')) {
              const email = await redis.get(key);
              if (email && typeof email === 'string' && email.includes('@')) {
                waitlistEmails.add(email);
                waitlistStream.write(`"","${email.replace(/"/g, '""')}",""\n`);
              }
            }
          } catch (strError) {
            console.warn(`Error getting string data for key ${key}:`, strError);
          }
        }
      } catch (error) {
        console.warn(`Error processing waitlist key ${key}:`, error);
      }
    }
    waitlistStream.end();
    stats.waitlistEmails = waitlistEmails.size;
    
    // Extract and save newsletter emails to CSV
    console.log("Processing newsletter entries...");
    const newsletterEmails = new Set<string>();
    const newsletterNames = new Set<string>();
    const newsletterInterests = new Map<string, number>();
    const newsletterFilePath = path.join(exportDir, 'newsletter-data.csv');
    
    const newsletterStream = fs.createWriteStream(newsletterFilePath);
    newsletterStream.write('Name,Email,Interest,Timestamp\n');
    
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
                newsletterEmails.add(email);
                if (name) newsletterNames.add(name);
                if (interest) {
                  const count = newsletterInterests.get(interest) || 0;
                  newsletterInterests.set(interest, count + 1);
                }
                
                // Write to CSV, escape quotes for CSV format
                newsletterStream.write(`"${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${interest.replace(/"/g, '""')}",${timestamp}\n`);
              }
            }
          } catch (hashError) {
            console.warn(`Error getting hash data for key ${key}:`, hashError);
          }
        } else if (keyType === 'string') {
          try {
            // Handle string type keys that might contain email addresses
            if (key.includes(':email:')) {
              const email = await redis.get(key);
              if (email && typeof email === 'string' && email.includes('@')) {
                newsletterEmails.add(email);
                newsletterStream.write(`"","${email.replace(/"/g, '""')}","",${key.split(':')[1] || ''}\n`);
              }
            } else if (key.includes(':interest:')) {
              // Extract interest from key name
              const interestPart = key.split(':interest:')[1]?.split(':')[0];
              if (interestPart) {
                const count = newsletterInterests.get(interestPart) || 0;
                newsletterInterests.set(interestPart, count + 1);
              }
            }
          } catch (strError) {
            console.warn(`Error getting string data for key ${key}:`, strError);
          }
        }
      } catch (error) {
        console.warn(`Error processing newsletter key ${key}:`, error);
      }
    }
    newsletterStream.end();
    stats.newsletterEmails = newsletterEmails.size;
    
    // Get combined unique emails
    const allEmails = new Set([...waitlistEmails, ...newsletterEmails]);
    stats.uniqueEmails = allEmails.size;
    
    // Save all unique emails to a combined file
    const allEmailsFilePath = path.join(exportDir, 'all-emails.csv');
    const allEmailsStream = fs.createWriteStream(allEmailsFilePath);
    allEmailsStream.write('Email\n');
    allEmails.forEach(email => allEmailsStream.write(`${email}\n`));
    allEmailsStream.end();
    
    // Save interests to a file
    const interestsFilePath = path.join(exportDir, 'interests.csv');
    const interestsStream = fs.createWriteStream(interestsFilePath);
    interestsStream.write('Interest,Count\n');
    newsletterInterests.forEach((count, interest) => {
      interestsStream.write(`"${interest}",${count}\n`);
    });
    interestsStream.end();
    
    // Create a manifest file with export info
    const manifestFilePath = path.join(exportDir, 'manifest.json');
    const manifest = {
      timestamp,
      exportDate: new Date().toISOString(),
      files: [
        { name: 'waitlist-data.csv', type: 'csv', count: waitlistEmails.size },
        { name: 'newsletter-data.csv', type: 'csv', count: newsletterEmails.size },
        { name: 'all-emails.csv', type: 'csv', count: allEmails.size },
        { name: 'interests.csv', type: 'csv', count: newsletterInterests.size }
      ],
      stats
    };
    fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2));
    
    // Create URLs for client to download the files
    const baseUrl = '/api/get-export-file';
    const fileUrls = [
      `${baseUrl}?filename=waitlist-data.csv&timestamp=${timestamp}`,
      `${baseUrl}?filename=newsletter-data.csv&timestamp=${timestamp}`,
      `${baseUrl}?filename=all-emails.csv&timestamp=${timestamp}`,
      `${baseUrl}?filename=interests.csv&timestamp=${timestamp}`,
      `${baseUrl}?filename=manifest.json&timestamp=${timestamp}`
    ];
    
    return {
      success: true,
      message: 'Export completed successfully',
      timestamp,
      fileUrls,
      stats
    };
  } catch (error) {
    console.error('Error during server export:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined
    };
  }
}

// GET request handler
export async function GET(request: NextRequest) {
  try {
    // Check for admin cookie
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

    console.log('Authentication successful, running server export...');

    // Run the server export
    const result = await runServerExport();
    
    console.log('Server export completed successfully');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in run-export-script route:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to run server export',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 