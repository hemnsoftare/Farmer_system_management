"use client";

import React, { useState } from "react";

import CommentItem from "./CommentItem";
import { comments } from "@/util/data";
const Comments = ({ type }: { type?: "products" }) => {
  const [showMore, setshowMore] = useState<number>(0.212);
  return (
    <main className="bg-gray-50 flex flex-col p-3 gap-4 w-full px-3">
      {!(type === "products") && (
        <div className="flex items-center gap-2">
          <textarea
            name="comment"
            id=""
            rows={1}
            className=" border-neutral-400 px-5 py-2 border  outline-none rounded-lg bg-white  w-full"
            placeholder="comments ..."
          ></textarea>
          <button className="text-blue-800 px-4 py-1 border rounded-lg border-blue-500 hover:bg-white">
            submit
          </button>
        </div>
      )}
      {comments.map((item) => (
        <CommentItem
          key={item.id}
          comment={item}
          toggleShowMore={(id) => setshowMore(showMore === id ? 2432.34 : id)}
          showMore={showMore}
        />
      ))}
    </main>
  );
};

export default Comments;
