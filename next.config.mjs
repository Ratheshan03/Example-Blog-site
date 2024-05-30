/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pinterest.com",
      },
    ],
  },
};

export default nextConfig;
