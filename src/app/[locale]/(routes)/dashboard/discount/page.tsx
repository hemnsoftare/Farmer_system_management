"use client";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React from "react";

import useFilterProducts from "@/lib/store/filterProducts";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
const Page = () => {
  const { setCategory: setcategory, category, resetAll } = useFilterProducts();
  const {
    data: prodcts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsDiscount" + category],
    queryFn: async () => {
      const pro = await getProductsBYDiscountAndCategoryAndSale({
        category: category,
        col: "discount",
      });
      return pro;
    },
  });

  return (
    <div className="flex items-start gap-8 px-4 justify-start w-full flex-col">
      <h1 className="text-30 flex items-center w-full justify-between font-bold mt-8">
        Products Discount
      </h1>
      <div className="w-full flex-wrap flex items-center justify-between">
        <CatagoryProducts />
      </div>
      <div className=" w-full py-5 flex flex-wrap items-center justify-center gap-3 ">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isError ? (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <p className="text-red-500">
              Error: {error?.message || "Something went wrong"}
            </p>
          </div>
        ) : prodcts && prodcts.length > 0 ? (
          prodcts.map((item) => (
            <NewProducts key={item.name} itemDb={item} title="dashboard" />
          ))
        ) : (
          <h1>No Products</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
