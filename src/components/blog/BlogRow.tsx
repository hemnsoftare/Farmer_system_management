import { BlogProps } from "@/lib/action";
import { lang } from "@/lib/action/uploadimage";
import Image from "next/image";
import React from "react";
import { MdOutlineDateRange } from "react-icons/md";

const BlogRow = ({
  item,
  type,
}: {
  item: BlogProps;
  type?: "blog_single_page";
}) => {
  const l = lang().startsWith("ar") || lang().startsWith("ku");
  return (
    <div
      className={`w-full text-left h-[146px]  flex items-center border overflow-hidden rounded-xl group dark:shadow-neutral-700 shadow-gray-200 shadow-md md:shadow-lg justify-start gap-0
        `}
    >
      {/* Dynamic Image */}
      <Image
        src={item.image} // Dynamic image URL
        alt={item.title} // Dynamic alt text
        width={240}
        height={156}
        className={`min-w-[180px] max-w-[180px] min-h-[160px] max-h-[160px] bg-blue-100 border-dashed`}
      />

      {/* Content Section */}
      <div className="flex flex-col w-full sm:px-4 px-2 py-2 h-full justify-between">
        {/* Dynamic Title */}
        <h3
          className={`lg:text-[16px] text-10 md:text-13 font-semibold sm:group-hover:text-red-500 duration-300`}
        >
          {item.title}
        </h3>

        {/* Dynamic Description */}
        <p
          className={`min-h-[35px] max-h-[35px] md:text-10 text-8 dark:text-neutral-500 lg:text-[10px] xl:text-12 overflow-hidden mt-2 text-neutral-800`}
        >
          {item.description} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Aspernatur repellendus voluptatem autem in, dolor laborum quasi
          impedit ab sed consequuntur ex dolorem itaque ipsa minus dignissimos
          alias corporis molestias voluptatibus.
        </p>

        {/* Metadata Section */}
        <div className="flex sm:mt-4 justify-between items-center">
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
              } lg:text-9 md:text-10 text-8 text-neutral-400 hover:text-red-600`}
            >
              {new Date(item.date).toLocaleDateString()} {/* Dynamic date */}
            </span>
          </p>
          <Image
            src={"/save-2.svg"} // Keep this static if it's always the same icon
            alt="Save icon"
            width={20}
            height={20}
            className={`${
              type === "blog_single_page" && "lg:w-[15px] lg:h-[15px]"
            } sm:opacity-0 sm:group-hover:opacity-100 max-w-[15px] max-h-[15px] transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRow;
