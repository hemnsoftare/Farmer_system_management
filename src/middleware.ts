import { useUser } from "@clerk/nextjs";
import { authMiddleware, clerkMiddleware } from "@clerk/nextjs/server";
import { create } from "domain";
import createMiddleware from "next-intl/middleware";
// const {user}=useUser()
// const isAdmin = user?.publicMetadata?.role === "admin";
// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   console.log(token);
//   if (!token) {
//     // Redirect to login if the token is missing
//     // return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Continue to the requested page
//   return NextResponse.next();
// }

export default createMiddleware({
  locales: ["en", "kurd", "ar"],
  defaultLocale: "en",
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/(en|kurd|ar)/:path*",
  ],
};

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// export default clerkMiddleware((auth, req) => {
// Protect all routes starting with `/admin`
//   if (isAdminRoute(req) && auth().sessionClaims?.metadata?.role !== "admin") {
//     const url = new URL("/", req.url);
//     return NextResponse.redirect(url);
//   }
// });

// export const config = {
//   matcher: [
// Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
