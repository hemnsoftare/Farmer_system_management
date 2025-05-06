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
  const [activeTab, setActiveTab] = useState<"in-stock" | "out-stock">(
    "in-stock"
  );

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    queryClient.setQueryData(["products", category], (oldData: any) => {
      if (!oldData || !oldData.allProducts || !searchQuery)
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
    });
  };

  return (
    <div className="flex flex-col md:px-12 w-full px-4 py-6 gap-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/category">
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-all">
              Add Category
            </button>
          </Link>
          <Link href="/dashboard/AddItem">
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-all">
              Create Product
            </button>
          </Link>
        </div>
      </div>

      {/* Category Selector */}
      <div className="w-full flex flex-wrap items-center justify-start">
        <CatagoryProducts />
      </div>

      {/* Search Input */}
      <div className="w-full flex justify-center mt-4">
        <input
          type="search"
          placeholder="Search products..."
          onChange={handleSearch}
          className="w-full max-w-md border-2 focus-within:border-cyan-700 border-cyan-400 rounded-lg p-2 focus:outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-4 justify-center">
        <button
          onClick={() => setActiveTab("in-stock")}
          className={`px-4 py-2 rounded-full font-medium ${
            activeTab === "in-stock"
              ? "bg-cyan-700 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          In Stock
        </button>
        <button
          onClick={() => setActiveTab("out-stock")}
          className={`px-4 py-2 rounded-full font-medium ${
            activeTab === "out-stock"
              ? "bg-cyan-700 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Out of Stock
        </button>
      </div>

      {/* Products Section */}
      {isLoading ? (
        <p className="text-center text-lg text-gray-500 mt-8">
          Loading products...
        </p>
      ) : !data.prodcts?.length ? (
        <p className="text-center text-lg text-gray-500 mt-8">
          No products available
        </p>
      ) : (
        <div className="flex items-center justify-center py-6 flex-wrap gap-6 w-full">
          {data.prodcts
            .filter((item) =>
              activeTab === "in-stock"
                ? item.stock > 0
                : item.stock === 0 || item.stock === undefined
            )
            .map((item) => (
              <NewProducts key={item.id} itemDb={item} title="dashboard" />
            ))}
        </div>
      )}
    </div>
  );
};

export default Page;
