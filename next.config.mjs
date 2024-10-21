/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  'next-video': true,
};

export default withNextVideo(nextConfig);