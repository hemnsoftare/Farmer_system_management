"use client";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React from "react";

import { Loader } from "@/app/[locale]/loader";
import { useTranslations } from "next-intl";
import ForProducts from "@/components/home/ForProducts";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
import useFilterProducts from "@/lib/store/filterProducts";

const Page = () => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const { category } = useFilterProducts();
  const t = useTranslations("viewAll");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const getProducts = await getProductsBYDiscountAndCategoryAndSale({
        category: category,
        col: type ? type : "date",
      });
      return getProducts;
    },
  });

  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className="self-start px-3 dark:text-gray-600 text-26 sm:text-30 my-3 font-semibold">
        {t("last")} {products.length < 30 ? products.length : "30"}{" "}
        {t(
          type === "New"
            ? "last7NewProducts"
            : type === "discount"
              ? "last4DiscountProducts"
              : "last7NumberSaleProducts"
        )}
      </h1>

      <CatagoryProducts />

      {!category && products.length > 0 ? (
        <div className="w-full">
          <ForProducts load={isLoading} products={products} title="viewAll" />
        </div>
      ) : isLoading ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <h1 className="text-30 font-black my-[200px]">{t("message")}</h1>
      )}
    </div>
  );
};

export default Page;
