import React, { useState } from 'react';
import { track } from '@vercel/analytics';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [businessType, setBusinessType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Track form submission attempt
      track('waitlist-form-submit-attempt', {
        hasCompany: !!company,
        hasMessage: !!message,
        businessType
      });

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          businessType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong with your submission. Please try again.');
      }

      // Track successful submission
      track('waitlist-form-submit-success', {
        hasCompany: !!company,
        hasMessage: !!message,
        businessType
      });

      setSubmitted(true);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      setBusinessType('');
    } catch (err) {
      // Track submission error
      track('waitlist-form-submit-error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 md:p-10 text-center relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-5"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-5"></div>
        
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full shadow-md">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-slide-up">Thank You for Joining!</h3>
        
        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
          We've received your information and will keep you updated on our launch and any exciting news.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary hover-float"
          >
            Submit Another Response
          </button>
          <a 
            href="/about"
            className="btn-secondary hover-float"
            onClick={() => track('waitlist-success-learn-more-click')}
          >
            Learn More About Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card shadow-lg overflow-hidden max-w-full animate-fade-in relative">
      <div className="absolute inset-0 bg-white opacity-70 -z-10"></div>
      
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        
        <h3 className="text-xl font-bold mb-2 relative z-10">Join Our Exclusive Waitlist</h3>
        <p className="text-base text-indigo-100 relative z-10">Be among the first to experience our revolutionary accounting services.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6 overflow-x-auto">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md animate-slide-up">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => track('waitlist-form-name-focus')}
                required
                className="form-input w-full pl-10 pr-4 py-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="Your name"
              />
            </div>
          </div>
          
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => track('waitlist-form-email-focus')}
                required
                className="form-input w-full pl-10 pr-4 py-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="Your email"
              />
            </div>
          </div>
        </div>
        
        <div className="group">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => track('waitlist-form-company-focus')}
              className="form-input w-full pl-10 pr-4 py-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="Your Company Ltd."
            />
          </div>
        </div>
        
        <div className="group">
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
            Business Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              onFocus={() => track('waitlist-form-business-type-focus')}
              className="form-select w-full pl-10 pr-8 py-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-base appearance-none"
            >
              <option value="">Select your business type</option>
              <option value="Startup">Startup</option>
              <option value="Small Business">Small Business</option>
              <option value="Medium Business">Medium Business</option>
              <option value="Large Enterprise">Large Enterprise</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Agency">Agency</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="group">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
            How Can We Help You?
          </label>
          <div className="relative">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => track('waitlist-form-message-focus')}
              className="form-input w-full py-3 px-4 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm text-base min-h-[120px]"
              placeholder="Tell us about your accounting needs and how we can best serve you..."
            ></textarea>
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex justify-center items-center space-x-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 transform'}`}
            onClick={() => !loading && track('waitlist-form-submit-button-click')}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Join Waitlist</span>
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            By joining, you agree to our{' '}
            <a href="/terms" className="text-indigo-600 hover:text-indigo-800" onClick={() => track('waitlist-form-terms-click')}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-indigo-600 hover:text-indigo-800" onClick={() => track('waitlist-form-privacy-click')}>
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default WaitlistForm; 