import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#223949] dark:bg-[#18232E] relative w-full sm:max-w-[1000px] self-center duration-200 transition-all shadow-md sm:hover:shadow-lg sm:hover:shadow-[#223949] dark:sm:hover:shadow-[#18232E] shadow-[#223949] dark:shadow-[#18232E]  md:px-[25px] lg:px-[100px] h-[250px] sm:h-[420px] py-8 sm:py-12 rounded-md flex overflow-hidden items-center justify-between">
      <div className="flex justify-between sm:gap-7 gap-4 w-full items-center flex-col">
        <h1 className="lg:text-[44px] md:text-34 font-semibold uppercase text-white dark:text-gray-200">
          Smart Watch
        </h1>
        <p className="lg:text-[24px] w-[130px] sm:w-full md:text-20 text-14 text-center text-white dark:text-gray-300">
          Various designs and brands
        </p>
        <button className="px-12 ml-3 mt-5 sm:hover:bg-secondary-600 duration-300 transition-all py-[6px] text-[16px] font-bold text-[#223949] dark:text-[#18232E] rounded-md bg-secondary-400 dark:bg-secondary-500">
          <Link href={"#"}> view</Link>
        </button>
      </div>
      <Image
        src={"threeOclock.svg"}
        alt=""
        width={500}
        height={328}
        className="z-[2] max-w-[200px] h-[150px] md:max-w-[400px] md:min-h-[450px]"
      />
      <Image
        src={"shape3.svg"}
        alt=""
        width={533}
        height={250}
        className="absolute dark:hidden -right-[210px] h-full md:-right-[150px] lg:-right-[100px] top-auto"
      />
      <div className="dark:block absolute scale-[1.5] hidden -right-[210px] h-full md:-right-[50px] lg:-right-[50px] rounded-l-full top-auto bg-secondary-500 min-w-[300px] max-w-[300px]"></div>
    </div>
  );
};

export default Banner;
