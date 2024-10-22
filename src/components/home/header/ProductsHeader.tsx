import React from "react";
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

const ProductsHeader = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="hover:underline underline-offset-4 duration-200 transition-all hover:text-primary text-lg font-[400]">
              Products
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 w-[300px] rounded-md shadow-lg">
            <div className="flex flex-col gap-2">
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <HiOutlineDevicePhoneMobile className="w-[20px] h-[20px]" />
                <span>Mobile Phones</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <RiComputerLine className="w-[20px] h-[20px]" />
                <span>Laptops & Computers</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <HiOutlineDevicePhoneMobile className="w-[20px] h-[20px]" />
                <span>Tablets & E-readers</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <BsSmartwatch className="w-[20px] h-[20px]" />
                <span>Wearables</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <FaHeadphonesSimple className="w-[20px] h-[20px]" />
                <span>Audio</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <LiaCameraSolid className="w-[20px] h-[20px]" />
                <span>Cameras</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <IoGameControllerOutline className="w-[20px] h-[20px]" />
                <span>Gaming</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <IoGitNetworkOutline className="w-[20px] h-[20px]" />
                <span>Networking</span>
              </NavigationMenuLink>
              <NavigationMenuLink className="flex w-[200px] text-[12px] items-center gap-2 hover:scale-[1.08] duration-300 transition-all hover:bg-slate-100 p-2 rounded-md">
                <Image
                  src={"/devices.png"}
                  alt=""
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                />
                <span>Accessories</span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProductsHeader;
