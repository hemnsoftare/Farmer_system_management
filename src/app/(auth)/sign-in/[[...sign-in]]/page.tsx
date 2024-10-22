import { SignIn, SignUpButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="scale-[.95] flex flex-col items-center justify-between transform">
        <h2 className="font-semibold text-22">
          Don &apos; t have an account?
          <SignUpButton>
            <span className="font-bold text-blue-600 cursor-pointer">
              {" "}
              Singn up
            </span>
          </SignUpButton>
        </h2>
        <SignIn appearance={{ elements: { footer: "hidden" } }} />
      </div>
    </div>
  );
}
