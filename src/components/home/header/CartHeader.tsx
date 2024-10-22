import React from "react";

import { TiShoppingCart } from "react-icons/ti";
import CartItem from "./CartItem";
import { carts } from "@/app/util/data";
import Link from "next/link";

const CartHeader = ({ onclose }: { onclose: () => void }) => {
  return (
    <>
      <div
        onClick={onclose}
        className="h-screen fixed top-20 right-0 bg-re w-screen backdrop-blur-sm    z-10  "
      />
      <div className="flex gap-4 z-50 h-fit overflow-hidden absolute top-full bg-gray-50 px-4 pb-3 shadow-md right-0 flex-col items-start justify-start">
        <p className="mt-3 w-full flex items-center justify-between">
          {" "}
          <span>3 items</span>{" "}
          <span className="hover:underline cursor-pointer">view all </span>
        </p>
        <div className="flex flex-col scrollbar  overflow-y-auto items-center gap-2">
          {carts.map((item) => (
            <CartItem type="headerItem" key={item.id} item={item} />
          ))}
        </div>
        <div className="flex w-full  items-center">
          <p className="flex flex-col px-2 pr-4">
            <span className="text-14">Grand total</span>
            <span>$232.23</span>
          </p>
          <Link className="flex items-center flex-1" href={"/Cart"}>
            {" "}
            <button className="flex items-center gap-2 rounded-lg justify-center py-2 flex-1 text-white bg-primary ">
              <span className="text-white">Proceed to Cart</span>{" "}
              <TiShoppingCart color="white" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartHeader;
