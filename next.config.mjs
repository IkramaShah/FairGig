/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // This helps Next.js stay within the project directory
  experimental: {
    // turbopack optimization
  }
}


export default nextConfig
