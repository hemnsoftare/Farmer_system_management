import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#223949] duration-200 transition-all shadow-md hover:shadow-lg hover:shadow-[#223949] shadow-[#223949] relative md:px-[25px] lg:px-[100px] h-[420px] py-12 rounded-md flex overflow-hidden items-center justify-between">
      <div className="flex justify-between gap-4 items-center flex-col">
        <h1 className="text-[44px] font-semibold uppercase text-white">
          Smart Watch
        </h1>
        <p className="text-[24px] text-white"> Various designs and brands</p>
        <button className="px-6  py-2 text-[16px] text-[#223949] rounded-md bg-[#FF6951]">
          view
        </button>
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
        className="absolute h-full -right-[100px] top-auto"
      />
    </div>
  );
};

export default Banner;
