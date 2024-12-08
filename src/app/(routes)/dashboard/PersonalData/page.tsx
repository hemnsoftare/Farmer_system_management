"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
const Page = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  console.log(isAdmin);

  return (
    <div className="flex-col flex justify-center items-center w-full h-screen">
      <Image
        src={"/cr7.jpeg"}
        alt="image"
        width={200}
        height={200}
        className="size-[200px] border-4 border-neutral-400 rounded-full"
      />
      <h1 className="font-semibold my-3">hemn software</h1>
      <h3>hemnfarhad14@gmail.com</h3>

      {/* Add a custom button with text */}
      <Link href={"/user-profile"}>
        <button className="w-[200px] text-white bg-black py-2 mt-5 duration-300 transition-all rounded-lg">
          Manage Account
        </button>
      </Link>

      {/* UserButton still exists if needed */}
    </div>
  );
};

export default Page;
