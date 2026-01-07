import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export
  output: 'export',
  
  // Add trailing slash for better static hosting compatibility
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Optional: Configure base path and asset prefix for deployment
  // Uncomment and adjust these if deploying to a subdirectory
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/qualifica-leads' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/qualifica-leads' : '',
};

export default nextConfig;
