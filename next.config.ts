import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Instant Navigations (Next.js 16.3+)
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
