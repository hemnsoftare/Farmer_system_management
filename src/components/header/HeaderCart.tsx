"use client";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"; // As
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import CartHeader from "./CartHeader";
import { useSelector } from "react-redux";
import { loadCartFromLocalStorage } from "@/lib/store/Order";
import { ItemCartProps } from "@/lib/action";
import CartItem from "./CartItem";
import { TiShoppingCart } from "react-icons/ti";

const HeaderCart = ({ totalItems }: { totalItems: number }) => {
  const cartItems = useSelector((state: { cart: ItemCartProps[] }) => {
    return loadCartFromLocalStorage();
  });
  const [total, setTotal] = useState(cartItems.length);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // Update the total count and grand total whenever cartItems change
    setTotal(cartItems.length);

    // Calculate the grand total price
    const calculatedGrandTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setGrandTotal(calculatedGrandTotal);
  }, [cartItems]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="relative">
            <IoCartOutline size={30} className=" relative   "></IoCartOutline>
            <p className="text-9 font-semibold rounded-full p-1 px-2 absolute bg-blue-700 text-white -bottom-1 -right-1">
              {totalItems}
            </p>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <div className="flex gap-4 z-50 h-fit overflow-hidden absolute top-full bg-gray-50 px-4 pb-3 shadow-md right-0 flex-col items-start justify-start">
              <p className="mt-3 w-full flex items-center justify-between">
                <span>{total} items</span>
                <Link href={"/Cart"} className="hover:underline cursor-pointer">
                  view all
                </Link>
              </p>
              <div
                className={`flex flex-col ${
                  total !== 0 ? "h-[310px] overflow-y" : ""
                } items-center gap-2`}
              >
                {total > 0 ? (
                  cartItems.map((item, index) => (
                    <CartItem type="headerItem" key={index} item={item} />
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <div className="flex w-full items-center">
                <p className="flex flex-col px-2 pr-4">
                  <span className="text-14">Grand total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </p>
                <Link className="flex items-center flex-1" href="/Cart">
                  <button className="flex items-center px-3 gap-2 rounded-lg justify-center py-2 flex-1 text-white bg-primary">
                    <span className="text-white">Proceed to Cart</span>
                    <TiShoppingCart color="white" />
                  </button>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderCart;
