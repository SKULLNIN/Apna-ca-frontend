import React from 'react';
import Layout from '@/components/Layout';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata = {
  title: 'Stay Updated - ApnaCA',
  description: 'Subscribe to our newsletter to receive the latest updates and expert tips from ApnaCA.',
};

export default function Newsletter() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stay Updated with ApnaCA
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest accounting tips, tax updates, and industry insights
            delivered directly to your inbox.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>
        
        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Why Subscribe?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
              <p className="text-gray-600">Get professional accounting and taxation advice from our experienced team.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tax Updates</h3>
              <p className="text-gray-600">Stay informed about the latest tax law changes and regulatory updates.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Tips</h3>
              <p className="text-gray-600">Practical advice to help your business grow and succeed in today's market.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 