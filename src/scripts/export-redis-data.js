// Script to export Redis data to text files (can be uploaded to Google Drive)
const { Redis } = require('@upstash/redis');
const fs = require('fs');
const path = require('path');

async function exportRedisData() {
  try {
    console.log('Starting Redis data export...');
    
    // Initialize Redis client
    const redis = new Redis({
      url: 'https://pleased-vulture-34934.upstash.io',
      token: 'AYh2AAIjcDE2YTExYzQxMjVlOGI0NjI3YWY4NWY0ZjBhN2QyMmU5ZnAxMA',
    });

    // Create exports directory if it doesn't exist
    const exportDir = path.join(__dirname, '../../redis-exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Export waitlist data
    const waitlistEmails = await redis.smembers('waitlist:emails');
    const waitlistNames = await redis.smembers('waitlist:names');
    
    // Export newsletter data
    const newsletterEmails = await redis.smembers('newsletter:emails');
    const newsletterNames = await redis.smembers('newsletter:names');
    
    // Get all submission keys
    const allKeys = await redis.keys('*');
    const waitlistKeys = allKeys.filter(key => 
      key.startsWith('waitlist:') && 
      !key.includes('emails') && 
      !key.includes('names') &&
      !key.includes('nameemails')
    );
    
    const newsletterKeys = allKeys.filter(key => 
      key.startsWith('newsletter:') && 
      !key.includes('emails') && 
      !key.includes('names') &&
      !key.includes('interests') &&
      !key.includes('interest:')
    );

    // Export data in text format
    
    // 1. Export emails and names
    fs.writeFileSync(
      path.join(exportDir, 'waitlist-emails.txt'), 
      waitlistEmails.join('\n')
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'waitlist-names.txt'), 
      waitlistNames.join('\n')
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'newsletter-emails.txt'), 
      newsletterEmails.join('\n')
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'newsletter-names.txt'), 
      newsletterNames.join('\n')
    );

    // 2. Export full submission data
    
    // Waitlist submissions
    let waitlistEntries = [];
    for (const key of waitlistKeys) {
      const entry = await redis.get(key);
      if (entry) {
        waitlistEntries.push(entry);
      }
    }
    
    fs.writeFileSync(
      path.join(exportDir, 'waitlist-entries.json'), 
      JSON.stringify(waitlistEntries, null, 2)
    );
    
    // Newsletter submissions
    let newsletterEntries = [];
    for (const key of newsletterKeys) {
      const entry = await redis.get(key);
      if (entry) {
        newsletterEntries.push(entry);
      }
    }
    
    fs.writeFileSync(
      path.join(exportDir, 'newsletter-entries.json'), 
      JSON.stringify(newsletterEntries, null, 2)
    );
    
    // Create a combined export with only emails
    fs.writeFileSync(
      path.join(exportDir, 'all-emails.txt'), 
      [...new Set([...waitlistEmails, ...newsletterEmails])].join('\n')
    );
    
    // Create a combined text file with email:name pairs where available
    const emailNamePairs = [];
    
    // Process waitlist entries
    for (const entry of waitlistEntries) {
      if (entry.email && entry.name) {
        emailNamePairs.push(`${entry.email},${entry.name}`);
      }
    }
    
    // Process newsletter entries
    for (const entry of newsletterEntries) {
      if (entry.email && entry.name) {
        emailNamePairs.push(`${entry.email},${entry.name}`);
      }
    }
    
    fs.writeFileSync(
      path.join(exportDir, 'email-name-pairs.csv'), 
      'Email,Name\n' + emailNamePairs.join('\n')
    );
    
    console.log('Export completed successfully!');
    console.log(`Files have been saved to: ${exportDir}`);
    console.log('Files created:');
    console.log('- waitlist-emails.txt');
    console.log('- waitlist-names.txt');
    console.log('- newsletter-emails.txt');
    console.log('- newsletter-names.txt');
    console.log('- waitlist-entries.json');
    console.log('- newsletter-entries.json');
    console.log('- all-emails.txt');
    console.log('- email-name-pairs.csv');
    
  } catch (error) {
    console.error('Error exporting Redis data:', error);
  }
}

exportRedisData(); 