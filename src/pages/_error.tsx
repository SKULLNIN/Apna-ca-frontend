import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              {statusCode || '500'}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {statusCode ? 'An error occurred on client' : 'An error occurred on server'}
            </h2>
            <p className="text-gray-600 mb-8">
              {statusCode
                ? 'Something went wrong while loading this page.'
                : 'We apologize for the inconvenience. Please try again later.'}
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors"
            >
              Go back home
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 