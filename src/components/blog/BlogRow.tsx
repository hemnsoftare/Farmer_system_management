import Image from "next/image";
import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { isValid } from "zod";

const BlogRow = ({ type }: { type?: "blog_single_page" }) => {
  return (
    <div
      className={`  w-full  h-[116px] lg:w-full
       flex   items-center overflow-hidden rounded-xl group dark:shadow-neutral-700  shadow-gray-300 shadow-lg justify-center gap-0`}
    >
      <Image
        src={"/bog-row1.webp"}
        alt="imag"
        width={240}
        height={156}
        className={`w-1/2 h-full
        }   bg-blue-100 border-dashed`}
      />
      <div className=" flex flex-col sm:px-4 px-2   py-2 h-full justify-between ">
        <h3
          className={` lg:text-[16px] text-10  md:text-13 font-semibold  sm:group-hover:text-red-500 duration-300 `}
        >
          8 Things You Probably Didn’t Know About Head
        </h3>
        <p
          className={`   min-h-[35px] max-h-[35px] md:text-10 text-8 dark:text-neutral-500 lg:text-[10px] xl:text-12 overflow-hidden mt-2 text-neutral-800 `}
        >
          Owning a headphone could mean a different thing for different people.
          For some, it act as a fashion statement. It’s easy to spot these
          people, the headphone are almost always just hanging around the neck.
        </p>
        <div className="flex sm:mt-4 justify-between items-center ">
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
              } lg:text-9 md:text-10  text-8 text-neutral-400 hover:text-red-600 `}
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
            }  sm:opacity-0  sm:group-hover:opacity-100 max-w-[15px] max-h-[15px]  transition-all duration-3 00 `}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRow;
