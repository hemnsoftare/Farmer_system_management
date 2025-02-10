import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import ClientProviders from "./ClientProviders";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import { lang } from "@/lib/action/uploadimage";

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
  lang();

  // Determine the text direction based on the locale
  const isRtl = ["ar", "ku"].includes(params.locale || ""); // Add languages that use RTL
  const dir = isRtl ? "rtl" : "ltr";

  return (
    <html lang={"en"} dir={dir}>
      <head>
        <style>
          {`
          html {
            color-scheme: light dark;
            }
            `}
        </style>
        <meta name="theme-color" content="#fff2f" />
      </head>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body
          className={`bg-gray-50 border-t border-secondary-200/50 w-full ${
            isRtl ? "rtl" : "ltr"
          }`}
        >
          <ClientProviders>{children}</ClientProviders>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
