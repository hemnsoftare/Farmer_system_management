"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductsHeader from "./ProductsHeader";
import UserHeader from "./UserHeader";
import CartHeader from "./CartHeader";
import Search from "../home/Search";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { catagoryProps, ItemCartProps } from "@/type";
import { usePathname } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import Mune from "./Mune";
import { getFireBase } from "@/lib/action/uploadimage";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const pathName = usePathname();
  const [isopenCart, setisopenCart] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const { setTheme } = useTheme();
  const [category, setcategory] = useState<catagoryProps[]>([]);
  // State to track the total quantity and grand total
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("None");
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const getdata = async () => {
      const cate: catagoryProps[] = await getFireBase("category");
      setcategory(cate);
    };
    getdata();
  }, []);
  const cartItems = useSelector(
    (state: { cart: ItemCartProps[] }) => state.cart
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 0.1) {
        // Threshold to avoid small changes
        if (currentScrollY > lastScrollY) {
          setScrollDirection("Increasing");
        } else if (currentScrollY < 30) {
          setScrollDirection("None");
        } else if (currentScrollY < lastScrollY) {
          setScrollDirection("Decreasing");
        }
      }

      setisopenCart(false);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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

  if (pathName.startsWith("/si") || pathName.includes("dashboard")) {
    return null;
  }

  return (
    <div
      className={` ${
        scrollDirection === "Decreasing"
          ? " translate-y-0 transition-all backdrop-blur-md text-black dark:backdrop-brightness-75 duration-300 sticky top-0 right-0 left-0"
          : scrollDirection === "None"
            ? "translate-y-0 "
            : "-translate-y-[200px] text-black "
      } 
         flex relative z-[50] top-0 right-0 left-0  dark:text-white items-center px-3 pt-4 pb-2  justify-between`}
    >
      {/* logo */}
      <Link href={"/"} className="hidden sm:block">
        {" "}
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={48}
          height={53}
          className=" lg:w-[48px] w-[30px] h-[30px] lg:h-[53px] md:w-[39px] md:h-[43px]"
        />
      </Link>

      {/* menu */}
      <div className="block sm:hidden">
        <Mune category={category} />
      </div>
      <Link href="/" className="font-bold block sm:hidden text-secondary-300">
        Tech - Hiem
      </Link>
      {/* dark mode and light mode  */}
      <MdOutlineDarkMode
        className="block  dark:hidden md:dark:hidden md:hidden"
        onClick={() => setTheme("dark")}
      />
      <MdOutlineLightMode
        className="hidden  md:dark:hidden dark:block md:hidden"
        onClick={() => setTheme("light")}
      />
      {/* center */}
      <div className="sm:flex hidden xl:gap-12 lg:gap-6 md:gap-6 py-2 justify-center w-[60%] items-center">
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/"}
        >
          Home
        </Link>
        <ProductsHeader category={category} />
        <Link
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
        </Link>
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/ContactUs"}
        >
          Contact Us
        </Link>
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]"
          href={"/About"}
        >
          About Us
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:underline border-0 outline-none underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-primary text-lg font-[400]">
            Mode
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-neutral-700 ">
            <DropdownMenuItem
              className="sm:hover:bg-slate-500 duration-300"
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              className="sm:hover:bg-slate-500 duration-300"
              onClick={() => setTheme("dark")}
            >
              dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className="sm:hover:bg-slate-500 duration-300"
              onClick={() => setTheme("orange")}
            >
              orange
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          <IoCartOutline size={24} className="relative" />
          <p className="text-8 font-semibold rounded-full p-1 px-2 absolute bg-blue-700 text-white -bottom-1 -right-1">
            {total}
          </p>
        </div>
        <div className="hidden sm:block">
          <SignedOut>
            <div className="flex items-center justify-center gap-3">
              <div className="text-primary text-12 px-3 py-1">
                <SignInButton> Login</SignInButton>
              </div>
              <div className="px-3 py-1 text-8 sm:text-12 bg-blue-700 text-white rounded-lg">
                <SignUpButton> Sign Up </SignUpButton>
              </div>
            </div>
          </SignedOut>
        </div>
        <SignedIn>
          <UserHeader />
        </SignedIn>
      </div>
      {isopenCart && (
        <CartHeader items={cartItems} onclose={() => setisopenCart(false)} />
      )}
    </div>
  );
};

export default Header;
