'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

// Empty Instagram posts array since we're removing the post
const instagramPosts = [];

export default function InstagramPage() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-pink-100 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">@apnaca.ai</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We're just getting started on Instagram! Follow us for upcoming financial tips and behind-the-scenes content.
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-gray-600">Following</div>
              </div>
            </div>
            <a 
              href="https://instagram.com/apnaca.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              </svg>
              Follow on Instagram
            </a>
          </div>

          {/* No posts message */}
          <div className="max-w-2xl mx-auto text-center p-12 bg-white rounded-lg shadow-md">
            <svg className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
            <p className="text-gray-600">
              We haven't shared any posts yet. Check back soon for updates!
            </p>
          </div>

          <div className="text-center mt-12 mb-8">
            <p className="text-gray-600 text-lg mb-6">
              We're just getting started! Content coming soon.
            </p>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Waitlist</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Be the first to know when we launch and get exclusive early access to our innovative accounting services.
            </p>
            <Link href="/waitlist" className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 