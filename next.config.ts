import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.vnecdn.net" },
      {
        protocol: "https",
        hostname: "**.vnexpress.net",
      },
      {
        protocol: "https",
        hostname: "**.tuoitre.vn",
      },
      {
        protocol: "https",
        hostname: "**.vtcnews.vn",
      },
      {
        protocol: "https",
        hostname: "**.vtc.vn",
      },
      {
        protocol: "https",
        hostname: "**.vtc.com.vn",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
