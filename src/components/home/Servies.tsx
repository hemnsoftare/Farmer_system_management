"use client";
import React from "react";
import { motion } from "framer-motion";
import { serviesProps } from "@/lib/action";
import { FaDesktop, FaShippingFast } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { BiSolidTimer } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { lang } from "@/lib/action/uploadimage";
const Servies = () => {
  const t = useTranslations("servies");
  const servies: serviesProps[] = [
    { name: t("latestAndGreatest"), image: FaDesktop },
    { name: t("guarantee"), image: MdOutlineVerified },
    { name: t("freeShipping"), image: FaShippingFast },
    { name: t("support"), image: BiSolidTimer },
  ];
  return (
    <motion.div className="flex items-center overflow-hidden mb-3 px-12 w-full justify-between dark:text-gray-100">
      {servies.map((item, index) => {
        return (
          <motion.div
            initial={{
              x: index % 2 === 0 ? -30 : 30,
            }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 0.4,
              type: "tween",
              delay: index * 0.1, // Added delay to stagger the animation
            }}
            key={item.name}
            className={`flex flex-col  ${lang() === "ar" || lang() === "ku" ? "sm:flex-row-reverse" : "sm:flex-row "} group w-fit duration-300 items-center gap-1`}
          >
            <item.image
              width={30}
              height={33}
              className={
                " sm:min-w-[36px] text-secondary  sm:min-h-[36px] w-[25px] h-[25px] sm:group-hover:scale-[1.07] duration-300"
              }
            />
            <p
              className={`text-10 above-405:text-11 lg:text-17 w-full dark:text-gray-500 h-full sm:group-hover:translate-x-[30px] duration-300 sm:group-hover:text-primary-400 sm:group-hover:scale-[1.2] ${lang() === "ar" || lang() === "ku" ? "sm:group-hover:translate-x-[-30px] " : "sm:group-hover:translate-x-[30px] "} dark:sm:group-hover:text-blue-400`}
            >
              {item.name}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Servies;
