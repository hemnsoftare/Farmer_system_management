import React from "react";
import Image from "next/image";

interface BlogProps {
  image: string;
  title: string;
  date: string;
  description: string;
}

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const Blog = ({ image, title, date, description }: BlogProps) => {
  const truncatedDescription = truncateDescription(description, 10);

  return (
    <div className="flex min-w-[150px] max-w-[150px] md:min-w-[300px] md:max-w-[300px] flex-col rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-gray-700  md:max-h-[59px] md:min-h-[60px]">
          {truncatedDescription}
        </p>
      </div>
    </div>
  );
};

export default Blog;
