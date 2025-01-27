import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Interface for CardContactUs props
interface CardContactUsProps {
  id: string;
  title: string;
  formMessage: string;
  imageUrl: string;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions: boolean; // Condition to show "edit" and "delete" buttons
}

const CardContactUs: React.FC<CardContactUsProps> = ({
  id,
  title,
  formMessage,
  imageUrl,
  onDelete,
  onEdit,
  showActions,
}) => {
  return (
    <Link
      href={formMessage}
      className="flex flex-col min-w-[120px] md:min-h-[234px] md:max-h-[234px] md:min-w-[214px] md:max-w-[214px] items-center justify-center gap-2  active:shadow-inner active:shadow-slate-600 border-gray-300 p-2 rounded-2xl md:rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="flex flex-col overflow-hidden w-full items-center gap-4">
        <Image
          src={imageUrl}
          alt={title}
          width={100}
          height={100}
          className="rounded-lg max-h-[80px] min-w-[80px] max-w-[80px] min-h-[80px] md:max-h-[120px] md:min-w-[120px] md:max-w-[120px] md:min-h-[120px] border-gray-300"
        />
        <h2 className="text-12 md:text-20 font-semibold text-gray-800">
          {title}
        </h2>
        {/* <Link
          href={formMessage}
          className="text-center line-clamp-1   text-10 md:text-16 text-gray-600"
        >
          {formMessage}
        </Link> */}
      </div>

      {showActions && (
        <footer className="flex gap-4 mt-1">
          <button
            onClick={() => onDelete()}
            className="bg-red-500 text-white py-2 md:px-4 px-2  text-12 md:text-19 rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white py-2 md:px-4 px-2 rounded-full hover:bg-blue-600 text-12 md:text-19 transition-colors duration-200"
          >
            Edit
          </button>
        </footer>
      )}
    </Link>
  );
};

export default CardContactUs;
