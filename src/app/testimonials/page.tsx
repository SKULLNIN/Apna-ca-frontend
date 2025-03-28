'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import Layout from '@/components/Layout';

// Using the same testimonial data from the detail page
const testimonialData = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    position: 'Small Business Owner, Delhi',
    company: 'Sharma Enterprises',
    industry: 'Retail',
    content: 'Apna CA transformed how I manage my business finances. Their team handled my GST filing and tax planning with exceptional expertise. Highly recommended for all entrepreneurs!',
    rating: 5,
    image: '/images/testimonial-new.jpg',
  },
  {
    id: 2,
    name: 'Priya Patel',
    position: 'Startup Founder, Mumbai',
    company: 'TechInnovate Solutions',
    industry: 'Technology',
    content: 'As a first-time entrepreneur, I was overwhelmed with tax compliance. Apna CA made everything simple and guided me through every step. Their expert advice saved me both time and money.',
    rating: 5,
    image: '/images/new-testimonial.jpg',
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    position: 'E-commerce Business, Bangalore',
    company: 'GlobalMarket India',
    industry: 'E-commerce',
    content: 'The team at Apna CA understands the unique challenges of online businesses. Their proactive approach to tax planning and accounting has been invaluable for my growing e-commerce venture.',
    rating: 5,
    image: '/images/testimonial-new.jpg',
  }
];

export default function TestimonialsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Apna CA has helped businesses across India streamline their finances and achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial) => (
            <Link 
              href={`/testimonials/${testimonial.id}`}
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4">
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-blue-100 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{testimonial.company}</span>
                  <span className="text-blue-600 font-medium text-sm">Read full story →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Growing List of Satisfied Clients</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Experience the Apna CA difference for yourself. Join our waitlist today to be among the first to access our innovative accounting services.
          </p>
          <Link 
            href="/waitlist" 
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Our Waitlist
          </Link>
        </div>
      </div>
    </Layout>
  );
} 