"use client";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { use, useState } from "react";
import HeaderDilter from "@/components/products/HeaderFilter";
import FilterItem from "@/components/products/FilterItem";
import NewProducts from "@/components/home/NewProducts";
import Filtered from "@/components/products/Filter";
import { getProducts } from "@/lib/action/uploadimage";
import Link from "next/link";
import { Loader } from "@/app/[locale]/loader";
import { getAllItemNames } from "@/lib/action/fovarit";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/[locale]/ClientProviders";
import useFilterProducts from "@/lib/store/filterProducts";
const MyComponent = ({ params }) => {
  const cate: any = use(params);
  const {
    category,
    filter: filterProduacts,
    resetAll,
    sortBy,
  } = useFilterProducts();
  const [filter, setFilter] = useState<{ [key: string]: boolean }>({});
  const [openFilter, setopenFilter] = useState(false);

  const t = useTranslations("products");
  const { user } = useUser();

  // add react query
  const {
    data: products,
    isLoading: load,
    error,
  } = useQuery({
    queryKey: ["products" + category, cate.category, filterProduacts, sortBy],
    enabled: !!filterProduacts || cate.category || sortBy || category,
    queryFn: async () => {
      console.log("in query");
      console.log(sortBy, filterProduacts);
      const pro = await getProducts(category.trim(), sortBy, filterProduacts);
      console.log("pro");
      return pro;
    },
  });
  // favoriteId
  const { data: favoriteId, isLoading: saleisLoading } = useQuery({
    queryKey: ["products" + category, filterProduacts, sortBy],
    queryFn: async () => {
      console.log("in query");
      const pro = await getAllItemNames(user?.id);
      console.log("pro");
      return pro;
    },
  });
  const handleOpen = (type: string) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  if (error) return <h1>error {error.message}</h1>;
  return (
    <motion.div className="flex flex-col w-full gap-5 px-3  pt-5 ">
      <p className="text-16 dark:text-gray-500 py-6">
        <Link
          href={"/"}
          className="hover:text-blue-800 dark:text-blue-600 px-2 hover:underline"
        >
          {t("home")}
        </Link>
        &gt; <span className="cursor-pointer"> {t("products")} </span>
      </p>
      <CatagoryProducts />
      <HeaderDilter
        key={category}
        onOpen={handleOpen}
        length={products ? products.length : 0}
        onClear={() => {
          resetAll();
        }}
        openfilter={openFilter}
        closeFilter={() => {
          setopenFilter(!openFilter);
        }}
      />
      <div className="flex items-center duration-300 dark:text-white dark:border-gray-500 transition-all animate-in  overflow-x-auto sm:overflow-hidden flex-nowrap sm:flex-wrap text-12 justify-start gap-3 w-full ">
        <Filtered type="price" item={filterProduacts.price} />
        <Filtered type="discount" item={filterProduacts.discount} />
        <Filtered type="color" item={filterProduacts.color} />
        <Filtered type="brand" item={filterProduacts.brand} />
      </div>
      {
        <div className="grid  grid-cols-4 gap-2">
          <div className="hidden  md:block">
            <FilterItem key={category} onOpen={handleOpen} type="page" />
          </div>
          {load ? (
            <div className="flex w-full items-center justify-between px-3">
              <Loader />
              <Loader />
            </div>
          ) : products && products.length > 0 ? (
            <motion.div
              className="sm:col-span-3 col-span-4 grid grid-cols-2 sm:flex md:flex-wrap gap-3 sm:gap-3 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {products.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewProducts
                    favoriteId={favoriteId}
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
                      queryClient.setQueryData(["products"], (oldData: any) =>
                        oldData?.products.map((itemp) =>
                          itemp.id === item.id
                            ? {
                                ...itemp,
                                numberFavorite: itemp.numberFavorite + 1,
                              }
                            : itemp
                        )
                      );
                      queryClient.setQueryData(
                        ["favoriteId"],
                        (oldData: any) => {
                          return [...oldData.favoriteId, item.id];
                        }
                      );
                    }}
                    // favoriteId: [...oldData.favoriteId, item.id],
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
                      queryClient.setQueryData(["products"], (oldData: any) =>
                        oldData.products.filter((itemp) =>
                          itemp.id !== item.id
                            ? itemp
                            : {
                                ...itemp,
                                numberFavorite: itemp.numberFavorite - 1,
                              }
                        )
                      );
                      queryClient.setQueryData(
                        ["favoriteId"],
                        (oldData: any) => {
                          return oldData.favoriteId.filter(
                            (prev) => prev !== item.id
                          );
                        }
                      );
                      // favoriteId: oldData.favoriteId.filter(
                      //   (prev) => prev !== item.id // Remove the product if it exists
                      // ),
                    }}
                    itemDb={item}
                    title="category"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <h2 className="font-bold flex items-center justify-center col-span-3 text-30 text-center w-full ">
              {t("noProductsAvailable")}
            </h2>
          )}
        </div>
      }
      <br />
    </motion.div>
  );
};

export default MyComponent;
