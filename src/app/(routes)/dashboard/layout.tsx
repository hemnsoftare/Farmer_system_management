"use client";
import { menuItems } from "@/app/util/data"; // Adjust the path to menuItems
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { cont } from "./ConTextData"; // Import the context without re-wrapping
import { useUser } from "@clerk/nextjs";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { user } = useUser();
  useEffect(() => {
    console.log("lalyout");
    if (user) {
      const isAdmin = user?.publicMetadata?.role === "admin";
      console.log(user);
      console.log(isAdmin);
      if (!isAdmin) {
        redirect("/");
      }
    }
  }, [user]);
  // }, []);
  // Now use the context correctly
  const { handleHideSlider, handleShowSlider, showSlider } = useContext(cont);

  return (
    <div className="flex relative items-start h-full justify-start w-full">
      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-2 transition-all duration-1000 z-50  ${
          showSlider ? "rotate-180 left-[210px]" : "rotate-0 left-4 top-2"
        }`}
        onClick={showSlider ? handleHideSlider : handleShowSlider}
      >
        <IoMdArrowDroprightCircle size={35} color="black" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showSlider ? "w-[250px]" : "-translate-x-[200px] w-0"
        } flex transition-all duration-300 gap-5 py-9 flex-col bg-neutral-400 items-start justify-start h-screen`}
      >
        <div className="flex text-white items-center mb-4 justify-center">
          <Image
            src={"/user.png"}
            alt="User Avatar"
            width={100}
            height={100}
            className="w-[50px] h-[50px]"
          />
          <h2>hemn software</h2>
        </div>
        {menuItems.map((item) => (
          <Link
            href={item.url || ""}
            key={item.name}
            className={`${
              item.name !== "Home" &&
              pathname.includes(item.url || "null") &&
              "border-l-8 border-neutral-600 bg-neutral-500"
            } w-full text-white flex text-19 py-2 cursor-pointer hover:bg-neutral-500 duration-300 transition-all items-center justify-start px-5 gap-2`}
          >
            <item.icon color="white" className="w-[20px]" />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`${
          showSlider ? "w-[calc(100%-250px)]" : "w-full "
        } transition-all duration-300 h-full `}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
