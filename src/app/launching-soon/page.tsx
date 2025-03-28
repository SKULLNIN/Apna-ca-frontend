'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LaunchingSoon() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Email state for newsletter
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifyService, setNotifyService] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLaunchDate = async () => {
      try {
        const response = await fetch('/api/launch-date');
        const data = await response.json();
        const launchDate = new Date(data.launchDate);
        
        // Initialize the timer immediately
        const now = new Date();
        const initialDifference = launchDate.getTime() - now.getTime();
        const initialDays = Math.floor(initialDifference / (1000 * 60 * 60 * 24));
        const initialHours = Math.floor((initialDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const initialMinutes = Math.floor((initialDifference % (1000 * 60 * 60)) / (1000 * 60));
        const initialSeconds = Math.floor((initialDifference % (1000 * 60)) / 1000);
        
        setTimeLeft({
          days: initialDays,
          hours: initialHours,
          minutes: initialMinutes,
          seconds: initialSeconds
        });
        
        const timer = setInterval(() => {
          const now = new Date();
          const difference = launchDate.getTime() - now.getTime();
          
          if (difference <= 0) {
            clearInterval(timer);
            return;
          }
          
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);
        
        return () => clearInterval(timer);
      } catch (error) {
        console.error('Error fetching launch date:', error);
      }
    };

    fetchLaunchDate();
    
    // Show animation after page load
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Services that will be available soon
  const upcomingServices = [
    {
      title: "Tax Filing",
      description: "Simplified tax filing for individuals and businesses",
      icon: "📄",
      features: ["GST Filing", "Income Tax Returns", "TDS Returns"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Business Registration",
      description: "Quick and easy company registration services",
      icon: "🏢",
      features: ["Company Incorporation", "GST Registration", "MSME Registration"],
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "Accounting & Bookkeeping",
      description: "Comprehensive accounting solutions for your business",
      icon: "📊",
      features: ["Financial Statements", "Bookkeeping", "Payroll Management"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Business Advisory",
      description: "Expert advice to help your business grow",
      icon: "💼",
      features: ["Business Planning", "Financial Analysis", "Growth Strategy"],
      color: "from-amber-500 to-orange-600"
    }
  ];

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribed(true);
    setShowConfetti(true);
    track('launching-soon-newsletter-subscribe', { email });
    
    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Handle service notification
  const handleNotifyService = (service: string) => {
    setNotifyService(service);
    // Scroll to newsletter section
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      )}
      
      <div className="bg-gradient-to-b from-indigo-50 via-blue-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 relative">
          <div className={`container mx-auto max-w-5xl text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <span className="inline-block py-1 px-4 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold animate-pulse">
                COMING SOON
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              We're Launching{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 inline-block transform hover:scale-105 transition-transform duration-300">Soon!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our team is working hard to bring you the best CA services tailored for modern businesses. Join our waitlist to be the first to know when we launch.
            </p>
            
            {/* Countdown Timer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-indigo-50 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative">
                    <div className="text-4xl md:text-6xl font-bold text-indigo-600 mb-2">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-500 text-sm uppercase tracking-wide font-medium">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Link 
                href="/waitlist" 
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300"
                onClick={() => track('launching-soon-waitlist-click')}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Join Our Waitlist
                </span>
              </Link>
              <a 
                href="#services" 
                className="inline-block bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 group"
                onClick={() => track('launching-soon-explore-click')}
              >
                <span className="flex items-center justify-center">
                  Explore Our Services
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-16 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
                Services Coming Soon
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-500 transform scale-x-50 hover:scale-x-100 transition-transform duration-500"></span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Here's a sneak peek at what we're preparing for you. All of our services are designed with modern businesses in mind.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingServices.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="p-1">
                    <div className={`bg-gradient-to-r ${service.color} h-2 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-2xl text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
                      <div className="bg-gray-50 p-5 rounded-lg mt-auto">
                        <h4 className="font-semibold text-gray-800 mb-3 text-lg">Key Features:</h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white mr-3 flex-shrink-0`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </span>
                              <span className="text-gray-700 text-lg">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 text-center">
                        <button 
                          className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${service.color} font-medium relative group-hover:font-semibold`}
                          onClick={() => {
                            handleNotifyService(service.title);
                            track('launching-soon-notify-click', { service: service.title });
                          }}
                        >
                          <span className="flex items-center justify-center">
                            Notify me when available
                            <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </span>
                          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-300`}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section id="newsletter" className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 transform skew-y-3 origin-top-right"></div>
          <div className="absolute inset-0 bg-opacity-90 backdrop-filter backdrop-blur-sm">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          </div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg inline-block">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    Stay Updated
                  </span>
                </div>
              </div>
              
              {!isSubscribed ? (
                <>
                  <h2 className="text-4xl font-bold text-white mb-4 mt-4">Get Launch Updates</h2>
                  <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                    {notifyService ? (
                      <>Be the first to know when our <span className="font-semibold">{notifyService}</span> service launches.</>
                    ) : (
                      <>Subscribe to receive updates about our launch date and exclusive offers.</>
                    )}
                  </p>
                  <form className="max-w-xl mx-auto" onSubmit={handleSubscribe}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-grow relative group">
                        <input 
                          type="email" 
                          placeholder="Enter your email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-inner"
                          required
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 group-focus-within:text-indigo-600 transition-colors duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="flex items-center justify-center">
                          Subscribe
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-indigo-200 mt-4">
                      By subscribing, you agree to our <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>. We'll never spam you or share your information.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 text-green-600">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Thank You for Subscribing!</h3>
                  <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
                    We'll keep you updated on our launch progress and exclusive offers.
                  </p>
                  <button 
                    onClick={() => setIsSubscribed(false)} 
                    className="text-indigo-100 underline hover:text-white transition-colors duration-300"
                  >
                    Subscribe with another email
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 px-4 relative">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
              Have Questions?
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-500 transform scale-x-50 hover:scale-x-100 transition-transform duration-500"></span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're here to help! Feel free to reach out to us for any questions about our upcoming services.
            </p>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Link 
                href="/contact" 
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300"
                onClick={() => track('launching-soon-contact-click')}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Contact Us
                </span>
              </Link>
              <Link 
                href="/faq" 
                className="inline-block bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 group"
                onClick={() => track('launching-soon-faq-click')}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  View FAQ
                  <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-confetti {
          animation: confetti 5s ease-in-out forwards;
        }
      `}</style>
    </Layout>
  );
} 