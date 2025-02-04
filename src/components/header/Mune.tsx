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
import { useTranslations } from "next-intl";
import { LoginButton, SingUp } from "./Header";
import { lang } from "@/lib/action/uploadimage";

import { MdLanguage } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
const Mune = ({ category }: { category: catagoryProps[] }) => {
  const [showSheet, setShowSheet] = useState(false);
  const router = usePathname();
  const r = useRouter();
  const handleHideSheet = () => {
    setTimeout(() => {
      setShowSheet(false);
    }, 500);
  };
  const t = useTranslations("header");
  let startX = 0;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - startX;

    if (Math.abs(deltaX) > 50) {
      setShowSheet(false); // Close on swipe left or right
    }
  };
  const changelanguage = (lang: string) => {
    // Get the current URL
    const currentPath = window.location.pathname; // Use the browser's `pathname`
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`); // Replace the language prefix

    // Push the new path
    r.push(newPath);
  };
  const isActive = router;
  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger
        onClick={() => setShowSheet(true)}
        className="text-orange-700 dark:text-gray-200 hover:text-blue-500 transition-all duration-300"
      >
        <IoMdMenu size={30} />
      </SheetTrigger>
      <SheetOverlay
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="bg-gray-900/80"
      />
      <SheetContent
        side={"left"}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
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
          <ul className="mt-8 flex flex-col gap-2">
            <Link
              href="/"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                isActive.length < 4
                  ? lang() === "ar" || lang() === "ku"
                    ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                    : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }${lang() === "ar" || lang() === "ku" ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start" : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "}  border border-secondary  `}
            >
              <FaHome size={22} />
              {t("home")}
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition ${
                    lang() === "ar" || lang() === "ku"
                      ? "flex-row-reverse border-t-0 border-l-0 border-r-2 border-b-2 "
                      : "flex-row border-b-0 border-r-0 border-l-2 border-t-2 "
                  } w-full border border-secondary`}
                >
                  <FaBox size={22} />
                  {t("products")}
                </AccordionTrigger>

                <AccordionContent className=" w-full flex flex-col gap-4 mt-3">
                  {category.map((item) => (
                    <Link
                      key={item.name}
                      href={`/products/${item.name}`}
                      className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                        isActive.includes(`/products/${item.name}`)
                          ? lang() === "ar" || lang() === "ku"
                            ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                            : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }${lang() === "ar" || lang() === "ku" ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start" : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "}  border border-secondary  `}
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
            {/* languge  */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition ${
                    lang() === "ar" || lang() === "ku"
                      ? "flex-row-reverse border-t-0 border-l-0 border-r-2 border-b-2 "
                      : "flex-row border-b-0 border-r-0 border-l-2 border-t-2 "
                  } w-full border border-secondary`}
                >
                  <MdLanguage size={23} />
                  {t("language")}
                </AccordionTrigger>

                <AccordionContent className=" w-full flex flex-col gap-4 mt-3">
                  <p
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition ${
                      lang() === "ar" || lang() === "ku"
                        ? "flex-row-reverse border-t-0 border-l-0 border-r-2 border-b-2 "
                        : "flex-row border-b-0 border-r-0 border-l-2 border-t-2 "
                    } w-full border border-secondary`}
                    onClick={() => changelanguage("en")}
                  >
                    {t("english")}
                  </p>
                  <p
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition ${
                      lang() === "ar" || lang() === "ku"
                        ? "flex-row-reverse border-t-0 border-l-0 border-r-2 border-b-2 "
                        : "flex-row border-b-0 border-r-0 border-l-2 border-t-2 "
                    } w-full border border-secondary`}
                    onClick={() => changelanguage("ku")}
                  >
                    {t("kurdish")}
                  </p>
                  <p
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition ${
                      lang() === "ar" || lang() === "ku"
                        ? "flex-row-reverse border-t-0 border-l-0 border-r-2 border-b-2 "
                        : "flex-row border-b-0 border-r-0 border-l-2 border-t-2 "
                    } w-full border border-secondary`}
                    onClick={() => changelanguage("tr")}
                  >
                    {t("turkish")}
                  </p>
                  <p
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 transition ${
                      lang() === "ar" || lang() === "ku"
                        ? "flex-row-reverse border-t-0 border-l-0 border-r-2 border-b-2 "
                        : "flex-row border-b-0 border-r-0 border-l-2 border-t-2 "
                    } w-full border border-secondary`}
                    onClick={() => changelanguage("ar")}
                  >
                    {t("arabic")}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/setting"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                isActive.includes("/settin")
                  ? lang() === "ar" || lang() === "ku"
                    ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                    : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              } ${lang() === "ar" || lang() === "ku" ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start" : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "}  border border-secondary  `}
            >
              <IoSettingsOutline size={22} />
              {t("setting")}
            </Link>
            <Link
              href="/blog"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                isActive.includes("/blog")
                  ? lang() === "ar" || lang() === "ku"
                    ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                    : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              } ${lang() === "ar" || lang() === "ku" ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start" : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "}  border border-secondary  `}
            >
              <FaBlog size={22} />
              {t("blog")}
            </Link>
            <Link
              href="/FAQ"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                isActive.includes("/FAQ")
                  ? lang() === "ar" || lang() === "ku"
                    ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                    : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }${lang() === "ar" || lang() === "ku" ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start" : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "}  border border-secondary `}
            >
              <FaQuestionCircle size={22} />
              {t("faq")}
            </Link>
            <Link
              href="/ContactUs"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                isActive.includes("/ContactUs")
                  ? lang() === "ar" || lang() === "ku"
                    ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                    : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              } ${lang() === "ar" || lang() === "ku" ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start" : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "}  border border-secondary `}
            >
              <FaPhone size={22} />
              {t("contactus")}
            </Link>
            <Link
              href="/About"
              className={`flex items-center gap-4 px-3 py-2 rounded-lg text-15 font-semibold transition ${
                isActive.includes("/About")
                  ? lang() === "ar" || lang() === "ku"
                    ? " bg-gradient-to-tl to-secondary from-black bg-blue-500 text-white "
                    : "  bg-gradient-to-br to-secondary from-black  bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              } ${
                lang() === "ar" || lang() === "ku"
                  ? " border-t-0 border-l-0 border-r-2 border-b-2  w-full flex-row-reverse justify-start"
                  : "  border-b-0 border-r-0 border-l-2 border-t-2   flex-row justify-start w-full "
              } 
                  border border-secondary `}
            >
              <FaInfoCircle
                size={22}
                color={isActive.includes("/About") ? " #f45e0c" : null}
              />
              {t("about")}
            </Link>
            <SignedOut>
              <div className="flex w-full gap-3 mt-10">
                <button className="w-full px-4 py-2 text-15 font-semibold bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition">
                  <SignInButton>
                    <LoginButton />
                  </SignInButton>
                </button>
                <button className="w-full px-4 py-2 text-15 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                  <SignUpButton>
                    <SingUp />
                  </SignUpButton>
                </button>
              </div>
            </SignedOut>
          </ul>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Mune;
