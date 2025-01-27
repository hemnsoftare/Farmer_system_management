"use client";
import { menuItems } from "@/util/data"; // Adjust the path to menuItems
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useUser } from "@clerk/nextjs";
import { FaPlus } from "react-icons/fa";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [showtabs, setshowtabs] = useState(false);
  const [showSlider, setShowSlider] = useState(true); // State for sidebar visibility

  useEffect(() => {
    console.log("Layout initialized");
  }, [user]);

  // Functions to handle sidebar visibility
  const handleShowSlider = () => setShowSlider(true);
  const handleHideSlider = () => setShowSlider(false);

  return (
    <div className="flex relative h-screen bg-gray-500 min-w-screen">
      {/* Mobile Tabs Toggle */}
      <button
        onClick={() => setshowtabs((pre) => !pre)}
        className="z-50 md:hidden"
      >
        <FaPlus
          className={`p-1 box-border rounded-full text-35 text-white absolute top-3 left-3 ${
            showtabs ? "rotate-45" : "rotate-0"
          } transition-transform duration-300 bg-secondary`}
        />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`transition-all  md:hidden duration-500 flex-col gap-3 z-50 absolute top-12 left-3 ${
          showtabs ? "max-w-[220px] opacity-100 flex" : "max-w-0 opacity-0"
        }`}
      >
        {menuItems.map((item, index) => (
          <Link
            href={item.url || ""}
            key={item.name}
            onClick={() => setshowtabs(false)}
            style={{
              transitionDelay: `${index * 150}ms`,
              transitionDuration: "500ms",
            }}
            className={`bg-purple-600 flex px-3 py-1 items-center gap-2 text-white rounded-xl transition-all ${
              showtabs
                ? "translate-x-0 opacity-100"
                : "-translate-x-[240px] opacity-0"
            }`}
          >
            <item.icon color="white" className="w-[20px]" />
            <h2
              className={`transition-opacity ${
                showtabs ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionDuration: "500ms",
              }}
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-2 transition-all md:block hidden bg-white p-0 rounded-full duration-300 z-50 ${
          showSlider ? "rotate-180 left-[200px]" : "rotate-0 left-4"
        }`}
        onClick={showSlider ? handleHideSlider : handleShowSlider}
      >
        <IoMdArrowDroprightCircle size={35} color="black" />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`${
          showSlider ? "sm:w-[260px] w-full" : "sm:-translate-x-[560px] sm:w-0"
        } hidden md:flex transition-all duration-300  overflow-y-auto h-screen px-3 gap-5 py-9 flex-col bg-cyan-800 items-start`}
      >
        <div className="flex text-white gap-3 items-center mb-4 justify-center">
          {user && (
            <>
              <Image
                src={user.imageUrl || "/user.png"}
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]"
              />
              <h2 className="text-lg font-medium">{user.fullName}</h2>
            </>
          )}
        </div>
        {menuItems.map((item) => (
          <Link
            href={item.url || ""}
            key={item.name}
            className={`${
              item.name !== "Home" &&
              pathname.includes(item.url || "null") &&
              "rounded-l-lg border-l-4 bg-gradient-to-l from-cyan-400 to-transparent border-l-cyan-400"
            } w-full text-white flex text-md py-2 cursor-pointer rounded-lg hover:bg-cyan-500 transition-all items-center px-5 gap-2`}
          >
            <item.icon
              color="white"
              className={`${
                item.name !== "Home" && pathname.includes(item.url || "null")
                  ? "bg-gradient-to-b from-white to-cyan-950 to-85% text-black"
                  : "bg-gradient-to-b from-white to-cyan-950 to-45%"
              } w-[20px] shadow-sm shadow-white  rounded-full p-2 box-content`}
            />

            <h2
              className={`${
                item.name !== "Home" && pathname.includes(item.url || "null")
                  ? "text-cyan-200"
                  : "text-neutral-white"
              } font-semibold`}
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          showSlider ? "w-full md:w-[calc(100%-260px)]" : "w-secreen"
        } bg-white h-screen overflow-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
