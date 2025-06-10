import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://yjzinpfmkbsbtxcosviy.supabase.co https://lh3.googleusercontent.com data: blob:;
  font-src 'self';
  connect-src 'self' https://yjzinpfmkbsbtxcosviy.supabase.co;
  object-src 'none';
  frame-ancestors 'none';
`;

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yjzinpfmkbsbtxcosviy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
    optimizePackageImports: ["@/components/ui"],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // apply CSP to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, "").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
