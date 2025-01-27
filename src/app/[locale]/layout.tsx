import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import ClientProviders from "./ClientProviders";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React, { use } from "react";

export const metadata: Metadata = {
  title: "Tech-Hiem",
  description: "Tech-Hiem",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#F45E0C", // Add theme-color here
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  // Dynamically load messages based on the locale
  let messages = await getMessages();

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <html lang={params.locale}>
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
        <body className="bg-gray-50 w-full">
          <ClientProviders>{children}</ClientProviders>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
