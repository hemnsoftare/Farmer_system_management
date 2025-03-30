// import createNextIntlPlugin from "next-intl/plugin";
// import withPWA from "next-pwa";

// /** @type {import('next').NextConfig} */

// const withNextIntl = createNextIntlPlugin();

// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "img.clerk.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "firebasestorage.googleapis.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// // Combine both plugins (PWA & Intl)
// export default withNextIntl(
//   withPWA({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   })(nextConfig)
// );
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

// Combine PWA & Intl plugins
export default withNextIntl(
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  })(nextConfig)
);
