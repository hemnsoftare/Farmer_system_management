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
import CartItem from "./CartItem";
import { carts } from "@/util/data";

const CartHeader = () => {
  return (
    <div className="flex gap-4 h-fit overflow-hidden absolute top-full bg-gray-50 px-4 pb-3 shadow-md right-0 flex-col items-start justify-start">
      <p className="mt-3"> 3 item</p>
      <div className="flex flex-col scrollbar h-[559px] overflow-y-auto items-center gap-2">
        {carts.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex w-full  items-center">
        <p className="flex flex-col px-2 pr-4">
          <span className="text-14">Grand total</span>
          <span>$232.23</span>
        </p>
        <button className="flex items-center gap-2 rounded-lg justify-center py-2 flex-1 text-white bg-primary ">
          <span className="text-white">Proceed to Cart</span>{" "}
          <TiShoppingCart color="white" />
        </button>
      </div>
    </div>
  );
};

export default CartHeader;
