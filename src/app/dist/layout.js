"use client";
"use strict";
exports.__esModule = true;
var google_1 = require("next/font/google");
require("./globals.css");
var Header_1 = require("@/components/home/header/Header");
var Footer_1 = require("@/components/home/Footer");
var nextjs_1 = require("@clerk/nextjs");
var navigation_1 = require("next/navigation");
var ConTextData_1 = require("./(routes)/dashboard/ConTextData");
var react_redux_1 = require("react-redux");
var store_1 = require("@/lib/action/store");
var inter = google_1.Inter({ subsets: ["latin"] });
function RootLayout(_a) {
    var children = _a.children;
    var pathName = navigation_1.usePathname();
    console.log(pathName);
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement(react_redux_1.Provider, { store: store_1["default"] },
                React.createElement(nextjs_1.ClerkProvider, null,
                    React.createElement(ConTextData_1["default"], null,
                        React.createElement("div", { className: " " + (pathName.startsWith("/dashboard")
                                ? "px-0"
                                : "md:px-[30px]  lg:px-[40px]") + " " },
                            !pathName.startsWith("/user-profile") &&
                                !pathName.startsWith("sign") &&
                                pathName !== "/CreateProduct" &&
                                pathName !== "/sign-up" &&
                                !pathName.includes("dashboard") && React.createElement(Header_1["default"], null),
                            children),
                        !pathName.startsWith("/user-profile") &&
                            pathName !== "/sign-in" &&
                            pathName !== "/CreateProduct" &&
                            pathName !== "/sign-up" &&
                            !pathName.includes("dashboard") && React.createElement(Footer_1["default"], null)))))));
}
exports["default"] = RootLayout;
