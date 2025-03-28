// Scheduled script to export Redis data with timestamp
const { Redis } = require('@upstash/redis');
const fs = require('fs');
const path = require('path');

async function scheduledExport() {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    console.log(`Starting scheduled Redis data export at ${timestamp}...`);
    
    // Initialize Redis client
    const redis = new Redis({
      url: 'https://pleased-vulture-34934.upstash.io',
      token: 'AYh2AAIjcDE2YTExYzQxMjVlOGI0NjI3YWY4NWY0ZjBhN2QyMmU5ZnAxMA',
    });

    // Create exports directory with timestamp
    const baseDir = path.join(__dirname, '../../redis-exports');
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    
    const exportDir = path.join(baseDir, `export-${timestamp}`);
    fs.mkdirSync(exportDir, { recursive: true });

    // Export waitlist data
    const waitlistEmails = await redis.smembers('waitlist:emails');
    const waitlistNames = await redis.smembers('waitlist:names');
    
    // Export newsletter data
    const newsletterEmails = await redis.smembers('newsletter:emails');
    const newsletterNames = await redis.smembers('newsletter:names');

    // Export data in text format - just emails and names
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
    
    // Create a combined export with only emails
    fs.writeFileSync(
      path.join(exportDir, 'all-emails.txt'), 
      [...new Set([...waitlistEmails, ...newsletterEmails])].join('\n')
    );
    
    // Create a combined CSV with email-name pairs
    const allKeys = await redis.keys('*');
    
    // Get all keys for individual entries
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
    
    // Create a CSV with email-name pairs
    let csvContent = 'Email,Name,Type,Date\n';
    
    // Process waitlist entries
    for (const key of waitlistKeys) {
      const entry = await redis.get(key);
      if (entry && entry.email && entry.name) {
        const date = new Date(entry.timestamp).toISOString().split('T')[0];
        csvContent += `${entry.email},${entry.name},waitlist,${date}\n`;
      }
    }
    
    // Process newsletter entries
    for (const key of newsletterKeys) {
      const entry = await redis.get(key);
      if (entry && entry.email && entry.name) {
        const date = entry.subscriptionDate ? 
          entry.subscriptionDate.split('T')[0] : 
          new Date(entry.timestamp).toISOString().split('T')[0];
        csvContent += `${entry.email},${entry.name},newsletter,${date}\n`;
      }
    }
    
    fs.writeFileSync(
      path.join(exportDir, 'email-name-data.csv'), 
      csvContent
    );
    
    // Create a summary file
    const summary = {
      exportDate: timestamp,
      waitlistEmailCount: waitlistEmails.length,
      waitlistNameCount: waitlistNames.length, 
      newsletterEmailCount: newsletterEmails.length,
      newsletterNameCount: newsletterNames.length,
      totalUniqueEmails: new Set([...waitlistEmails, ...newsletterEmails]).size
    };
    
    fs.writeFileSync(
      path.join(exportDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    // Create a README file explaining the export
    fs.writeFileSync(
      path.join(exportDir, 'README.txt'),
      `Redis Database Export - ${timestamp}
============================

This folder contains exported data from the Redis database:

- waitlist-emails.txt: List of all waitlist emails
- waitlist-names.txt: List of all waitlist names
- newsletter-emails.txt: List of all newsletter emails
- newsletter-names.txt: List of all newsletter names
- all-emails.txt: Combined list of all unique emails
- email-name-data.csv: CSV file containing email-name pairs with type and date

Summary:
- Waitlist emails: ${waitlistEmails.length}
- Newsletter emails: ${newsletterEmails.length}
- Total unique emails: ${new Set([...waitlistEmails, ...newsletterEmails]).size}

These files can be uploaded to Google Drive for backup purposes.
`
    );
    
    console.log('Scheduled export completed successfully!');
    console.log(`Files have been saved to: ${exportDir}`);
    
    return {
      success: true,
      exportPath: exportDir,
      timestamp: timestamp,
      summary: summary
    };
    
  } catch (error) {
    console.error('Error during scheduled Redis data export:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the export if this script is called directly
if (require.main === module) {
  scheduledExport();
} else {
  // Export the function if this script is imported
  module.exports = scheduledExport;
} 