import { Carattere } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Catagory = () => {
  const catagory: { name: string; image: string; path: string }[] = [
    {
      name: "accessoiries",
      image: "Catagory_accessories.svg",
      path: "accessoiries",
    },
    {
      name: "camera",
      image: "Catagory_camera.svg",
      path: "camera",
    },
    {
      name: "laptop",
      image: "Catagory_laptop.svg",
      path: "laptop",
    },
    {
      name: "smart phone",
      image: "Catagory_smartPhone.svg",
      path: "smartPhone",
    },
    {
      name: "gaming",
      image: "Catagory_gaming.svg",
      path: "gaming",
    },
    {
      name: "smart watch",
      image: "Catagory_smartWatch.svg",
      path: "smartWatch",
    },
  ];
  return (
    <div className="flex gap-6 items-center flex-wrap justify-center">
      {catagory.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="2xl:w-[284px] lg:w-[170px] md:w-[120px] hover:shadow-blue-200 hover:shadow-lg duration-200 transition-all hover:transform hover:scale-[1.08] flex flex-col rounded-lg shadow-md border gap-4 border-slate-100 items-center justify-between px-6 py-4"
        >
          <Image
            alt="image"
            src={item.image}
            width={148}
            height={148}
            className="object-cover"
          />
          <h3 className="capitalize text-sm ">{item.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Catagory;
