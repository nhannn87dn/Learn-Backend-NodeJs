import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        hostname: 'cdn.tgdd.vn',
      },
    ],
  },
};

export default nextConfig;
