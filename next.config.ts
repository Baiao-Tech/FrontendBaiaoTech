import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "coodesh.com", "imageio.forbes.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/eventos",
        destination: "http://localhost:8080/api/eventos",
      },
    ];
  },
};

export default nextConfig;
