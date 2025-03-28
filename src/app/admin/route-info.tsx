'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RouteInfo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <h1 className="text-red-500 text-2xl mb-4">Error: {error}</h1>
        <button 
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Redis Database Info</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Waitlist Data</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Email Addresses ({data?.waitlist?.emailCount || 0})</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                {data?.waitlist?.emails?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.waitlist.emails.map((email: string) => (
                      <li key={email} className="mb-1">{email}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No email addresses found</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Names ({data?.waitlist?.nameCount || 0})</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                {data?.waitlist?.names?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.waitlist.names.map((name: string) => (
                      <li key={name} className="mb-1">{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No names found</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Entry Keys ({data?.waitlist?.entryCount || 0})</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                {data?.waitlist?.keys?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.waitlist.keys.map((key: string) => (
                      <li key={key} className="mb-1 font-mono text-sm">{key}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No entry keys found</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Newsletter Data</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Email Addresses ({data?.newsletter?.emailCount || 0})</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                {data?.newsletter?.emails?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.newsletter.emails.map((email: string) => (
                      <li key={email} className="mb-1">{email}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No email addresses found</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Names ({data?.newsletter?.nameCount || 0})</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                {data?.newsletter?.names?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.newsletter.names.map((name: string) => (
                      <li key={name} className="mb-1">{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No names found</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Entry Keys ({data?.newsletter?.entryCount || 0})</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                {data?.newsletter?.keys?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.newsletter.keys.map((key: string) => (
                      <li key={key} className="mb-1 font-mono text-sm">{key}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No entry keys found</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3">All Redis Keys ({data?.allKeys?.length || 0})</h3>
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-4 bg-gray-50">
            {data?.allKeys?.length > 0 ? (
              <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
                {data.allKeys.sort().map((key: string) => (
                  <li key={key} className="mb-2 font-mono text-sm">{key}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No keys found in Redis</p>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/admin/dashboard" 
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 