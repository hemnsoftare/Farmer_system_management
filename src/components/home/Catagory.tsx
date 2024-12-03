import { Carattere } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Catagory = () => {
  const catagory: { name: string; image: string; path: string }[] = [
    {
      name: "accessoiries",
      image: "/a.png",
      path: "accessoiries",
    },
    {
      name: "camera",
      image: "/c.png",
      path: "camera",
    },
    {
      name: "laptop",
      image: "/l.png",
      path: "laptop",
    },
    {
      name: "smart phone",
      image: "/s.png",
      path: "smartPhone",
    },
    {
      name: "gaming",
      image: "/g.png",
      path: "gaming",
    },
    {
      name: "smart watch",
      image: "/sw.png",
      path: "smartWatch",
    },
  ];
  return (
    <div className=" flex overflow-x-auto w-full  gap-2  px-1 xl:gap-6 items-center lg:gap-3 md:gap-2 py-4 sm:justify-center justify-start">
      {catagory.map((item) => (
        <div
          key={item.path}
          className="2xl:w-[184px] min-w-[120px] lg:w-[140px] md:w-[100px] sm:hover:shadow-blue-200 hover:shadow-lg duration-200 transition-all hover:transform sm:hover:scale-[1.08] flex flex-col rounded-lg shadow-md border gap-4 border-slate-100 items-center justify-between md:px-2 lg:px-6 py-2"
        >
          <Image
            alt="image"
            src={item.image}
            width={148}
            height={148}
            className=" sm:w-full sm:h-full w-[70px] h-[80px]"
          />
          <h3 className="capitalize lg:text-sm text-12  text-center  md:text-10 w-full ">
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Catagory;
