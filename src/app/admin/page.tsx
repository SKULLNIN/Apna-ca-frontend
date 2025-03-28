'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type WaitlistEntry = {
  id: string;
  email: string;
  name: string;
  timestamp: number;
};

type NewsletterEntry = {
  id: string;
  email: string;
  name: string;
  timestamp: number;
  interests: string[];
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'waitlist' | 'newsletter'>('dashboard');
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([]);
  const [newsletterData, setNewsletterData] = useState<NewsletterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    // Check for admin cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const hasAdminSession = cookies.some(cookie => 
      cookie.startsWith('adminSession=')
    );
    
    setAuthenticated(hasAdminSession);
  }, []);

  useEffect(() => {
    if (authenticated && (activeTab === 'waitlist' || activeTab === 'newsletter')) {
      fetchData();
    }
  }, [authenticated, activeTab]);

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

  const fetchData = async () => {
    setIsLoading(true);
    setDataError(null);
    
    try {
      const endpoint = activeTab === 'waitlist' 
        ? '/api/admin/waitlist' 
        : '/api/admin/newsletter';
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      
      if (activeTab === 'waitlist') {
        setWaitlistData(data.entries || []);
      } else {
        setNewsletterData(data.entries || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setDataError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-yellow-50 via-white to-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  if (authenticated === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 opacity-20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 opacity-20 rounded-full -ml-48 -mb-48"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
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
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">Admin Login</h1>
          
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter admin password"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
          >
            Log In
          </button>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-yellow-600 hover:text-yellow-800 text-sm font-medium inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-gray-50 flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 opacity-10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 opacity-10 rounded-full -ml-48 -mb-48"></div>
      
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-sm border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">Admin Dashboard</h1>
            <button
              onClick={() => {
                document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                setAuthenticated(false);
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 relative z-10">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`${
                activeTab === 'dashboard'
                  ? 'border-yellow-500 text-yellow-600 font-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`${
                activeTab === 'waitlist'
                  ? 'border-yellow-500 text-yellow-600 font-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Waitlist Submissions
            </button>
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`${
                activeTab === 'newsletter'
                  ? 'border-yellow-500 text-yellow-600 font-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Newsletter Subscriptions
            </button>
          </nav>
        </div>
        
        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-yellow-700">
                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800">Redis Database Info</h2>
              <p className="text-gray-600 mb-4">View and manage newsletter and waitlist entries stored in Redis. Monitor sign-ups and data integrity.</p>
              <Link 
                href="/admin/route-info" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors shadow-sm hover:shadow"
              >
                View Database Info
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-green-700">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Secure Data Export</h2>
              <p className="text-gray-600 mb-4">Export email lists and subscriber data to text files. Save to Google Drive for backup and analysis.</p>
              <Link 
                href="/admin/data-management" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm hover:shadow"
              >
                Export Data
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-purple-700">
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">User Management</h2>
              <p className="text-gray-600 mb-4">View public pages for newsletter and waitlist to test the user experience and form functionality.</p>
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/newsletter" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm hover:shadow"
                >
                  Newsletter Page
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href="/waitlist" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
                >
                  Waitlist Page
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Waitlist Tab Content */}
        {activeTab === 'waitlist' && (
          <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-yellow-800">Waitlist Submissions</h3>
              <p className="mt-1 text-sm text-gray-600">Total entries: {waitlistData.length}</p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              </div>
            ) : dataError ? (
              <div className="p-6 text-center">
                <p className="text-red-500">{dataError}</p>
                <button
                  onClick={fetchData}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors shadow-sm hover:shadow"
                >
                  Try Again
                </button>
              </div>
            ) : waitlistData.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No waitlist submissions found.
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto enhanced-scrollbar scrollbar-yellow">
                <ul className="divide-y divide-gray-200">
                  {waitlistData.map((entry) => (
                    <li key={entry.id} className="px-4 py-4 sm:px-6 hover:bg-yellow-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-yellow-700 truncate">{entry.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="flex items-center text-sm text-gray-600">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          {entry.email}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Newsletter Tab Content */}
        {activeTab === 'newsletter' && (
          <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-blue-800">Newsletter Subscriptions</h3>
              <p className="mt-1 text-sm text-gray-600">Total entries: {newsletterData.length}</p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : dataError ? (
              <div className="p-6 text-center">
                <p className="text-red-500">{dataError}</p>
                <button
                  onClick={fetchData}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                >
                  Try Again
                </button>
              </div>
            ) : newsletterData.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No newsletter subscriptions found.
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto enhanced-scrollbar scrollbar-blue">
                <ul className="divide-y divide-gray-200">
                  {newsletterData.map((entry) => (
                    <li key={entry.id} className="px-4 py-4 sm:px-6 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-700 truncate">{entry.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="flex items-center text-sm text-gray-600">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          {entry.email}
                        </p>
                      </div>
                      {entry.interests && entry.interests.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {entry.interests.map((interest, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 