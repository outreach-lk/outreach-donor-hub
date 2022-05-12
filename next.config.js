/** @type {import('next').NextConfig} */
/** @type {import('webpack')} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "pages"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        // set alias of node specific modules to false
        // eg: service dependencies
        config.resolve.alias = {
            ...config.resolve.alias,
            'firebase-admin': false,
        }
    } else {
      // set alias of browser only modules to false.
        config.resolve.alias = {
          ...config.resolve.alias,
        }
    }

    return config;
},
async redirects() {
  return [
    {
      source: '/',
      destination: '/cause/list',
      permanent: true,
    },
  ]
},
};

module.exports = nextConfig;
