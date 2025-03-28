'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    // Track navigation
    track('navbar-navigation', { path });
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white safe-area-padding ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group py-2" onClick={() => handleNavClick('/')}>
              <span className="text-lg font-bold gradient-text transition-all duration-300">ApnaCA</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
            {[
              { name: "Home", path: "/", exact: true },
              { name: "About", path: "/about", exact: true },
              { name: "Services", path: "/services", exact: true },
              { name: "Features", path: "/waitlist#features", exact: false, matches: (p: string) => p.includes('features') },
              { name: "Pricing", path: "/waitlist#pricing", exact: false, matches: (p: string) => p.includes('pricing') },
              { name: "Newsletter", path: "/newsletter", exact: true },
              { name: "Admin", path: "/admin", exact: false, matches: (p: string) => p.startsWith('/admin') }
            ].map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out hover:text-indigo-600 ${
                  (item.exact ? isActive(item.path) : item.matches?.(pathname)) 
                    ? 'text-indigo-600 font-semibold bg-indigo-50/80' 
                    : 'text-gray-700 hover:bg-gray-50/80'
                }`}
                onClick={() => handleNavClick(item.path)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/waitlist#waitlist" 
              className="ml-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium 
                hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={() => {
                handleNavClick('/waitlist#waitlist');
                track('navbar-cta-click');
              }}
            >
              Join Waitlist
            </Link>
          </div>
          
          <div className="-mr-1 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 
                hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200
                ${isOpen ? 'bg-gray-100/80' : ''}`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - with animation */}
      <div 
        className={`mobile-menu md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-xl">
          {[
            { name: "Home", path: "/", exact: true },
            { name: "About", path: "/about", exact: true },
            { name: "Services", path: "/services", exact: true },
            { name: "Features", path: "/waitlist#features", exact: false, matches: (p: string) => p.includes('features') },
            { name: "Pricing", path: "/waitlist#pricing", exact: false, matches: (p: string) => p.includes('pricing') },
            { name: "Newsletter", path: "/newsletter", exact: true },
            { name: "Admin", path: "/admin", exact: false, matches: (p: string) => p.startsWith('/admin') }
          ].map((item) => (
            <Link 
              key={item.path}
              href={item.path}
              className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                (item.exact ? isActive(item.path) : item.matches?.(pathname)) 
                  ? 'text-indigo-600 font-semibold bg-indigo-50' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
              }`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/waitlist#waitlist"
            className="block w-full mt-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-3 rounded-md text-base font-medium shadow-sm text-center
              hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300"
            onClick={() => {
              handleNavClick('/waitlist#waitlist');
              track('navbar-mobile-cta-click');
            }}
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
} 