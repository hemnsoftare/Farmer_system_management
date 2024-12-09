"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const BlogVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to control playback

  const handleVideoClick = () => {
    setIsPlaying((prev) => !prev); // Toggle play/pause state
  };

  return (
    <div
      className="w-full flex-col flex relative overflow-hidden lg:w-full  items-center rounded-xl shadow-lg justify-between gap-1 sm:gap-4"
      onClick={handleVideoClick} // Toggle play/pause on click
    >
      <video className="w-full rounded-lg object-contain" controls>
        <source src="/vedio.mp4" type="video/mp4" />
      </video>
      <p className="absolute hidden sm:flex sm:group-hover:opacity-0 duration-300 transition-all bottom-0 left-0 right-0 backdrop-blur-md text-white px-2 py-1 text-14">
        Lorem ipsum dolor sit amet consectetur.
      </p>
      <p className="w-full px-2 flex items-center bg-white py-1  backdrop-blur-lg justify-center overflow-hidden text-12 sm:hidden">
        Lorem ipsum dolor sit amet consectetur.
      </p>
    </div>
  );
};

export default BlogVideo;
