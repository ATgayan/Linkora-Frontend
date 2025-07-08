/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.adventurebook.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;