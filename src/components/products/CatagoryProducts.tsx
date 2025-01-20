"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { getFireBase } from "@/lib/action/uploadimage";
import { catagoryProps } from "@/lib/action";
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
  const fadeInUp = {
    initial: { opacity: 0, translateY: 50 },
    whileInView: { opacity: 1, translateY: 0 },
    transition: { duration: 0.5 },
  };
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
    <div className="flex lg:gap-4 md:gap-3 py-3 gap-2 overflow-x-auto sm:overflow-hidden sm:flex-wrap justify-start sm:justify-center items-center w-full">
      {category.map((item: any, index) => (
        <motion.div
          initial={{
            translateY: index % 2 === 0 ? 80 : -80,
          }}
          animate={{ translateY: 0 }}
          key={item.name}
          onClick={() => {
            handleSelected && handleSelected(item.name);
            setSelected(item.name);
          }}
          className={`${
            item.name.trim() === selected.trim()
              ? "shadow-blue-300 dark:shadow-secondary shadow-md rounded-lg border-blue-300"
              : "shadow-slate-100 shadow-lg dark:shadow-secondary rounded-lg"
          } flex min-w-[120px] text-center flex-col dark:bg-neutral-200 hover:bg-slate-50 hover:scale-[1.1] px-3 py-1 duration-300 transition-all cursor-pointer items-center justify-center gap-2`}
        >
          <Image
            src={item.image.link}
            alt="image"
            width={20}
            height={20}
            className="w-6 md:min-w-[25px] md:min-h-[25px] h-6"
          />
          <div className="text-14 flex justify-center items-center dark:text-black gap-2 w-full text-center">
            {item.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CatagoryProducts;
