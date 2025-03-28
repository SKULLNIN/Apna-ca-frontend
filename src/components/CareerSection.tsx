import React from 'react';
import { track } from '@vercel/analytics';

export default function CareerSection() {
  const careers = [
    {
      title: "Full-Stack Developer",
      location: "Remote/Hybrid",
      type: "Full-Time",
      description: "Build and maintain scalable web applications using React, Node.js, and AWS. Collaborate with the team to develop new features for our tax automation platform.",
      requirements: [
        "Proficiency in React and Node.js",
        "Experience with RESTful APIs and GraphQL",
        "Familiarity with AWS and CI/CD pipelines",
        "Strong problem-solving skills",
      ],
    },
    {
      title: "AI/ML Engineer",
      location: "Bangalore, India",
      type: "Full-Time",
      description: "Develop and fine-tune AI models for tax automation and compliance. Implement RAG-powered retrieval systems for tax document analysis.",
      requirements: [
        "Strong Python and TensorFlow/PyTorch skills",
        "Experience with LLM fine-tuning and RAG models",
        "Knowledge of data processing and ETL",
        "Familiarity with cloud-based model hosting",
      ],
    },
    {
      title: "Tax Compliance Specialist",
      location: "Mumbai, India",
      type: "Full-Time",
      description: "Guide our product team in implementing accurate tax compliance features. Ensure our platform adheres to the latest GST and income tax regulations.",
      requirements: [
        "CA qualification with 3+ years of experience",
        "Deep knowledge of Indian tax laws and GST",
        "Experience with tax compliance software",
        "Strong attention to detail and analytical skills",
      ],
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-Time",
      description: "Provide onboarding support to new users and handle customer inquiries. Collaborate with the product team for continuous improvements.",
      requirements: [
        "Excellent communication and interpersonal skills",
        "Experience in customer support or success roles",
        "Understanding of financial and tax compliance",
        "Ability to work remotely and manage customer relationships",
      ],
    },
    {
      title: "Financial Analyst",
      location: "Delhi, India",
      type: "Full-Time",
      description: "Analyze financial data and develop insights for our clients. Create financial models and reports to help businesses make informed decisions.",
      requirements: [
        "Degree in Finance, Accounting, or related field",
        "Proficiency in financial modeling and analysis",
        "Experience with financial reporting tools",
        "Strong Excel and data visualization skills",
      ],
    },
    {
      title: "UI/UX Designer",
      location: "Remote/Hybrid",
      type: "Full-Time",
      description: "Design intuitive and beautiful user interfaces for our tax and accounting platform. Create seamless user experiences that simplify complex financial tasks.",
      requirements: [
        "Portfolio demonstrating UI/UX design skills",
        "Experience with Figma, Adobe XD, or similar tools",
        "Understanding of user-centered design principles",
        "Ability to translate complex workflows into simple interfaces",
      ],
    },
  ];

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            CAREERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be part of a revolutionary journey to automate tax compliance for MSMEs across India!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500 flex flex-col h-full"
              onClick={() => track('career-card-click', { careerTitle: career.title })}
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-indigo-600">{career.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {career.type}
                  </span>
                </div>
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {career.location}
                </div>
                <p className="text-gray-700 mb-4">{career.description}</p>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Requirements:</h4>
                <ul className="text-gray-600 space-y-2 mb-6">
                  {career.requirements.map((requirement, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#apply" 
                className="inline-block w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  track('career-apply-click', { careerTitle: career.title });
                }}
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't see a role that fits?</h3>
          <p className="text-gray-700 mb-6">
            We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to our mission.
          </p>
          <a 
            href="mailto:careers@apnaca.com" 
            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            onClick={() => track('career-general-apply-click')}
          >
            Send Your Resume
          </a>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Flexible Work</h4>
              <p className="text-gray-600">Remote-first culture with flexible working hours</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Growth</h4>
              <p className="text-gray-600">Continuous learning and career advancement opportunities</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Team Culture</h4>
              <p className="text-gray-600">Collaborative environment with talented professionals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Competitive Pay</h4>
              <p className="text-gray-600">Attractive compensation and comprehensive benefits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 