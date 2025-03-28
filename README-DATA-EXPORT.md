# Redis Data Export Tool

This document explains how to export data from the Redis database to text files that can be easily uploaded to Google Drive or other storage services.

## Overview

The export tool allows you to:
1. Export waitlist and newsletter emails and names to individual text files
2. Create a combined list of all unique emails
3. Export email-name pairs in a CSV format
4. Securely access and download these exports through a password-protected admin interface

## Accessing the Export Dashboard

1. Navigate to `/admin/data-management` in your browser
2. Enter the admin password: `lAxmesh@3521`
3. Click on the "Export to Browser" or "Export to Server" buttons

## Accessing the Export Tool

There are three ways to access the export functionality:

### 1. Web Interface (Recommended for non-technical users)

1. Navigate to the secure admin page at: `/admin/data-management`
2. Enter the admin password: `admin123`
3. Click on "Export Data" to generate text files
4. Download each file by clicking on the links provided
5. Upload these files to Google Drive

### 2. Command Line (For developers)

You can run the export scripts directly from the command line:

```bash
# For basic export
node src/scripts/export-redis-data.js

# For timestamped exports
node src/scripts/scheduled-export.js
```

The files will be saved in the `redis-exports/` directory at the project root.

### 3. API Endpoint (For programmatic access)

Make a GET request to `/api/export-data` with the API key:

```
GET /api/export-data?key=lAxmesh@3521
```

This will generate files in the `public/exports/` directory and return a JSON response with file links.

## File Types

The export creates several types of files:

- **waitlist-emails.txt**: List of all waitlist email addresses, one per line
- **waitlist-names.txt**: List of all waitlist names, one per line
- **newsletter-emails.txt**: List of all newsletter email addresses, one per line
- **newsletter-names.txt**: List of all newsletter names, one per line
- **all-emails.txt**: Combined list of all unique emails from both waitlist and newsletter
- **email-name-pairs.csv**: CSV file containing email and name pairs for easier import to spreadsheets
- **summary.json**: Statistics about the export (number of emails, names, etc.)

## Google Drive Instructions

To save these files to Google Drive:

1. Download the exported files to your local computer
2. Go to [Google Drive](https://drive.google.com) and sign in
3. Create a new folder (e.g., "ApnaCA Data Export")
4. Upload the files to this folder
5. The files are now safely stored in your Google Drive

## Scheduled Exports

For automatic backups, you can set up a cron job or scheduled task to run the export script regularly:

```bash
# Example cron job to run daily at 2 AM
0 2 * * * cd /path/to/project && node src/scripts/scheduled-export.js >> /var/log/exports.log 2>&1
```

Each scheduled export creates a timestamped directory with all data files.

## Security

- The export functionality is protected by a password in the web interface
- API endpoints require an API key
- Redis credentials are kept secure and not exposed to clients
- Only administrators can access the export functions

For any questions or issues with the export process, please contact the development team. 