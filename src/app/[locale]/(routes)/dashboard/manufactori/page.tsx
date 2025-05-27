"use client";
import { getAllProducts } from "@/lib/action/dashboard";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { selectedProductsManufacturer } from "@/lib/store/Manufacturer";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  const { toggleItem, items, clearItems } = selectedProductsManufacturer();
  const { data: products, isLoading } = useQuery({
    queryKey: ["getproducts"],
    queryFn: () => {
      clearItems();
      return getAllProducts();
    },
  });
  const router = useRouter();

  const handleSubmit = () => {
    if (items.length <= 0) {
      toast({
        title: "Please select at least one product",
        variant: "destructive",
        style: { backgroundColor: "white" },
      });
      return;
    }
    toast({
      title: "Products selected successfully",
      description: `${items.length} products selected`,
    });
    window.location.href = "/dashboard/manufactori/manufactorProduct";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Manufacturer Products
              </h1>
              <p className="text-slate-600 mt-1">
                Select products to add to your manufacturing catalog
              </p>
              {items.length > 0 && (
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  {items.length} product{items.length !== 1 ? "s" : ""} selected
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">Add to Manufacturing</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-blue-50">
                  <tr>
                    <th className="text-left p-6 font-semibold text-slate-700 border-b border-slate-200">
                      Select
                    </th>
                    <th className="text-left p-6 font-semibold text-slate-700 border-b border-slate-200">
                      Product
                    </th>
                    <th className="text-left p-6 font-semibold text-slate-700 border-b border-slate-200">
                      Details
                    </th>
                    <th className="text-left p-6 font-semibold text-slate-700 border-b border-slate-200">
                      Price
                    </th>
                    <th className="text-left p-6 font-semibold text-slate-700 border-b border-slate-200">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product: any, index: number) => (
                    <tr
                      key={product.id}
                      className={`border-b border-slate-100 hover:bg-blue-50/50 transition-colors duration-200 ${
                        items.some((item) => item.id === product.id)
                          ? "bg-blue-50/70"
                          : ""
                      }`}
                    >
                      <td className="p-6">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            onClick={() => toggleItem(product)}
                            type="checkbox"
                            checked={items.some(
                              (item) => item.id === product.id
                            )}
                            className="sr-only peer"
                            readOnly
                          />
                          <div className="w-6 h-6 bg-white border-2 border-slate-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                            {items.some((item) => item.id === product.id) && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </label>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Image
                              src={product.bigimageUrl}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="rounded-xl object-cover shadow-md border border-slate-200"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 text-lg">
                              {product.name}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {product.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              product.stock > 50
                                ? "bg-green-400"
                                : product.stock > 20
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                            }`}
                          ></div>
                          <span className="font-medium text-slate-700">
                            {product.stock} units
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
              {products?.map((product: any) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl border-2 transition-all duration-200 ${
                    items.some((item) => item.id === product.id)
                      ? "border-blue-300 shadow-lg"
                      : "border-slate-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input
                          onClick={() => toggleItem(product)}
                          type="checkbox"
                          checked={items.some((item) => item.id === product.id)}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="w-6 h-6 bg-white border-2 border-slate-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                          {items.some((item) => item.id === product.id) && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </label>

                      <Image
                        src={product.bigimageUrl}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover shadow-md border border-slate-200"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 text-lg truncate">
                          {product.name}
                        </h3>
                        <div className="mt-2 space-y-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {product.category}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-green-600">
                              ${product.price}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  product.stock > 50
                                    ? "bg-green-400"
                                    : product.stock > 20
                                      ? "bg-yellow-400"
                                      : "bg-red-400"
                                }`}
                              ></div>
                              <span className="text-sm font-medium text-slate-600">
                                {product.stock} units
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {products && products.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No Products Available
              </h3>
              <p className="text-slate-600">
                There are currently no products to display.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
