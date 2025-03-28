import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    // Show animation after component load
    setTimeout(() => setIsVisible(true), 200);
    
    // Intersection Observer to trigger animations when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    document.querySelectorAll('.pricing-card').forEach(card => {
      observer.observe(card);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const plans = [
    {
      name: "Starter",
      monthlyPrice: "₹199",
      yearlyPrice: "₹1,990",
      colorClass: "from-blue-500 to-indigo-600",
      shadowClass: "shadow-blue-200",
      features: [
        { text: "Automated Bookkeeping", included: true },
        { text: "Automated GST & ITR Filing (2 times/month)", included: true },
        { text: "GST Compliance Alerts", included: true },
        { text: "Basic Reporting", included: true },
        { text: "Community Support", included: true },
        { text: "Financial Insights", included: false },
        { text: "WhatsApp Integration", included: false },
        
        
      ],
      icon: "📊"
    },
    {
      name: "Pro",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4,990",
      colorClass: "from-indigo-600 to-purple-600",
      shadowClass: "shadow-indigo-200",
      isPopular: true,
      features: [
        { text: "Automated Bookkeeping", included: true },
        { text: "GST Compliance Alerts", included: true },
        { text: "Basic Reporting", included: true },
        { text: "Priority Support", included: true },
        { text: "Financial Insights", included: true },
        { text: "WhatsApp Integration", included: true },
        { text: "Automated GST & ITR Filing with AI-powered automation", included: true },
        { text: "OCR-Based Invoice Scanning", included: true },
        { text: "Multi-User Access for collaboration", included: true },
        { text: "Expense & Profit Tracking", included: true },
        { text: "Dedicated Account Manager", included: false },

      ],
      icon: "⭐"
    },
    { 
      name: "Enterprise",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      colorClass: "from-purple-600 to-pink-600",
      shadowClass: "shadow-purple-200",
      features: [
        { text: "All Pro Features", included: true },
        { text: "Dedicated Account Manager", included: true },
        { text: "Custom Integrations", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "24/7 Support", included: true },
        { text: "Customized Reporting", included: true },
      ],
      icon: "🏢"
    },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-indigo-100">
      {/* Main section */}
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-12 md:pb-16 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-3">
              <span className="inline-block py-1 px-4 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                PRICING PLANS
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Perfect Plan</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto">
              Find a plan that fits your business needs. All plans include our core features to simplify your financial management.
            </p>
            
            {/* Toggle Switch */}
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <span className={`text-base md:text-lg ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Monthly</span>
              <div className="relative mx-4 cursor-pointer" onClick={() => {
                setIsYearly(!isYearly);
                track('pricing-toggle-billing', { isYearly: !isYearly });
              }}>
                <div className="w-14 h-7 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-md transition-all"></div>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-1'}`}></div>
              </div>
              <span className={`text-base md:text-lg relative ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                Yearly
                <span className="absolute -top-3 -right-16 text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full whitespace-nowrap">
                  Save 15%
                </span>
              </span>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
                className={`pricing-card bg-white rounded-2xl overflow-hidden transform transition-all duration-500 opacity-0 translate-y-8 group 
                  ${plan.isPopular ? 'md:scale-110 md:z-10' : ''} hover:shadow-xl hover:-translate-y-2`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setSelectedPlan(plan.name)}
                onMouseLeave={() => setSelectedPlan(null)}
              onClick={() => track('pricing-plan-click', { planName: plan.name })}
            >
                <div className="p-1">
                  {plan.isPopular && (
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-1.5 text-sm font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  
                  {/* Colorful top border that appears on hover */}
                  <div className={`bg-gradient-to-r ${plan.colorClass} h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${plan.colorClass} rounded-xl flex items-center justify-center text-lg md:text-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                        {plan.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 ml-3 md:ml-4">{plan.name}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-end">
                        <p className="text-3xl md:text-4xl font-extrabold text-gray-900">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</p>
                        {plan.monthlyPrice !== 'Custom' && (
                          <p className="text-gray-500 ml-2 pb-1 text-sm md:text-base">/{isYearly ? 'year' : 'month'}</p>
                        )}
                      </div>
                      {plan.monthlyPrice !== 'Custom' && isYearly && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          Save ₹{(parseInt(plan.monthlyPrice.replace(/[^\d]/g, '')) * 12 * 0.15).toLocaleString()} per year
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 md:p-5 rounded-xl mb-6 md:mb-8">
                      <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm md:text-base text-gray-700">
                            <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 ${feature.included ? `bg-gradient-to-r ${plan.colorClass} text-white` : 'bg-gray-200 text-gray-400'}`}>
                              {feature.included ? (
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                              ) : (
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              )}
                            </span>
                            <span className={feature.included ? 'font-medium' : 'text-gray-400'}>{feature.text}</span>
                  </li>
                ))}
              </ul>
                    </div>
                    
                    <Link 
                      href="/waitlist" 
                      className={`block w-full bg-gradient-to-r ${plan.colorClass} text-white font-semibold py-2.5 md:py-3.5 px-4 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center text-sm md:text-base`}
                onClick={(e) => {
                  e.stopPropagation();
                  track('pricing-get-started-click', { planName: plan.name });
                }}
              >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Link>
                  </div>
                </div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/0 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
        
          {/* Testimonials Section - Still inside the gradient background */}
          <div className="my-24 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            </div>
            
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
                TESTIMONIALS
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - see what businesses like yours have achieved with Apna CA.
              </p>
            </div>
            
            <div className="testimonials-slider relative max-w-5xl mx-auto overflow-hidden px-4">
              <div className="testimonials-track flex animate-scroll">
                {(() => {
                  const testimonials = [
                    {
                      quote: "Apna CA has transformed how we handle our finances. The automated bookkeeping alone saves us 15 hours every month!",
                      author: "Priya Sharma",
                      role: "Founder, TechStart Solutions",
                      avatar: "👩🏽‍💼",
                      rating: 5,
                      color: "from-blue-500 to-indigo-600"
                    },
                    {
                      quote: "The GST compliance alerts have saved us from penalties multiple times. Definitely worth every rupee we pay.",
                      author: "Rahul Patel",
                      role: "CFO, GrowMore Retail",
                      avatar: "👨🏽‍💼",
                      rating: 5,
                      color: "from-indigo-600 to-purple-600"
                    },
                    {
                      quote: "The Enterprise plan has been a game-changer for our company. The dedicated account manager understands our business needs perfectly.",
                      author: "Ananya Desai",
                      role: "CEO, InnovateX",
                      avatar: "👩🏽‍💻",
                      rating: 5,
                      color: "from-purple-600 to-pink-600"
                    },
                    {
                      quote: "As a freelancer, the Starter plan gives me everything I need at a price I can afford. Highly recommend!",
                      author: "Vikram Singh",
                      role: "Independent Consultant",
                      avatar: "👨🏽‍🎨",
                      rating: 4,
                      color: "from-blue-500 to-indigo-600"
                    }
                  ];
                  
                  const duplicatedTestimonials = [...testimonials, ...testimonials];
                  
                  return duplicatedTestimonials.map((testimonial, idx) => (
                    <div key={idx} className="min-w-[350px] bg-white p-6 rounded-xl shadow-md mx-4 flex flex-col">
                      <div className="mb-4">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">
                            {i < testimonial.rating ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 flex-grow mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 bg-gradient-to-br rounded-full flex items-center justify-center text-2xl mr-4">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.author}</p>
                          <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
              
              {/* Gradient fades on the sides */}
              <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-indigo-50 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-indigo-50 to-transparent z-10"></div>
            </div>
          </div>
          
          {/* Custom Solution CTA - Still inside the gradient background */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4 w-fit">
                  CUSTOM SOLUTION
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Need a custom tailored solution?</h3>
                <p className="text-gray-600 mb-6">
                  Our team of experts can create a custom package that perfectly aligns with your business needs and goals.
                </p>
                <Link 
                  href="/contact" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center w-fit"
                  onClick={() => track('custom-solution-click')}
                >
                  Schedule a Consultation
                </Link>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 md:p-12 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">💼</div>
                  <h4 className="text-xl font-bold mb-2">Enterprise Solutions</h4>
                  <p className="opacity-90">
                    Dedicated support, custom integrations, and personalized pricing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
     
      
      {/* Custom animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .testimonials-track {
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        
        .testimonials-track:hover {
          animation-play-state: paused;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </section>
  );
} 