/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    domains: ['fakestoreapi.com'], 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
