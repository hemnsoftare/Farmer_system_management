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
import Search from "@/components/home/Search";
import { usePathname } from "next/navigation";
import "@liveblocks/react-ui/styles.css";
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const pathName = usePathname();
  return (
    <>
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
                  className={`${
                    pathName.startsWith("/dash")
                      ? " relative  dark:bg-black "
                      : "md:px-[30px] lg:px-[40px] relative transition-colors duration-300 bg-white dark:text-neutral-200 text-black dark:bg-black"
                  }`}
                >
                  <Header />
                  <Search />
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
    </>
  );
}
