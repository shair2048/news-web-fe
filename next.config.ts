import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i1-vnexpress.vnecdn.net" },
      { protocol: "https", hostname: "i1-thethao.vnecdn.net" },
      { protocol: "https", hostname: "i1-kinhdoanh.vnecdn.net" },
      { protocol: "https", hostname: "i1-giaitri.vnecdn.net" },
      { protocol: "https", hostname: "i1-suckhoe.vnecdn.net" },
      { protocol: "https", hostname: "i1-dulich.vnecdn.net" },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
