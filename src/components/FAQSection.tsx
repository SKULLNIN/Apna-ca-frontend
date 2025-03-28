'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';

const FAQSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show animation after component load
    setTimeout(() => setIsVisible(true), 200);
    
    // Intersection Observer to trigger animations when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    document.querySelectorAll('.faq-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "When will Apna CA officially launch?",
      answer: "We're planning to launch in phases starting Q4 2023. Waitlist members will get early access before the public launch."
    },
    {
      question: "What benefits do I get by joining the waitlist?",
      answer: "Waitlist members receive 20% off for the first 3 months, priority onboarding with a dedicated account manager, free consultation with our tax experts, and the opportunity to provide feedback on our product roadmap."
    },
    {
      question: "Is there a fee to join the waitlist?",
      answer: "No, joining the waitlist is completely free. You'll only pay when you decide to use our services after launch."
    },
    {
      question: "How will I know when I can access the platform?",
      answer: "We'll send you an email with your exclusive early access link when your spot on the waitlist is ready. Make sure to add contact@apnaca.ai to your contacts to prevent missing our invitation."
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our waitlist and upcoming services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item bg-white rounded-xl shadow-md overflow-hidden mb-4 hover:shadow-lg transition-all duration-500 opacity-0 translate-y-8`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer p-6">
                  <h4 className="text-lg font-semibold text-gray-900">{faq.question}</h4>
                  <div className="w-6 h-6 flex items-center justify-center text-indigo-600 group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
          
          <div className={`text-center mt-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link 
              href="/contact" 
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              onClick={() => track('faq-contact-click')}
            >
              Contact our support team →
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
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
      `}</style>
    </section>
  );
};

export default FAQSection; 