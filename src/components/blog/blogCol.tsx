import Image from "next/image";
import React from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { BlogColProps } from "@/type";

const BlogCol = ({ blog }: { blog: BlogColProps }) => {
  return (
    <div className="flex flex-col justify-center group gap-1 sm:gap-4 shadow-gray-200 shadow-md hover:shadow-lg rounded-lg duration-300 transition-all overflow-hidden items-center min-h-[250px] max-h-[250px] xl:min-h-[336px] lg:min-h-[320px] sm:h-[336px] min-w-[150px] ">
      <Image
        src={blog.imageSrc}
        alt="image blog"
        width={322}
        height={204}
        className=" sm:w-full xl:min-h-[200px] lg:min-h-[170px] min-h-[120px] object-cover  sm:group-hover:w-full sm:group-hover:-translate-y-[30px] duration-300"
      />
      <div className="flex flex-col sm:group-hover:-translate-y-[30px] px-1 sm:px-4 sm:group-hover:h-full  pt-0 overflow- duration-300 justify-start  sm:justify-between items-center">
        <div className="flex w-full justify-between  items-center">
          <p className="flex gap-1 items-center justify-center">
            <MdOutlineDateRange color="#717171" />
            <span className="text-neutral-500 text-8 sm:text-[12px]">
              {blog.date}
            </span>
          </p>
          <p className="flex items-center justify-center gap-1">
            <LuTimer color="#717171" />
            <span className="text-neutral-500 text-8 sm:text-[12px]">
              {blog.readTime}
            </span>
          </p>
        </div>
        <div className="flex flex-col mt-3  sm:mt-1 justify-start">
          <h2 className="sm:text-20 lg:min-h-[34px] sm:mb-1 max-h-[20px] min-h-[20px] text-11 font-semibold sm:hover:text-red-600 text-black  w-full  overflow-hidden">
            {blog.title}
          </h2>
          <p className="w-full h-[47px] text-black overflow-hidden mt-3 text-10 sm:text-[16px]">
            {blog.description}
          </p>
        </div>
        <div className="w-full  opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-10 flex justify-between items-center">
          <span className="text-secondary-400 text-10 sm:text-18">
            read more
          </span>
          <Image
            src={blog.saveIconSrc}
            alt="save icon"
            width={20}
            height={20}
            className="size-[15px] sm:size-[25px]"
          />
        </div>
      </div>
    </div>
  );
};
export default BlogCol;
