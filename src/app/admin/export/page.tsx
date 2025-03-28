'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ExportStats {
  waitlistEmails: number;
  waitlistNames: number;
  newsletterEmails: number;
  newsletterNames: number;
  totalUniqueEmails: number;
}

interface ExportResult {
  success: boolean;
  exportPath: string;
  timestamp: string;
  files: string[];
  stats: ExportStats;
}

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exports, setExports] = useState<string[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check authentication status on load
  useEffect(() => {
    // For demo purposes - in production implement proper auth
    const checkAuth = () => {
      const cookies = document.cookie.split(';').map(c => c.trim());
      const hasSession = cookies.some(c => c.startsWith('session=')) || true; // Force true for demo
      setAuthenticated(hasSession);
    };
    
    checkAuth();
  }, []);

  // Simulate fetching existing exports
  useEffect(() => {
    // In a real implementation, you would fetch the list of exports from the server
    const fetchExports = async () => {
      try {
        // This is just a mock - in production, implement an API to get real exports
        setExports([]);
      } catch (err) {
        console.error('Error fetching exports:', err);
      }
    };
    
    if (authenticated) {
      fetchExports();
    }
  }, [authenticated]);

  const handleExport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call the API to generate the export files
      const response = await fetch(`/api/export-data?key=lAxmesh@3521`);
      
      if (!response.ok) {
        throw new Error('Export request failed');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setExportResult(data);
      } else {
        throw new Error(data.message || 'Export failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (authenticated === false) {
    return (
      <div className="flex h-screen items-center justify-center flex-col p-4">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h1>
        <p className="text-lg mb-6">You don't have permission to access this area.</p>
        <Link 
          href="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Admin Dashboard
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Export Redis Data</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Generate New Export</h2>
        <p className="mb-4 text-gray-600">
          Click the button below to generate a new export of all Redis data. The export will include emails and names from both the waitlist and newsletter in text file format.
        </p>
        
        <button 
          onClick={handleExport}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </span>
          ) : 'Export Redis Data'}
        </button>
        
        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            {error}
          </div>
        )}
        
        {exportResult && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-green-800 mb-2">Export Completed Successfully!</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-1">Statistics:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Waitlist Emails: {exportResult.stats.waitlistEmails}</li>
                <li>Newsletter Emails: {exportResult.stats.newsletterEmails}</li>
                <li>Total Unique Emails: {exportResult.stats.totalUniqueEmails}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Files:</h4>
              <ul className="space-y-1">
                {exportResult.files.map(file => (
                  <li key={file} className="text-blue-600 hover:text-blue-800">
                    <Link 
                      href={`${exportResult.exportPath}/${file}`}
                      target="_blank"
                      className="flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {file}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 text-gray-600 text-sm">
              <p className="font-medium">Instructions:</p>
              <ol className="list-decimal pl-5">
                <li>Click on each file to download individually</li>
                <li>Save the files to your Google Drive or other storage</li>
                <li>Files are in plain text format and can be viewed with any text editor</li>
              </ol>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Run Export Script Directly</h2>
        <p className="mb-4 text-gray-600">
          You can also run the export script directly from the terminal to generate more comprehensive exports with full data:
        </p>
        
        <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
          <code>node src/scripts/export-redis-data.js</code>
        </div>
        
        <p className="mt-2 text-gray-600">
          This will create a directory in <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">redis-exports/</span> at the project root with all the exported data.
        </p>
        
        <h3 className="text-lg font-medium mt-6 mb-2">For Scheduled Exports:</h3>
        <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
          <code>node src/scripts/scheduled-export.js</code>
        </div>
        
        <p className="mt-2 text-gray-600">
          This will create a timestamped directory with all exports. You can set up a cron job to run this script automatically at regular intervals.
        </p>
      </div>
    </div>
  );
} 