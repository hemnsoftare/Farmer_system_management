import Image from "next/image";
import React from "react";

const Reklam = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* left  */}
      <div className="flex  relative p-8 overflow-hidden rounded-lg w-[70%]  bg-gradient-to-tl from-[20%] from-[#B0E9C9] via-[#1FB6CF] to-[#1975B9] justify-start bg-red-200 h-[420px] gap-8">
        <Image
          src={"/circal.png"}
          alt="image"
          width={118}
          height={118}
          className="absolute -bottom-[20px] -right-6"
        />
        <Image
          src={"/circal.png"}
          alt="image"
          width={118}
          height={118}
          className="absolute -top-[59px] right-[50%]"
        />{" "}
        <Image
          src={"/circal.png"}
          alt="image"
          width={118}
          height={118}
          className="absolute top-[59px] -left-[107px]"
        />
        <div className="  flex-col basis-1/2 flex justify-between ">
          <h1 className="flex gap-1 font-medium text-[24px] items-center">
            <span className="text-black">Iphone</span>{" "}
            <span className="text-white"> 15 Sotries</span>
          </h1>
          <Image
            src={"5iphone.svg"}
            alt="imaeg"
            width={378}
            height={2882}
            className="object-cover"
          />
        </div>
        <div className="flex  basis-1/2 items-start  justify-start gap-[29px] flex-col">
          <div className="flex items-center justify-start gap-2">
            {" "}
            <button className="bg-transparent border-black/100 flex-col flex  p-2 md:p-1 box-content items-center justify-center border-2 rounded-lg ">
              <span className="font-semibold">8</span> <span> Days</span>
            </button>{" "}
            <button className="bg-transparent border-black/100 flex-col flex  p-2 md:p-1 box-content  items-center justify-center border-2 rounded-lg ">
              <span className="font-semibold">8</span> <span> Days</span>
            </button>{" "}
            <button className="bg-transparent border-black/100 flex-col flex  p-2 md:p-1 box-content items-center justify-center border-2 rounded-lg ">
              <span className="font-semibold">8</span> <span> Days</span>
            </button>
            <button className="bg-transparent border-black/100 flex-col flex  p-2 md:p-1 box-content items-center justify-center border-2 rounded-lg ">
              <span className="font-semibold">8</span> <span> Days</span>
            </button>
          </div>
          <div className="flex items-start  flex-col justify-start">
            <h2 className="font-semibold text-start">
              It feels good to be the first
            </h2>
            <p className="text-neutral-900  pl-3  ">
              Get ready for the future of smartphones.Experience innovation like
              never before. Stay tuned for the big iPhone 15 pre-sale.
            </p>
          </div>
          <button className="bg-[#0C68F4] self-center hover:bg-blue-900 duration-300 transition-all px-4 py-2 text-white rounded-lg">
            Register Now
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="flex flex-col bg-[#005690] h-[420px] overflow-hidden rounded-lg w-[444px] relative justify-between py-8  items-center">
        <Image
          src={"shape1.svg"}
          alt=""
          width={110}
          height={102}
          className="object-cover absolute top-0 left-0"
        />
        <h1 className="text-[#FCC870]  text-[24px]">play station 5</h1>
        <div className="flex gap-0 items-center pl-12 mt-16 justify-center">
          <h3 className="text-20 z-[1] text-[#005690]">
            Digital Edition + 2TB
          </h3>
          <Image
            src={"ps53.svg"}
            alt=""
            width={210}
            height={169}
            className="object-cover z-[1]"
          />
        </div>
        <button className="bg-[#0C68F4] z-[1] hover:bg-blue-900 duration-300 self-start transition-all px-9 ml-12 py-2 text-white rounded-lg">
          Buy now
        </button>
        <Image
          src={"shape2.svg"}
          alt=""
          width={566}
          height={332}
          className="object-cover absolute bottom-0 right-0 -z-[0] left-0"
        />
      </div>
    </div>
  );
};

export default Reklam;
