"use client";
import { SignIn, SignInButton, SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Page() {
  const path = usePathname();
  return (
    <div className="w-full py-4 flex-col  flex items-center justify-center  lg:h-screen">
      <div className="scale-[.75] gap-2 flex items-center justify-center flex-col  transform">
        {path === "/sign-up" && (
          <h2 className="font-semibold text-22">
            Already have an account?{" "}
            <SignInButton>
              <span className="font-bold text-blue-600 cursor-pointer">
                {" "}
                Singn in
              </span>
            </SignInButton>
          </h2>
        )}
        <SignUp appearance={{ elements: { footer: "hidden" } }} />
      </div>
    </div>
  );
}
