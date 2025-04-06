'use client';

import React, { useState, useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';
import OpenAI from 'openai';
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/storageUtils';

type Message = {
  text: string;
  isUser: boolean;
};

// ChatBot component props
type ChatBotProps = {
  autoOpen?: boolean;
};

// Fallback FAQ data when API is not available or rate limited
const faqData = [
  {
    keywords: ['pricing', 'cost', 'price', 'fee', 'subscription', 'pay', 'rupee', 'expensive'],
    response: 'Our pricing starts at ₹199/month for the Starter plan. We also offer Pro (₹499/month) and Enterprise (custom pricing) plans. All plans come with a 15% discount when billed yearly.'
  },
  {
    keywords: ['waitlist', 'join', 'signup', 'sign up', 'register', 'early access', 'beta'],
    response: 'Join our waitlist to get early access to our services! Early members receive a 20% discount for the first 3 months, priority onboarding, and free consultation with our tax experts.'
  },
  {
    keywords: ['launch', 'release', 'when', 'available', 'start'],
    response: 'We\'re planning to launch in phases starting Q4 2023. Waitlist members will get early access before the public launch.'
  },
  {
    keywords: ['feature', 'offer', 'service', 'provide', 'include', 'come with'],
    response: 'Our key features include automated bookkeeping, real-time tax planning, GST compliance alerts, WhatsApp integration, document management, and financial insights.'
  },
  {
    keywords: ['contact', 'support', 'help', 'talk', 'call', 'email', 'phone', 'reach'],
    response: 'You can reach our support team at support@apnaca.in or call us at +91-8888888888. We\'re available Monday to Friday, 9 AM to 6 PM IST.'
  },
  {
    keywords: ['gst', 'tax', 'file', 'filing', 'return', 'compliance'],
    response: 'Yes, we provide GST compliance services including filing returns, reconciliation, and automated compliance alerts to help you avoid penalties.'
  },
  {
    keywords: ['founder', 'who made', 'who created', 'who started', 'who owns', 'team'],
    response: 'Apna CA is founded by Lakshmesh Ankola and Vedang Bodas. They are experienced developers with a passion to help small businesses grow.'
  },
  {
    keywords: ['choose', 'why', 'benefit', 'advantage', 'better'],
    response: 'Why Choose Us?\n• Fully automated tax filing and GST compliance\n• Real-time financial insights and analytics\n• Secure data management with industry-standard encryption\n• 24/7 customer support and assistance'
  },
  {
    keywords: ['legal', 'law', 'legal advisor', 'lawyer', 'advocate'],
    response: 'We are not a legal advisor. We are a tax and GST compliance platform. If you need legal advice, please contact a qualified lawyer.'
  },
  {
    keywords: ['privacy', 'policy', 'privacy policy', 'data', 'information', 'collect'],
    response: 'Privacy Policy Summary:\n\n• Data Collection: We collect personal information (name, email, contact details), device information, and usage data.\n• Data Usage: Information is used to provide services, improve user experience, and communicate with you.\n• Data Protection: We implement industry-standard security measures to protect your data.\n• Third-Party Sharing: We may share data with trusted service providers who help operate our platform.\n• Your Rights: You can access, correct, or delete your personal information by contacting us.\n\nFor the complete privacy policy, please visit apnaca.in/privacy-policy.'
  },
  {
    keywords: ['terms', 'conditions', 'terms of service', 'tos', 'agreement'],
    response: 'Terms of Service Summary:\n\n• Service Usage: Our platform is for accounting services and tax compliance only.\n• User Accounts: You are responsible for maintaining the confidentiality of your account.\n• Payment Terms: Subscription fees are charged as per your selected plan, with automatic renewals unless canceled.\n• Intellectual Property: All content and software on our platform is our property or licensed to us.\n• Limitation of Liability: We are not liable for any indirect damages arising from your use of our services.\n\nFor complete terms, please visit apnaca.in/terms-of-service.'
  },
  {
    keywords: ['cookie', 'cookies', 'cookie policy', 'tracking'],
    response: 'Cookie Policy Summary:\n\n• Essential Cookies: Required for basic functionality of our website.\n• Analytical Cookies: Help us understand how visitors interact with our site.\n• Marketing Cookies: Used to deliver relevant advertisements.\n• Third-Party Cookies: Some cookies are placed by our partners for analytics and marketing.\n• Cookie Management: You can manage cookie preferences through your browser settings.\n\nFor the complete cookie policy, please visit apnaca.in/cookie-policy.'
  },
  {
    keywords: ['disclaimer', 'accuracy', 'warranty', 'guarantees', 'responsibility'],
    response: 'Disclaimer Summary:\n\n• No Professional Advice: Our content is for informational purposes only and not a substitute for professional advice.\n• No Guarantees: While we strive for accuracy, we cannot guarantee results from using our services.\n• Tax Compliance Responsibility: Ultimate responsibility for tax compliance remains with the user.\n• Third-Party Links: We are not responsible for third-party websites linked from our platform.\n• Service Changes: We reserve the right to modify or discontinue services without prior notice.\n\nFor the complete disclaimer, please visit apnaca.in/disclaimer.'
  },
  {
    keywords: ['cancellation', 'cancel', 'refund', 'money back', 'subscription cancel'],
    response: 'Cancellation & Refund Policy:\n\n• Subscription Cancellation: You can cancel your subscription at any time through your account settings.\n• Effective Date: Cancellations take effect at the end of your current billing cycle.\n• Refunds: We offer a 15-day money-back guarantee for new subscriptions.\n• Pro-rated Refunds: No pro-rated refunds for partial months after the 15-day period.\n• Refund Process: Approved refunds are processed within 5-7 business days.\n\nFor complete details, please visit apnaca.in/refund-policy.'
  },
  {
    keywords: ['founder', 'co-founder', 'who created', '', 'who owns', 'team'],
    response: 'Co-funder of Apna CA is Vedang Bodas\n\n• Founder of Apna CA is Lakshmesh Ankola'
  },
  {
    keywords: ['cmo', 'marketing', 'marketing officer', 'marketing head', 'marketing team', 'siddhesh', 'limaye'],
    response: 'Our Chief Marketing Officer (CMO) is Siddhesh Limaye. He leads our marketing strategy with expertise in growth marketing and digital transformation. Siddhesh is focused on making AI-powered tax compliance accessible for MSMEs across India through innovative marketing approaches and deep understanding of the Indian business landscape.'
  },
  
];

// Data of every client will be store in client browser
// Create OpenAI client - only when API key is available
let openai: OpenAI | null = null;
if (typeof window !== 'undefined') { // Only run on client side
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (apiKey && apiKey.trim() !== '') {
    try {
      openai = new OpenAI({
        apiKey: apiKey.trim(),
        dangerouslyAllowBrowser: true // For client-side usage
      });
      console.log("OpenAI client initialized");
    } catch (error) {
      console.error("Failed to initialize OpenAI client:", error);
    }
  } else {
    console.warn("No OpenAI API key provided");
  }
}

export default function ChatBot({ autoOpen = true }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(!!openai);
  const [hasBeenShownBefore, setHasBeenShownBefore] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  
  // For handling client-side only rendering
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set mounted state and load saved messages
  useEffect(() => {
    setIsMounted(true);
    
    // Load saved conversation from localStorage
    const savedMessages = getStorageItem('chatbotMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages) as Message[];
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        // Fall back to default welcome message
        setMessages([
          { text: 'Hi there! 👋 I\'m ApnaCA Bot. How can I help you today?', isUser: false }
        ]);
      }
    } else {
      // No saved messages, set default welcome message
      setMessages([
        { text: 'Hi there! 👋 I\'m ApnaCA Bot. How can I help you today?', isUser: false }
      ]);
    }
    
    // Check if chatbot has been shown before via API
    const checkChatbotStatus = async () => {
      try {
        const response = await fetch('/api/chatbot-display');
        if (!response.ok) {
          throw new Error('Failed to fetch chatbot status');
        }
        const data = await response.json();
        setHasBeenShownBefore(data.shown);
      } catch (error) {
        console.error('Error checking chatbot status:', error);
        // Fallback to local storage if API fails
        setHasBeenShownBefore(!!getStorageItem('chatbotShown'));
      }
    };
    
    // Make sure to save any unsaved chat content when the user closes/refreshes the page
    const handleBeforeUnload = () => {
      if (messages.length > 0) {
        setStorageItem('chatbotMessages', JSON.stringify(messages));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    checkChatbotStatus();
    
    // Check if the device is mobile ( pop issue fix hogya 
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobileBreakpoint = 768; // Standard mobile breakpoint
        setIsMobile(window.innerWidth < mobileBreakpoint);
      };
      
      // Check on initial load
      checkMobile();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      // Limit the conversation size to avoid localStorage size limits
      // (keep most recent 50 messages if the conversation gets too long)
      const messagesToStore = messages.length > 50 ? messages.slice(-50) : messages;
      setStorageItem('chatbotMessages', JSON.stringify(messagesToStore));
    }
  }, [messages, isMounted]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Short delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Auto-open chat after a delay when page loads
  useEffect(() => {
    if (autoOpen && isMounted && !hasBeenShownBefore && !isMobile) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        
        // Mark that the chatbot has been shown via API
        fetch('/api/chatbot-display', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update chatbot status');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error updating chatbot status:', error);
          // Fallback to local storage if API fails
          setStorageItem('chatbotShown', 'true');
        });
        
        track('chatbot-auto-opened');
      }, 2500); // Open after 2.5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [autoOpen, isMounted, hasBeenShownBefore, isMobile]);
  
  // Auto-submit initial query when chat opens
  useEffect(() => {
    if (isOpen && isMounted && !hasAutoSubmitted && !isLoading) {
      // Check if we've already auto-submitted before via API
      const checkAutoSubmitStatus = async () => {
        try {
          const response = await fetch('/api/chatbot-auto-submit');
          if (!response.ok) {
            throw new Error('Failed to fetch auto-submit status');
          }
          const data = await response.json();
          
          // If not already auto-submitted
          if (!data.autoSubmitted) {
            // Auto-submit a greeting
            const initialQuery = "Tell me about your services";
            setInputText(initialQuery);
            
            // Submit the query automatically
            handleSubmitQuery(initialQuery);
            
            // Mark as auto-submitted in server
            fetch('/api/chatbot-auto-submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .catch(error => {
              console.error('Error updating auto-submit status:', error);
              // Fallback to local storage if API fails
              setStorageItem('chatbotAutoSubmitted', 'true');
            });
          }
          
          // Mark as auto-submitted locally regardless
          setHasAutoSubmitted(true);
        } catch (error) {
          console.error('Error checking auto-submit status:', error);
          // Fallback to local storage
          const hasAutoSubmittedBefore = !!getStorageItem('chatbotAutoSubmitted');
          
          if (!hasAutoSubmittedBefore) {
            // Auto-submit a greeting
            const initialQuery = "Tell me about your services";
            setInputText(initialQuery);
            
            // Submit the query automatically
            handleSubmitQuery(initialQuery);
            
            // Mark as auto-submitted locally
            setStorageItem('chatbotAutoSubmitted', 'true');
          }
          
          setHasAutoSubmitted(true);
        }
      };
      
      checkAutoSubmitStatus();
    }
  }, [isOpen, isMounted, hasAutoSubmitted, isLoading]);
  
  // Check if API is available on component mount
  useEffect(() => {
    if (!isMounted) return;
    
    const checkApiAvailability = async () => {
      if (!openai) {
        setIsApiAvailable(false);
        return;
      }
      
      try {
        // Make a simple test call to verify API works
        await openai.chat.completions.create({
          messages: [{ role: 'user', content: 'Test' }],
          model: 'gpt-4o-mini',
          max_tokens: 5
        });
        setIsApiAvailable(true);
        console.log("API connection verified successfully");
      } catch (error) {
        console.error("API connection test failed:", error);
        setIsApiAvailable(false);
      }
    };
    
    checkApiAvailability();
  }, [isMounted]);
  
  // Don't render anything on server
  if (!isMounted) {
    return null;
  }
  
  // Extract the submission logic to be reusable for auto-submission
  const handleSubmitQuery = async (query: string) => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage = { text: query, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Save immediately to ensure the user message is preserved
    setStorageItem('chatbotMessages', JSON.stringify(updatedMessages));
    
    // Track question asked
    track('chatbot-question-asked', { question: query });
    
    setIsLoading(true);
    
    try {
      // Try to use OpenAI API only if available
      if (isApiAvailable && openai) {
        const response = await generateAIResponse(query, messages);
        const finalMessages = [...updatedMessages, { text: response, isUser: false }];
        setMessages(finalMessages);
        // Save with AI response
        setStorageItem('chatbotMessages', JSON.stringify(finalMessages));
      } else {
        // Fallback to local response
        const fallbackResponse = generateLocalResponse(query);
        setTimeout(() => {
          const finalMessages = [...updatedMessages, { text: fallbackResponse, isUser: false }];
          setMessages(finalMessages);
          // Save with fallback response
          setStorageItem('chatbotMessages', JSON.stringify(finalMessages));
        }, 500);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      // Fallback to local response on error
      const fallbackResponse = generateLocalResponse(query);
      const finalMessages = [...updatedMessages, { text: fallbackResponse, isUser: false }];
      setMessages(finalMessages);
      // Save with fallback response
      setStorageItem('chatbotMessages', JSON.stringify(finalMessages));
    } finally {
      setIsLoading(false);
      setInputText('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmitQuery(inputText);
  };
  
  const generateAIResponse = async (question: string, messageHistory: Message[]): Promise<string> => {
    if (!openai) {
      return generateLocalResponse(question);
    }
    
    try {
      // Convert message history to OpenAI format with proper typing
      const openAIMessages: OpenAI.Chat.ChatCompletionMessageParam[] = messageHistory.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));
      
      // Add the current question
      openAIMessages.push({
        role: 'user' as const,
        content: question
      });
      
      // Add system message for context ( system prompt )
      openAIMessages.unshift({
        role: 'system' as const,
        content: `You are ApnaCA Bot, a helpful assistant for Apna CA - an accounting services platform for small businesses in India.
Information about Apna CA:
- Pricing: Starter plan (₹199/month), Pro plan (₹499/month), Enterprise (custom pricing) plans
- All plans have 15% discount when billed yearly
- Features: Automated bookkeeping, Designed for MSMEs & Freelancers,Smart Tax Filing, GST compliance alerts, WhatsApp integration, document management
- Waitlist members get 20% discount for first 3 months, priority onboarding, and free consultation
- Launching in phases starting Q4 2023 with early access for waitlist members
- Support available Monday to Friday, 9 AM to 6 PM IST at support@apnaca.in
- Apna CA is founded by Lakshmesh Ankola and Vedang Bodas, who are experienced developers with a passion to help small businesses grow.
- Apna CA is a startup based in India.
- Co-funder of Apna CA is Vedang Bodas.
- Founder of Apna CA is Lakshmesh Ankola.
- Lakshmesh and Vedang are both 19 years old.
- Our Chief Marketing Officer (CMO) is Siddhesh Limaye. He leads our marketing strategy with expertise in growth marketing and digital transformation. Siddhesh is focused on making AI-powered tax compliance accessible for MSMEs across India through innovative marketing approaches and deep understanding of the Indian business landscape.

Why Choose Apna CA:
- Fully automated tax filing and GST compliance
- Real-time financial insights and analytics
- Secure data management with industry-standard encryption
- 24/7 customer support and assistance

Privacy Policy Summary:
- Data Collection: We collect personal information (name, email, contact details), device information, and usage data.
- Data Usage: Information is used to provide services, improve user experience, and communicate with you.
- Data Protection: We implement industry-standard security measures to protect your data.
- Third-Party Sharing: We may share data with trusted service providers who help operate our platform.
- Your Rights: You can access, correct, or delete your personal information by contacting us.

Terms of Service Summary:
- Service Usage: Our platform is for accounting services and tax compliance only.
- User Accounts: You are responsible for maintaining the confidentiality of your account.
- Payment Terms: Subscription fees are charged as per your selected plan, with automatic renewals unless canceled.
- Intellectual Property: All content and software on our platform is our property or licensed to us.
- Limitation of Liability: We are not liable for any indirect damages arising from your use of our services.

Cookie Policy Summary:
- Essential Cookies: Required for basic functionality of our website.
- Analytical Cookies: Help us understand how visitors interact with our site.
- Marketing Cookies: Used to deliver relevant advertisements.
- Third-Party Cookies: Some cookies are placed by our partners for analytics and marketing.
- Cookie Management: You can manage cookie preferences through your browser settings.

Disclaimer Summary:
- No Professional Advice: Our content is for informational purposes only and not a substitute for professional advice.
- No Guarantees: While we strive for accuracy, we cannot guarantee results from using our services.
- Tax Compliance Responsibility: Ultimate responsibility for tax compliance remains with the user.
- Third-Party Links: We are not responsible for third-party websites linked from our platform.
- Service Changes: We reserve the right to modify or discontinue services without prior notice.

Cancellation & Refund Policy:
- Subscription Cancellation: You can cancel your subscription at any time through your account settings.
- Effective Date: Cancellations take effect at the end of your current billing cycle.
- Refunds: We offer a 15-day money-back guarantee for new subscriptions.
- Pro-rated Refunds: No pro-rated refunds for partial months after the 15-day period.
- Refund Process: Approved refunds are processed within 5-7 business days.

Smart Tax Filing:
- Automated GST & ITR Filing with AI-powered automation. Real-Time Compliance Checks to avoid penalties with instant tax law updates. Error-Free Filings with AI error detection.
- Real-Time Tax Planning with AI-powered tax forecasting and proactive strategies to minimize your tax burden.

Designed for MSMEs & Freelancers:
- Expense & Profit Tracking to monitor business income & expenses with ease.
- OCR-Based Invoice Scanning to auto-extract data from receipts & invoices.
- Multi-User Access for collaboration.

WhatsApp Integration:
- Direct WhatsApp integration for seamless communication with your customers.
- Automated WhatsApp messages for tax reminders, payment notifications, and important updates.
- Real-Time Notifications for timely responses and customer engagement.

Automated bookkeeping:
- Automated bookkeeping with AI-powered automation. Real-Time Compliance Checks to avoid penalties with instant tax law updates. Error-Free Filings with AI error detection.

Document Management:
- Securely store, organize, and retrieve all your financial documents with our cloud-based document management system. 

We're excited to introduce the visionaries behind Apna CA, the AI-powered tax assistant revolutionizing MSME tax compliance.

🔹 Lakshmesh Ankola (Founder & CEO):  The driving force behind Apna CA, passionate about leveraging AI to simplify tax filing and compliance for small businesses.

🔹 Vedang Bodas (Co-Founder & CTO):  The tech mastermind, leading the development of AI-powered automation, ensuring seamless tax management and compliance.

🔹 Siddhesh Limaye (CMO): The marketing expert, focused on making Apna CA accessible to every MSME in India.

Together, we are building Apna CA to automate tax filing, provide real-time financial insights, and revolutionize compliance for MSMEs with AI.
Keep your responses concise (under 100 words) and friendly. Don't make up information not provided above.`
      });
      
      try {
        console.log("Calling OpenAI API...");
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: openAIMessages,
          max_tokens: 150,
          temperature: 0.7,
        });
        
        if (completion.choices[0].message.content) {
          return completion.choices[0].message.content;
        } else {
          return generateLocalResponse(question);
        }
      } catch (apiError: any) {
        console.error("OpenAI API call failed:", apiError?.message || apiError);
        return generateLocalResponse(question);
      }
    } catch (error: any) {
      console.error('OpenAI API error:', error?.message || error);
      // Fall back to local response generation
      return generateLocalResponse(question);
    }
  };
  
  const generateLocalResponse = (question: string): string => {
    // Convert question to lowercase for case-insensitive matching
    const lowerQuestion = question.toLowerCase();
    
    // Check FAQ entries
    for (const faq of faqData) {
      if (faq.keywords.some(keyword => lowerQuestion.includes(keyword.toLowerCase()))) {
        return faq.response;
      }
    }

    // Default response if no match found
    return "I'm not sure about that. Could you please rephrase your question? Or you can ask about our services, pricing, waitlist, or contact information.";
  };

  return (
    <>
      {/* Chatbot button */}
      <button
        className={`fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-3 shadow-lg z-50 transition-transform hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
        onClick={() => {
          setIsOpen(true);
          track('chatbot-opened');
        }}
        aria-label="Open chat"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
        </svg>
      </button>
      
      {/* Chatbot dialog */}
      <div 
        className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-semibold ml-2">ApnaCA Bot</span>
            {!isApiAvailable && (
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded ml-2">Basic Mode</span>
            )}
          </div>
          <div className="flex items-center">
            <button 
              className="text-white hover:text-gray-200 mr-3" 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear this conversation?')) {
                  // Clear the messages in state
                  setMessages([
                    { text: 'Hi there! 👋 I\'m ApnaCA Bot. How can I help you today?', isUser: false }
                  ]);
                  // Clear from local storage
                  removeStorageItem('chatbotMessages');
                  track('chatbot-conversation-cleared');
                }
              }}
              aria-label="Clear conversation"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
            <button 
              className="text-white hover:text-gray-200" 
              onClick={() => {
                setIsOpen(false);
                track('chatbot-closed');
              }}
              aria-label="Close chat"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Auto-open info message */}
        {autoOpen && (
          <div className="bg-indigo-50 px-4 py-2 text-xs text-indigo-800 flex justify-between items-center">
            <span>Chat automatically opened to help you</span>
            <button 
              onClick={() => {
                setIsOpen(false);
                track('chatbot-auto-dismissed');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}
        
        {/* Chat messages */}
        <div className="p-4 h-96 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                  message.isUser 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                }`}
              >
                {message.isUser ? (
                  <p className="text-sm">{message.text}</p>
                ) : (
                  <div className="font-medium text-sm leading-relaxed">
                    {message.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line.startsWith('•') ? (
                          <div className="flex items-start my-1">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span>{line.substring(1).trim()}</span>
                          </div>
                        ) : (
                          <>
                            {line}
                            {i < message.text.split('\n').length - 1 && line.trim() !== '' && !line.startsWith('•') && <br />}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
                {!message.isUser && isApiAvailable && (
                  <div className="mt-1 text-right">
                    <span className="text-xs text-indigo-500 italic">AI powered</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="mb-4">
              <div className="inline-block p-3 rounded-lg bg-white text-gray-800 shadow-sm rounded-bl-none max-w-xs md:max-w-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Type your question..."
              disabled={isLoading}
              autoFocus={isOpen}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputText.trim()) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
            />
            <button
              type="submit"
              className={`bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={!inputText.trim() || isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex justify-between items-center">
            <span>Ask me about pricing, features, launch date, or joining the waitlist.</span>
            {isApiAvailable ? (
              <span className="text-xs text-green-600 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                AI Powered
              </span>
            ) : null}
          </p>
        </form>
      </div>
    </>
  );
} 
