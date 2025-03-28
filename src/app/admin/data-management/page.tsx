'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type ExportResponse = {
  success: boolean;
  message: string;
  timestamp: string;
  fileUrls: string[];
  stats?: {
    waitlistEmails: number;
    newsletterEmails: number;
    uniqueEmails: number;
    waitlistNames: number;
    newsletterNames: number;
  };
  files?: {
    waitlistEmails: string;
    waitlistNames: string;
    newsletterEmails: string;
    newsletterNames: string;
    allEmails: string;
    emailNamePairs: string;
    interests: string;
    summary: string;
    readme: string;
  };
};

export default function DataManagementPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<ExportResponse | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    // Check for admin cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const hasAdminSession = cookies.some(cookie => 
      cookie.startsWith('adminSession=')
    );
    
    setAuthenticated(hasAdminSession);
  }, []);

  const handleLogin = () => {
    // Very simple password protection - in production use proper auth
    if (password === 'lAxmesh@3521') {
      // Set a cookie that expires in 1 hour
      document.cookie = `adminSession=true; path=/; max-age=${60 * 60}`;
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);
    setExportError(null);
    
    try {
      // Set the adminSession cookie before making the fetch request
      document.cookie = `adminSession=true; path=/; max-age=${60 * 60}`;
      
      const response = await fetch('/api/export-data');
      
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      const data = await response.json();
      setExportResult({
        success: true,
        message: `Export completed successfully! ${data.stats.uniqueEmails} unique emails exported (${data.stats.waitlistEmails} from waitlist, ${data.stats.newsletterEmails} from newsletter).`,
        timestamp: data.timestamp,
        fileUrls: data.fileUrls
      });
    } catch (err) {
      console.error('Error exporting data:', err);
      setExportError('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // New function to export data to server
  const handleServerExport = async () => {
    setIsExporting(true);
    setExportResult(null);
    setExportError(null);
    
    try {
      // Make sure admin cookie is set
      if (!document.cookie.includes('adminSession=')) {
        document.cookie = `adminSession=true; path=/; max-age=${60 * 60}`;
      }
      
      const response = await fetch('/api/run-export-script');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Export failed without specific error');
      }
      
      console.log('Server export response:', data);
      
      // Ensure fileUrls is an array
      const fileUrls = Array.isArray(data.fileUrls) ? data.fileUrls : [];
      
      // Use fileUrls directly from the response
      setExportResult({
        success: true,
        message: `Export completed successfully! ${data.stats?.uniqueEmails || 0} unique emails exported (${data.stats?.waitlistEmails || 0} from waitlist, ${data.stats?.newsletterEmails || 0} from newsletter).`,
        timestamp: data.timestamp || new Date().toISOString(),
        fileUrls: fileUrls
      });
    } catch (error) {
      console.error('Error during server export:', error);
      setExportError(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-green-50 via-white to-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (authenticated === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 opacity-20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 opacity-20 rounded-full -ml-48 -mb-48"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.5,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transform hover:scale-[1.01] transition-transform duration-500 relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">Admin Login</h1>
          
          {passwordError && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              Invalid password. Please try again.
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Enter admin password"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
          >
            Log In
          </button>
          
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-green-600 hover:text-green-800 text-sm font-medium inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex flex-col relative overflow-hidden">
      {/* Decorative elements - reduced size on mobile */}
      <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-green-200 opacity-10 rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-green-200 opacity-10 rounded-full -ml-24 sm:-ml-48 -mb-24 sm:-mb-48"></div>
      
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-sm border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">Data Management</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                href="/admin"
                className="text-xs sm:text-sm text-green-600 hover:text-green-800 font-medium bg-white py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <span className="hidden sm:inline">Back to</span> Dashboard
              </Link>
              <button
                onClick={() => {
                  document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                  setAuthenticated(false);
                }}
                className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium bg-white py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-lg shadow-sm hover:shadow transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content - Export Controls */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Export Redis Data</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Browser Export Section */}
                <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-gradient-to-br from-green-50 to-green-100">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-green-800">Export to Browser</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                    Generate files for download directly from your browser. Good for immediate access to your data.
                  </p>
                  
                  {!exportResult && !isExporting && (
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center text-sm sm:text-base"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Export to Browser
                    </button>
                  )}
                </div>
                
                {/* Server Export Section */}
                <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-blue-800">Export to Server</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                    Run export script on the server to generate a complete backup in the server's filesystem.
                  </p>
                  
                  {!exportResult && !isExporting && (
                    <button
                      onClick={handleServerExport}
                      disabled={isExporting}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center text-sm sm:text-base"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Run Server Export
                    </button>
                  )}
                </div>
              </div>
              
              {isExporting && (
                <div className="flex justify-center items-center py-6 sm:py-10">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-500"></div>
                  <p className="ml-3 text-green-700 text-sm sm:text-base font-medium">Exporting data...</p>
                </div>
              )}
              
              {exportError && (
                <div className="mt-4 sm:mt-6 bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm text-red-700">{exportError}</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={handleExport}
                      className="inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                    >
                      Try Browser Export
                    </button>
                    <button
                      onClick={handleServerExport}
                      className="inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Try Server Export
                    </button>
                  </div>
                </div>
              )}
              
              {exportResult && exportResult.success && (
                <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-green-100">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 sm:mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-sm sm:text-lg font-medium text-gray-900">{exportResult.message}</h3>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 sm:pt-4">
                    <h4 className="text-sm sm:font-medium text-gray-700 mb-1.5 sm:mb-2">Download Files:</h4>
                    <div className="max-h-[200px] overflow-auto enhanced-scrollbar scrollbar-green pr-2">
                      <ul className="space-y-1.5 sm:space-y-2">
                        {Array.isArray(exportResult.fileUrls) && exportResult.fileUrls.map((url, index) => {
                          if (typeof url !== 'string') return null;
                          const filename = url.split('filename=')[1]?.split('&')[0] || `File ${index + 1}`;
                          return (
                            <li key={index} className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <a 
                                href={url} 
                                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                                download
                              >
                                {filename}
                              </a>
                            </li>
                          );
                        })}
                        {(!exportResult.fileUrls || !Array.isArray(exportResult.fileUrls) || exportResult.fileUrls.length === 0) && (
                          <li className="text-xs sm:text-sm text-gray-500">No files available for download</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar - Instructions - Collapsed on mobile, expanded on desktop */}
          <div className="lg:col-span-1 mt-4 lg:mt-0">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 lg:sticky lg:top-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Export Instructions</h2>
                <button 
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    // Toggle mobile instructions visibility
                    const instructions = document.getElementById('export-instructions');
                    if (instructions) {
                      instructions.classList.toggle('hidden');
                    }
                  }}
                  aria-label="Toggle export instructions"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div id="export-instructions" className="space-y-3 sm:space-y-4 hidden lg:block">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">1. Generate an Export</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Click the "Generate New Export" button to create a fresh export of your Redis data.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">2. Download Files</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Select which files you want to download. Each file contains different user data.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">3. Save to Google Drive</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Upload the downloaded files to Google Drive for secure backup and team access.</p>
                </div>
                
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Available Files</h3>
                  <div className="max-h-[200px] overflow-auto enhanced-scrollbar scrollbar-green pr-2">
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Waitlist Data: Emails and names from waitlist</li>
                      <li>Newsletter Data: Subscribers with interests</li>
                      <li>All Emails: Combined unique emails</li>
                      <li>Interests: Analytics on subscriber interests</li>
                      <li>Email-Name Pairs: Matching emails with names</li>
                      <li>Summary Report: Overview of all exported data</li>
                      <li>README: Instructions for using the data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 