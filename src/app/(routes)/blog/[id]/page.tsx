"use client";
import React, { useState } from "react";
import { BlogColProps } from "../../../../type";
import { blogs } from "@/util/data";
import Image from "next/image";
import { LiaCommentDots } from "react-icons/lia";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import Comments from "@/components/blog/Comments";
import BlogRow from "@/components/blog/BlogRow";
import ReactPlayer from "react-player";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const data: BlogColProps = blogs[1]; // Replace with your dynamic logic
  const [isLike, setIsLike] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const IsVideo = true; // Replace with your actual video condition

  return (
    <div className="flex py-9 px-3 flex-col justify-start items-start lg:flex-row gap-2 sm:gap-4 w-full">
      <main className="flex flex-col lg:w-[65%] w-full gap-3">
        {/* Breadcrumb */}
        <span className="text-12 mb-5 font-light">
          <Link href={"/"} className="sm:hover:text-blue-600">
            {" "}
            home{" "}
          </Link>
          &gt;
          <Link href={"/blog"} className="sm:hover:text-blue-600">
            {" "}
            blog
          </Link>{" "}
          &gt; {data.catagory}
        </span>

        <div className="flex w-full flex-col gap-3">
          {/* Title and Metadata */}
          <h2 className="sm:text-20 text-18 font-bold">{data.title}</h2>
          <p className="text-neutral-500 text-12">
            By {data.creator} on {data.date}
          </p>

          {/* Conditional Rendering for Video or Image */}
          {IsVideo ? (
            <video className="w-full rounded-lg object-contain" controls>
              <source src="/vedio.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src={data.imageSrc}
              alt="Blog Cover"
              width={608}
              height={411}
              className="object-cover w-full px-3 overflow-hidden rounded-lg"
            />
          )}

          {/* Description */}
          <p className="sm:text-12 text-10 indent-2 text-neutral-600 w-full">
            {data.description}
          </p>

          {/* Comment and Like Section */}
          {/* <div className="flex cursor-pointer justify-end gap-4 px-10">
            <div
              onClick={() => setShowComments(!showComments)}
              className="flex gap-2 hover:bg-blue-500 duration-300 transition-all px-2 rounded-md items-center"
            >
              <LiaCommentDots />
              <span className="text-14">12 Comments</span>
            </div>
            <div
              onClick={() => setIsLike(!isLike)}
              className="flex hover:bg-blue-500 duration-300 transition-all px-2 rounded-md gap-2 items-center"
            >
              {isLike ? <BiSolidLike color="blue" /> : <AiOutlineLike />}
              <span className="text-14">123 Likes</span>
            </div>
          </div> */}

          {/* Comments Section */}
          {showComments && <Comments />}
        </div>
      </main>

      {/* Blog Rows */}
      <div className="flex flex-col gap-2 items-center lg:mt-28 mt-2 lg:w-[43%] justify-center md:w-full">
        {blogs.map((item, index) => (
          <BlogRow key={item.id} type="blog_single_page" />
        ))}
      </div>
    </div>
  );
};

export default Page;
