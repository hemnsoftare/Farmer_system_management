"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductsHeader from "./ProductsHeader";
import UserHeader from "./UserHeader";
import CartHeader from "./CartHeader";
import Search from "../Search";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ItemCartProps } from "@/type";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  const [isopenCart, setisopenCart] = useState(false);
  const [isOpenSearch, setisOpenSearch] = useState(false);

  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  // Select cart items from Redux store
  const cartItems = useSelector(
    (state: { cart: ItemCartProps[] }) => state.cart
  );

  // State to track the total quantity and grand total
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Calculate total quantity and grand total whenever cartItems changes
  useEffect(() => {
    const quantityTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotal(quantityTotal);

    const calculatedGrandTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setGrandTotal(calculatedGrandTotal);
  }, [cartItems]);

  // Return early if on a specific path
  if (pathName.startsWith("/si") && pathName.includes("dashboard")) {
    return null;
  }

  return (
    <div className="flex relative items-center pt-4 justify-between">
      {/* logo */}
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={48}
        height={53}
        className=" lg:w-[48px] lg:h-[53px] md:w-[39px] md:h-[43px]"
      />
      {/* center */}
      <div className="flex xl:gap-12 lg:gap-6 md:gap-6 py-2 justify-center w-[60%] items-center">
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/"}
        >
          Home
        </Link>
        <ProductsHeader />
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/About"}
        >
          About Us
        </Link>
      </div>
      {/* right */}
      <div className="flex gap-2 items-center">
        {isAdmin && (
          <Link
            className="bg-secondary-400 px-3 py-1 duration-300 transition-all text-white rounded-lg hover:bg-secondary-600"
            href={"/dashboard/PersonalData"}
          >
            Dashboard
          </Link>
        )}
        <div onClick={() => setisopenCart(!isopenCart)} className="relative">
          <IoCartOutline size={30} className="relative" />
          <p className="text-9 font-semibold rounded-full p-1 px-2 absolute bg-blue-700 text-white -bottom-1 -right-1">
            {total}
          </p>
        </div>
        <SignedOut>
          <div className="flex items-center justify-center gap-3">
            <div className="text-primary px-3 py-1">
              <SignInButton> Login</SignInButton>
            </div>
            <div className="px-3 py-1 text-12 bg-blue-700 text-white rounded-lg">
              <SignUpButton> Sign Up </SignUpButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <UserHeader />
        </SignedIn>
      </div>
      {isopenCart && (
        <CartHeader items={cartItems} onclose={() => setisopenCart(false)} />
      )}
      {isOpenSearch && (
        <Search isopen={isOpenSearch} onclose={() => setisOpenSearch(false)} />
      )}
    </div>
  );
};

export default Header;
