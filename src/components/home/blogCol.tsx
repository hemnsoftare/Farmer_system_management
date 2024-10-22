import Image from "next/image";
import React from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";

const BlogCol = () => {
  return (
    <div className="flex flex-col justify-center group gap-4 shadow-gray-200 shadow-md hover:shadow-lg rounded-lg duration-300 transition-all  overflow-hidden items-center  h-[336px] w-[392px]">
      <Image
        src={"meta.svg"}
        alt="image blog"
        width={392}
        height={204}
        className=" w-full h-[204] group-hover:w-full group-hover:-translate-y-[30px] duration-300 "
      />
      {/* content */}
      <div className="flex h-full flex-col group-hover:-translate-y-[30px] px-4 group-hover:h-full pb-4 pt-0 overflow- duration-300 justify-between items-center">
        <div className="flex w-full justify-between items-center">
          <p className="flex  gap-1 items-center justify-center">
            <MdOutlineDateRange color="#717171" />
            <span className="text-neutral-500 text-[12px]  ">
              August , 8 , 2023
            </span>
          </p>
          <p className="flex items-center justify-center gap-1">
            <LuTimer color="#717171" />
            <span className="text-neutral-500 text-[12px]  ">3 min read</span>
          </p>
        </div>
        <div className="flex flex-col mt-1  justify-start">
          <h2 className="text-[20px] hover:text-red-600 text-black w-full h-6 overflow-hidden ">
            Meta Platforms plans to release free software that...
          </h2>
          <p className="w-full h-[48px] overflow-hidden mt-3 font-light text-[16px] ">
            The parent company of Facebook, Meta Platforms, is introducing
            software to help developers{" "}
          </p>
        </div>
        <div className=" w-full mt-2    opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex justify-between items-center">
          <span className="text-red-600">read more </span>
          <Image
            src={"save-2.svg"}
            alt="image blog"
            width={20}
            height={20}
            className=" "
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCol;
