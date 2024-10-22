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
import { BsHandbag } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { user } from "@/app/util/data";
import { userProps } from "@/type";
import { LogOut } from "lucide-react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

const UserHeader = () => {
  const userInfo: userProps = user;
  const { user: userin } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none">
        {" "}
        <Image
          src={"/user.png"}
          alt="user"
          width={24}
          height={24}
          className="object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 z-50 bg-white">
        <DropdownMenuLabel className="flex gap-2 items-center justify-between">
          <CgProfile className="w-[20px] h-[20px]" />
          <div className="flex gap-0 items-start justify-center flex-col">
            <span className="capitalize text-blue-800 text-[12px] ">
              {userin?.fullName}
            </span>
            <span className=" text-[10px] cursor-pointer hover:text-blue-700 hover:underline underline-offset-4 ">
              {userin?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <BsHandbag />
          <span className="capitalize text-[12px] ">Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <AiOutlineHeart />{" "}
          <span className="capitalize text-[12px] ">Wish List</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <RiMoneyDollarCircleLine />
          <span className="capitalize text-[12px] ">Payments</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <SignOutButton> LOG OUT</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserHeader;
