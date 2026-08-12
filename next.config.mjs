/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
