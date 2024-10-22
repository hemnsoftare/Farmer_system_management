"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/home/header/Header";
import Footer from "@/components/home/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import ContextProvider from "./(routes)/dashboard/ConTextData";
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
      <ClerkProvider>
        <ContextProvider>
          <body className={inter.className}>
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
          </body>
        </ContextProvider>
      </ClerkProvider>
    </html>
  );
}
