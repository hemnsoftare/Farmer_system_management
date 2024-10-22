import { brand } from "@/util/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdNavigateNext } from "react-icons/md";

const Brand = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="flex justify-between border-b-4 w-full  pb-4 border-neutral-400">
        <h3 className="text-[32px]  text-black ">Top Brand</h3>
        <Link href={"/"} className="text-[16px] flex gap-2">
          view all <MdNavigateNext />
        </Link>
      </div>
      <div className="flex items-center w-full justify-between">
        {brand.map((item) => {
          return (
            <Image
              key={item}
              src={item}
              alt=""
              width={
                item === "apple.svg"
                  ? 50
                  : item === "sony.svg"
                  ? 198
                  : item === "samsung.svg"
                  ? 213
                  : item === "canon.svg"
                  ? 173
                  : item === "huawei.svg"
                  ? 90
                  : 152
              }
              height={
                item === "apple.svg"
                  ? 155
                  : item === "sony.svg"
                  ? 34
                  : item === "samsung.svg"
                  ? 33
                  : item === "canon.svg"
                  ? 30
                  : item === "huawei.svg"
                  ? 89
                  : 49
              }
              className="object-cover md:scale-[.8] lg:scale-[1]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Brand;
