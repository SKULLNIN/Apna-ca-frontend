'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { track } from '@vercel/analytics';

// Inline Testimonial component to replace the external TestimonialCard
interface TestimonialProps {
  quote: string;
  author: string;
  position?: string;
  rating?: number;
  id?: string;
  imageSrc?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  position,
  rating = 5,
  id,
  imageSrc
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="flex items-start mb-4">
        {imageSrc ? (
          <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
            <Image 
              src={imageSrc} 
              alt={author} 
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div>
            <svg className="h-8 w-8 text-indigo-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-gray-700 text-lg italic mb-4 leading-relaxed">"{quote}"</p>
      
      {/* Star Rating */}
      {rating && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <p className="text-indigo-600 font-medium">{author}</p>
        {position && <p className="text-gray-500 text-sm">{position}</p>}
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
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
    
    document.querySelectorAll('.testimonial-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Testimonials Section */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what early users have to say about Apna CA.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div 
            className="testimonial-item opacity-0 translate-y-8 transition-all duration-500 md:col-span-2"
            style={{ transitionDelay: '0ms' }}
          >
            <Testimonial 
              quote="Apna CA has revolutionized how I handle my business finances. Their platform is incredibly user-friendly and the automated GST filing has saved me countless hours. The real-time financial insights have helped me make smarter business decisions."
              author="Siddharth Mehta"
              position="Tech Entrepreneur"
              rating={5}
              id="1"
              imageSrc="/images/testimonial-new.jpg"
            />
          </div>
          <div 
            className="testimonial-item opacity-0 translate-y-8 transition-all duration-500"
            style={{ transitionDelay: '150ms' }}
          >
            <Testimonial 
              quote="I've tried many accounting services, but Apna CA stands out with its personalized approach and attention to detail."
              author="Priya Patel"
              position="Freelance Designer"
              rating={4}
              id="2"
            />
          </div>
        </div>
        
        <div className={`text-center mt-8 mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '450ms' }}>
          <Link 
            href="/testimonials" 
            className="inline-block bg-white text-indigo-600 border-2 border-indigo-200 font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 duration-300"
            onClick={() => track('view-all-testimonials-click')}
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              View All Testimonials
            </span>
          </Link>
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

export default TestimonialsSection; 