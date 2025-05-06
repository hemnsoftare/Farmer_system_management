"use client";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { useEffect, useState } from "react";

import { Loader } from "@/app/[locale]/loader";
import { useTranslations } from "next-intl";
import ForProducts from "@/components/home/ForProducts";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
import useFilterProducts from "@/lib/store/filterProducts";

const Page = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );
  const [type, setType] = useState<"date" | "discount">(null);
  const { category, setCategory } = useFilterProducts();

  // Handle URL params in a useEffect to avoid hydration errors
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
    setCategory("");
    const rawType = params.get("type");
    if (rawType === "date" || rawType === "discount") {
      setType(rawType);
    } else {
      setType("date"); // fallback to default
    }
  }, []);

  const t = useTranslations("viewAll");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category, type],
    queryFn: async () => {
      const getProducts = await getProductsBYDiscountAndCategoryAndSale({
        category: category ? category.trim() : "",
        col: type ? type : "date",
      });
      return getProducts;
    },
    // Only run the query when searchParams is available
    enabled: !!searchParams,
  });

  if (error) return <h1>{(error as Error).message}</h1>;
  if (!isLoading) {
    console.log(products);
  }
  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className="self-start px-3 dark:text-gray-600 text-26 sm:text-30 my-3 font-semibold">
        {t("last")} {products && products.length < 30 ? products.length : "30"}{" "}
        {t(
          type === "date"
            ? "last7NewProducts"
            : type === "discount"
              ? "last4DiscountProducts"
              : "last7NumberSaleProducts"
        )}
      </h1>

      <CatagoryProducts />

      {!isLoading && products?.length > 0 ? (
        <div className="w-full">
          <ForProducts
            key={products[0].id || ""}
            load={isLoading}
            products={products}
            title="viewAll"
          />
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
