"use client";
import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import CartItem from "./CartItem";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ItemCartProps } from "@/type/globals";

const CartHeader = ({
  onclose,
  items,
}: {
  items: ItemCartProps[];
  onclose: () => void;
}) => {
  const cartItems = useSelector((state: { cart: ItemCartProps[] }) => {
    return state.cart || [];
  });
  const [total, setTotal] = useState(cartItems.length);

  useEffect(() => {
    // Update the total count whenever cartItems change
    setTotal(cartItems.length);
  }, [cartItems]);
  console.log(cartItems);
  return (
    <>
      <div
        onClick={onclose}
        className="h-screen fixed top-20 right-0 bg-re w-screen backdrop-blur-sm z-10"
      />
      <div className="flex gap-4 z-50 h-fit overflow-hidden absolute top-full bg-gray-50 px-4 pb-3 shadow-md right-0 flex-col items-start justify-start">
        <p className="mt-3 w-full flex items-center justify-between">
          <span>{total} items</span>
          <span className="hover:underline cursor-pointer">view all</span>
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
            <span>${/* Calculate your grand total here */ 0}</span>
          </p>
          <Link className="flex items-center flex-1" href="/Cart">
            <button className="flex items-center px-3 gap-2 rounded-lg justify-center py-2 flex-1 text-white bg-primary">
              <span className="text-white">Proceed to Cart</span>
              <TiShoppingCart color="white" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartHeader;
