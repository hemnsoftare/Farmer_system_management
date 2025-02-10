"use client";
import { usePathname } from "next/navigation";
import { SignIn, SignUpButton } from "@clerk/nextjs";
import type { LocalizationResource } from "@clerk/types";
export const kuSorani: LocalizationResource = {
  signIn: {
    start: {
      title: "چوونەژوورەوە بۆ تێچ هایم",
      subtitle: "بەخێربێیت! تکایە بچۆ ژوورەوە بۆ بەردەوامبوون",
      actionText: "هەژمار ناتەوە؟",
      actionLink: "دروستکردنی هەژمار",
    },
    // elements: {
    //   emailAddressLabel: "ناونیشانی ئیمەیڵ یان ناوی بەکارهێنەر",
    //   passwordLabel: "وشەی نهێنی",
    //   forgotPasswordLink: "وشەی نهێنیت لەبیرکردووە؟",
    //   primaryButton: "چوونەژوورەوە",

    // },
    alternativeMethods: {
      title:
        "کێشە هەیە؟ دەتوانی هەر یەک لە ڕێوەچوونەکانی خوارەوە بەکارهێنی بۆ چوونەژوورەوە.",
    },
  },
};

export default function Page() {
  const path = usePathname();
  console.log("path", path);

  return (
    <div className="w-full ltr flex items-center justify-center h-screen">
      <div className="scale-[.95] flex flex-col items-center justify-between transform">
        {path.includes("/sign-in") && (
          <h2 className="font-semibold text-16 my-4 sm:text-22">
            Dont have an account?
            <SignUpButton>
              <span className="font-bold text-blue-600 cursor-pointer">
                {" "}
                Sign up
              </span>
            </SignUpButton>
          </h2>
        )}

        {/* ✅ Correct type assertion */}
        <SignIn
          appearance={{
            elements: {
              footer: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}
