import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import { lang } from "@/lib/action/uploadimage";

export const metadata: Metadata = {
  title: "Tech-Hiem",
  description: "Tech-Hiem",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F45E0C",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Dynamically load messages based on the locale
  const messages = await getMessages();
  lang();

  // Determine the text direction based on the locale
  const isRtl = ["ar", "ku"].includes(params.locale || ""); // Add languages that use RTL
  const dir = isRtl ? "rtl" : "ltr";

  return (
    <html lang={params.locale} dir={dir}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <style>
          {`
          html {
            color-scheme: light dark;
          }
          `}
        </style>
        <meta name="theme-color" content="#fff2f" />
      </head>
      <body
        className={`bg-gray-50 dark:bg-gray-950 border-t border-secondary-200/50 w-full ${
          isRtl ? "rtl" : "ltr"
        }`}
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
