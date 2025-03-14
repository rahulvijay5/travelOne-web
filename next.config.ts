import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-eb50e7b59cbb407cb196ff2ab7a9b49a.r2.dev",
      },
    ],
  },
};

export default nextConfig;
