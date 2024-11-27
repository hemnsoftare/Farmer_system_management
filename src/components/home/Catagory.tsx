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
    <div className="grid grid-cols-3 sm:flex flex-wrap gap-2  px-2 xl:gap-6 items-center lg:gap-3 md:gap-2  justify-center">
      {catagory.map((item) => (
        <div
          key={item.path}
          className="2xl:w-[284px] w-full lg:w-[140px] md:w-[100px] hover:shadow-blue-200 hover:shadow-lg duration-200 transition-all hover:transform hover:scale-[1.08] flex flex-col rounded-lg shadow-md border gap-4 border-slate-100 items-center justify-between md:px-2 lg:px-6 py-4"
        >
          <Image
            alt="image"
            src={item.image}
            width={148}
            height={148}
            className="sm:object-cover w-[70px] h-[80px]"
          />
          <h3 className="capitalize lg:text-sm  text-center  md:text-10 w-full ">
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Catagory;
