'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';
import FeatureCard from '@/components/FeatureCard';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import InstagramFeed from '@/components/InstagramFeed';
import Layout from '@/components/Layout';
import { track } from '@vercel/analytics';
import ChatBot from '@/components/ChatBot';

export default function WaitlistPage() {
  const features = [
    {
      icon: '💼',
      title: 'Expert CA Services',
      description: 'Get access to qualified chartered accountants with years of industry experience.'
    },
    {
      icon: '📱',
      title: 'Digital-First Approach',
      description: 'Manage all your accounting needs through our user-friendly platform.'
    },
    {
      icon: '💰',
      title: 'Affordable Pricing',
      description: 'Transparent pricing plans designed to fit businesses of all sizes.'
    }
  ];

  const benefits = [
    {
      icon: '⭐',
      title: 'Priority Access',
      description: 'Be among the first to use our services when we launch.'
    },
    {
      icon: '🎁',
      title: 'Early Bird Offers',
      description: 'Get exclusive discounts and special offers only available to waitlist members.'
    },
    {
      icon: '🔄',
      title: 'Shape Our Product',
      description: 'Provide feedback that will influence our service offerings and features.'
    }
  ];

  return (
    <Layout>
      <main>
        <section className="bg-gradient-to-b from-indigo-800 to-indigo-700 text-white pt-16 pb-12 md:pt-32 md:pb-28">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-7 leading-tight animate-float">
              Simplified Accounting Services<br className="hidden md:block" />
              for Your Business
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-indigo-100 mx-auto mb-6 md:mb-10 animate-float animation-delay-500 max-w-3xl">
              Our innovative CA services are designed specifically for small businesses and startups in India.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-float animation-delay-1000">
              <a 
                href="#waitlist" 
                className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm md:text-base"
                onClick={() => track('hero-waitlist-button-click')}
              >
                Join Waitlist
              </a>
              <a 
                href="#pricing" 
                className="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-white/10 transition-colors transform hover:-translate-y-1 text-sm md:text-base"
                onClick={() => track('hero-pricing-button-click')}
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>

        <FeaturesSection />

        <div className="bg-gradient-to-b from-indigo-50 via-purple-50 to-indigo-100">
          {/* Join Our Waitlist Section */}
          <section className="py-12 md:py-20" id="waitlist">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold mb-3 md:mb-4">
                    LIMITED SPOTS AVAILABLE
                  </span>
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Join Our Waitlist</h2>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    Be the first to experience our revolutionary accounting services and get exclusive early access benefits.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">
                  <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
                        <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Why Join Our Waitlist?
                      </h3>
                      <ul className="space-y-3 md:space-y-4">
                        <li className="flex">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">Get <span className="font-semibold">20% discount</span> on your first 3 months</span>
                        </li>
                        <li className="flex">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">Priority onboarding with a dedicated account manager</span>
                        </li>
                        <li className="flex">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">Free consultation with our tax experts</span>
                        </li>
                        <li className="flex">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">Influence our product roadmap with your feedback</span>
                        </li>
                      </ul>
                      
                      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-indigo-800 font-medium">Limited spots available. Join now to secure your place!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 order-1 lg:order-2">
                    <div className="w-full">
                      <WaitlistForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits of Joining Early Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 md:mb-12">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold mb-3 md:mb-4">
                  EARLY ADOPTERS
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Benefits of Joining Early</h2>
                <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                  Get exclusive advantages when you join our waitlist before the official launch.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    onClick={() => track('benefit-card-click', { benefitTitle: benefit.title })}
                  >
                    <div className="text-3xl md:text-4xl mb-3 md:mb-4 bg-indigo-100 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-indigo-600">{benefit.icon}</div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Apna CA Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 md:mb-12">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold mb-3 md:mb-4">
                  WHY US
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Why Choose Apna CA?</h2>
                <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                  We're revolutionizing accounting services for small businesses and startups in India.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500"
                    onClick={() => track('feature-card-click', { featureTitle: feature.title })}
                  >
                    <div className="text-2xl md:text-3xl mb-3 md:mb-4">{feature.icon}</div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
                  
          {/* Pricing Section */}
          <PricingSection />
      
          
          {/* Instagram Feed Section */}
          <InstagramFeed />
        </div>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animation-delay-500 {
            animation-delay: 500ms;
          }
          
          .animation-delay-1000 {
            animation-delay: 1000ms;
          }
        `}</style>
      </main>
      <ChatBot autoOpen={true} />
    </Layout>
  );
} 