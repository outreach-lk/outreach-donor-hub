/** @type {import('next').NextConfig} */
/** @type {import('webpack')} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "pages"],
  }
};

module.exports = nextConfig;
