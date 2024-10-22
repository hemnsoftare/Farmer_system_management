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
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { TiShoppingCart } from "react-icons/ti";
import { Cart } from "../../../../type";

const CartItem = ({ item }: { item: Cart }) => {
  return (
    <div className=" shadow-md p-2 bg-white flex gap-2 rounded-md hover:scale-[1.02] duration-300 hover:shadow-lg ">
      <Image
        src={item.imageSrc}
        alt="image "
        width={174}
        height={140}
        className="w-[154px] h-[140]"
      />
      <div className="flex flex-col items-start bg-white   shadow-neutral-50     justify-start gap-2">
        <h2 className="text-16 w-[230px] font-semibold text-neutral-900 text-wrap">
          {item.name}
        </h2>
        <p className="text-10 text-neutral-600">blue</p>
        <p className="flex gap-2  items-center">
          <TbTruckDelivery className="text-blue-500" />
          <span>{item.delivery}</span>
        </p>
        <p className="flex gap-2 items-center">
          <MdOutlineVerified className="text-blue-500" />
          <span>{item.guarantee}</span>
        </p>
        <div className="flex items-center bg-white  w-full justify-between ">
          <p className="text-12 text-neutral-900">{item.price}</p>
          <div className="flex items-center gap-2">
            <GoTrash color="red" />
            <span className="border-b-2 border-neutral-300">
              {" "}
              - {" " + item.quantity + " "} +{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
