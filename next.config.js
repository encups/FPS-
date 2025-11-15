/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude backend directory from Next.js compilation
  typescript: {
    ignoreBuildErrors: false,
  },
  // Exclude backend from webpack compilation
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/backend/**', '**/node_modules/**'],
    };
    return config;
  },
}

module.exports = nextConfig
