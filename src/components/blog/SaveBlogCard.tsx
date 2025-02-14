import { blogFavriteProps } from "@/lib/action";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

const SaveBlogCard = ({
  blog,
  onSave,
  onUnsave,
  type,
  disabledBtn,
}: {
  blog: blogFavriteProps;
  type?: "dashboard";
  onSave?: () => void;
  onUnsave?: () => void;
  disabledBtn?: boolean;
}) => {
  return (
    <div className="flex flex-col border md:hover:shadow-xl md:hover:scale-[1.04] duration-300 transition-all backdrop-blur-lg md:hover:z-40 shadow-md px-3 rounded-xl pb-3 pt-3 gap-3 w-full">
      {/* Media Section (Image or Video) */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        {blog.type === "video" ? (
          <ReactPlayer
            url={blog.video || ""}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <Image
            src={blog.image || "/default-blog-image.jpg"}
            alt={blog.title}
            fill
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Blog Title */}
      <h1 className="line-clamp-1 font-semibold text-lg">
        {blog.title || "No Title Available"}
      </h1>

      {/* Blog Description */}
      <p className="text-sm text-gray-400 line-clamp-2">
        {blog.description || "No description available for this blog."}
      </p>

      {/* Footer with Save/Unsave Buttons */}
      {type !== "dashboard" && (
        <footer className="w-full gap-3 flex items-center justify-between">
          <button
            disabled={disabledBtn}
            onClick={() => onSave()}
            className="px-6 py-1 disabled:bg-blue-300 w-[150px] rounded-lg active:bg-blue-600 duration-300 transition-all md:hover:bg-blue-600 text-white bg-blue-800"
          >
            Save
          </button>

          <button
            onClick={() => onUnsave()}
            disabled={!disabledBtn}
            className="px-6 disabled:text-blue-300 py-1 w-[150px] active:bg-blue-100 duration-300 transition-all md:hover:bg-blue-100 rounded-lg border text-blue-700 border-blue-500"
          >
            Unsave
          </button>
        </footer>
      )}
    </div>
  );
};

export default SaveBlogCard;
