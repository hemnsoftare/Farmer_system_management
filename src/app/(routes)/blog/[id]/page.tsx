"use client";
import React, { useState } from "react";
import { BlogColProps } from "../../../../type";
import { blogs } from "@/app/util/data";
import Image from "next/image";
import { LiaCommentDots } from "react-icons/lia";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";

import Comments from "@/components/blog/Comments";

import BlogRow from "@/components/home/BlogRow";
import ReactPlayer from "react-player";

const Page = ({ params }: { params: { id: string } }) => {
  const data: BlogColProps = blogs[parseInt(params.id)];
  const [isLike, setisLike] = useState<boolean>(false);
  const [showComments, setshowComments] = useState<boolean>(false);

  const IsVideo = true;
  if (IsVideo) {
    return (
      <div className="flex  py-9 bg-blue-300  md:flex-col justify-start items-start lg:flex-row gap-0 w-full">
        <main className="flex flex-col lg:w-[65%] md:w-full gap-3">
          <span className="text-12 mb-5 font-light">
            home &gt; blog &gt; {data.catagory}
          </span>
          <div className="flex w-full  flex-col gap-3  ">
            <h2 className="text-20 font-bold">{data.title}</h2>
            <p className="text-neutral-500 text-12">
              By {data.creator} on {data.date}
            </p>
            <ReactPlayer
              controls
              width={608}
              height={411}
              className=" md:self-center   w-full px-3 overflow-hidden rounded-lg"
              url="https://youtu.be/PDNdgLByktE?si=_Xv51qrBOL0c9aSn"
            />

            <p className="text-12 px-3 indent-2 text-neutral-600 w-full ">
              {data.description}
            </p>
            <div className="flex cursor-pointer justify-end gap-4 px-10">
              <div
                onClick={() => setshowComments(!showComments)}
                className="flex gap-2 hover:bg-blue-500 duration-300 transition-all px-2 rounded-md  items-center"
              >
                <LiaCommentDots /> <span className="text-14"> 12 Comment</span>
              </div>
              <div
                onClick={() => setisLike(!isLike)}
                className="flex hover:bg-blue-500 duration-300 transition-all px-2 rounded-md  gap-2 items-center"
              >
                {isLike ? <BiSolidLike color="blue" /> : <AiOutlineLike />}
                <span className="text-14">123 Like </span>
              </div>
            </div>
          </div>
          {showComments && <Comments />}
        </main>
        <div className="flex flex-col gap-2 items-center lg:mt-28 md:mt-2   lg:w-[43%] justify-center bg-gray-200 md:w-full">
          {blogs.map((item, index) => (
            <BlogRow key={item.id} type="blog_single_page" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex  py-9 bg-blue-300  md:flex-col justify-start items-start lg:flex-row gap-3 w-full">
      <main className="flex flex-col lg:w-[65%] md:w-full gap-3">
        <span className="text-12 mb-5 font-light">
          home &gt; blog &gt; {data.catagory}
        </span>
        <div className="flex  flex-col gap-3  ">
          <h2 className="text-20 font-bold">{data.title}</h2>
          <p className="text-neutral-500 text-12">
            By {data.creator} on {data.date}
          </p>
          <Image
            src={data.imageSrc}
            alt=" "
            width={608}
            height={411}
            className="object-cover w-full px-3 overflow-hidden rounded-lg"
          />
          <p className="text-12 px-3 indent-2 text-neutral-600 w-full ">
            {data.description}
          </p>
          <div className="flex cursor-pointer justify-end gap-4 px-10">
            <div
              onClick={() => setshowComments(!showComments)}
              className="flex gap-2 hover:bg-blue-500 duration-300 transition-all px-2 rounded-md  items-center"
            >
              <LiaCommentDots /> <span className="text-14"> 12 Comment</span>
            </div>
            <div
              onClick={() => setisLike(!isLike)}
              className="flex hover:bg-blue-500 duration-300 transition-all px-2 rounded-md  gap-2 items-center"
            >
              {isLike ? <BiSolidLike color="blue" /> : <AiOutlineLike />}
              <span className="text-14">123 Like </span>
            </div>
          </div>
        </div>
        {showComments && <Comments />}
      </main>
      <div className="flex flex-col gap-2 items-center lg:mt-28 md:mt-2   lg:w-[43%] justify-center bg-gray-200 md:w-full">
        {blogs.map((item, index) => (
          <BlogRow key={item.id} type="blog_single_page" />
        ))}
      </div>
    </div>
  );
};

export default Page;
