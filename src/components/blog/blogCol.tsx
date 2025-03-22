import Image from "next/image";
import React from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { BlogProps } from "@/lib/action";
import { lang } from "@/lib/action/uploadimage";
import { motion } from "framer-motion";
const BlogCol = ({ blog }: { blog: BlogProps }) => {
  const formattedDate = new Date(blog.date).toLocaleDateString(); // Format date for better readability
  const l = lang().startsWith("ar") || lang().startsWith("ku");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex border w-full text-left  flex-col gap-2 rounded-xl overflow-hidden shadow-lg  
       `}
    >
      {/* Image */}

      <Image
        src={blog.image}
        alt={blog.title}
        width={350}
        height={200}
        className=" w-full md:min-h-[300px] min-h-[170px] max-h-[170px] md:max-h-[300px] object-cover"
      />

      {/* Metadata */}
      <div className="flex w-full items-center justify-between px-3 text-9 md:text-sm text-gray-600">
        <div className="flex gap-2 items-center">
          <MdOutlineDateRange />
          <time dateTime={blog.date.toISOString()}>{formattedDate}</time>
        </div>
        <div className="flex gap-2 items-center">
          <LuTimer />
          <span>3 min read</span>{" "}
          {/* You could dynamically calculate the reading time if needed */}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col px-3 pb-1">
        <h2 className="md:text-xl text-14 capitalize font-semibold text-gray-800 truncate">
          {blog.title}
        </h2>
        <p className="text-gray-600 text-12 md:text-13 line-clamp-2 min-h-[38px] max-h-[38px]">
          {blog.description}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCol;
