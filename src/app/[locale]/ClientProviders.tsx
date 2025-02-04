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

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [locale, setLocale] = useState("en"); // Default language

  useEffect(() => {
    // Get locale from URL (assuming Next.js app uses [locale] dynamic route)
    const lang = window.location.pathname.split("/")[1];
    setLocale(lang || "en"); // Fallback to English
  }, []);

  // **Custom Kurdish Translations (Sorani - ckb, Kurmanji - kmr)**
  const kurdishTexts = {
    signIn: "چوونەژوورەوە",
    signUp: "تۆمارکردن",
    forgotPassword: "وشەی نهێنیت بیرچوە؟",
    continue: "بەردەوامبە",
    verificationCode: "کۆدی پشت‌ڕاستکردنەوە",
  };
  const localization = {
    socialButtonsBlockButton: "Sign In 😁😁😁 with {{provider|titleize}}",
  };
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <ReduxProvider store={store}>
        <ClerkProvider appearance={{}}>
          <ContextProvider>
            <div
              className={`${pathName.includes("/dash") ? "bg-gray-50 dark:bg-black" : "bg-white"}`}
            >
              <Header />
              {children}
            </div>
            <Footer />
            <FoooterMob />
            <Toaster />
          </ContextProvider>
        </ClerkProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
