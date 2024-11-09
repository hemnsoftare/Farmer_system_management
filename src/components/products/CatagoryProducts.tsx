"use client";

import React, { useEffect, useState } from "react";
import { getFireBase } from "@/lib/action/uploadimage";
import { catagoryProps } from "@/type";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const CatagoryProducts = ({
  catagory,
  handleSelected,
}: {
  title?: string;
  handleSelected?: (name: string) => void;
  catagory?: string;
}) => {
  const [selected, setSelected] = useState(
    (catagory && catagory.replace("%20", " ")) || ""
  );
  const [category, setcategory] = useState<catagoryProps[]>([]);
  const [loadCategory, setloadCategory] = useState(true);

  useEffect(() => {
    const getdata = async () => {
      // console.log("header products aaaaa");
      const cate: catagoryProps[] = await getFireBase("category");
      // console.log(cate[0]);
      setloadCategory(false);
      setcategory(cate);
      // console.log(selected, cate);
    };
    getdata();
  }, [catagory]);
  if (loadCategory)
    return (
      <div className="flex w-full justify-center gap-4">
        {" "}
        <Skeleton className="h-[50px] bg-neutral-500 w-[100px]" />
        <Skeleton className="h-[50px] bg-neutral-500 w-[100px]" />
        <Skeleton className="h-[50px] bg-neutral-500 w-[100px]" />
      </div>
    );
  return (
    <div className="flex lg:gap-4 md:gap-3 flex-wrap justify-center items-center w-full">
      {category.map((item) => (
        <div
          onClick={() => {
            handleSelected && handleSelected(item.name);
            setSelected(item.name);
          }}
          key={item.name}
          className={`${
            item.name.trim() === selected.trim()
              ? "shadow-blue-400"
              : "shadow-slate-100"
          } flex w-[120px] text-center flex-col hover:bg-slate-50 hover:scale-[1.1] px-3 rounded-lg py-1 shadow-sm duration-300 transition-all cursor-pointer items-center justify-center gap-2`}
        >
          <Image
            src={item.image.link}
            alt="image "
            width={20}
            height={20}
            className="w-5  h-5"
          />
          <div className="text-14 flex justify-center items-center gap-2 w-full text-center">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatagoryProducts;
