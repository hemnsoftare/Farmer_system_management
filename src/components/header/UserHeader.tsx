import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserHeader = () => {
  const { user } = useUser(); // Access the current user data

  // Ensure user data and profileImageUrl are available
  const profileImageUrl = user?.imageUrl || "/default-profile-image.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none">
        {/* Use the user's profile image URL */}
        <Image
          src={"/user.png"} // Use the computed image URL
          alt="user"
          width={24}
          height={24}
          className="object-cover rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" z-50 bg-white">
        <DropdownMenuLabel className="flex gap-2 border-b-2 border-neutral-100 items-center justify-between">
          <Image
            src={profileImageUrl} // Use the computed image URL
            alt="user"
            width={24}
            height={24}
            className="object-cover rounded-full"
          />
          <div className="flex gap-0 items-start justify-center flex-col">
            <span className="capitalize text-blue-800 text-[12px] ">
              {user?.fullName}
            </span>
            <span className=" text-[10px] cursor-pointer hover:text-blue-700 hover:underline underline-offset-4 ">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <Link href={"/user-profile"}>Manage Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <Link href={"/historyOrder"}>Histroy Order</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          {/* Sign out button */}
          <span className="w-full">
            <SignOutButton> LOG OUT</SignOutButton>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserHeader;
