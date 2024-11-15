import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { SignOutButton, useUser } from "@clerk/nextjs";

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
      <DropdownMenuContent className="mt-2 z-50 bg-white">
        <DropdownMenuLabel className="flex gap-2 items-center justify-between">
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
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          {/* Sign out button */}
          <SignOutButton> LOG OUT</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserHeader;
