"use client";
import "./globals.css";
import Header from "@/components/home/header/Header";
import Footer from "@/components/home/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ContextProvider from "./(routes)/dashboard/ConTextData";
import { Provider } from "react-redux";
import store from "@/lib/action/store";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast"; // Ensure correct import path
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={""}>
        <Provider store={store}>
          <ClerkProvider>
            <ContextProvider>
              <ToastProvider>
                {" "}
                {/* Wrap Toaster within ToastProvider */}
                <div className={`${"md:px-[30px] lg:px-[40px]"}`}>
                  <Header />
                  {children}
                </div>
                <Footer />
                <Toaster /> {/* Place Toaster inside ToastProvider */}
              </ToastProvider>
            </ContextProvider>
          </ClerkProvider>
        </Provider>
      </body>
    </html>
  );
}
