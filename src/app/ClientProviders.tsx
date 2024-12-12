"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Provider as ReduxProvider } from "react-redux";
import { ToastProvider } from "@/components/ui/toast";
import ContextProvider from "./(routes)/dashboard/ConTextData";
import store from "@/lib/action/store";
import Header from "@/components/header/Header";
import Footer from "@/components/home/Footer";
import { Toaster } from "@/components/ui/toaster";
import FoooterMob from "@/components/home/FoooterMob";
import { ThemeProvider, useTheme } from "next-themes";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: "light",
        dark: "dark",
        blue: "blue",
        green: "green",
        red: "red",
      }}
    >
      <ReduxProvider store={store}>
        <ClerkProvider>
          <ContextProvider>
            <ToastProvider>
              <div
                className={`md:px-[30px] klg:px-[40px] relative orange:bg-redw-200 dark:bg-black`}
              >
                <Header />
                <hr />
                {children}
              </div>

              <Footer />
              <FoooterMob />
              <Toaster />
            </ToastProvider>
          </ContextProvider>
        </ClerkProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
