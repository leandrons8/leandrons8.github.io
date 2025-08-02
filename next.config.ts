import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  experimental: {
    optimizePackageImports: ['react-bootstrap'],
  },
};

export default nextConfig;
