"use client";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import { deleteProducts } from "@/lib/action/uploadimage";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsBYDiscountAndCategoryAndSale } from "@/lib/action/dashboard";
import { queryClient } from "@/app/[locale]/ClientProviders";
import { ProductFormInput } from "@/lib/action";
import useFilterProducts from "@/lib/store/filterProducts";

const Page = () => {
  const { category } = useFilterProducts();

  const { data, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const getProdcuts = await getProductsBYDiscountAndCategoryAndSale({
        category: category,
        col: "date",
      });
      return { prodcts: getProdcuts, allProducts: getProdcuts };
    },
  });

  return (
    <div className="flex items-start gap-8 px-2 mt-3 justify-start w-full flex-col">
      <h1 className="sm:text-30 text-20 flex items-center w-full justify-between font-bold mt-8">
        <span>Products</span>
        <div className="flex items-center gap-2 justify-center">
          <Link href={"/dashboard/category"}>
            <button className="rounded-lg text-12 sm:text-18 bg-black text-white px-2 sm:px-6 py-2 hover:bg-slate-800 duration-300 transition-all">
              Add Category
            </button>
          </Link>
          <Link href={"/dashboard/AddItem"}>
            <button className="rounded-lg text-12 sm:text-18 bg-black text-white px-2 sm:px-6 py-2 hover:bg-slate-800 duration-300 transition-all">
              Create Product
            </button>
          </Link>
        </div>
      </h1>

      <div className="w-full flex-wrap flex items-center justify-center gap-3">
        <CatagoryProducts />
      </div>

      <input
        type="search"
        placeholder="Search products..."
        className="w-full self-center outline-none border-2 border-cyan-700 max-w-md p-2 mt-4 rounded-lg focus:outline-none focus:ring-0"
        onChange={(e) => {
          const searchQuery = e.target.value.trim().toLowerCase();
          queryClient.setQueryData(
            ["products", category],
            (oldData: {
              prodcts: ProductFormInput[];
              allProducts: ProductFormInput[];
            }) => {
              if (!oldData || !oldData.prodcts || !searchQuery)
                return {
                  prodcts: oldData.allProducts,
                  allProducts: oldData.allProducts,
                };
              return {
                prodcts: oldData.allProducts.filter((item: ProductFormInput) =>
                  item.name.toLowerCase().includes(searchQuery)
                ),
                allProducts: oldData.allProducts,
              };
            }
          );
        }}
      />

      {isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading products...</p>
      ) : !data?.prodcts?.length ? (
        <p className="text-center text-lg text-gray-500">
          No products available
        </p>
      ) : (
        <div className="md:flex grid grid-cols-2 flex-wrap gap-4 justify-center items-center w-full">
          {data.prodcts.map((item) => (
            <NewProducts
              deleteProducts={() => {
                deleteProducts(item.id);
                queryClient.setQueryData(
                  ["products", category],
                  (oldData: any) => ({
                    prodcts: oldData?.prodcts?.filter(
                      (i) => i.name !== item.name
                    ),
                  })
                );
              }}
              key={item.name}
              itemDb={item}
              title="dashboard"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
