"use client";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const BlogVideo = () => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);
  return (
    <div
      className=" w-full group  flex relative overflow-hidden lg:w-full  items-center  rounded-xl group h-[156px]  shadow-gray-300 shadow-lg justify-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactPlayer
        playing={isHovered}
        url="https://youtube.com/shorts/-VycyVLFM-I?si=aly-afz1A00PHJe8"
      />
      <p className="absolute group-hover:opacity-0 duration-300 transition-all bottom-0 left-0 right-0 backdrop-blur-md text-white px-2 py-1 text-14">
        Lorem ipsum dolor sit amet consectetur.
      </p>
    </div>
  );
};

export default BlogVideo;
