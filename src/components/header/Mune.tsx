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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
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
import {
  FaHome,
  FaBox,
  FaBlog,
  FaQuestionCircle,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";
import { catagoryProps } from "@/type";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const Mune = ({ category }: { category: catagoryProps[] }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const handleOverlayClick = () => {
    setShowSheet(false);
  };

  const handleHideSheet = () => {
    setTimeout(() => {
      setShowSheet(false);
    }, 500);
  };

  const handleActiveLink = (link: string) => {
    setActiveLink(link);
  };

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger
        onClick={() => setShowSheet(true)}
        className="text-black dark:text-white hover:text-blue-500 transition-all duration-300"
      >
        <IoMdMenu size={30} />
      </SheetTrigger>
      <SheetOverlay onClick={handleOverlayClick} className="bg-black/80" />

      {/* Custom Secondary Color (Updated to a new background color) */}
      <SheetContent
        side={"left"}
        onTouchMoveCapture={() => setShowSheet(false)}
        className="bg-gradient-to-r mr-0 border-0 from-teal-500 to-blue-600 text-white p-6 rounded-e-xl shadow-lg transition-all"
      >
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center space-x-3">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={48}
              height={53}
              className="w-[60px] h-[60px]"
            />
            <span className="text-2xl font-semibold">Menu</span>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription>
          <ul className="w-full flex flex-col mt-8 gap-6">
            {/* Home Link with Icon */}
            <Link
              onClick={() => {
                setShowSheet(false);
                handleActiveLink("home");
              }}
              href={"/"}
              className={`flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 ${activeLink === "home" ? "bg-teal-800 text-white" : "text-gray-200"}`}
            >
              <FaHome size={20} />
              Home
            </Link>

            {/* Products Accordion with Icon */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300">
                  <FaBox size={20} />
                  Products
                </AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-4">
                  {category.map((item) => (
                    <Link
                      onClick={() => {
                        handleHideSheet();
                        handleActiveLink(item.name);
                      }}
                      key={item.name}
                      href={`/products/${item.name}`}
                      className={`flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 ${activeLink === item.name ? "bg-teal-800 text-white" : "text-gray-200"}`}
                    >
                      <Image
                        src={item.image.link}
                        alt={item.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Static Links with Icons */}
            <Link
              onClick={() => {
                handleHideSheet();
                handleActiveLink("blog");
              }}
              href={"/blog"}
              className={`flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 ${activeLink === "blog" ? "bg-teal-800 text-white" : "text-gray-200"}`}
            >
              <FaBlog size={20} />
              Blog
            </Link>
            <Link
              onClick={() => {
                handleHideSheet();
                handleActiveLink("FAQ");
              }}
              href={"/FAQ"}
              className={`flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 ${activeLink === "FAQ" ? "bg-teal-800 text-white" : "text-gray-200"}`}
            >
              <FaQuestionCircle size={20} />
              FAQ
            </Link>
            <Link
              onClick={() => {
                handleHideSheet();
                handleActiveLink("contact");
              }}
              href={"/ContactUs"}
              className={`flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 ${activeLink === "contact" ? "bg-teal-800 text-white" : "text-gray-200"}`}
            >
              <FaPhone size={20} />
              Contact Us
            </Link>
            <Link
              onClick={() => {
                handleHideSheet();
                handleActiveLink("about");
              }}
              href={"/About"}
              className={`flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 ${activeLink === "about" ? "bg-teal-800 text-white" : "text-gray-200"}`}
            >
              <FaInfoCircle size={20} />
              About
            </Link>

            {/* Authentication Buttons */}
            <SignedOut>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="px-6 py-2 text-lg text-teal-600 font-medium border-2 border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300">
                  <SignInButton>Login</SignInButton>
                </div>
                <div className="px-6 py-2 text-lg bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300">
                  <SignUpButton>Sign Up</SignUpButton>
                </div>
              </div>
            </SignedOut>
          </ul>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Mune;
