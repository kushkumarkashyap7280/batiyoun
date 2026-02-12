import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const pwaConfig = withPWA({
  dest: "public",
 disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: false, 
    clientsClaim: false,
  },
});

const nextConfig: NextConfig = {
  // 🧹 Clean Config: No 'experimental' block needed here.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
    ],
  },
};

export default pwaConfig(nextConfig);