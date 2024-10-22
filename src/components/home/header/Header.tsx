"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProductsHeader from "./ProductsHeader";
import UserHeader from "./UserHeader";
import CartHeader from "./CartHeader";
import Search from "../Search";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
const Header = () => {
  const [isopenCart, setisopenCart] = useState(false);
  const [isOpenSearch, setisOpenSearch] = useState(false);
  const [isAuthed, setisAuthed] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

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
        {/* <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/blog"}
        >
          Blog
        </Link>
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/FAQ"}
        >
          FAQ
        </Link> */}
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/About"}
        >
          About Us
        </Link>
        {/* <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/ContactUs"}
        >
          Contact Us
        </Link> */}
      </div>
      {/* right */}
      <div className="flex gap-2 items-center">
        {isAdmin && (
          <Link href={"/dashboard/PersonalData"}>
            <button className="bg-secondary-400 px-3 py-1 duration-300 transition-all text-white rounded-lg hover:bg-secondary-600">
              Dashboard
            </button>
          </Link>
        )}
        {/* <Image
          onClick={() => {
            setisOpenSearch(!isOpenSearch);
          }}
          src={"/search-normal.svg"}
          alt="search"
          width={24}
          height={24}
          className="lg:w-[24px]  md:w-[15px] lg:h-[24px] md:h-[15px] "
        /> */}
        <Image
          onClick={() => setisopenCart(!isopenCart)}
          src={"/bag.svg"}
          alt="bag"
          width={24}
          height={24}
          className="lg:w-[24px]  md:w-[15px] lg:h-[24px] md:h-[15px] "
        />
        <SignedOut>
          <span>
            <span className="text-primary">
              <SignInButton> Login</SignInButton>
            </span>
            <span className="px-2 py-1 text-12 bg-blue-700 text-white rounded-lg">
              <SignUpButton> Sign Up </SignUpButton>
            </span>
          </span>
        </SignedOut>
        <SignedIn>
          <UserHeader />
        </SignedIn>
        {/* 
    {isAuthed && <UserHeader />}
    {!isAuthed && <CreateAcount />} 
    */}
      </div>
      {user && isopenCart && (
        <CartHeader onclose={() => setisopenCart(false)} />
      )}
      {isOpenSearch && (
        <Search isopen={isOpenSearch} onclose={() => setisOpenSearch(false)} />
      )}
    </div>
  );
};

export default Header;
