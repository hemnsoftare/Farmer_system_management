import React from "react";
import BlogCol from "./blogCol";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
import BlogRow from "./BlogRow";
import { blogs } from "@/app/util/data";

const Blog = () => {
  return (
    <div className="flex flex-col transition-all duration-300 w-full gap-4 items-center justify-center">
      <div className="flex w-full justify-between border-b-4    pb-4 border-neutral-400">
        <h3 className="text-[32px]  text-black ">Ours Blogs</h3>
        <Link href={"/"} className="text-[16px] flex gap-2">
          view all <MdNavigateNext />
        </Link>
      </div>
      <div className="flex w-full gap-4 justify-center items-center">
        <BlogCol blog={blogs[0]} />

        <div className="flex flex-col gap-4">
          <BlogRow />

          <BlogRow />
        </div>
      </div>
    </div>
  );
};

export default Blog;
