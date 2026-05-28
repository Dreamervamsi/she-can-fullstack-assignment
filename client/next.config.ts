import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3001/api/:path*',
          },
        ];
      },
=======
  /* config options here */
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e
};

export default nextConfig;
