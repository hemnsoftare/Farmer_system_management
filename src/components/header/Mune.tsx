"use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetOverlay,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { IoMdMenu } from "react-icons/io";
// import { catagoryProps } from "@/type";
// import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

// const Mune = ({ category }: { category: catagoryProps[] }) => {
//   const [showSheet, setshowSheet] = useState(false);

//   const handleOverlayClick = () => {
//     setshowSheet(false);
//   };

//   const handleHideSheet = () => {
//     setTimeout(() => {
//       setshowSheet(false);
//     }, 500);
//   };

//   return (
//     <Sheet open={showSheet} onOpenChange={setshowSheet}>
//       <SheetTrigger onClick={() => setshowSheet(true)}>
//         <IoMdMenu size={25} />
//       </SheetTrigger>
//       <SheetOverlay onClick={handleOverlayClick}></SheetOverlay>
//       <SheetContent side={"left"} className="dark:text-gray-400">
//         <SheetHeader>
//           <SheetTitle>
//             <Image
//               src={"/logo.svg"}
//               alt="logo"
//               width={48}
//               height={53}
//               className=" lg:w-[48px] px-3 w-[70px] h-[70px] lg:h-[53px] md:w-[39px] md:h-[43px]"
//             />
//           </SheetTitle>
//           <SheetDescription>
//             <ul className="w-full flex flex-col mt-24 text-20 gap-3 justify-start  items-start ">
//               <Link
//                 onClick={() => setshowSheet(false)}
//                 href={"/"}
//                 className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
//               >
//                 Home
//               </Link>

//               <Accordion type="single" collapsible>
//                 <AccordionItem value="item-1">
//                   <AccordionTrigger className="px-3 hover:bg-gray-200 rounded-lg  font-[400] duration-300 w-[170px] py-2 text-start">
//                     Products
//                   </AccordionTrigger>
//                   <AccordionContent className="flex w-full flex-col dark:gap-2 gap-3">
//                     {category.map((item) => (
//                       <Link
//                         onClick={handleHideSheet}
//                         key={item.name}
//                         href={`/products/${item.name}`}
//                         className="flex px-3 hover:bg-gray-100 dark:bg-secondary rounded-lg duration-300 transition-all  dark:py-1 items-center  gap-2 justify-start"
//                       >
//                         <Image
//                           src={item.image.link}
//                           alt="image"
//                           width={30}
//                           height={30}
//                           className="object-contain"
//                         />
//                         <span>{item.name}</span>
//                       </Link>
//                     ))}
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//               <Link
//                 href={"/blog"}
//                 onClick={handleHideSheet}
//                 className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
//               >
//                 Blog
//               </Link>
//               <Link
//                 onClick={handleHideSheet}
//                 className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
//                 href={"/FAQ"}
//               >
//                 FAQ
//               </Link>
//               <Link
//                 onClick={handleHideSheet}
//                 className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
//                 href={"/ContactUs"}
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 onClick={handleHideSheet}
//                 className="px-3 rounded-lg hover:bg-gray-200  duration-300 w-full py-2 text-start"
//                 href={"/About"}
//               >
//                 About
//               </Link>
//               <SignedOut>
//                 <div className="flex items-center justify-center gap-3">
//                   <div className="text-primary text-18 px-3 py-1">
//                     <SignInButton> Login</SignInButton>
//                   </div>
//                   <div className="px-3 py-2 text-18 sm:text-12 bg-secondary-400 text-white rounded-lg">
//                     <SignUpButton> Sign Up </SignUpButton>
//                   </div>
//                 </div>
//               </SignedOut>
//             </ul>
//           </SheetDescription>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   );
// };
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import {
  FaHome,
  FaBox,
  FaBlog,
  FaQuestionCircle,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";
import { catagoryProps } from "@/lib/action";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const Mune = ({ category }: { category: catagoryProps[] }) => {
  const [showSheet, setShowSheet] = useState(false);
  const router = usePathname();

  const handleOverlayClick = () => setShowSheet(false);

  const isActive = router;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger
        onClick={() => setShowSheet(true)}
        className="text-orange-700 dark:text-gray-200 hover:text-blue-500 transition-all duration-300"
      >
        <IoMdMenu size={30} />
      </SheetTrigger>
      <SheetOverlay onClick={handleOverlayClick} className="bg-gray-900/80" />
      <SheetContent
        side={"left"}
        onTouchMove={handleOverlayClick}
        className="bg-gray-900 text-gray-100 p-8 rounded-tr-[30px] rounded-br-[50px] shadow-lg"
      >
        <SheetHeader className="flex justify-between items-center">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={48}
            height={53}
            className="w-12 h-12"
          />
          <button
            onClick={() => setShowSheet(false)}
            className="text-gray-400 hover:text-white transition"
          >
            <IoMdClose size={30} />
          </button>
        </SheetHeader>
        <SheetDescription>
          <ul className="mt-8 flex flex-col gap-5">
            <Link
              href="/"
              className={`flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold transition ${
                isActive === "/"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <FaHome size={22} />
              Home
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition">
                  <FaBox size={22} />
                  Products
                </AccordionTrigger>
                <AccordionContent className="pl-8 flex flex-col gap-4 mt-3">
                  {category.map((item) => (
                    <Link
                      key={item.name}
                      href={`/products/${item.name}`}
                      className={`flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold transition ${
                        isActive.includes(`/products/${item.name}`)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      <Image
                        src={item.image.link}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="w-7 h-7 object-contain"
                      />
                      {item.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="/blog"
              className={`flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold transition ${
                isActive.includes("/blog")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <FaBlog size={22} />
              Blog
            </Link>
            <Link
              href="/FAQ"
              className={`flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold transition ${
                isActive.includes("/FAQ")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <FaQuestionCircle size={22} />
              FAQ
            </Link>
            <Link
              href="/ContactUs"
              className={`flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold transition ${
                isActive.includes("/ContactUs")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <FaPhone size={22} />
              Contact Us
            </Link>
            <Link
              href="/About"
              className={`flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-semibold transition ${
                isActive.includes("/About")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <FaInfoCircle size={22} />
              About
            </Link>
            <SignedOut>
              <div className="flex gap-5 mt-10">
                <SignInButton>
                  <button className="w-full px-6 py-3 text-lg font-semibold bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="w-full px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </ul>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Mune;
