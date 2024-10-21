

import { withNextVideo } from 'next-video/process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  'next-video': true,
};

export default withNextVideo(nextConfig);


// const nextConfig = {
//   eslint: {
//   ignoreDuringBuilds: true,
//   },
//   };
  
//   export default nextConfig;