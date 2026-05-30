import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Production domain
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kkmoulding.com',
  },

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: '**.firebasestorage.app' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
  },

  // Compression
  compress: true,

  // Power-user performance
  experimental: {
    optimizeCss: false,
  },

  async redirects() {
    return [
      // Force www → non-www canonical redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kkmoulding.com' }],
        destination: 'https://kkmoulding.com/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // Security headers on all routes
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Long-term cache for static assets
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|otf|eot)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache JS/CSS bundles
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;

