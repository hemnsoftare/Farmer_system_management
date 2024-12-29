import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="relative md:hidden h-screen overflow-hidden flex flex-col w-screen ">
        {/* Text Section */}
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
        {/* Background Image for Mobile */}
        <Image
          src={"/heroN.png"}
          alt="image hero"
          width={100}
          height={550}
          className="  w-full  scale-x-[1.8] h-screen sm:hidden"
        />
        {/* Regular Image for Larger Screens */}
      </div>
      <div className="md:flex sm:mt-12 hidden overflow-hidden above-405:px-3 mt-0 items-center w-full justify-between ">
        <div className="flex w-full md:w-[300px] justify-center flex-col py-4 h-full items-center gap-8">
          <h1 className="lg:text-35 dark:text-primary-200 xl:text-45 text-18 md:text-29 font-bold capitalize text-primary-700">
            Tech Heim
          </h1>
          <h3 className="font-[500] dark:text-neutral-500 text-12 text-center w-full md:text-20 lg:text-24">
            &quot;Join
            <span className="text-secondary">
              {" "}
              the digital <br className="lg:block hidden " /> revolution&quot;
            </span>
          </h3>

          <Link href={"#newProducts"} className="transition-all duration-300">
            <button className="capitalize px-7 py-2 text-10 lg:text-16 sm:text-20 -mb-6 above-405:px-7 sm:hover:bg-red-800 duration-300 transition-all md:px-12 lg:px-10 bg-secondary text-white  sm:py-4 rounded-lg mt-auto">
              explore more
            </button>
          </Link>
        </div>

        <Image
          src={"hero.svg"}
          alt="image hero"
          className="mr-0 xl:w-[60%] scale-[1.24] w-[210px] h-[260px]  sm:scale-[1]  sm:h-auto self-end lg:w-[55%] sm:w-[60%] "
          width={628}
          height={400}
        />
      </div>
    </>
  );
};

export default Hero;
