import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#223949] max-w-[1400px] self-center duration-200 transition-all shadow-md hover:shadow-lg hover:shadow-[#223949] shadow-[#223949] relative md:px-[25px] lg:px-[100px] h-[420px] py-12 rounded-md flex overflow-hidden items-center justify-between">
      <div className="flex justify-between gap-7 w-full items-center flex-col">
        <h1 className="lg:text-[44px]  md:text-34 font-semibold uppercase text-white">
          Smart Watch
        </h1>
        <p className="lg:text-[24px] md:text-20  text-white">
          {" "}
          Various designs and brands
        </p>
        {/* <button className="px-12 hover:bg-secondary-600 duration-300 transition-all  py-2 text-[16px] font-bold text-[#223949] rounded-md bg-secondary-400">
          <Link href={"/products/smartwatch/jhfdsj"}> view</Link>
        </button> */}
      </div>
      <Image
        src={"threeOclock.svg"}
        alt=""
        width={500}
        height={328}
        className="z-10 object-cover md:w-[400px] md:h-[250px] "
      />
      <Image
        src={"shape3.svg"}
        alt=""
        width={533}
        height={250}
        className="absolute h-full md:-right-[150px] lg:-right-[100px] top-auto"
      />
    </div>
  );
};

export default Banner;
