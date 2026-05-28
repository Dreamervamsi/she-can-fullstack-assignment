import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep API calls explicit via NEXT_PUBLIC_API_BASE_URL.
  // A localhost rewrite breaks production deployments.
};

export default nextConfig;
