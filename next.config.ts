import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        //Snack image
        protocol: "https",
        hostname: "yjzinpfmkbsbtxcosviy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        //User avatar
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
    // This could be helpful for third-party libraries, for now, it's not helpful for Barrel Import
    // optimizePackageImports: ["@/components/ui"],
  },
};

export default nextConfig;
