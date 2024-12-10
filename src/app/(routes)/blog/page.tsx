"use client";
import BlogVideo from "@/components/blog/BlogVideo";
import BlogCol from "@/components/blog/blogCol";
import BlogRow from "@/components/blog/BlogRow";
import { blogs } from "@/util/data";
import Link from "next/link";
import React from "react";
const BlogPage = () => {
  return (
    <div className="flex mb-7 px-3 md:px-[100px] lg:px-0 flex-col w-full ">
      <span className="py-4">
        <Link href={"/"}> home</Link> &gt; blog{" "}
      </span>
      <div className=" lg:flex-row flex gap-4  md:flex-col flex-col  w-full ">
        <div className=" lg:w-[70%] md:w-full flex flex-col gap-4 ">
          <div className="grid  md:items-center gap-2 divide-y-4 divide-transparent sm:gap-4 h-fit py-4   grid-cols-2 justify-start items-start content-start ">
            {blogs.map((blog) => (
              <Link href={"/blog/" + blog.id} key={blog.id}>
                <BlogCol blog={blog} />
              </Link>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 ">
            <h2>Recent post</h2>
      
            <div className=" lg:grid  lg:grid-cols-2 gap-3">
              <BlogRow /> <BlogRow /> <BlogRow /> <BlogRow /> <BlogRow />{" "}
              <BlogRow /> <BlogRow /> <BlogRow /> <BlogRow /> <BlogRow />{" "}
              <BlogRow /> <BlogRow /> <BlogRow /> <BlogRow /> <BlogRow />{" "}
              <BlogRow />
            </div>
          </div>
        </div>

        <div className="flex lg:w-[30%] w-full flex-col gap-3">
          <span className="text-20 font-semibold">video</span>
          <BlogVideo /> <BlogVideo /> <BlogVideo /> <BlogVideo /> <BlogVideo />{" "}
          <BlogVideo /> <BlogVideo />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
