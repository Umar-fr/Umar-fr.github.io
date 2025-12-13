/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Disable Image Optimization for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  turbopack: {
    root: './',
  },
  // Set basePath if using a project repo (change 'username/repo' to your actual repo name)
  // basePath: '/portfolio',
  // Uncomment above if your repo is NOT named 'username.github.io'
};

export default nextConfig;