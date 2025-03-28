'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaArrowLeft, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Layout from '@/components/Layout';

// This would typically come from your API or CMS
const testimonialData = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    position: 'Small Business Owner, Delhi',
    company: 'Sharma Enterprises',
    industry: 'Retail',
    content: 'Apna CA transformed how I manage my business finances. Their team handled my GST filing and tax planning with exceptional expertise. Highly recommended for all entrepreneurs!',
    fullStory: 'When I started my business five years ago, managing finances was my biggest challenge. Traditional accounting firms were expensive and didn\'t understand my specific needs. Then I discovered Apna CA through a business associate. From our first consultation, I knew they were different. Their team took the time to understand my business model and created customized solutions for my retail operation. Their GST filing service ensured I never missed deadlines, and their proactive tax planning saved me significant amounts each year. What I appreciate most is their responsiveness - whenever I have a query, I get answers within hours, not days. Their digital platform makes document sharing and tracking simple, even for someone like me who isn\'t very tech-savvy. Thanks to Apna CA, I can focus on growing my business while they handle the financial complexities.',
    rating: 5,
    image: '/images/testimonial-new.jpg',
    services: ['GST Filing', 'Tax Planning', 'Bookkeeping'],
    yearJoined: 2020
  },
  {
    id: 2,
    name: 'Priya Patel',
    position: 'Startup Founder, Mumbai',
    company: 'TechInnovate Solutions',
    industry: 'Technology',
    content: 'As a first-time entrepreneur, I was overwhelmed with tax compliance. Apna CA made everything simple and guided me through every step. Their expert advice saved me both time and money.',
    fullStory: 'Launching my tech startup meant diving into a world of complex regulations and tax requirements I knew nothing about. After a recommendation from a fellow founder in my incubator program, I reached out to Apna CA. From day one, they demystified the entire process. My dedicated CA explained startup-specific tax benefits, helped me structure my company optimally, and ensured compliance with all regulatory requirements. When we received our first round of funding, they provided invaluable guidance on financial reporting and investor relations. Their startup-focused packages were affordable for our bootstrap budget, with clear pricing that scaled as we grew. What impresses me most is how they stay updated with the latest changes in tax laws affecting the tech industry and proactively suggest optimization strategies. Apna CA has been more than a service provider; they\'ve been a crucial partner in our growth journey.',
    rating: 5,
    image: '/images/new-testimonial.jpg',
    services: ['Startup Registration', 'Tax Compliance', 'Financial Advisory'],
    yearJoined: 2021
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    position: 'E-commerce Business, Bangalore',
    company: 'GlobalMarket India',
    industry: 'E-commerce',
    content: 'The team at Apna CA understands the unique challenges of online businesses. Their proactive approach to tax planning and accounting has been invaluable for my growing e-commerce venture.',
    fullStory: 'Running an e-commerce business that sells across multiple states created a tax compliance nightmare before I found Apna CA. With transactions across different tax jurisdictions and constant inventory management, our previous accountant couldn\'t keep up. Apna CA\'s specialized e-commerce accounting team revolutionized our operations. They implemented a system that seamlessly integrated with our online platforms, automating much of the tax categorization process. Their expertise in marketplace seller compliance saved us from potential penalties and helped optimize our interstate tax obligations. Their inventory accounting methods improved our financial reporting accuracy and helped with business forecasting. During a GST audit last year, their thorough documentation and preparation made what could have been a stressful process remarkably smooth. For any e-commerce business dealing with the complexities of online sales in India, I wholeheartedly recommend Apna CA\'s specialized services.',
    rating: 5,
    image: '/images/testimonial-new.jpg',
    services: ['E-commerce Accounting', 'GST Compliance', 'Business Advisory'],
    yearJoined: 2019
  }
];

interface TestimonialDetailClientProps {
  id: string;
}

export default function TestimonialDetailClient({ id }: TestimonialDetailClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonial, setTestimonial] = useState<any>(null);
  
  useEffect(() => {
    if (id) {
      const foundTestimonial = testimonialData.find(t => t.id === parseInt(id));
      setTestimonial(foundTestimonial);
      setIsLoading(false);
    }
  }, [id]);
  
  // Handle the case when the page is loading
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse">Loading testimonial...</div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Handle case where testimonial isn't found
  if (!testimonial) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Testimonial not found</h1>
            <Link href="/testimonials" className="text-blue-600 hover:text-blue-800">
              Back to all testimonials
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Back button */}
        <Link href="/testimonials" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <FaArrowLeft className="mr-2" /> Back to all testimonials
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-0 md:mr-8">
                <Image 
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover border-4 border-white"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{testimonial.name}</h1>
                <p className="text-lg mb-2">{testimonial.position}</p>
                <p className="text-blue-200 mb-4">{testimonial.company} | {testimonial.industry}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <FaQuoteLeft className="text-gray-400 mr-2 text-xl mt-1" />
                <p className="text-xl font-medium text-gray-700 italic">
                  {testimonial.content}
                </p>
                <FaQuoteRight className="text-gray-400 ml-2 text-xl mt-1" />
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Full Story</h2>
              <p className="text-gray-700 leading-relaxed">
                {testimonial.fullStory}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Services Used</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {testimonial.services.map((service: string, index: number) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Client Since</h3>
                <p className="text-gray-700">{testimonial.yearJoined}</p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gray-50 p-6 rounded-lg text-center mt-8">
              <h3 className="text-xl font-bold mb-3">Ready to experience the Apna CA difference?</h3>
              <p className="text-gray-700 mb-4">Join thousands of satisfied businesses across India.</p>
              <Link href="/contact" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related testimonials */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData
              .filter(t => t.id !== testimonial.id)
              .map(relatedTestimonial => (
                <Link 
                  href={`/testimonials/${relatedTestimonial.id}`} 
                  key={relatedTestimonial.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow block"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 mr-4">
                      <Image 
                        src={relatedTestimonial.image}
                        alt={relatedTestimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{relatedTestimonial.name}</h4>
                      <p className="text-sm text-gray-600">{relatedTestimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-3 italic">"{relatedTestimonial.content}"</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 