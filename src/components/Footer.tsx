import React, { useState } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import dynamic from 'next/dynamic';

// Create a client-side only component for the legal section
const LegalSection = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>), {
  ssr: false
});

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        setIsSubmitting(true);
        setError(null);
        
        // Call the API to store the newsletter subscription
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          setIsSubscribed(true);
          track('footer-newsletter-subscribe', { email });
          setTimeout(() => {
            setIsSubscribed(false);
            setEmail('');
          }, 3000);
        } else {
          setError(data.message || 'Subscription failed. Please try again.');
        }
      } catch (err) {
        console.error('Error submitting newsletter subscription:', err);
        setError('Network error. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <footer className="relative mt-auto">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg className="relative block w-full h-8 sm:h-10 md:h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.32,118.92,150.62,134.23,214.18,122.58,261,114.13,293.51,95.65,321.39,56.44Z" fill="#1E293B"></path>
        </svg>
      </div>

      <div className="bg-slate-800 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: Logo + Social */}
            <div className="space-y-6">
              <div className="text-3xl font-bold inline-flex items-center">
                <span className="gradient-text">Apna</span>
                <span className="text-amber-400 ml-1">CA</span>
              </div>
              
              <p className="text-slate-400 leading-relaxed">
                Professional accounting services reimagined for modern businesses. 
                We make tax compliance and financial management simple.
              </p>
              
              <div className="flex space-x-5">
                {[
                  { icon: "twitter", href: "#", hoverColor: "hover:text-sky-400", label: "Twitter" },
                  { icon: "linkedin", href: "#", hoverColor: "hover:text-sky-500", label: "LinkedIn" },
                  { icon: "facebook", href: "#", hoverColor: "hover:text-blue-500", label: "Facebook" },
                  { icon: "instagram", href: "https://instagram.com/apnaca.ai", hoverColor: "hover:text-pink-400", label: "Instagram" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className={`text-slate-400 ${social.hoverColor} transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-slate-700/50`} 
                    aria-label={social.label}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => track(`footer-${social.icon}-click`)}
                  >
                    {social.icon === "twitter" && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {social.icon === "facebook" && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    )}
                    {social.icon === "instagram" && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Column 2: Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white relative">
                Company
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Team", href: "/about#team" },
                  { name: "Careers", href: "/about#careers" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Testimonials", href: "/testimonials" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} 
                      className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center group"
                      onClick={() => track(`footer-${item.name.toLowerCase().replace(/\s+/g, '-')}-click`)}
                    >
                      <span className="w-0 h-0.5 bg-indigo-500 opacity-0 group-hover:w-3 group-hover:opacity-100 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white relative">
                Resources
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Knowledge Base", href: "/resources/kb" },
                  { name: "Blog", href: "/blog" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Cookie Policy", href: "/cookie-policy" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} 
                      className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center group"
                      onClick={() => track(`footer-${item.name.toLowerCase().replace(/\s+/g, '-')}-click`)}
                    >
                      <span className="w-0 h-0.5 bg-indigo-500 opacity-0 group-hover:w-3 group-hover:opacity-100 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 4: Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white relative flex items-center">
                Newsletter
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                <span className="ml-2 inline-flex h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              </h3>
              
              <p className="text-slate-400 mb-4">
                Subscribe to get updates on new features and promotional offers.
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe}>
                  {error && (
                    <div className="mb-3 bg-red-900/30 border border-red-800 p-2.5 rounded-lg text-xs text-red-300">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col space-y-3">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-700/50 border border-slate-600 text-white text-sm rounded-lg pl-10 pr-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        required
                        disabled={isSubmitting}
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm px-4 py-3 
                        rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-xl 
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Subscribe Now
                            <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">We respect your privacy and will never share your data.</p>
                </form>
              ) : (
                <div className="bg-indigo-900/30 border border-indigo-700 rounded-lg p-4 text-center">
                  <svg className="w-6 h-6 mx-auto text-green-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-white">Thank you for subscribing!</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom section with copyright and legal links */}
          <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400 mb-4 md:mb-0">
              &copy; {currentYear} ApnaCA. All rights reserved.
            </p>
            
            <LegalSection>
              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end">
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookie-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </LegalSection>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 