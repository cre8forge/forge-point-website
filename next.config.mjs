/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Leaflet doesn't support React 18 Strict Mode double-invoke
  serverActions: {
    bodySizeLimit: "6mb", // allow up to 3 photo uploads (~2MB each compressed)
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
