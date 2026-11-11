import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/videos", destination: "/discografia#videoclipes", permanent: true },
    ];
  },
};
export default nextConfig;
