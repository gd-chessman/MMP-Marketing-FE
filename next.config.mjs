/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack(config, { isServer }) {
      config.module?.rules?.push({
        test: /\.svg$/,
        issuer: /\.(js|ts)x?$/,
        use: ['@svgr/webpack'],
        type: 'asset/resource',
      });
      return config;
    },
    images: {
      domains: [
          'coin-images.coingecko.com',
      ],
      unoptimized: true,
    },
    // React Compiler is still experimental, disabling for now
    // experimental: {
    //   reactCompiler: {
    //     compilationMode: 'annotation',
    //   },
    // },
  };
  
export default nextConfig;
  
