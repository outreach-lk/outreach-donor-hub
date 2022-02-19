/** @type {import('next').NextConfig} */
/** @type {import('webpack')} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "pages"],
  },
  webpack: (config, options) => {
    if(!options.isServer){
      // Ignore all patterns that match backend services
      config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: new RegExp('service') 
      }))
    }
    return config;
  },
};

module.exports = nextConfig;
