import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';

const NotFound = () => {
  return (
    <Layout>
      <Head>
        <title>Page Not Found | Apna CA</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Head>
      
      <div className="min-h-[80vh] bg-gradient-to-b from-yellow-50 via-white to-gray-50 py-20 flex items-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 opacity-20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 opacity-20 rounded-full -ml-48 -mb-48"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-gray-100 transform hover:scale-[1.01] transition-transform duration-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full mb-6 shadow-md mx-auto">
                  <span className="text-6xl" aria-hidden="true">🔍</span>
                </div>
                
                <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 mb-4">404</h1>
                
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 relative inline-block">
                  Page Not Found
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></span>
                </h2>
                
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Oops! The page you're looking for seems to have wandered off. It might be lost in the digital wilderness or has been moved to a new location.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Go back home</span>
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <svg className="mr-2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Contact support</span>
                  </Link>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">You might be looking for:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {[
                      { name: "Tax Filing Services", href: "/#services" },
                      { name: "GST Registration", href: "/#services" },
                      { name: "About Our Team", href: "/about#team" },
                      { name: "Contact Information", href: "/contact" }
                    ].map((link, i) => (
                      <Link 
                        key={i}
                        href={link.href} 
                        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-full mr-3 text-yellow-700 group-hover:bg-yellow-200 transition-colors duration-300">
                          {i + 1}
                        </span>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound; 