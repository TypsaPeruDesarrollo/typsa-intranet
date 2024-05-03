import EsLintPlugin from 'eslint-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.plugins.push(new EsLintPlugin({
        extensions: ['.js', '.tsx', '.ts', '.jsx'],
        files: ['pages', 'src'],
        failOnError: false,
      }));
    }

    return config;
  }
};

export default nextConfig;
