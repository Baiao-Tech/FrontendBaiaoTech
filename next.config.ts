import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/eventos",
        destination: "http://147.79.104.80:8000/api/eventos",
      },
    ];
  },
};

export default nextConfig;
