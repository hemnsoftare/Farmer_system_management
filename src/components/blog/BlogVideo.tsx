import { BlogProps } from "@/type";
import Link from "next/link";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const BlogVideo = ({ item }: { item: BlogProps }) => {
  return (
    <div className="w-full flex-col flex relative overflow-hidden lg:w-full  items-center rounded-xl shadow-lg justify-between gap-1 sm:gap-4">
      <div className="relative w-full pb-[56.25%]">
        {" "}
        {/* 16:9 Aspect Ratio */}
        <ReactPlayer
          url={item.video}
          width="100%"
          height="100%"
          controls
          className="absolute top-0 left-0"
        />
      </div>
      {/* <video className="w-full rounded-lg object-contain" controls>
        <source src="https://youtu.be/PDNdgLByktE?si=U3QTKfKhg3Dy8lbr" />
      </video> */}
      <p className="absolute text-18 items-center justify-between flex sm:group-hover:opacity-0 duration-300 transition-all bottom-0 left-0 right-0 backdrop-blur-md text-white px-4 py-1 ">
        <span> {item.title}</span>
        <Link
          href={`/blog/${item.id}`}
          className="px-5 py-1 text-white rounded-lg bg-secondary-400 active:bg-secondary-600 duration-300 transition-all md:hover:bg-secondary-600"
        >
          more{" "}
        </Link>
      </p>
    </div>
  );
};

export default BlogVideo;
