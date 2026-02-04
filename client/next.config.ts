import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@batiyoun/common"],
  serverExternalPackages: ['resend'],
};

export default nextConfig;
