import Image from "next/image";
import React from "react";

const Reklam = () => {
  return (
    <div className="sm:flex block sm:px-4 px-2 items-start justify-center gap-3 w-full sm:max-h-[400px]">
      {/* Left Section */}
      <div className="flex sm:min-h-[390px] sm:max-w-[500px] relative px-2 w-full py-0 bg-gradient-to-br from-[#1975B9] via-[#30BCCE] to-[#B0E9C9] lg:max-w-[600px] xl:max-w-[700px] ms:p-3 bg-blue-300 dark:from-[#0A3D64] dark:via-[#185D5D] dark:to-[#397A6F] rounded-lg h-full overflow-hidden">
        <Image
          src={"/circal.png"}
          alt="image"
          width={200}
          height={200}
          className="size-[100px] absolute -top-[60px] left-1/2"
        />
        <Image
          src={"/circal.png"}
          alt="image"
          width={200}
          className="size-[200px] absolute -top-36 -left-24"
          height={200}
        />
        <div className="flex w-full flex-col items-start justify-between gap-2">
          <h2 className="font-bold p-2 mt-[100px] text-[20px] sm:text-2xl dark:text-white">
            iPhone{" "}
            <span className="text-white dark:text-[#30BCCE]">15 Series</span>
          </h2>
          <Image
            src={"/5iphone.svg"}
            alt="image"
            width={300}
            height={300}
            className="sm:min-w-[200px] above-405:min-w-[170px] min-w-[160px] mb-2"
          />
        </div>
        <main className="flex items-start justify-start py-10 flex-col">
          <div className="flex items-center -ml-4 above-405:ml-0 above-405:justify-center w-full justify-start gap-2">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <button
                  key={idx}
                  className={` ${idx === 4 ? "hidden" : "flex"} md:flex flex-col sm:w-[45px] md:px-3 md:py-1 box-content w-[35px] border-black dark:border-gray-300 items-center justify-center border-2 rounded-lg -gap-1 p-2 px-2 py-1`}
                >
                  <span className="font-semibold text-12 sm:text-18 dark:text-white">
                    8
                  </span>
                  <span className="text-11 sm:text-16 dark:text-gray-300">
                    Days
                  </span>
                </button>
              ))}
          </div>
          <div className="flex flex-col w-[90%] items-start mt-12 justify-start">
            <h1 className="font-bold text-15 sm:text-20 dark:text-white">
              It feels good to be the first
            </h1>
            <p className="text-neutral-700 dark:text-gray-300 sm:text-16 text-justify sm:text-start text-12 pl-3">
              Get ready for future phones. Experience innovation like never
              before. Stay tuned for the big iPhone 15 pre-sale.
            </p>
          </div>
        </main>
      </div>
      {/* Right Section */}
      <div className="flex flex-col mt-2 sm:min-h-[390px] sm:max-w-[500px] sm:mt-0 bg-[#005690] dark:bg-[#022E4B] h-full overflow-hidden rounded-lg w-full relative justify-between py-8 items-center">
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
        <h1 className="text-[#FCC870] dark:text-[#FFAA60] xl:text-center lg:text-end md:text-end text-end w-full px-4 text-2xl">
          PlayStation 5
        </h1>
        <div className="flex flex-col gap-3 items-center pl-2 w-full mt-16 justify-center">
          <Image
            src={"ps53.svg"}
            alt=""
            width={190}
            height={139}
            className="sm:w-[190px] w-[210px] h-[140px] sm:h-[130px] z-[1]"
          />
          <h3 className="text-20 text-start px-3 sm:text-center font-bold w-full z-[1] text-[#FCC870] dark:text-[#FFAA60]">
            Digital Edition + 2TB
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Reklam;
