import React, { useState, useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show animation after component load
    setTimeout(() => setIsVisible(true), 200);
    
    // Intersection Observer to trigger animations when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          
          // Add animation to each card with a delay
          const featureCards = document.querySelectorAll('.feature-card');
          if (featureCards.length > 0) {
            featureCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('opacity-100', 'translate-y-0');
              }, 100 + index * 100);
            });
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      title: 'Automated Bookkeeping',
      description: 'Our AI-powered system automatically categorizes transactions and reconciles accounts, saving you hours of manual work.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
        </svg>
      ),
      badge: 'Popular',
      stats: '90% time saved'
    },
    {
      title: 'WhatsApp Integration',
      description: 'Seamlessly communicate with your accounting system via WhatsApp for instant updates, tax reminders, and document uploads.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 8.5a7.5 7.5 0 11-14.893 3.36A7.5 7.5 0 0112 4.5c4.136 0 7.5 3.364 7.5 7.5 0 1.575-.462 3.045-1.274 4.32L21 21l-4.18-1.682C15.045 20.038 13.576 20.5 12 20.5z' />
        </svg>
      ),
      badge: 'New',
      stats: '24/7 support'
    },
    {
      title: 'Smart Tax Filing',
      description: 'Automated GST & ITR Filing with AI-powered automation. Real-Time Compliance Checks to avoid penalties with instant tax law updates.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z' />
        </svg>
      ),
      stats: '99.8% accuracy'
    },
    {
      title: 'Compliance Management',
      description: 'Stay compliant with all tax regulations with automated reminders and streamlined filing processes.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
        </svg>
      ),
      badge: '100% Compliant',
      stats: 'Zero penalties'
    },
    {
      title: 'Document Management',
      description: 'Securely store, organize, and retrieve all your financial documents with our cloud-based document management system.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' />
        </svg>
      ),
      stats: '100% secure'
    },
    {
      title: 'Designed for MSMEs & Freelancers',
      description: 'Expense & Profit Tracking to monitor business income & expenses with ease. OCR-Based Invoice Scanning to auto-extract data from receipts.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
        </svg>
      ),
      badge: 'Custom Built',
      stats: '10,000+ users'
    },
    {
      title: 'Financial Insights',
      description: 'Gain valuable insights into your business finances with customized reports and analytics dashboards.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
        </svg>
      ),
      stats: '25% growth avg.'
    },
    {
      title: 'AI-Powered Expense Tracking',
      description: 'Our intelligent system automatically categorizes and tracks your expenses, helping you maintain accurate financial records effortlessly.',
      icon: (
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
        </svg>
      ),
      badge: 'AI Powered',
      stats: '95% accuracy'
    }
  ];

  return (
    <section id='features' className='py-16 relative overflow-hidden'>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 -z-10"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 -z-5"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-5"></div>
      
      <div className='container mx-auto px-4 relative z-10' ref={featuresRef}>
        <div className='text-center mb-12'>
          <div className="inline-block mb-3">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              POWERFUL FEATURES
            </span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="gradient-text">Transform Your Financial Workflow</span>
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Streamline your financial operations with our comprehensive suite of AI-powered accounting and communication services.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card p-6 transition-all duration-500 transform opacity-0 translate-y-10 relative overflow-hidden 
                hover-float cursor-pointer rounded-xl`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                track('feature-card-click', { featureTitle: feature.title });
              }}
            >
              {/* Glass refraction effect */}
              <div className="glass-refraction"></div>
              
              {/* Card shine effect */}
              <div className="shine"></div>
              
              {feature.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded-md shadow-sm">
                  {feature.badge}
                </span>
              )}
              
              <div className='relative z-10 card-content'>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4 transition-all duration-300 
                  bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-md ${hoveredCard === index ? 'scale-110' : ''}`}>
                  {feature.icon}
                </div>
                
                <h3 className='text-lg font-bold text-gray-900 mb-2'>{feature.title}</h3>
                
                <p className='text-gray-600 leading-relaxed mb-4'>{feature.description}</p>
                
                {feature.stats && (
                  <div className="flex items-center">
                    <span className="text-xs font-semibold py-1 px-2.5 rounded-full text-indigo-700 bg-indigo-100/60">
                      {feature.stats}
                    </span>
                  </div>
                )}
               
                <div className={`mt-4 transition-all duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-indigo-600 font-medium text-sm flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className='mt-16 text-center'>
          <a 
            href='#waitlist' 
            className={`inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-3.5 rounded-lg 
              hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1
              shadow-md hover:shadow-xl ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            onClick={() => track('feature-cta-click')}
          >
            Join Our Waitlist
            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-md">Free</span>
          </a>
          
          <p className={`mt-4 text-sm text-gray-500 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
} 