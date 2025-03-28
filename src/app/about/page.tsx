'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { track } from '@vercel/analytics';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import CareerSection from '@/components/CareerSection';
import TeamSection from '@/components/TeamSection';

const AboutUs = () => {
    useEffect(() => {
        // Track page visit
        track('about-page-visit');
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Welcome to Apna CA, your trusted AI-powered tax agent. We aim to simplify tax compliance for MSMEs
                        by automating tax filings, GST compliance, financial insights, and legal documentation. Our mission
                        is to make tax management effortless and accurate, so you can focus on growing your business.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Vision</h2>
                    <p className="text-gray-600 mb-6">
                        We envision a future where tax compliance is no longer a burden for businesses. Our advanced AI
                        solutions are designed to save time, reduce errors, and empower businesses with real-time financial insights.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
                    <p className="text-gray-600 mb-6">
                        To revolutionize the tax filing process through cutting-edge technology and seamless automation.
                        We strive to provide accurate, transparent, and efficient solutions to all our clients.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                        <li>Fully automated tax filing and GST compliance.</li>
                        <li>Real-time financial insights and analytics.</li>
                        <li>Secure data management with industry-standard encryption.</li>
                        <li>24/7 customer support and assistance.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions or need support? Reach out to us at <a 
                            href="mailto:support@apnaca.com" 
                            className="text-blue-500"
                            onClick={() => track('contact-email-click')}
                        >
                            support@apnaca.com
                        </a> or call us at <a 
                            href="tel:+919594358246" 
                            className="text-blue-500"
                            onClick={() => track('contact-phone-click')}
                        >
                            +91 9594 358 246
                        </a>
                    </p>
                </div>
            </div>
            <TeamSection />
            <FeaturesSection />
            <CareerSection />
            <PricingSection />
        </Layout>
    );
};

export default AboutUs; 