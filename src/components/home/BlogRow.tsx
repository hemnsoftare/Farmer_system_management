import Image from "next/image";
import React from "react";
import { MdOutlineDateRange } from "react-icons/md";

const BlogRow = () => {
  return (
    <div className=" flex md:w-[600px] lg:w-[608px]  items-center overflow-hidden rounded-xl group h-[156px]  shadow-gray-300 shadow-lg justify-center gap-4">
      <Image
        src={"blog-headSet.svg"}
        alt="imag"
        width={240}
        height={156}
        className="w-[240px] h-full  "
      />
      <div className="flex flex-col px-4  justify-between ">
        <h3 className="text-[16px] group-hover:text-red-500 duration-300 ">
          8 Things You Probably Didn’t Know About Headphones
        </h3>
        <p className=" h-[36px] text-[14px] overflow-hidden  text-neutral-600 ">
          Owning a headphone could mean a different thing for different people.
          For some, it act as a fashion statement. It’s easy to spot these
          people, the headphone are almost always just hanging around the neck.
        </p>
        <div className="flex mt-4 justify-between items-center ">
          <p className="flex gap-2">
            <MdOutlineDateRange color="#717171" />
            <span className="text-[12px] text-neutral-400 hover:text-red-600 ">
              March , 28 , 2023
            </span>
          </p>
          <Image
            src={"save-2.svg"}
            alt="image blog"
            width={20}
            height={20}
            className=" opacity-0 group-hover:opacity-100 transition-all duration-300 "
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRow;
