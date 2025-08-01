/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '05867c4768776fda3a03d4e2e5e54d46.r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      }
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
