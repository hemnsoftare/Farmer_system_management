import React from "react";
import Image from "next/image";
import { a } from "@nextui-org/slider/dist/use-slider-a94a4c83";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Delete } from "lucide-react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";

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
  return (
    <div className="flex min-w-[150px] max-w-[150px] md:min-w-[300px] md:max-w-[300px] flex-col rounded-lg shadow-md overflow-hidden">
      <div className="relative min-h-[220px] max-h-[220px] w-full">
        {type === "video" && (
          <video controls className="w-full  min-h-[220px] max-h-[220px]">
            <source src={video} type="video/mp4" />
          </video>
        )}
        {type === "image" && (
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="w-full  min-h-[220px] max-h-[220px]"
          />
        )}
      </div>
      <div className="p-4 space-y-2">
        <p>
          create by{" "}
          <span className="text-gray-600 text-14 underline"> {user}</span>
        </p>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p className="text-gray-700  md:max-h-[59px] md:min-h-[60px]">
          {truncatedDescription}
        </p>
      </div>

      <footer className="flex px-4 justify-end items-center pb-3   rounded-b-lg">
        {id && (
          <Link href={`/dashboard/Blog/CreateBlog?id=${id}`}>
            <FaEdit color="blue" size={22} />
          </Link>
        )}

        <MdOutlineDeleteOutline
          onClick={() => handleDelete(id)}
          color="red"
          size={22}
        />
      </footer>
    </div>
  );
};

export default Blog;
