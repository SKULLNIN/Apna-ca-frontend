'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 via-white to-yellow-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors duration-300 flex items-center group">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span className="ml-1 group-hover:underline decoration-blue-400 decoration-2 underline-offset-2">Home</span>
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium border-b-2 border-blue-300 pb-0.5">Cookie Policy</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 opacity-20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-100 opacity-20 rounded-full -ml-40 -mb-40"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-200 opacity-10 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-yellow-200 opacity-10 rounded-full"></div>
            
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl" aria-hidden="true">🍪</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 relative inline-block">
                Cookie Policy
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full"></span>
              </h1>
              <p className="text-gray-600 mt-3">Last Updated: <span className="font-medium text-blue-700">March 17, 2025</span></p>
            </div>
            
            {/* Table of Contents */}
            <div className="mb-10 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                <span className="inline-block border-b-2 border-blue-400 pb-1">Quick Navigation</span>
              </h2>
              <ul className="space-y-3">
                {[
                  { id: "what-are-cookies", title: "What Are Cookies?" },
                  { id: "how-we-use", title: "How We Use Cookies" },
                  { id: "managing-cookies", title: "Managing Cookies" },
                  { id: "types-of-cookies", title: "Types of Cookies We Use" }
                ].map((item, index) => (
                  <li key={item.id} className="flex group">
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center">
                      <span className="flex items-center justify-center bg-blue-100 text-blue-800 w-6 h-6 rounded-full mr-3 text-xs font-bold group-hover:bg-blue-200 transition-colors duration-300">{index + 1}</span>
                      <span className="group-hover:underline decoration-blue-400 decoration-2 underline-offset-4">{item.title}</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Content sections */}
            <div className="space-y-12">
              {/* What Are Cookies Section */}
              <section id="what-are-cookies">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
                <div className="bg-blue-50 p-6 rounded-lg mb-6 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Did You Know? 🍪</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The term "cookie" was coined by Lou Montulli in 1994 while working at Netscape. He was inspired by the concept of a "magic cookie" in Unix - a token used to identify a user or transaction. The name stuck because, like a fortune cookie, an HTTP cookie contains a hidden message (data)!
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies are small text files that websites place on your device to store information about your browsing preferences, login status, and other data that helps improve your online experience.
                </p>
              </section>

              {/* How We Use Cookies Section */}
              <section id="how-we-use">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Cookies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "🔐",
                      title: "Authentication",
                      description: "To keep you signed in and secure your account"
                    },
                    {
                      icon: "📊",
                      title: "Analytics",
                      description: "To understand how visitors interact with our site"
                    },
                    {
                      icon: "⚡",
                      title: "Performance",
                      description: "To optimize loading times and site functionality"
                    },
                    {
                      icon: "🎯",
                      title: "Personalization",
                      description: "To remember your preferences and provide tailored content"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <span className="text-2xl mr-4">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Managing Cookies Section */}
              <section id="managing-cookies">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Cookies</h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Browser Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { browser: "Chrome", icon: "🌐" },
                      { browser: "Firefox", icon: "🦊" },
                      { browser: "Safari", icon: "🧭" },
                      { browser: "Edge", icon: "📱" }
                    ].map((browser, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-2xl mb-2">{browser.icon}</div>
                        <h4 className="font-medium text-gray-900">{browser.browser}</h4>
                        <p className="text-sm text-gray-600 mt-1">Settings → Privacy</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Types of Cookies Section */}
              <section id="types-of-cookies">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-gray-700">Required for basic site functionality and security</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-green-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Preference Cookies</h3>
                    <p className="text-gray-700">Remember your settings and improve your experience</p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p className="text-gray-700">Help us understand how visitors use our site</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-purple-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                    <p className="text-gray-700">Track your activity to deliver relevant content</p>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Related Legal Documents */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 relative inline-block">
                Related Legal Documents
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 to-transparent rounded-full"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Link href="/terms" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">📑</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300 flex items-center">
                      Terms of Service
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">Our terms and conditions</p>
                  </div>
                </Link>
                <Link href="/privacy" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">🔒</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300 flex items-center">
                      Privacy Policy
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">How we protect your data</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Back to top button */}
            <div className="mt-12 text-center">
              <a href="#" className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-300 group">
                <svg className="w-4 h-4 mr-2 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 