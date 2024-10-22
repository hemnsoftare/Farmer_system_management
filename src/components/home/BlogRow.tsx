import Image from "next/image";
import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { isValid } from "zod";

const BlogRow = ({ type }: { type?: "blog_single_page" }) => {
  return (
    <div
      className={` ${
        type === "blog_single_page"
          ? "w-full md:w-full lg:h-[100px]  "
          : "w-full  h-[156px] lg:w-full"
      } flex   items-center overflow-hidden rounded-xl group  shadow-gray-300 shadow-lg justify-center gap-0`}
    >
      <Image
        src={"/blog-headSet.svg"}
        alt="imag"
        width={240}
        height={156}
        className={` ${
          type === "blog_single_page"
            ? "lg:w-[150px] md:w-[240px]  h-full"
            : "w-[240px] h-full"
        }   bg-blue-100 border-dashed`}
      />
      <div className=" flex flex-col px-4 bg-red-100 py-2 h-full justify-between ">
        <h3
          className={` ${
            type === "blog_single_page"
              ? "lg:text-10 md:text-16 "
              : " lg:text-[16px]  md:text-13"
          } font-semibold  group-hover:text-red-500 duration-300 `}
        >
          8 Things You Probably Didn’t Know About Head
        </h3>
        <p
          className={`  ${
            type === "blog_single_page"
              ? "lg:text-9 md:text-10 h-[31px]"
              : "  h-[42px] md:text-10 lg:text-[12px]"
          } overflow-hidden  text-neutral-600 `}
        >
          Owning a headphone could mean a different thing for different people.
          For some, it act as a fashion statement. It’s easy to spot these
          people, the headphone are almost always just hanging around the neck.
        </p>
        <div className="flex mt-4 justify-between items-center ">
          <p className="flex items-center gap-2">
            <MdOutlineDateRange
              color="#717171"
              className={`${
                type === "blog_single_page" && "lg:w-[15px] lg:h-[15px]"
              }`}
            />
            <span
              className={`${
                type === "blog_single_page" && "lg:text-9 md:text-10"
              } lg:text-9 md:text-10  text-neutral-400 hover:text-red-600 `}
            >
              March , 28 , 2023
            </span>
          </p>
          <Image
            src={"/save-2.svg"}
            alt="image blog"
            width={20}
            height={20}
            className={` ${
              type === "blog_single_page" && "lg:w-[15px] lg:h-[15px]"
            }  opacity-0  group-hover:opacity-100 transition-all duration-3 00 `}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRow;
