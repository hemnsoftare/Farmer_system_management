"use client";
import { BlogProps } from "@/type";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const BlogVideo = ({ item }: { item: BlogProps }) => {
  const [isPlaying, setIsPlaying] = useState(false); // State to control playback

  const handleVideoClick = () => {
    setIsPlaying((prev) => !prev); // Toggle play/pause state
  };

  return (
    <div
      className="w-full flex-col flex relative overflow-hidden lg:w-full  items-center rounded-xl shadow-lg justify-between gap-1 sm:gap-4"
      onClick={handleVideoClick} // Toggle play/pause on click
    >
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
      <p className="absolute text-18 flex sm:group-hover:opacity-0 duration-300 transition-all bottom-0 left-0 right-0 backdrop-blur-md text-white px-2 py-1 ">
        {item.title}
      </p>
    </div>
  );
};

export default BlogVideo;
