import React from 'react';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Terms: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | Apna CA</title>
        <meta name="description" content="Terms of Service for Apna CA - Your AI-powered tax and accounting assistant" />
      </Head>
      
      <div className="bg-gradient-to-b from-yellow-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-yellow-600 transition-colors duration-300 flex items-center group">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span className="ml-1 group-hover:underline decoration-yellow-400 decoration-2 underline-offset-2">Home</span>
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium border-b-2 border-yellow-300 pb-0.5">Terms of Service</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-100 opacity-20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-100 opacity-20 rounded-full -ml-40 -mb-40"></div>
            
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full mb-4 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl" aria-hidden="true">📑</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 relative inline-block">
                Terms of Service
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></span>
              </h1>
              <p className="text-gray-600 mt-3">Last Updated: <span className="font-medium text-yellow-700">March 17, 2025</span></p>
            </div>
            
            {/* Table of Contents */}
            <div className="mb-10 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                <span className="inline-block border-b-2 border-yellow-400 pb-1">Quick Navigation</span>
              </h2>
              <ul className="space-y-3">
                {[
                  { id: "acceptance", title: "Acceptance of Terms" },
                  { id: "services", title: "Services Provided" },
                  { id: "responsibilities", title: "User Responsibilities" },
                  { id: "liability", title: "Limitation of Liability" },
                  { id: "modifications", title: "Modifications" }
                ].map((item, index) => (
                  <li key={item.id} className="flex group">
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-yellow-600 transition-colors duration-300 flex items-center">
                      <span className="flex items-center justify-center bg-yellow-100 text-yellow-800 w-6 h-6 rounded-full mr-3 text-xs font-bold group-hover:bg-yellow-200 transition-colors duration-300">{index + 1}</span>
                      <span className="group-hover:underline decoration-yellow-400 decoration-2 underline-offset-4">{item.title}</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-12">
              <section id="acceptance" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">1</span>
                  <span className="relative">
                    Acceptance of Terms
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    By accessing or using Apna CA, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="text-sm text-gray-700 italic">
                      Your continued use of our platform indicates your acceptance of these terms and any future modifications.
                    </p>
                  </div>
                </div>
              </section>
              
              <section id="services" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">2</span>
                  <span className="relative">
                    Services Provided
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    Apna CA provides AI-powered tax and accounting assistance. Our services include tax filing guidance, GST registration assistance, bookkeeping, and financial consulting.
                  </p>
                  
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    {[
                      { icon: "📊", title: "Tax Filing", desc: "Simplified tax preparation" },
                      { icon: "🔐", title: "GST Registration", desc: "Streamlined process" },
                      { icon: "📚", title: "Bookkeeping", desc: "Automated record keeping" },
                      { icon: "💼", title: "Consulting", desc: "Expert financial advice" }
                    ].map((service, i) => (
                      <div key={i} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xl mr-2">{service.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-800">{service.title}</h4>
                          <p className="text-xs text-gray-500">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-5 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm border border-blue-100">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
                      </svg>
                      <p>
                        <strong className="underline decoration-blue-300 decoration-2 underline-offset-2">Note:</strong> Our services are designed to assist with tax and accounting matters but do not replace professional advice from certified accountants or tax professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="responsibilities" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">3</span>
                  <span className="relative">
                    User Responsibilities
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Users are responsible for:
                  </p>
                  
                  <ul className="space-y-3">
                    {[
                      "Providing accurate and complete information.",
                      "Maintaining the confidentiality of their account credentials.",
                      "Ensuring their use of our services complies with applicable laws and regulations.",
                      "Verifying the accuracy of any tax filings or financial reports before submission."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-5 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold underline decoration-yellow-300 decoration-2 underline-offset-2">Remember:</span> The accuracy of your financial information directly impacts the quality of our service.
                    </p>
                  </div>
                </div>
              </section>
              
              <section id="liability" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">4</span>
                  <span className="relative">
                    Limitation of Liability
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    Apna CA is not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our services, including but not limited to errors, omissions, or inaccuracies in tax filings or financial reports.
                  </p>
                  
                  <div className="mt-5 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <div>
                        <p className="text-sm text-yellow-700 font-medium mb-1">
                          <strong className="underline decoration-yellow-400 decoration-2 underline-offset-2">Caution:</strong> Users are advised to review all information and seek professional advice for complex tax or financial matters.
                        </p>
                        <p className="text-xs text-yellow-600">
                          We recommend consulting with a certified professional for matters involving significant financial decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="modifications" className="scroll-mt-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-800 w-10 h-10 rounded-full mr-3 text-sm font-bold shadow-sm">5</span>
                  <span className="relative">
                    Modifications
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"></span>
                  </span>
                </h2>
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    Apna CA reserves the right to modify these Terms of Service at any time. Users will be notified of significant changes, and continued use of our services after such modifications constitutes acceptance of the updated terms.
                  </p>
                  
                  <div className="mt-5 flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Stay Updated</h4>
                      <p className="text-sm text-blue-700">
                        We recommend checking this page periodically for any changes to our Terms of Service.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Related Legal Documents */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 relative inline-block">
                Related Legal Documents
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent rounded-full"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Link href="/cookie-policy" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">🍪</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-yellow-700 transition-colors duration-300 flex items-center">
                      Cookie Policy
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">How we use cookies on our website</p>
                  </div>
                </Link>
                <Link href="/disclaimer" className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300 relative z-10">⚠️</div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-gray-800 group-hover:text-yellow-700 transition-colors duration-300 flex items-center">
                      Disclaimer
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">Important information about our services</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Back to top button */}
            <div className="mt-12 text-center">
              <a href="#" className="inline-flex items-center justify-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition-colors duration-300 group">
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

export default Terms; 