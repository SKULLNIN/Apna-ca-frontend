/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Use React Server Components with Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        'react-server-dom-webpack/server.edge': 'react-server-dom-turbopack/server.edge',
        'react-server-dom-webpack/client.edge': 'react-server-dom-turbopack/client.edge',
      },
    },
  },
};

module.exports = nextConfig; 

