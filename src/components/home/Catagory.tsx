"use client";
import { useTranslations } from "next-intl";
import { Carattere } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
const Catagory = () => {
  const t = useTranslations("category");
  const catagory: { name: string; image: string; path: string }[] = [
    {
      name: t("accessories"),
      image: "/a.png",
      path: "accessoiries",
    },
    {
      name: t("camera"),
      image: "/c.png",
      path: "camera",
    },
    {
      name: t("laptop"),
      image: "/l.png",
      path: "laptop",
    },
    {
      name: t("smart Phone"),
      image: "/s.png",
      path: "smartPhone",
    },
    {
      name: t("gaming"),
      image: "/g.png",
      path: "gaming",
    },
    {
      name: t("smart Watch"),
      image: "/sw.png",
      path: "smartWatch",
    },
  ];
  return (
    <motion.ul className=" flex overflow-x-auto w-full   gap-2  px-1 xl:gap-6 items-center lg:gap-3 md:gap-2 py-6 sm:justify-center justify-start">
      {catagory.map((item, index) => (
        <motion.li
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          key={item.path}
          className="2xl:w-[184px] min-w-[120px] dark:bg-neutral-900 dark:text-secondary-300 dark:border-secondary dark:shadow-secondary  lg:w-[140px] md:w-[100px] sm:hover:shadow-blue-200 hover:shadow-lg duration-200 md:dark:hover:shadow-secondary transition-all hover:transform sm:hover:scale-[1.08] flex flex-col rounded-lg shadow-md border gap-4 border-slate-100 items-center justify-between md:px-2 lg:px-6 py-2"
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
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Catagory;
