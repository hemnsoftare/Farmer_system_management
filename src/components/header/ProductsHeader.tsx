"use cllient";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"; // Assuming you have this component
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { LiaCameraSolid } from "react-icons/lia";
import { IoGameControllerOutline, IoGitNetworkOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { catagoryProps } from "@/lib/action";
import { getFireBase } from "@/lib/action/uploadimage";

const ProductsHeader = ({
  category,
  lng,
  textcolor,
}: {
  category: catagoryProps[];
  lng: string;
  textcolor: string;
}) => {
  return (
    <NavigationMenu className={`${textcolor}`}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-transparent ${textcolor}`}>
            <Link
              href={"/products/laptopa"}
              className="hover:underline underline-offset-4 md:text-12 lg:text-16 duration-200 transition-all hover:text-primary text-lg font-[400]"
            >
              {lng}
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-2 dark:bg-black min-w-[170px] rounded-md shadow-lg">
            <div className="flex flex-col gap-2">
              {category.map((item) => (
                <NavigationMenuLink
                  key={item.name}
                  href={`/products/${item.name}`}
                  className="flex w-full dark:bg-secondary border-b text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md"
                >
                  {/* <Image
                    src={item.image.link}
                    alt="image"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  /> */}
                  <span>{item.name}</span>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProductsHeader;
