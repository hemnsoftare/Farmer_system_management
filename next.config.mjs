import createNextInterPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

 const withnextIntl = createNextInterPlugin()
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // Clerk's image host
        port: "",
        pathname: "/**", // Allow all paths from img.clerk.com
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", // Firebase Storage host
        port: "",
        pathname: "/**", // Allow all paths from Firebase Storage
      },
    ],
  },
};

export default withnextIntl(nextConfig);
