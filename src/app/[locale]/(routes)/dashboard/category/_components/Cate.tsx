import Image from "next/image";
import React from "react";

const Cate = ({
  name,
  image,
  onDelete,
  onEdite,
}: {
  name: string;
  image: string;
  onDelete: (id: string) => void;
  onEdite: (id: string) => void;
}) => {
  return (
    <div className="flex min-w-[180px] shadow-md shadow-cyan-100 border rounded-lg bg-cyan-50 flex-col gap-2 items-center justify-center px-3 py-3">
      <Image
        src={image}
        alt={name}
        width={100}
        height={200}
        className="w-20 h-20 "
      />
      <h1 className="text-lg font-semibold">{name}</h1>
      <div className="flex justify-center items-center w-full gap-2">
        <button
          onClick={() => onEdite(name)}
          className="bg-blue-500 hover:bg-blue-200 duration-300 transition-all text-white px-2 py-1 rounded-lg"
        >
          Edite
        </button>
        <button
          onClick={() => onDelete(name)}
          className="bg-red-500 hover:bg-blue-200 duration-300 transition-all text-white px-2 py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Cate;
