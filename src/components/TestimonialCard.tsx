import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position?: string;
  rating?: number;
  id?: string;
  imageSrc?: string;
  showImage?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  position,
  rating = 5,
  id,
  imageSrc = "https://randomuser.me/api/portraits/men/32.jpg",
  showImage = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start mb-4">
        {showImage && (
          <div className="mr-4 flex-shrink-0">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image 
                src={imageSrc} 
                alt={`Avatar of ${author}`} 
                width={48} 
                height={48}
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div>
          <svg className="h-8 w-8 text-indigo-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
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
        
        {id && (
          <div className="mt-3">
            <Link href={`/testimonials/${id}`} className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">
              Read full testimonial →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard; 