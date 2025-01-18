import type { Viewport } from "next";
import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "Tech-Hiem",
  description: "Tech0Hiem",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#F45E0C", // Add theme-color here
};
export const viewport: Viewport = {
  themeColor: "#F45E0C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
          html {
            color-scheme: light dark;
          }
        `}
        </style>
        <meta name="theme-color" content="#fff2f" />
        {/* Next.js will inject metadata automatically */}
      </head>
      <body className="">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
