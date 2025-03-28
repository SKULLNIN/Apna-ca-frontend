'use client';

import React, { useState } from 'react';
import { track } from '@vercel/analytics';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInterestChange = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Track form submission attempt
      track('newsletter-form-submit-attempt', {
        hasInterests: interests.length > 0
      });

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          interests
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong with your submission. Please try again.');
      }

      // Track successful submission
      track('newsletter-form-submit-success', {
        interestsCount: interests.length
      });

      setSubmitted(true);
      setName('');
      setEmail('');
      setInterests([]);
    } catch (err) {
      // Track submission error
      track('newsletter-form-submit-error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-blue-100 rounded-full">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">You're All Set!</h3>
        <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
          Thank you for subscribing to our newsletter. You'll receive the latest updates and news directly to your inbox.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 md:py-3 px-5 md:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm md:text-base"
        >
          Subscribe Another Email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 md:p-6 text-white">
        <h3 className="text-lg md:text-xl font-bold mb-2">Stay Updated</h3>
        <p className="text-sm md:text-base text-blue-100">Subscribe to our newsletter for the latest updates and expert tips.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-5">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 md:p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="group">
          <label htmlFor="newsletter-name" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              id="newsletter-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => track('newsletter-form-name-focus')}
              required
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
              placeholder="Your name"
            />
          </div>
        </div>
        
        <div className="group">
          <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => track('newsletter-form-email-focus')}
              required
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
              placeholder="Your email"
            />
          </div>
        </div>
        
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics you're interested in (optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Tax Updates', 'Business Tips', 'Accounting News', 'GST Updates'].map(topic => (
              <div key={topic} className="flex items-center">
                <input
                  type="checkbox"
                  id={`interest-${topic.toLowerCase().replace(/\s+/g, '-')}`}
                  checked={interests.includes(topic)}
                  onChange={() => handleInterestChange(topic)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`interest-${topic.toLowerCase().replace(/\s+/g, '-')}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {topic}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-2.5 md:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm md:text-base font-medium text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              'Subscribe to Newsletter'
            )}
          </button>
          <p className="mt-3 text-xs text-gray-500 text-center">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm; 