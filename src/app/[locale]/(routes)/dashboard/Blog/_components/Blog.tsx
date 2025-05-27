import React from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import ReactPlayer from "react-player";

interface BlogProps {
  image?: string;
  title: string;
  date: any;
  description: string;
  video?: string;
  user: string;
  id: string;
  type?: "video" | "image";
  handleDelete?: (id: string) => void;
}

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const Blog = ({
  image,
  title,
  date,
  description,
  video,
  type,
  user,
  id,
  handleDelete,
}: BlogProps) => {
  const truncatedDescription = truncateDescription(description, 10);
  const formattedDate = new Date(
    (date?.seconds || 0) * 1000
  ).toLocaleDateString("en-US");
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the <Link>
    e.preventDefault(); // Prevent default behavior of the <Link>
  };
  return (
    <Link
      href={`/dashboard/Blog/${id}`}
      className="flex w-full min-h-[400px] max-h-[400px] flex-col rounded-lg shadow-md shadow-gray-400 overflow-hidden"
    >
      <div className="relative overflow-hidden  w-full">
        {/* Video Display */}
        {type === "video" && video ? (
          <div className="relative w-full pb-[56.25%]">
            {" "}
            {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              url={video}
              width="100%"
              height="100%"
              controls
              className="absolute top-0 left-0"
            />
          </div>
        ) : type === "video" && !video ? (
          <div className="flex justify-center items-center h-full bg-gray-200">
            <span className="text-gray-600">No video available</span>
          </div>
        ) : (
          // Image Display
          type === "image" &&
          image && (
            <Image
              src={image}
              alt={title}
              width={200}
              height={200}
              className="w-full  min-h-[220px] max-h-[220px] object-cover"
            />
          )
        )}
      </div>
      <div className="p-4 space-y-2">
        <p>
          Created by{" "}
          <span className="text-gray-600 text-sm underline">{user}</span>
        </p>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p className="text-gray-700 line-clamp-1">{truncatedDescription}</p>
      </div>

      <footer className="flex px-4 justify-end items-center pb-3 rounded-b-lg">
        <Link
          href={`/dashboard/Blog/CreateBlog?id=${id}`}
          className="w-full active:scale-90 hover:text-white  shadow-blue-600 active:shadow-lg active:text-white transition-all duration-300 text-center p-2 rounded-lg bg-blue-900 text-white"
        >
          Edit
        </Link>

        <button
          onClick={(e) => {
            handleFavoriteClick(e);
            handleDelete?.(id);
          }}
          className="text-white active:scale-90 hover:text-white shadow-red-400 active:shadow-lg transition-all duration-300 active:text-white rounded-lg bg-red-700 w-full text-center p-2 rounded-  ml-4"
          aria-label="Delete blog post"
        >
          Delete
        </button>
      </footer>
    </Link>
  );
};

export default Blog;
