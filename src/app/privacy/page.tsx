'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-purple-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600 transition-colors duration-300 flex items-center group">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span className="ml-1 group-hover:underline decoration-purple-400 decoration-2 underline-offset-2">Home</span>
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium border-b-2 border-purple-300 pb-0.5">Privacy Policy</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-100 opacity-20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-100 opacity-20 rounded-full -ml-40 -mb-40"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-200 opacity-10 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-blue-200 opacity-10 rounded-full"></div>
            
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl" aria-hidden="true">🔒</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 relative inline-block">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 to-purple-500 rounded-full"></span>
              </h1>
              <p className="text-gray-600 mt-3">Last Updated: <span className="font-medium text-purple-700">March 17, 2025</span></p>
            </div>
            
            {/* Table of Contents */}
            <div className="mb-10 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                <span className="inline-block border-b-2 border-purple-400 pb-1">Quick Navigation</span>
              </h2>
              <ul className="space-y-3">
                {[
                  { id: "information-collection", title: "Information We Collect" },
                  { id: "information-use", title: "How We Use Your Information" },
                  { id: "data-protection", title: "Data Protection" },
                  { id: "your-rights", title: "Your Rights" },
                  { id: "third-party", title: "Third-Party Services" },
                  { id: "updates", title: "Policy Updates" }
                ].map((item, index) => (
                  <li key={item.id} className="flex group">
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-purple-600 transition-colors duration-300 flex items-center">
                      <span className="flex items-center justify-center bg-purple-100 text-purple-800 w-6 h-6 rounded-full mr-3 text-xs font-bold group-hover:bg-purple-200 transition-colors duration-300">{index + 1}</span>
                      <span className="group-hover:underline decoration-purple-400 decoration-2 underline-offset-4">{item.title}</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Content sections */}
            <div className="space-y-12">
              {/* Information Collection Section */}
              <section id="information-collection">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "👤",
                      title: "Personal Information",
                      description: "Name, email, contact details provided by you"
                    },
                    {
                      icon: "📱",
                      title: "Device Information",
                      description: "Browser type, IP address, device identifiers"
                    },
                    {
                      icon: "🔍",
                      title: "Usage Data",
                      description: "How you interact with our services"
                    },
                    {
                      icon: "📊",
                      title: "Analytics Data",
                      description: "Service usage patterns and preferences"
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

              {/* Information Use Section */}
              <section id="information-use">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <ul className="space-y-4">
                    {[
                      "Provide and improve our services",
                      "Personalize your experience",
                      "Process your transactions",
                      "Send important updates and notifications",
                      "Analyze and enhance security",
                      "Comply with legal obligations"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Data Protection Section */}
              <section id="data-protection">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Protection</h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Encryption",
                        description: "All data is encrypted in transit and at rest",
                        icon: "🔐"
                      },
                      {
                        title: "Access Controls",
                        description: "Strict access controls and authentication",
                        icon: "🚪"
                      },
                      {
                        title: "Regular Audits",
                        description: "Continuous security monitoring and audits",
                        icon: "📋"
                      },
                      {
                        title: "Data Backups",
                        description: "Regular secure backups of your data",
                        icon: "💾"
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Your Rights Section */}
              <section id="your-rights">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
                <div className="space-y-6">
                  {[
                    {
                      right: "Access Your Data",
                      description: "Request a copy of your personal data",
                      icon: "📂"
                    },
                    {
                      right: "Data Correction",
                      description: "Update or correct your information",
                      icon: "✏️"
                    },
                    {
                      right: "Data Deletion",
                      description: "Request deletion of your data",
                      icon: "🗑️"
                    },
                    {
                      right: "Data Portability",
                      description: "Transfer your data to another service",
                      icon: "↗️"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.right}</h3>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Third-Party Services Section */}
              <section id="third-party">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
                <div className="bg-red-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We may use third-party services for:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Analytics and tracking",
                      "Payment processing",
                      "Email communications",
                      "Cloud storage",
                      "Customer support"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Policy Updates Section */}
              <section id="updates">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Updates</h2>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Posting the new policy on this page",
                      "Sending an email notification",
                      "Updating the 'Last Updated' date",
                      "Displaying a prominent notice in our service"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">{index + 1}</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
            
            {/* Related Legal Documents */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 relative inline-block">
                Related Legal Documents
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 to-transparent rounded-full"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Link href="/terms" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">📑</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-300 flex items-center">
                      Terms of Service
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">Our terms and conditions</p>
                  </div>
                </Link>
                <Link href="/cookie-policy" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">🍪</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-300 flex items-center">
                      Cookie Policy
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">How we use cookies</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Back to top button */}
            <div className="mt-12 text-center">
              <a href="#" className="inline-flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors duration-300 group">
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