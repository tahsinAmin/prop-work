/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this experimental configuration to help with client components in route groups
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
