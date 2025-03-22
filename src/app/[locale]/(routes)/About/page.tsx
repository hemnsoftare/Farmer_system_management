"use client";
import CardTeam from "@/components/about/CardTeam";
import { getAboutUs } from "@/lib/action/uploadimage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getAllTeam } from "@/lib/action/dashboard";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
  const t = useTranslations("about");
  const { data, isLoading } = useQuery({
    queryKey: ["About"],
    queryFn: async () => {
      const data = await getAboutUs();
      const datateam = await getAllTeam();
      return { about: data, team: datateam };
    },
  });
  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  return (
    <div className="flex w-full  sm:px-40 flex-col py-8 gap-4 px-2 sm:gap-4 ">
      <h2>
        <Link href={"/"} className="hover:text-blue-800 hover:underline">
          {t("home")}
        </Link>
        &gt;{" "}
        <p className=" inline text-blue-600 cursor-pointer underline underline-offset-4">
          {" "}
          {t("about_us")}
        </p>{" "}
      </h2>
      <Image
        src={data.about.imageUrl}
        alt="about image "
        width={600}
        height={400}
        className="w-full shadow-lg shadow-slate-500 mb-3 rounded-md md:h-full max-h-[450px] "
      />
      <motion.p
        initial={{ translateX: 80, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
        className="text-neutral-400 dark:text-neutral-600 px-3  text-12 sm:text-16 line-clamp-0 indent-2 -mt-2 "
      >
        {data.about.description}
      </motion.p>
      <div className="">
        {data.about.descriptions.map((item, index) => (
          <div key={item.title} className="flex flex-col gap-2">
            <motion.h2
              initial={{ x: index % 2 == 0 ? 80 : -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, type: "spring" }}
              className="text-20 font-semibold"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{ x: index % 2 == 1 ? 80 : -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, type: "spring" }}
              className="text-14"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ y: 80, x: 100, opacity: 0 }}
        whileInView={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
        className="w-full h-full flex md:flex-row flex-wrap flex-col gap-4"
      >
        {data.team.map((item) => (
          <CardTeam
            key={item.description}
            description={item.description}
            imageUrl={item.imageUrl}
            isDashboard={false}
            name={item.fullName}
            role={item.position}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Page;
