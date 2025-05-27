"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import NewProducts from "./NewProducts";

import { Loader } from "@/app/[locale]/loader";
import { getAllItemNames } from "@/lib/action/fovarit";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
import { queryClient } from "@/app/[locale]/ClientProviders";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const Sales = () => {
  const { user } = useUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sale"],
    queryFn: async () => {
      const getAllid = await getAllItemNames(user?.id);
      const getdata = await query(
        collection(db, "Products"),
        where("discount", ">", 0),
        limit(4)
      );
      const getdataDocs = await getDocs(getdata);

      const ddataarray = getdataDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(ddataarray);

      return { products: ddataarray, favoriteId: getAllid };
    },
  });
  const t = useTranslations("sales");
  console.log(data);
  if (error) return <h1>{error.message}</h1>;

  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0.2 }}
      transition={{ duration: 0.6, type: "tween" }}
      className="flex flex-col lg:max-w-[1200px] sm:flex-row rounded-2xl overflow-hidden dark:bg-primary-700 bg-primary-500 h-full w-full py-3 pb-7 px-3 items-center justify-center shadow-blue-950 shadow-md relative sm:rounded-md text-white gap-4"
    >
      <Image
        src="/shape.png"
        width={400}
        height={400}
        alt="image"
        className="absolute left-0 z-[0] -top-5"
      />
      <div className="flex w-full sm:w-[20%] z-20 text-white items-center flex-col gap-3">
        <h1 className="text-white text-center mt-8 font-bold text-29 sm:text-23">
          {t("title")}
        </h1>
        <h2>{t("button_shop_now")}</h2>
        <br />
        <button className="mt-auto bg-blue-500 z-30 sm:hover:bg-blue-700 text-white mb-3 font-bold py-2 px-12 rounded-lg">
          <Link href="/viewAll?type=discount">{t("button_view_all")}</Link>
        </button>
      </div>
      {isLoading ? (
        <div className="sm:grid w-full sm:w-[80%] gap-3 items-center flex overflow-x-auto sm:overflow-hidden sm:grid-cols-4 justify-start">
          <Loader />
          <Loader />
          <div className="hidden sm:flex">
            <Loader />
            <Loader />
          </div>
        </div>
      ) : (
        <div className="sm:grid w-full sm:w-[80%] gap-3 items-center flex overflow-x-auto sm:overflow-hidden sm:grid-cols-4 justify-start">
          {data.products.slice(0, 4).map((item: any) => (
            <NewProducts
              key={item.name}
              itemDb={item}
              title="sale"
              favoriteId={data.favoriteId}
              addFavoriteid={() => {
                queryClient.setQueryData(["sale"], (oldData: any) => {
                  return {
                    products: oldData.products.map((itemp: any) =>
                      itemp.id === item.id
                        ? { ...itemp, numberFavorite: itemp.numberFavorite + 1 }
                        : itemp
                    ),
                    favoriteId: [...oldData.favoriteId, item.id],
                  };
                });
              }}
              deleteFavoriteId={() => {
                queryClient.setQueryData(["sale"], (oldData: any) => {
                  return {
                    products: oldData.products.map((itemp: any) =>
                      itemp.id === item.id
                        ? { ...itemp, numberFavorite: itemp.numberFavorite - 1 }
                        : itemp
                    ),
                    favoriteId: oldData.favoriteId.filter(
                      (prev: string) => prev !== item.id
                    ),
                  };
                });
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Sales;
