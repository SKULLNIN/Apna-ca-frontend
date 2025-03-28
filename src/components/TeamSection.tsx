import React from 'react';
import { track } from '@vercel/analytics';
import Image from 'next/image';

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Lakshmesh Ankola",
      position: "Founder & CEO",
      bio: "Experienced Developer with a passion for simplifying tax compliance for businesses across India. Expertise in GST, income tax, and financial planning.",
      imageSrc: "/images/founder.jpg",
      instagramLink: "https://www.instagram.com/a_lakshmesh/"
    },
    {
      name: "Vedang Bodas",
      position: "Co-Founder",
      bio: "Expert in AI/ML technologies with a focus on automating accounting processes.",
      imageSrc: "/images/cofounder.jpg",
      instagramLink: "https://www.instagram.com/vedang_1906/"
    },
    {
      name: "Siddhesh Limaye",
      position: "Chief Marketing Officer",
      bio: "Strategic marketing professional with expertise in digital marketing and brand development for financial services.",
      imageSrc: "/images/cmo.jpg",
      instagramLink:"https://www.instagram.com/siddhesh_limaye/"
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            OUR TEAM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The visionaries behind Apna CA who are revolutionizing tax compliance for MSMEs across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              onClick={() => track('team-member-card-click', { memberName: member.name })}
            >
              <div className="relative w-full" style={{ height: "400px" }}>
                <Image 
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600 mb-6">{member.bio}</p>
                <div className="flex items-center">
                  <a 
                    href={member.instagramLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600 transition-colors flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      track('team-member-instagram-click', { memberName: member.name });
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our team is backed by experienced tax professionals, developers, and customer success specialists 
            who are committed to providing the best service to our clients.
          </p>
          <a 
            href="/about#careers" 
            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            onClick={() => track('join-our-team-click')}
          >
            Join Our Team
          </a>
        </div>
      </div>
    </section>
  );
} 