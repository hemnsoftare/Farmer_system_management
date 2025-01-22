"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
const Page = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex-col flex justify-center items-center w-full h-screen">
      {user && (
        <>
          <Image
            src={user.imageUrl || "/avatar.png"}
            alt="image"
            width={200}
            height={200}
            className="size-[300px] border-4 border-neutral-400 rounded-full"
          />
          <h1 className="font-semibold my-3">{user.fullName}</h1>
          <h3>{user.emailAddresses[0].emailAddress}</h3>
        </>
      )}

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
