"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import store from "@/lib/action/store";
import { Provider as ReduxProvider } from "react-redux";
import ContextProvider from "./(routes)/dashboard/ConTextData";
import Header from "@/components/header/Header";
import Footer from "@/components/home/Footer";
import { Toaster } from "@/components/ui/toaster";
import FoooterMob from "@/components/home/FoooterMob";
import { useEffect, useState } from "react";
import { kurdishSoraniLocalization, kuSorani } from "@/util/data";
import { arSA, enUS, trTR } from "@clerk/localizations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PWAInstallToast from "@/components/home/PWAInstallToast ";
export const queryClient = new QueryClient();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [locale, setLocale] = useState("en"); // Default to English

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lang = window.location.pathname.split("/")[1]; // Extract locale from URL
      setLocale(lang || "en"); // Fallback to English
    }
  }, []);

  // Select localization object based on detected language
  const localization = locale === "ku" ? kuSorani : undefined; // Kurdish (Sorani)
  let l =
    locale === "en"
      ? enUS
      : locale === "ar"
        ? arSA
        : locale === "tr"
          ? trTR
          : kurdishSoraniLocalization;

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <ClerkProvider
            localization={l}
            appearance={{
              elements: {
                // Hide the default footer
                footer: {
                  display: "hidden",
                },
              },
            }}
          >
            <ContextProvider>
              <div
                className={`${
                  pathName?.includes("/dash")
                    ? "bg-gray-50 dark:bg-gray-950 dark:text-gray-100"
                    : "bg-white dark:bg-gray-950 dark:text-gray-100"
                }`}
              >
                <Header />
                {children}
              </div>
              <Footer />
              <FoooterMob />
              <Toaster />
              <PWAInstallToast />
            </ContextProvider>
          </ClerkProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
