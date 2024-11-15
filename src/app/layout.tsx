import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders"; // Import the new client component

export const metadata: Metadata = {
  title: "Tech-Hiem",
  description: "Tech0Hiem",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
