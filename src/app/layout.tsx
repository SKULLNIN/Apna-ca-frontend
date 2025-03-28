import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#6366f1',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Apna CA',
    default: "Apna CA - Professional Accounting Services",
  },
  description: "Join the waitlist for Apna CA's simplified accounting services designed for small businesses and startups in India.",
  keywords: ["accounting", "tax filing", "GST", "business accounting", "India", "startups", "financial services"],
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico?v=' + Date.now(),
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Apna CA',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://apnaca.com/',
    siteName: 'Apna CA',
    title: 'Apna CA - Professional Accounting Services',
    description: 'Join the waitlist for simplified accounting services designed for small businesses in India',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apna CA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apna CA - Professional Accounting Services',
    description: 'Join the waitlist for simplified accounting services designed for small businesses in India',
    images: ['/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Apna CA" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="shortcut icon" href="/favicon.ico?v=20250320" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=20250320" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased h-full flex flex-col bg-white main-scrollbar safe-area-padding`}>
        {/* Modern gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-70 -z-10"></div>
        
        {/* Subtle dot pattern */}
        <div className="fixed inset-0 -z-5">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-[0.03]" style={{ 
              backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
              backgroundSize: '30px 30px' 
            }}></div>
          </div>
        </div>
        
        {/* Floating gradient blobs - decorative elements */}
        <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-5"></div>
        <div className="fixed bottom-0 left-0 w-1/3 h-1/3 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-5"></div>
        <div className="fixed top-1/2 left-1/3 w-1/4 h-1/4 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 -z-5"></div>
        
        <div className="flex-grow flex flex-col relative z-0">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
