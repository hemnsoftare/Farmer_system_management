import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// Combine both plugins (PWA & Intl)
export default withNextIntl(
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  })(nextConfig)
);
