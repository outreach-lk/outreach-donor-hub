/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "pages"],
  },
  webpack: (config, options) => {
    if(!options.isServer){
      config.resolve = {
        fallback: {
          ...config.resolve.fallback,
          fs: false
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
