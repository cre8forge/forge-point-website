/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // University category path changes (permanent 301)
      {
        source:      "/university/custom-living/:slug*",
        destination: "/university/renovation-rehab/:slug*",
        permanent:   true,
      },
      {
        source:      "/university/outdoor-structures/:slug*",
        destination: "/university/outdoor-living/:slug*",
        permanent:   true,
      },
      {
        source:      "/university/landscape-design/:slug*",
        destination: "/university/outdoor-living/:slug*",
        permanent:   true,
      },
      {
        source:      "/university/seasonal-guides/:slug*",
        destination: "/university/property-maintenance/:slug*",
        permanent:   true,
      },
      {
        source:      "/university/fencing/:slug*",
        destination: "/university/colorado-living/:slug*",
        permanent:   true,
      },
    ];
  },
  reactStrictMode: false, // Leaflet doesn't support React 18 Strict Mode double-invoke
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb", // allow up to 3 photo uploads (~2MB each compressed)
    },
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
