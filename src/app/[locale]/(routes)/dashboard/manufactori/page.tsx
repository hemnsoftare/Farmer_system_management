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
    <div className="w-full h-full px-4 md:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Manufacturer Details
        </h1>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Manufacturer
        </button>
      </div>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Select</th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">
                    <label htmlFor="a" className="hidden">
                      df
                    </label>

                    <input
                      onClick={() => {
                        toggleItem(product);
                      }}
                      type="checkbox"
                      id="a"
                    />
                  </td>
                  <td className="p-4">
                    <Image
                      src={product.bigimageUrl}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
