import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the filename and timestamp from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('filename');
    const timestamp = searchParams.get('timestamp');
    
    console.log(`File download request: filename=${filename}, timestamp=${timestamp}`);
    
    if (!filename || !timestamp) {
      console.error('Missing filename or timestamp parameter');
      return NextResponse.json({ error: 'Missing filename or timestamp parameter' }, { status: 400 });
    }
    
    // Check authentication - require adminSession cookie
    const cookies = request.cookies;
    const adminSession = cookies.get('adminSession');
    
    if (!adminSession) {
      console.error('Unauthorized access attempt - no adminSession cookie');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Determine file path based on environment
    const isProduction = process.env.NODE_ENV === 'production';
    
    // In production/Vercel, use /tmp directory
    const baseDir = isProduction ? '/tmp' : path.join(process.cwd(), 'public');
    const exportDir = path.join(baseDir, 'exports', timestamp);
    const filePath = path.join(exportDir, filename);
    
    console.log(`Attempting to read file: ${filePath}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Export directory: ${exportDir}`);
    
    // Check if export directory exists
    const dirExists = fs.existsSync(exportDir);
    console.log(`Export directory exists: ${dirExists}`);
    
    if (!dirExists) {
      console.error(`Export directory not found: ${exportDir}`);
      return NextResponse.json({ 
        error: 'Export directory not found',
        path: exportDir,
        environment: isProduction ? 'production' : 'development'
      }, { status: 404 });
    }
    
    // List files in the export directory for debugging
    try {
      const files = fs.readdirSync(exportDir);
      console.log(`Files in export directory: ${files.join(', ')}`);
    } catch (readDirError) {
      console.error(`Could not read export directory: ${readDirError}`);
    }
    
    // Check if file exists
    const fileExists = fs.existsSync(filePath);
    console.log(`File exists: ${fileExists}`);
    
    if (!fileExists) {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json(
        { 
          error: 'File not found', 
          filePath, 
          exists: false,
          environment: isProduction ? 'production' : 'development',
          availableFiles: fs.existsSync(exportDir) ? fs.readdirSync(exportDir) : []
        }, 
        { status: 404 }
      );
    }
    
    // Read the file content
    let fileContent;
    try {
      fileContent = fs.readFileSync(filePath);
      console.log(`Successfully read file: ${filePath} (${fileContent.length} bytes)`);
    } catch (readError) {
      console.error(`Error reading file: ${readError}`);
      return NextResponse.json(
        { 
          error: 'Error reading file',
          message: readError instanceof Error ? readError.message : 'Unknown error',
          environment: isProduction ? 'production' : 'development'
        }, 
        { status: 500 }
      );
    }
    
    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default
    
    if (ext === '.csv') {
      contentType = 'text/csv';
    } else if (ext === '.json') {
      contentType = 'application/json';
    } else if (ext === '.txt') {
      contentType = 'text/plain';
    }
    
    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename=${filename}`);
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.set('Pragma', 'no-cache');
    
    // Return the file as a response
    console.log(`Sending file ${filename} as ${contentType}`);
    return new NextResponse(fileContent, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error serving export file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to serve file', 
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        environment: process.env.NODE_ENV || 'development',
        vercel: !!process.env.VERCEL,
        region: process.env.VERCEL_REGION || 'unknown'
      }, 
      { status: 500 }
    );
  }
} 