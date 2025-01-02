"use client";
import { menuItems } from "@/util/data"; // Adjust the path to menuItems
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
  // State to manage the visibility of the sidebar
  const [showSlider, setShowSlider] = useState(true);

  useEffect(() => {
    console.log("layout initialized");
    if (user) {
      const isAdmin = user?.publicMetadata?.role === "admin";
      if (!isAdmin) {
        // redirect("/");
      }
    }
  }, [user]);

  // Functions to handle showing and hiding the sidebar
  const handleShowSlider = () => setShowSlider(true);
  const handleHideSlider = () => setShowSlider(false);

  return (
    <div className={`flex relative   items-start h-full justify-start w-full`}>
      <button onClick={() => setshowtabs((pre) => !pre)} className="z-50">
        <FaPlus
          className={`p-1 box-border rounded-full text-25 md:hidden text-white absolute top-3 left-3 
          ${showtabs ? "rotate-45" : "rotate-0"} 
          duration-300 transition-transform bg-secondary`}
        />
      </button>

      {/* sidbar of */}
      <div
        className={`transition-all duration-1000 flex-col gap-3 z-50 absolute top-12 left-3
    ${showtabs ? "max-w-[220px] opacity-100 flex" : "max-w-0 opacity-0"}`}
      >
        {menuItems.map((item, index) => (
          <Link
            href={item.url || ""}
            key={item.name}
            onClick={() => setshowtabs(false)}
            style={{
              transitionDelay: `${index * 150}ms`, // Slightly increased delay for a smoother stagger
              transitionDuration: "700ms", // Add inline duration to avoid conflicts
            }}
            className={`bg-purple-600 flex px-3 py-1 items-center gap-2 text-white rounded-xl
        transition-all overflow-hidden
        ${showtabs ? "translate-x-0 opacity-100" : "-translate-x-[240px] opacity-0"}`}
          >
            <item.icon color="white" className="w-[20px]   " />
            <h2
              className={`transition-opacity ${showtabs ? "opacity-100" : "opacity-0"}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionDuration: "700ms",
              }}
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-2 transition-all md:block hidden bg-white p-0 rounded-full duration-1000 w-fit z-50 ${
          showSlider
            ? "rotate-180 left-[200px]  sm:left-[210px]"
            : "rotate-0 sm:left-4 right-[90%] top-2"
        }`}
        onClick={showSlider ? handleHideSlider : handleShowSlider}
      >
        <IoMdArrowDroprightCircle size={35} color="black" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showSlider
            ? "sm:min-w-[260px] min-w-full"
            : "-translate-x-[200px] w-0"
        } hidden md:flex transition-all overflow-y-auto h-screen px-3 duration-300 z-20 gap-5 py-9 flex-col bg-cyan-800 items-start justify-start `}
      >
        <div className="flex text-white   gap-3 items-center mb-4 justify-center">
          {user && (
            <>
              {" "}
              <Image
                src={user.imageUrl || "/user.png"}
                alt="User Avatar"
                width={100}
                height={100}
                className="w-[50px] rounded-full h-[50px]"
              />
              <h2 className="text-25 font-smaller">{user.fullName}</h2>
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
              " rounded-l-lg border-l-4 bg-gradient-to-l from-cyan-400 to-transparent border-l-cyan-400 "
            } w-full text-white rounded-lg   flex text-19 py-2 cursor-pointer sm:hover:bg-cyan-500 duration-300 transition-all items-center justify-start px-5 gap-2`}
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
              className={` ${item.name !== "Home" && pathname.includes(item.url || "null") ? "text-cyan-200 " : " text-neutral-white"} font-semibold`}
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`${
          showSlider ? "sm:w-[calc(100%-250px)] w-0" : "w-full"
        }  transition-all  bg-white z-10 duration-300  h-full`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
