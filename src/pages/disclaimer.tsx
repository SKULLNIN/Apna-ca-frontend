import React from 'react';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Disclaimer: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Disclaimer | Apna CA</title>
        <meta name="description" content="Disclaimer for Apna CA - Your AI-powered tax and accounting assistant" />
      </Head>
      
      <div className="bg-gradient-to-b from-orange-50 via-white to-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 transition-colors duration-300 flex items-center group">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span className="ml-1 group-hover:underline decoration-orange-400 decoration-2 underline-offset-2">Home</span>
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium border-b-2 border-orange-300 pb-0.5">Disclaimer</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 opacity-20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gray-100 opacity-20 rounded-full -ml-40 -mb-40"></div>
            
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mb-4 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl" aria-hidden="true">⚠️</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 relative inline-block">
                Disclaimer
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full"></span>
              </h1>
              <p className="text-gray-600 mt-3">Last Updated: <span className="font-medium text-orange-700">March 17, 2025</span></p>
            </div>
            
            {/* Table of Contents */}
            <div className="mb-10 p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                <span className="inline-block border-b-2 border-orange-400 pb-1">Quick Navigation</span>
              </h2>
              <ul className="space-y-3">
                {[
                  { id: "no-professional-advice", title: "No Professional Advice" },
                  { id: "accuracy-liability", title: "Accuracy and Liability" },
                  { id: "third-party-links", title: "Third-Party Links" },
                  { id: "information-updates", title: "Information Updates" },
                  { id: "use-at-own-risk", title: "Use At Your Own Risk" }
                ].map((item, index) => (
                  <li key={item.id} className="flex group">
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-orange-600 transition-colors duration-300 flex items-center">
                      <span className="flex items-center justify-center bg-orange-100 text-orange-800 w-6 h-6 rounded-full mr-3 text-xs font-bold group-hover:bg-orange-200 transition-colors duration-300">{index + 1}</span>
                      <span className="group-hover:underline decoration-orange-400 decoration-2 underline-offset-4">{item.title}</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-12">
              <section id="no-professional-advice" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 text-orange-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">1</span>
                  <span className="relative">
                    No Professional Advice
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    The information provided on Apna CA is for general informational purposes only. It is not intended to be a substitute for professional advice, including legal, tax, or accounting advice. Always seek the advice of qualified professionals regarding your specific circumstances.
                  </p>
                  
                  <div className="mt-5 p-5 bg-orange-50 rounded-lg border border-orange-100 flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2 text-lg">Important Notice</h4>
                      <p className="text-orange-700">
                        Apna CA does not provide professional legal, tax, or accounting advice. Our AI-powered tools are designed to assist you, but they should not replace consultation with qualified professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="accuracy-liability" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 text-orange-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">2</span>
                  <span className="relative">
                    Accuracy and Liability
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our website.
                  </p>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                      Limitation of Liability
                    </h4>
                    <p className="text-gray-600 text-sm pl-7">
                      In no event will Apna CA be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of our website or services.
                    </p>
                  </div>
                </div>
              </section>
              
              <section id="third-party-links" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 text-orange-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">3</span>
                  <span className="relative">
                    Third-Party Links
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our website may contain links to third-party websites or services that are not owned or controlled by Apna CA. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <span className="text-orange-500 mr-2">🔗</span>
                        External Links
                      </h4>
                      <p className="text-sm text-gray-600">
                        We do not endorse any third-party websites linked from our platform. You access these links at your own risk.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <span className="text-orange-500 mr-2">🛡️</span>
                        Your Responsibility
                      </h4>
                      <p className="text-sm text-gray-600">
                        You should review the terms and privacy policies of any third-party websites you visit through links on our site.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="information-updates" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 text-orange-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">4</span>
                  <span className="relative">
                    Information Updates
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    The information on our website is subject to change without notice. We do not guarantee that the information is current or free from errors. Tax laws and regulations change frequently, and the information provided may not reflect the most current regulations.
                  </p>
                  
                  <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-sm text-blue-700">
                        <strong className="underline decoration-blue-300 decoration-2 underline-offset-2">Tip:</strong> Always verify information with official government sources or consult with a professional before making important financial or tax decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="use-at-own-risk" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 text-orange-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">5</span>
                  <span className="relative">
                    Use At Your Own Risk
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Your use of Apna CA's website and services is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. We reserve the right to modify or discontinue the service at any time without notice.
                  </p>
                  
                  <div className="p-5 bg-gradient-to-r from-orange-50 to-gray-50 rounded-lg border border-orange-100">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                      </svg>
                      Final Reminder
                    </h4>
                    <p className="text-gray-700">
                      By using Apna CA, you acknowledge that you have read and understood this disclaimer. If you do not agree with any part of this disclaimer, please do not use our website or services.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Link href="/" className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors duration-300">
                        <span>Return to Homepage</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Related Legal Documents */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 relative inline-block">
                Related Legal Documents
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Link href="/terms" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">📑</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-orange-700 transition-colors duration-300 flex items-center">
                      Terms of Service
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">Our terms and conditions</p>
                  </div>
                </Link>
                <Link href="/cookie-policy" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">🍪</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-orange-700 transition-colors duration-300 flex items-center">
                      Cookie Policy
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">How we use cookies on our website</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Back to top button */}
            <div className="mt-12 text-center">
              <a href="#" className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors duration-300 group">
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
};

export default Disclaimer; 