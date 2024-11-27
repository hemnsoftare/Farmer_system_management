import { brand } from "@/util/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdNavigateNext } from "react-icons/md";

const Brand = () => {
  return (
    <div className="flex flex-col  items-center w-full justify-center">
      <div className="flex justify-between border-b-4 w-full  pb-4 border-neutral-400">
        <h3 className="sm:text-[32px] text-[24px]  text-black ">Top Brand</h3>
      </div>
      <div className="flex gap-2 items-center w-full justify-start sm:justify-center md:gap-4 lg:gap-5">
        {brand.map((item) => {
          return (
            <Image
              key={item}
              src={item}
              alt=""
              width={
                item === "/Apple.webp"
                  ? 50
                  : item === "/sony.svg"
                  ? 198
                  : item === "/samsung.svg"
                  ? 213
                  : item === "/canon.svg"
                  ? 173
                  : item === "/huawei.svg"
                  ? 90
                  : 152
              }
              height={
                item === "/Apple.webp"
                  ? 155
                  : item === "/sony.svg"
                  ? 34
                  : item === "/samsung.svg"
                  ? 33
                  : item === "/canon.svg"
                  ? 30
                  : item === "/huawei.svg"
                  ? 89
                  : 49
              }
              className={` ${item === "/Apple.webp" && "scale-[0.7] mb-2"} ${
                item === "/canon.svg" ? "hidden sm:block" : "block"
              } lg:w-[120px] lg:h-[70px]  w-[70px] h-[50px] xl:w-[150px] xl:h-[90px] mt-4 md:w-[100px] md:h-[80px] `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Brand;
