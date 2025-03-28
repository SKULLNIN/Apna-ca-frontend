'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { track } from '@vercel/analytics';

// Empty Instagram posts array since we're removing the post
const instagramPosts = [];

const InstagramFeed: React.FC = () => {
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
    
    document.querySelectorAll('.instagram-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/3 left-1/5 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold mb-4">
            SOCIAL MEDIA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Follow Us on Instagram</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're just getting started on Instagram! Follow us for upcoming financial tips and behind-the-scenes content.
          </p>
        </div>
        
        {/* No posts message */}
        <div 
          className="instagram-item max-w-2xl mx-auto text-center p-12 bg-white rounded-xl shadow-lg mb-10 border border-gray-100 opacity-0 translate-y-8 transition-all duration-500"
          style={{ transitionDelay: '150ms' }}
        >
          <div className="transform transition-all duration-500 hover:scale-105">
            <svg className="h-16 w-16 mx-auto text-pink-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
            <p className="text-gray-600">
              We haven't shared any posts yet. Check back soon for updates!
            </p>
          </div>
        </div>
        
        <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          <p className="text-gray-600 text-lg mb-6">
            We're just getting started! Content coming soon.
          </p>
          <Link 
            href="/instagram" 
            className="instagram-button inline-flex items-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300"
            onClick={() => track('instagram-profile-click')}
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              <path d="M12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
            </svg>
            <span className="relative">
              View Instagram Profile
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Follow us!
              </span>
            </span>
          </Link>
        </div>
        
        {/* Coming Soon Feature Cards - Upcoming Instagram content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Financial Tips', 'Behind the Scenes', 'Customer Success Stories'].map((category, index) => (
            <div 
              key={index}
              className={`instagram-item bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-500 opacity-0 translate-y-8 hover:-translate-y-2 hover:shadow-lg`} 
              style={{ transitionDelay: `${index * 150 + 450}ms` }}
            >
              <div className={`h-3 bg-gradient-to-r ${index === 0 ? 'from-pink-500 to-purple-500' : index === 1 ? 'from-purple-500 to-indigo-500' : 'from-indigo-500 to-blue-500'}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${index === 0 ? 'from-pink-500 to-purple-500' : index === 1 ? 'from-purple-500 to-indigo-500' : 'from-indigo-500 to-blue-500'} flex items-center justify-center text-white`}>
                    {index === 0 ? '💡' : index === 1 ? '🎬' : '🏆'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{category}</h3>
                </div>
                <p className="text-gray-600 mb-4">Coming soon to our Instagram feed. Stay tuned for valuable content!</p>
                <div className="text-pink-600 font-medium text-sm">
                  <span>Coming Q4 2023</span>
                </div>
              </div>
            </div>
          ))}
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
        
        .instagram-button {
          position: relative;
          overflow: hidden;
        }
        
        .instagram-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
          transform: rotate(30deg);
          transition: transform 0.6s;
        }
        
        .instagram-button:hover::after {
          transform: rotate(30deg) translate(50%, 50%);
        }
      `}</style>
    </section>
  );
};

export default InstagramFeed; 