"use client";
import Banner from "@/components/home/Banner";
import Brand from "@/components/home/Brand";
import Catagory from "@/components/home/Catagory";
import ForProducts from "@/components/home/ForProducts";
import Hero from "@/components/home/Hero";
import Reklam from "@/components/home/Reklam";
import Sales from "@/components/home/Sales";
import Servies from "@/components/home/Servies";
import { lang, setUser } from "@/lib/action/uploadimage";
import { useUser } from "@clerk/nextjs";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import SearchComponent from "@/components/home/Search";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
import HomePage from "@/components/ToasterInstall";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const newpro = await getProductsBYDiscountAndCategoryAndSale({
        category: "",
        col: "date",
      });
      const salepro = await getProductsBYDiscountAndCategoryAndSale({
        category: "",
        col: "numberSale",
      });

      return {
        productNew: newpro,
        productSale: salepro,
      };
    },
  });

  const { user } = useUser();
  const t = useTranslations("newProduct");

  useEffect(() => {
    if (user) {
      setUser({
        id: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        fullName: user.fullName || "",
        image: user?.imageUrl || "",
        username: user.username || "",
        emailAddresses: user.emailAddresses || [],
        primaryEmailAddressId: user.primaryEmailAddressId || "",
      });
    }
  }, [user]);
  const lan = lang().startsWith("ar") || lang().startsWith("ku");
  // add comeetnete sdfasdf asdf
  return (
    <div className="flex flex-col justify-center w-full overflow-hidden items-center gap-12">
      {/* <PushNotificationManager /> */}
      <HomePage />
      <SearchComponent />
      <Hero /> <Catagory />
      <Sales />
      <motion.div className="flex flex-col px-3 dark:text-white w-full items-center justify-center">
        <div
          id="newProducts"
          className="flex transition-all px-2 duration-300 items-center justify-between w-full border-b-4 pb-4 border-neutral-400"
        >
          <h3 className="sm:text-[32px] text-20 flex items-center justify-center  ">
            {t("title")}
          </h3>
          <Link
            href={"/viewAll?type=New"}
            className="text-[16px] items-center  justify-center flex gap-2"
          >
            <span className="text-18">{t("button_view_all")}</span>{" "}
            <MdNavigateNext className={`${lan ? "rotate-180 " : "rotate-0"}`} />
          </Link>
        </div>

        {!isLoading && (
          <ForProducts load={isLoading} products={data?.productNew} />
        )}
      </motion.div>
      <Reklam />
      <div className="flex flex-col px-3 w-full  items-center justify-center">
        <div className="flex justify-between px-2 dark:text-white items-center border-b-4 w-full pb-4 border-neutral-400">
          <h3 className="text-[20px] sm:text-30 flex items-center justify-center ">
            {t("bestSalary")}
          </h3>
          <Link
            href={"/viewAll?type=numberSale "}
            className="text-[16px] items-center justify-center flex gap-2"
          >
            <span className="text-18">{t("button_view_all")}</span>{" "}
            <MdNavigateNext className={`${lan ? "rotate-180 " : "rotate-0"}`} />
          </Link>
        </div>

        {!isLoading && (
          <ForProducts load={isLoading} products={data?.productSale} />
        )}
      </div>
      <Brand />
      <div className="w-full overflow-hidden flex items-center justify-center px-3">
        <Banner />
      </div>
      <Servies />
      {/*
      {/* 
      <Blog /> 
       */}
    </div>
  );
}
