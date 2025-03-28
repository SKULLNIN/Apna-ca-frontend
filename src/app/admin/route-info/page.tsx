'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type RedisKey = {
  key: string;
  type: string;
};

type RouteInfoResponse = {
  redisKeys: string[];
  newsletterKeys: string[];
  waitlistKeys: string[];
  emails: string[];
  names: string[];
  interests: Record<string, number>;
  count: {
    total: number;
    newsletter: number;
    waitlist: number;
    emails: number;
    names: number;
    interests: number;
  };
  redisStatus: {
    connected: boolean;
    latency: string;
    url: string;
    tokenSet: boolean;
    error?: string;
  };
  env: {
    nodeEnv: string;
    vercel: boolean;
    region: string;
  };
};

export default function RouteInfoPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // States for popup panels
  const [showWaitlistPanel, setShowWaitlistPanel] = useState(false);
  const [showNewsletterPanel, setShowNewsletterPanel] = useState(false);
  
  // State for content zoom level
  const [zoomLevel, setZoomLevel] = useState(100);

  // Function to increase zoom
  const increaseZoom = () => {
    if (zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  // Function to decrease zoom
  const decreaseZoom = () => {
    if (zoomLevel > 70) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  // Function to reset zoom
  const resetZoom = () => {
    setZoomLevel(100);
  };

  useEffect(() => {
    // Check for admin cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const hasAdminSession = cookies.some(cookie => 
      cookie.startsWith('adminSession=')
    );
    
    setAuthenticated(hasAdminSession);
    
    if (hasAdminSession) {
      fetchRouteInfo();
    }
  }, []);

  const handleLogin = () => {
    // Very simple password protection - in production use proper auth
    if (password === 'lAxmesh@3521') {
      // Set a cookie that expires in 1 hour
      document.cookie = `adminSession=true; path=/; max-age=${60 * 60}`;
      setAuthenticated(true);
      setPasswordError(false);
      fetchRouteInfo();
    } else {
      setPasswordError(true);
    }
  };

  const fetchRouteInfo = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/route-info');
      
      if (!response.ok) {
        throw new Error('Failed to fetch route info');
      }
      
      const data = await response.json();
      setRouteInfo(data);
    } catch (err) {
      console.error('Error fetching route info:', err);
      setError('Failed to load route info. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (authenticated === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 opacity-20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 opacity-20 rounded-full -ml-48 -mb-48"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
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
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Admin Login</h1>
          
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter admin password"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
          >
            Log In
          </button>
          
          <div className="mt-6 text-center">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex flex-col relative overflow-hidden main-scrollbar">
      {/* Decorative elements - reduced size on mobile */}
      <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 opacity-10 rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-200 opacity-10 rounded-full -ml-24 sm:-ml-48 -mb-24 sm:-mb-48"></div>
      
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-sm border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Redis Database Info</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                href="/admin"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium bg-white py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-lg shadow-sm hover:shadow transition-all"
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
      
      {/* Scrollable container for the entire content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 relative z-10 overflow-x-auto enhanced-scrollbar main-scrollbar">
        {/* Zoom controls */}
        <div className="fixed right-4 bottom-4 z-20 flex flex-col space-y-2 bg-white p-2 rounded-lg shadow-md border border-gray-200">
          <button 
            onClick={increaseZoom}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-md transition-colors"
            title="Zoom In"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={resetZoom}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md transition-colors text-xs font-medium"
            title="Reset Zoom"
          >
            {zoomLevel}%
          </button>
          <button 
            onClick={decreaseZoom}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-md transition-colors"
            title="Zoom Out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex h-60 sm:h-96 items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs sm:text-sm text-red-700">{error}</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <button
                  onClick={fetchRouteInfo}
                  className="inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : routeInfo ? (
          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 min-w-[1000px]"
            style={{ zoom: `${zoomLevel}%` }}
          >
            {/* Summary Card */}
            <div className="lg:col-span-2">
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Database Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 border border-blue-200 shadow-sm">
                    <p className="text-xs sm:text-sm text-blue-700 font-medium mb-1">Total Entries</p>
                    <p className="text-xl sm:text-3xl font-bold text-blue-800">{routeInfo.count.total}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-md p-2 shadow-sm">
                        <p className="text-xs text-gray-500">Waitlist</p>
                        <p className="text-base sm:text-lg font-semibold text-blue-600">{routeInfo.count.waitlist}</p>
                      </div>
                      <div className="bg-white rounded-md p-2 shadow-sm">
                        <p className="text-xs text-gray-500">Newsletter</p>
                        <p className="text-base sm:text-lg font-semibold text-blue-600">{routeInfo.count.newsletter}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 border border-green-200 shadow-sm">
                    <p className="text-xs sm:text-sm text-green-700 font-medium mb-1">Total Emails</p>
                    <p className="text-xl sm:text-3xl font-bold text-green-800">{routeInfo.count.emails}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-md p-2 shadow-sm">
                        <p className="text-xs text-gray-500">Waitlist</p>
                        <p className="text-base sm:text-lg font-semibold text-green-600">{routeInfo.waitlistKeys.length}</p>
                      </div>
                      <div className="bg-white rounded-md p-2 shadow-sm">
                        <p className="text-xs text-gray-500">Newsletter</p>
                        <p className="text-base sm:text-lg font-semibold text-green-600">{routeInfo.newsletterKeys.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-6 border border-purple-200 shadow-sm">
                    <p className="text-xs sm:text-sm text-purple-700 font-medium mb-1">Unique Names</p>
                    <p className="text-xl sm:text-3xl font-bold text-purple-800">{routeInfo.count.names}</p>
                    <div className="mt-2">
                      <div className="bg-white rounded-md p-2 shadow-sm">
                        <p className="text-xs text-gray-500">Unique Interests</p>
                        <p className="text-base sm:text-lg font-semibold text-purple-600">{routeInfo.count.interests}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Stats Card (if needed) */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 sm:p-6 border border-yellow-200 shadow-sm md:col-span-3 lg:col-span-1">
                    <p className="text-xs sm:text-sm text-yellow-700 font-medium mb-1">Key Statistics</p>
                    <p className="text-xl sm:text-3xl font-bold text-yellow-800">{routeInfo.redisKeys.length}</p>
                    <div className="mt-2">
                      <div className="bg-white rounded-md p-2 shadow-sm">
                        <p className="text-xs text-gray-500">Total Redis Keys</p>
                        <p className="text-base sm:text-lg font-semibold text-yellow-600">{routeInfo.redisKeys.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Redis Keys and Details - Scrollable on all devices */}
                <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 max-h-[400px] overflow-auto enhanced-scrollbar scrollbar-blue">
                  <h3 className="text-md font-semibold mb-3 text-gray-700 sticky top-0 bg-white pt-1 pb-2 z-10">All Redis Keys <span className="text-sm text-gray-500 font-normal">({routeInfo.redisKeys.length})</span></h3>
                  <div className="pr-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {routeInfo.redisKeys.map((key, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-50 rounded p-2 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => {
                            // Set selected key in UI
                            const detailsElement = document.getElementById('redis-key-details');
                            const keyLabel = document.getElementById('selected-key-label');
                            
                            if (detailsElement && keyLabel) {
                              keyLabel.innerText = key;
                              detailsElement.classList.remove('hidden');
                              
                              // Add key type and value information here
                              // This would ideally fetch from the API, but for now just show the key
                              const keyTypeElement = document.getElementById('selected-key-type');
                              if (keyTypeElement) {
                                keyTypeElement.innerText = key.startsWith('waitlist:') ? 'hash' : 
                                                          key.startsWith('newsletter:') ? 'hash' : 'unknown';
                              }
                            }
                          }}
                        >
                          <code className="text-xs font-mono text-gray-800 break-all">{key}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Key Details View - Hidden initially */}
                <div id="redis-key-details" className="mt-4 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-blue-200 hidden max-h-[350px] overflow-auto enhanced-scrollbar scrollbar-blue">
                  <div className="flex justify-between items-center mb-3 sticky top-0 bg-white pt-1 pb-2 z-10">
                    <h3 className="text-md font-semibold text-blue-700">Key Details</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        const detailsElement = document.getElementById('redis-key-details');
                        if (detailsElement) {
                          detailsElement.classList.add('hidden');
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-3 overflow-auto">
                    <code id="selected-key-label" className="font-mono text-sm text-blue-800 break-all"></code>
                    <div className="mt-2 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Type: <span id="selected-key-type"></span></span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-500 mb-2">This is a visual representation of the Redis database. Click on a key to view more information.</p>
                      <p className="text-xs text-gray-500">In a production environment, you would be able to view and edit the contents of each key.</p>
                    </div>
                  </div>
                </div>
                
                {/* Redis Status - Collapsible on mobile */}
                <div className="mt-4 sm:mt-6">
                  <button 
                    className="flex justify-between items-center w-full text-left mb-2"
                    onClick={() => {
                      // Toggle visibility of Redis status details
                      const redisStatus = document.getElementById('redis-status-details');
                      if (redisStatus) {
                        redisStatus.classList.toggle('hidden');
                      }
                    }}
                  >
                    <h3 className="text-sm sm:text-md font-semibold text-gray-700">Redis Connection Status</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="redis-status-details" className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 hidden sm:block enhanced-scrollbar max-h-[200px] overflow-auto">
                    <div className="flex items-center">
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2 ${routeInfo.redisStatus.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-xs sm:text-sm font-medium">{routeInfo.redisStatus.connected ? 'Connected' : 'Disconnected'}</p>
                      {routeInfo.redisStatus.connected && (
                        <p className="text-xs sm:text-sm text-gray-500 ml-3 sm:ml-4">Latency: {routeInfo.redisStatus.latency}</p>
                      )}
                    </div>
                    {routeInfo.redisStatus.error && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">{routeInfo.redisStatus.error}</p>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      <p>URL: {routeInfo.redisStatus.url}</p>
                      <p>Token: {routeInfo.redisStatus.tokenSet ? 'Set' : 'Not Set'}</p>
                    </div>
                  </div>
                </div>

                {/* Environment Info - Collapsible on mobile */}
                <div className="mt-3 sm:mt-4">
                  <button 
                    className="flex justify-between items-center w-full text-left mb-2"
                    onClick={() => {
                      // Toggle visibility of environment details
                      const envDetails = document.getElementById('env-details');
                      if (envDetails) {
                        envDetails.classList.toggle('hidden');
                      }
                    }}
                  >
                    <h3 className="text-sm sm:text-md font-semibold text-gray-700">Environment</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="env-details" className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 hidden sm:block enhanced-scrollbar max-h-[200px] overflow-auto">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Node Environment</p>
                        <p className="text-xs sm:text-sm font-medium">{routeInfo.env.nodeEnv}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vercel</p>
                        <p className="text-xs sm:text-sm font-medium">{routeInfo.env.vercel ? 'Yes' : 'No'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Region</p>
                        <p className="text-xs sm:text-sm font-medium">{routeInfo.env.region}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowWaitlistPanel(true)}
                      className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors shadow-sm hover:shadow"
                    >
                      View Waitlist Data
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 sm:ml-2 h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setShowNewsletterPanel(true)}
                      className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                    >
                      View Newsletter Data
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 sm:ml-2 h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                  <Link 
                    href="/admin/data-management"
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm hover:shadow"
                  >
                    Export Data
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 sm:ml-2 h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Waitlist Panel - Floating Popup */}
            {showWaitlistPanel && (
              <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="waitlist-panel" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  {/* Background overlay */}
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowWaitlistPanel(false)}></div>
                  
                  {/* Panel positioning */}
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  
                  {/* Panel content */}
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full">
                    <div className="bg-white p-4 sm:p-6 max-h-[80vh] overflow-auto enhanced-scrollbar scrollbar-yellow">
                      <div className="sticky top-0 z-10 bg-white py-2 flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                        <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800">Waitlist Data</h2>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            {routeInfo.waitlistKeys.length} entries
                          </span>
                          <button 
                            onClick={() => setShowWaitlistPanel(false)}
                            className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
                          >
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-6">
                        {/* Redis Keys */}
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Redis Keys <span className="text-xs text-gray-500 font-normal">({routeInfo.waitlistKeys.length})</span></h3>
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-[200px] enhanced-scrollbar scrollbar-yellow">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {routeInfo.waitlistKeys.map((key, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm font-mono text-gray-900 truncate max-w-[250px]">{key}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        {/* Emails */}
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Emails <span className="text-xs text-gray-500 font-normal">({routeInfo.emails.filter(e => routeInfo.waitlistKeys.some(k => e && k.includes(e.split('@')[0]))).length})</span></h3>
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-[250px] enhanced-scrollbar scrollbar-yellow">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {routeInfo.emails
                                  .filter(email => routeInfo.waitlistKeys.some(key => email && key.includes(email.split('@')[0])))
                                  .map((email, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                      <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{email}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        {/* Names */}
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Names <span className="text-xs text-gray-500 font-normal">({routeInfo.names.length})</span></h3>
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-[250px] enhanced-scrollbar scrollbar-yellow">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {routeInfo.names.map((name, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{name}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Newsletter Panel - Floating Popup */}
            {showNewsletterPanel && (
              <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="newsletter-panel" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  {/* Background overlay */}
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowNewsletterPanel(false)}></div>
                  
                  {/* Panel positioning */}
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  
                  {/* Panel content */}
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full">
                    <div className="bg-white p-4 sm:p-6 max-h-[80vh] overflow-auto enhanced-scrollbar scrollbar-blue">
                      <div className="sticky top-0 z-10 bg-white py-2 flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                        <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Newsletter Data</h2>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                            {routeInfo.newsletterKeys.length} entries
                          </span>
                          <button 
                            onClick={() => setShowNewsletterPanel(false)}
                            className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
                          >
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-6">
                        {/* Redis Keys */}
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Redis Keys <span className="text-xs text-gray-500 font-normal">({routeInfo.newsletterKeys.length})</span></h3>
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-[200px] enhanced-scrollbar scrollbar-blue">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {routeInfo.newsletterKeys.map((key, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm font-mono text-gray-900 truncate max-w-[250px]">{key}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        {/* Emails */}
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Emails <span className="text-xs text-gray-500 font-normal">({routeInfo.emails.filter(e => routeInfo.newsletterKeys.some(k => e && k.includes(e.split('@')[0]))).length})</span></h3>
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-[250px] enhanced-scrollbar scrollbar-blue">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {routeInfo.emails
                                  .filter(email => routeInfo.newsletterKeys.some(key => email && key.includes(email.split('@')[0])))
                                  .map((email, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                      <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{email}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        {/* Interests */}
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Interests <span className="text-xs text-gray-500 font-normal">({Object.keys(routeInfo.interests).length})</span></h3>
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-[250px] enhanced-scrollbar scrollbar-blue">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(routeInfo.interests).map(([interest, count], index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{interest}</td>
                                    <td className="px-3 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{count}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* JavaScript to initialize panels on page load */}
            <script 
              dangerouslySetInnerHTML={{
                __html: `
                  // Function to handle keyboard shortcuts
                  function initializeKeyboardShortcuts() {
                    if (typeof window !== 'undefined') {
                      document.addEventListener('keydown', (e) => {
                        // ESC key closes any open panels
                        if (e.key === 'Escape') {
                          const waitlistPanel = document.getElementById('waitlist-panel');
                          const newsletterPanel = document.getElementById('newsletter-panel');
                          
                          if (waitlistPanel && !waitlistPanel.classList.contains('hidden')) {
                            waitlistPanel.classList.add('hidden');
                          }
                          
                          if (newsletterPanel && !newsletterPanel.classList.contains('hidden')) {
                            newsletterPanel.classList.add('hidden');
                          }
                        }
                      });
                    }
                  }
                  
                  // Run on page load
                  if (typeof window !== 'undefined') {
                    window.addEventListener('DOMContentLoaded', initializeKeyboardShortcuts);
                  }
                `
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
} 