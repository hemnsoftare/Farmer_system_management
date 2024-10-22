import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex overflow-hidden mt-3 -z-50 justify-between">
      <div className="flex basis-1/2 flex-col py-12 items-start  gap-12">
        <h1 className="text-5xl font-bold capitalize text-primary-700">
          Tech Heim
        </h1>
        <h3 className=" font-[500] text-2xl">
          &quot;Join
          <span className="text-secondary"> the digital revolution&quot;</span>
        </h3>
        <button className="capitalize zoom-in-100 md:px-12 bg-secondary text-white px-24 hover:bg-secondary-600 py-4 rounded-lg mt-auto">
          explore more
        </button>
      </div>

      <Image
        src={"hero.svg"}
        alt="image hero"
        className="   basis-1/2 "
        width={628}
        height={400}
      />
    </div>
  );
};

export default Hero;
