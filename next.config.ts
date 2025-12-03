import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i1-vnexpress.vnecdn.net" },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
