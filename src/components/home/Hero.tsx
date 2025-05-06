import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SearchComponent from "./Search";
const Hero = () => {
  const t = useTranslations("hero");
  return (
    <>
      {/* <div className="relative md:hidden h-screen overflow-hidden flex flex-col w-screen ">
        <div className="absolute sm:relative sm:w-1/2 w-full py-4 h-full flex flex-col items-center justify-center gap-8 z-[2] bg-opacity-50 sm:bg-transparent">
          <h1 className="text-white lg:text-35 xl:text-45 text-24 md:text-29 font-bold capitalize text-center">
            Tech Heim
          </h1>
          <h3 className="font-[500] text-neutral-200 sm:text-neutral-500 text-19 md:text-20 lg:text-24 text-center w-full">
            &quot;Join
            <span className="text-secondary">
              {" "}
              the digital <br className="hidden lg:block" /> revolution&quot;
            </span>
          </h3>

          <Link href={"#newProducts"}>
            <button className="capitalize px-7 py-2 text-12 lg:text-16 sm:text-20 bg-secondary text-white rounded-lg sm:mt-0 mt-4 lg:hover:bg-red-800 transition-all duration-300">
              explore more
            </button>
          </Link>
        </div>

        {/* Image Section */}
      {/* Background Image for Mobile 
        <Image
          src={"/heroN.png"}
          alt="image hero"
          width={100}
          height={550}
          className="  w-full  scale-x-[1.8] h-screen sm:hidden"
        />
      </div> 
      */}
      <motion.div className="flex flex-col md:px-12 sm:mt-12 bg-red-300  m-0  h-fit mb-32  w-full ">
        <SearchComponent />
        <motion.div
          transition={{ duration: 0.3 }}
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="flex justify-center items-center z-[2]  flex-col "
        >
          <h1 className="lg:text-35 mt-8 text-secondary dark:text-primary-200 xl:text-60 relative  text-48 md:text-29 font-bold capitalize ">
            {/* {t("title")} */}
            Empower Your Farming Future
          </h1>

          <div className=" flex items-center gap-2  md:mb-0 box-content md:justify-center justify-between h-full flex-col">
            <h3 className="font-[500] dark:text-neutral-500 text-22 text-white  text-center w-full md:text-20 lg:text-24">
              {/* {t("quote")} */}
              Manage your land, livestock, <br /> and harvests smarter, faster,
              and better{" "}
              <span className="text-secondary font-extrabold"> — </span> all in
              one place.
              {/* &quot;Join
              <span className="text-secondary">
                {" "}
                the digital <br className="lg:block hidden " /> revolution&quot;
              </span> */}
            </h3>
            <Link
              href={"#newProducts"}
              className="transition-all w-full md:w-fit mt-24 duration-300"
            >
              <button className="capitalize px-7 w-full  md:w-fit py-2 text-15 lg:text-16 sm:text-20  above-405:px-7 sm:hover:bg-red-800 duration-300 transition-all md:px-12 lg:px-10 bg-secondary text-white sm:py-4 rounded-lg mt-auto">
                {t("buttonText")}
              </button>
            </Link>
          </div>
        </motion.div>

        <Image
          src="/y/hero.png"
          alt="image hero"
          className="w-screen h-screen absolute top-0 left-0 brightness-95"
          fill
        />
      </motion.div>
    </>
  );
};

export default Hero;
