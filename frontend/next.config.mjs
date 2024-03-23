/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@resvg/resvg-js"],
  },
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
      "@resvg/resvg-js": "commonjs @resvg/resvg-js",
    });

    return config;
  },
};

export default nextConfig;
