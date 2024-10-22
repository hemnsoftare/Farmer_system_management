import { SignIn, SignInButton, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full py-4 flex-col  flex items-center justify-center  lg:h-screen">
      <div className="scale-[.75] gap-2 flex items-center justify-center flex-col  transform">
        <h2 className="font-semibold text-22">
          Already have an account?{" "}
          <SignInButton>
            <span className="font-bold text-blue-600 cursor-pointer">
              {" "}
              Singn in
            </span>
          </SignInButton>
        </h2>
        <SignUp appearance={{ elements: { footer: "hidden" } }} />
      </div>
    </div>
  );
}
