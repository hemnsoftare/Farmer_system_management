"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CommentProps } from "../../../type";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { prefetchDNS } from "react-dom";
const CommentItem = ({
  comment,
  toggleShowMore,
  showMore,
}: {
  showMore: number;
  comment: CommentProps;
  toggleShowMore: (id: number) => void;
}) => {
  const [item, setItem] = useState<CommentProps>(comment);
  const handleLike = () => {
    setItem((prev) => {
      // Create a new object with the updated values
      return {
        ...prev, // Spread the previous state
        isLike: {
          disLike: false, // Spread the previous `isLike` object
          like: true, // Update the `like` property to true
        },
        likes: prev.likes + 1,
        dislikes: item.isLike.disLike ? prev.dislikes - 1 : prev.dislikes, // Increment the `likes` count
      };
    });
  };
  const handleDislike = () => {
    setItem((prev) => {
      // Create a new object with the updated values
      return {
        ...prev, // Spread the previous state
        isLike: {
          disLike: true, // Spread the previous `isLike` object
          like: false, // Update the `like` property to true
        },
        dislikes: prev.dislikes + 1,
        likes: item.isLike.like ? prev.likes - 1 : prev.likes, // Increment the `likes` count
      };
    });
  };
  console.log(item);
  return (
    <article className="flex flex-col gap-3">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={comment.imageSrc}
            alt=""
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-[100%]"
          />
          <div className="flex flex-col">
            <p className="text-16">{comment.author}</p>
            <span className="text-12 text-neutral-400">{comment.date}</span>
          </div>
        </div>
      </header>
      <p
        className={`text-13 ${
          showMore === comment.id ? "h-fit" : "h-[45px]"
        } duration-300 transition-all overflow-hidden`}
      >
        {comment.content}
      </p>
      <div
        onClick={() => toggleShowMore(comment.id)}
        className="flex hover:bg-blue-100 cursor-pointer self-end items-center gap-0 text-blue-700"
      >
        <span>show more</span>
        <RiArrowDropDownLine color="blue" className="w-[30px] h-[30px]" />
      </div>
      <div className="flex self-end items-center gap-3 pr-6 text-blue-700">
        <div
          onClick={handleLike}
          className="flex gap-2 hover:bg-blue-200 cursor-pointer duration-300 transition-all px-2 rounded-lg items-center"
        >
          {item.isLike.like ? (
            <BiSolidLike color="blue" />
          ) : (
            <AiOutlineLike color="blue" />
          )}
          <span>{comment.likes}</span>
        </div>
        |
        <div
          onClick={handleDislike}
          className="flex gap-2 hover:bg-blue-200 cursor-pointer duration-300 transition-all px-2 rounded-lg items-center"
        >
          {item.isLike.disLike ? (
            <AiFillDislike color="red" />
          ) : (
            <AiOutlineDislike color="blue" />
          )}
          <span>{comment.dislikes}</span>
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
