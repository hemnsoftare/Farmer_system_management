import Image from "next/image";
import React from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { BlogColProps } from "@/type";

const BlogCol = ({ blog }: { blog: BlogColProps }) => {
  return (
    <div className="flex flex-col justify-center group gap-4 shadow-gray-200 shadow-md hover:shadow-lg rounded-lg duration-300 transition-all overflow-hidden items-center h-[336px] w-fit ">
      <Image
        src={blog.imageSrc}
        alt="image blog"
        width={322}
        height={204}
        className=" w-full h-[204] group-hover:w-full group-hover:-translate-y-[30px] duration-300"
      />
      <div className="flex h-full flex-col group-hover:-translate-y-[30px] px-4 group-hover:h-full  pt-0 overflow- duration-300 justify-between items-center">
        <div className="flex w-full justify-between items-center">
          <p className="flex gap-1 items-center justify-center">
            <MdOutlineDateRange color="#717171" />
            <span className="text-neutral-500 text-[12px]">{blog.date}</span>
          </p>
          <p className="flex items-center justify-center gap-1">
            <LuTimer color="#717171" />
            <span className="text-neutral-500 text-[12px]">
              {blog.readTime}
            </span>
          </p>
        </div>
        <div className="flex flex-col mt-1 justify-start">
          <h2 className="text-[20px] hover:text-red-600 text-black w-full h-6 overflow-hidden">
            {blog.title}
          </h2>
          <p className="w-full h-[48px] overflow-hidden mt-3 font-light text-[16px]">
            {blog.description}
          </p>
        </div>
        <div className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex justify-between items-center">
          <span className="text-red-600">read more</span>
          <Image
            src={blog.saveIconSrc}
            alt="save icon"
            width={20}
            height={20}
            className=""
          />
        </div>
      </div>
    </div>
  );
};
export default BlogCol;
