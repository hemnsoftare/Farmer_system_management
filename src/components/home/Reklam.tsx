import Image from "next/image";
import React from "react";

const Reklam = () => {
  return (
    <div className="sm:flex  block sm:px-4 px-0 items-start  justify-center gap-3 w-full sm:max-h-[400px]">
      {" "}
      {/* Added h-screen */}
      {/* left */}
      <div className="flex px-2 w-full py-0 bg-gradient-to-br from-[#1975B9] relative via-[#30BCCE] to-[#B0E9C9]  lg:max-w-[600px] xl:max-w-[700px]  ms:p-3 bg-blue-300 rounded-lg h-full overflow-hidden">
        <Image
          src={"/circal.png"}
          alt="image"
          width={200}
          height={200}
          className="size-[200px] absolute -top-1/2 left-1/2"
        />
        <Image
          src={"/circal.png"}
          alt="image"
          width={200}
          className="size-[200px] absolute -top-36 -left-24"
          height={200}
        />
        <div className="flex w-full flex-col items-start  justify-between gap-2">
          <h2 className="font-bold p-2 mt-[100px] text-[20px] sm:text-2xl">
            {" "}
            {/* Updated text-20 to text-2xl */}
            Iphone <span className="text-white"> 15 Series</span>
          </h2>
          <Image
            src={"/5iphone.svg"}
            alt="image "
            width={300}
            height={300}
            className="sm:min-w-[200px] min-w-[180px] mb-2  "
          />
        </div>
        <main className="flex  items-start justify-start py-10 flex-col ">
          <div className="flex items-center mr-2 justify-start gap-2">
            <button className="flex flex-col w-[35px] border-black items-center justify-center border-2 rounded-lg -gap-1 p-2 py-1">
              <span className="font-semibold text-16 sm:text-18">8</span>
              <span className="text-13 sm:text-16">Days</span>
            </button>
            <button className="flex flex-col w-[40px] border-black items-center justify-center border-2 rounded-lg -gap-1 p-2 py-1">
              <span className="font-semibold text-16 sm:text-18">8</span>
              <span className="text-13 sm:text-16">Days</span>
            </button>{" "}
            <button className="flex flex-col w-[40px] border-black items-center justify-center border-2 rounded-lg -gap-1 p-2 py-1">
              <span className="font-semibold text-16 sm:text-18">8</span>
              <span className="text-13 sm:text-16">Days</span>
            </button>{" "}
            <button className="sm:flex hidden flex-col  w-[40px] border-black items-center justify-center border-2 rounded-lg -gap-1 p-2 py-1">
              <span className="font-semibold text-16 sm:text-18">8</span>
              <span className="text-13 sm:text-16">Days</span>
            </button>
          </div>
          <div className="flex flex-col items-start mt-12 justify-start  ">
            <h1 className="font-bold text-16 sm:text-20">
              It feels good to be the first
            </h1>
            <p className="text-neutral-700 text-14 px-4">
              Get ready for the future smartphones.Experience innovation like
              never before. Stay tuned for the big iPhone 15 pre-sale.
            </p>
          </div>
        </main>{" "}
      </div>
      {/* right side */}
      <div className="flex flex-col mt-2 sm:mt-0 bg-[#005690] h-full overflow-hidden rounded-lg w-full relative justify-between py-8 items-center">
        <Image
          src={"shape1.svg"}
          alt=""
          width={110}
          height={102}
          className="object-cover absolute top-0 left-0"
        />
        <Image
          src={"shape1.svg"}
          alt=""
          width={110}
          height={102}
          className="object-cover absolute transform rotate-[180deg] bottom-0 right-0"
        />
        <h1 className="text-[#FCC870] xl:text-center lg:text-end md:text-end text-end w-full px-4 text-2xl">
          {" "}
          {/* Updated text-[24px] to text-2xl */}
          play station 5
        </h1>
        <div className="flex  flex-col gap-3 items-center pl-2 w-full mt-16 justify-center">
          <Image
            src={"ps53.svg"}
            alt=""
            width={190}
            height={139}
            className=" sm:w-[190px] w-[210px] h-[140px] sm:h-[130px] z-[1]"
          />
          <h3 className="text-20 text-start px-3 sm:text-center font-bold w-full z-[1] text-[#FCC870]">
            {" "}
            Digital Edition + 2TB
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Reklam;
