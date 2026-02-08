import withPWA from "@ducanh2912/next-pwa";
import { env } from "./config/env";
import type { NextConfig } from "next";

/**
 * PWA Configuration
 * This plugin automatically generates the 'sw.js' file
 * and handles caching strategies for offline support.
 */
const pwaConfig = withPWA({
  dest: "public",         // 📁 Output directory for service worker
  cacheOnFrontEndNav: true, // 🚀 Cache pages instantly when user clicks links
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,     // 🔄 Auto-reload when internet returns
  disable: env.NODE_ENV === "development", // ⚠️ Disable in Dev to prevent caching confusion
  workboxOptions: {
    disableDevLogs: true,   // Keep console clean in dev
  },
});

/**
 * Next.js Core Configuration
 */
const nextConfig: NextConfig = {
  turbopack: {}, // Explicitly configure Turbopack to silence the error
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default pwaConfig(nextConfig);