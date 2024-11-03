"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/home/header/Header";
import Footer from "@/components/home/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import ContextProvider from "./(routes)/dashboard/ConTextData";
import { Provider } from "react-redux";
import store from "@/lib/action/store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ClerkProvider>
            <ContextProvider>
              <div
                className={` ${
                  pathName.startsWith("/dashboard")
                    ? "px-0"
                    : "md:px-[30px]  lg:px-[40px]"
                } `}
              >
                {!pathName.startsWith("/user-profile") &&
                  !pathName.startsWith("sign") &&
                  pathName !== "/CreateProduct" &&
                  pathName !== "/sign-up" &&
                  !pathName.includes("dashboard") && <Header />}
                {children}
              </div>
              {!pathName.startsWith("/user-profile") &&
                pathName !== "/sign-in" &&
                pathName !== "/CreateProduct" &&
                pathName !== "/sign-up" &&
                !pathName.includes("dashboard") && <Footer />}
            </ContextProvider>
          </ClerkProvider>
        </Provider>
      </body>
    </html>
  );
}
