"use client";
import { SignIn, SignUpButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
export default function Page() {
  const path = usePathname();
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="scale-[.95] flex flex-col items-center justify-between transform">
        {path === "/sign-in" && (
          <h2 className="font-semibold text-16 sm:text-22">
            Don &apos; t have an account?
            <SignUpButton>
              <span className="font-bold text-blue-600 cursor-pointer">
                {" "}
                Singn up
              </span>
            </SignUpButton>
          </h2>
        )}
        <SignIn appearance={{ elements: { footer: "hidden" } }} />
      </div>
    </div>
  );
}
