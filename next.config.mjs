/** @type {import('next').NextConfig} */
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

export default nextConfig;
