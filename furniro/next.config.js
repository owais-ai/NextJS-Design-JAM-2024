/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["cdn.sanity.io"], // ✅ Allow images from Sanity
    },
  };
  
  module.exports = nextConfig;
  