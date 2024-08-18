/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    domains: ['fakestoreapi.com'], 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 700,
};

export default nextConfig;
