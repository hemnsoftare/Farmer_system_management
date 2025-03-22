"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { GrFormNextLink } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";

import NewProducts from "./NewProducts";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import { ProductFormInput } from "@/lib/action";
import { Loader } from "@/app/[locale]/loader";
import { getAllItemNames } from "@/lib/action/fovarit";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
import { queryClient } from "@/app/[locale]/ClientProviders";
const Sales = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["sale"],
    queryFn: async () => {
      const getAllid = await getAllItemNames(user.id);
      const getdata = await getProductsBYDiscountAndCategoryAndSale({
        category: "",
        col: "discount",
      });
      return { products: getdata, favoriteId: getAllid };
    },
  });
  const t = useTranslations("sales");
  const [start, setStart] = useState(0);
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0.2 }}
      transition={{ duration: 0.6, type: "tween" }}
      className="flex flex-col lg:max-w-[1200px] sm:flex-row rounded-2xl overflow-hidden dark:bg-primary-700 bg-primary-500 h-full w-full py-3 pb-7  px-3  items-center justify-center shadow-blue-950 shadow-md relative sm:rounded-md text-white gap-4"
    >
      <Image
        src={"/shape.png"}
        width={400}
        height={400}
        alt="image"
        className="absolute left-0 z-[0] -top-5"
      />
      <div className="flex w-full sm:w-[20%] z-20 text-white items-center  flex-col gap-3 ">
        <h1 className="text-white text-center mt-8 font-bold text-29 sm:text-23 ">
          {t("title")}
        </h1>
        <h2>{t("button_shop_now")}</h2>
        <br />
        <button className="mt-auto bg-blue-500 z-30 sm:hover:bg-blue-700 text-white mb-3 font-bold py-2 px-12 rounded-lg">
          <Link href={"/viewAll?type=discount"}>{t("button_view_all")}</Link>
        </button>
      </div>
      {isLoading && (
        <div className="sm:grid w-full sm:w-[80%] gap-3  items-center flex overflow-x-auto  sm:overflow-hidden sm:grid-cols-4 justify-start">
          <Loader />
          <Loader />
          <div className="hidden sm:flex">
            <Loader />
            <Loader />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="sm:grid w-full sm:w-[80%] gap-3  items-center flex overflow-x-auto  sm:overflow-hidden sm:grid-cols-4 justify-start">
          {data.products.slice(start, 4 + start).map((item) => (
            <NewProducts
              favoriteId={data.favoriteId}
              addFavoriteid={() => {
                // setproducts((prev) =>
                //   prev.map(
                //     (itemp) =>
                //       itemp.name === item.name
                //         ? { ...itemp, numberFavorite: itemp.numberFavorite - 1 } // Update numberFavorite
                //         : itemp // Keep other items unchanged
                //   )
                // );
                // setfavoriteId((pre) => [...pre, item.name]);
                queryClient.setQueryData(["sale"], (oldData: any) => {
                  return {
                    products: oldData.products.filter((itemp) =>
                      itemp.id !== item.id
                        ? itemp
                        : { ...itemp, numberFavorite: itemp.numberFavorite + 1 }
                    ),
                    favoriteId: [...oldData.favoriteId, item.id],
                  };
                });
              }}
              deleteFavoriteId={() => {
                // setproducts((prev) =>
                //   prev.map(
                //     (itemp) =>
                //       itemp.name === item.name
                //         ? { ...itemp, numberFavorite: itemp.numberFavorite - 1 } // Update numberFavorite
                //         : itemp // Keep other items unchanged
                //   )
                // );
                // setfavoriteId(
                //   (prev) => prev.filter((itemp) => itemp !== item.name) // Remove the product name from favorites
                // );
                queryClient.setQueryData(["sale"], (oldData: any) => {
                  return {
                    products: oldData.products.filter((itemp) =>
                      itemp.id !== item.id
                        ? itemp
                        : {
                            ...itemp,
                            numberFavorite: itemp.numberFavorite - 1,
                          }
                    ),
                    favoriteId: oldData.favoriteId.filter(
                      (prev) => prev !== item.id // Remove the product if it exists
                    ),
                  };
                });
              }}
              key={item.name}
              itemDb={item}
              title="sale"
            />
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 absolute bottom-1 right-3">
        <IoArrowBackOutline
          color="white"
          onClick={() => setStart((pre) => (pre === 0 ? 0 : pre - 1))}
          className="hover:bg-slate-50/15   duration-300 scale-[1.4]"
        />
        <GrFormNextLink
          color="white"
          onClick={() =>
            setStart((pre) => (pre >= data.products.length - 4 ? pre : pre + 1))
          }
          className="hover:bg-slate-50/15  duration-300 scale-[1.4]"
        />
      </div>
    </motion.div>
  );
};

export default Sales;
