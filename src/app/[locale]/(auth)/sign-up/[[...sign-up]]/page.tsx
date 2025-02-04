"use client";
import { SignIn, SignInButton, SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Page() {
  const path = usePathname();
  return (
    <div className="w-full ltr py-4 flex-col  flex items-center justify-center  lg:h-screen">
      <div className="scale-[.75] gap-2 flex items-center justify-center flex-col  transform">
        {path.includes("/sign-up") && (
          <h2 className="font-semibold text-16 sm:text-22">
            Already have an account?{" "}
            <SignInButton>
              <span className="font-bold text-blue-600 cursor-pointer">
                {" "}
                Singn in
              </span>
            </SignInButton>
          </h2>
        )}
        <SignUp
          appearance={{
            elements: {
              footer: "hidden",
              rootBox: { direction: "ltr" }, // Ensure the component follows LTR direction
            },
          }}
        />
      </div>
    </div>
  );
}
