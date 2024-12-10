"use client";
import { menuItems } from "@/util/data"; // Adjust the path to menuItems
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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

  // State to manage the visibility of the sidebar
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    console.log("layout initialized");
    if (user) {
      const isAdmin = user?.publicMetadata?.role === "admin";
      console.log(user);
      console.log(isAdmin);
      if (!isAdmin) {
        redirect("/");
      }
    }
  }, [user]);

  // Functions to handle showing and hiding the sidebar
  const handleShowSlider = () => setShowSlider(true);
  const handleHideSlider = () => setShowSlider(false);

  return (
    <div className="flex relative items-start h-full justify-start w-full">
      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-2 transition-all duration-1000 z-50 ${
          showSlider
            ? "rotate-180 right-2 sm:left-[210px]"
            : "rotate-0 sm:left-4 right-[90%] top-2"
        }`}
        onClick={showSlider ? handleHideSlider : handleShowSlider}
      >
        <IoMdArrowDroprightCircle size={35} color="black" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showSlider ? "sm:w-[250px] w-full" : "-translate-x-[200px] w-0"
        } flex transition-all duration-300 z-20 gap-5 py-9 flex-col bg-neutral-400 items-start justify-start h-screen`}
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
            onClick={handleHideSlider}
            className={`${
              item.name !== "Home" &&
              pathname.includes(item.url || "null") &&
              "border-l-8 border-neutral-600 bg-neutral-500"
            } w-full text-white flex text-19 py-2 cursor-pointer sm:hover:bg-neutral-500 duration-300 transition-all items-center justify-start px-5 gap-2`}
          >
            <item.icon color="white" className="w-[20px]" />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`${
          showSlider ? "sm:w-[calc(100%-250px)] w-0" : "w-full"
        } transition-all z-10 duration-300 h-full`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
