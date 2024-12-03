import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { IoMdMenu } from "react-icons/io";
import { categories } from "@/util/data";
import { catagoryProps } from "@/type";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
const Mune = ({ category }: { category: catagoryProps[] }) => {
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <IoMdMenu size={25} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={48}
              height={53}
              className=" lg:w-[48px] px-3 w-[70px] h-[70px] lg:h-[53px] md:w-[39px] md:h-[43px]"
            />
          </SheetTitle>
          <SheetDescription>
            <ul className="w-full flex flex-col mt-24 text-20 gap-3 justify-start  items-start ">
              <Link
                className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
                href={"/"}
              >
                home
              </Link>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-3 hover:bg-gray-200 rounded-lg  duration-300 w-[170px] py-2 text-start">
                    Products
                  </AccordionTrigger>
                  <AccordionContent className="flex w-full flex-col gap-3">
                    {category.map((item) => (
                      <Link
                        key={item.name}
                        href={`/products/${item.name}`}
                        className="flex px-3 hover:bg-gray-100 rounded-lg duration-300 transition-all   items-center  gap-2 justify-start"
                      >
                        <Image
                          src={item.image.link}
                          alt="image"
                          width={30}
                          height={30}
                          className="object-contain"
                        />{" "}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
                href={"/About"}
              >
                about
              </Link>
              <Link
                className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
                href={"/FAQ"}
              >
                FAQ
              </Link>
              <SignedOut>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-primary text-18 px-3 py-1">
                    <SignInButton> Login</SignInButton>
                  </div>
                  <div className="px-3 py-2 text-18 sm:text-12 bg-secondary-400 text-white rounded-lg">
                    <SignUpButton> Sign Up </SignUpButton>
                  </div>
                </div>
              </SignedOut>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Mune;
