"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProductsHeader from "./ProductsHeader";
import UserHeader from "./UserHeader";
import CartHeader from "./CartHeader";
import Search from "../Search";
import CreateAcount from "./CreateAcount";

const Header = () => {
  const [isopenCart, setisopenCart] = useState(false);
  const [isOpenSearch, setisOpenSearch] = useState(false);
  const [isAuthed, setisAuthed] = useState(false);
  return (
    <div className="flex relative items-center pt-4 justify-between">
      {/* logo */}
      <Image
        src={"logo.svg"}
        alt="logo"
        width={48}
        height={53}
        className="object-cover"
      />
      {/* center */}
      <div className="flex gap-12 py-2 items-center">
        <Link
          className="hover:underline underline-offset-4 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/"}
        >
          Home
        </Link>
        <ProductsHeader />
        <Link
          className="hover:underline underline-offset-4 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/"}
        >
          Blog
        </Link>
        <Link
          className="hover:underline underline-offset-4 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/"}
        >
          FAQ
        </Link>
        <Link
          className="hover:underline underline-offset-4 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/"}
        >
          Contact Us
        </Link>
      </div>
      {/* right */}
      <div className="flex gap-2 items-center">
        <Image
          onClick={() => {
            setisOpenSearch(!isOpenSearch);
          }}
          src={"search-normal.svg"}
          alt="search"
          width={24}
          height={24}
          className="object-cover"
        />

        <Image
          onClick={() => setisopenCart(!isopenCart)}
          src={"bag.svg"}
          alt="bag"
          width={24}
          height={24}
          className="object-cover"
        />

        {isAuthed && <UserHeader />}
        {!isAuthed && <CreateAcount />}
      </div>
      {isopenCart && <CartHeader />}
      {isOpenSearch && (
        <Search isopen={isOpenSearch} onclose={() => setisOpenSearch(false)} />
      )}
    </div>
  );
};

export default Header;
