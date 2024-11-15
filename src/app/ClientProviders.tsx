"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Provider as ReduxProvider } from "react-redux";
import { ToastProvider } from "@/components/ui/toast";
import ContextProvider from "./(routes)/dashboard/ConTextData";
import store from "@/lib/action/store";
import Header from "@/components/home/header/Header";
import Footer from "@/components/home/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <ClerkProvider>
        <ContextProvider>
          <ToastProvider>
            <div className="md:px-[30px] lg:px-[40px]">
              <Header />
              {children}
            </div>
            <Footer />
            <Toaster />
          </ToastProvider>
        </ContextProvider>
      </ClerkProvider>
    </ReduxProvider>
  );
}
