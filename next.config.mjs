import { withNextVideo } from 'next-video/process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
    // Add memory optimization
    memoryBasedWorkersCount: true,
  },
  // Increase buffer size if needed
  webpack: (config) => {
    config.performance = {
      ...config.performance,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
    return config;
  },
};

export default withNextVideo(nextConfig);