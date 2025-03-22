"use client";
import { queryClient } from "@/app/[locale]/ClientProviders";
import NewProducts from "@/components/home/NewProducts";
import { db } from "@/config/firebaseConfig";
import { ProductFormInput } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { FaHeart, FaSearch, FaTag } from "react-icons/fa";

const iconArray = [
  { name: "Search", icon: FaSearch, order: "numSearch" },
  { name: "Sale", icon: FaTag, order: "numberSale" },
  { name: "Favorite", icon: FaHeart, order: "numberFavorite" },
];

const Page = () => {
  const [select, setSelect] = useState({ name: "Search", order: "numSearch" });

  // Fetch products based on selected category
  const { data, isLoading } = useQuery({
    queryKey: ["popularProducts", select],
    queryFn: async () => {
      const productQuery = query(
        collection(db, "Products"),
        orderBy(select.order, "desc")
      );
      const qSnapShot = await getDocs(productQuery);
      const products = qSnapShot.docs.map((doc) => ({
        ...(doc.data() as ProductFormInput),
        id: doc.id,
      }));

      return { products, allProducts: products };
    },
  });

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.trim().toLowerCase();

    queryClient.setQueryData(
      ["popularProducts", select],
      (oldData: {
        products: ProductFormInput[];
        allProducts: ProductFormInput[];
      }) => {
        if (!oldData || !oldData.products || !searchQuery) {
          return {
            products: oldData.allProducts,
            allProducts: oldData.allProducts,
          };
        }

        return {
          products: oldData.allProducts.filter((item) =>
            item.name.toLowerCase().includes(searchQuery)
          ),
          allProducts: oldData.allProducts,
        };
      }
    );
  };

  return (
    <div className="flex flex-col py-7 px-4 mt-8">
      <h1 className="text-30 font-semibold">Popular Products</h1>

      {/* Filter Buttons */}
      <div className="flex items-center mt-7 justify-center gap-3">
        {iconArray.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelect(item)}
            className={`flex flex-col px-6 items-center justify-center gap-2 border py-2 w-[150px] rounded-lg shadow-lg 
              transition-all duration-300
              ${select.name === item.name ? "bg-orange-50 border-orange-500 shadow-orange-300" : "bg-white border-transparent shadow-slate-200"}
              hover:shadow-orange-200`}
          >
            <item.icon color={select.name === item.name ? "#f45e0c" : "#000"} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="search"
        placeholder="Search products..."
        className="w-full max-w-md self-center outline-none border-2 border-secondary my-6 p-2  rounded-lg"
        onChange={handleSearch}
      />

      {/* Product List */}
      <div className="md:flex grid grid-cols-2 items-center my-9 flex-wrap justify-center gap-4">
        {isLoading ? (
          <p className="text-lg text-gray-500 text-center">
            Loading products...
          </p>
        ) : data?.products.length > 0 ? (
          data.products.map((item) => (
            <NewProducts
              itemDb={item}
              key={item.id}
              load={isLoading}
              title="dashboard"
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-96">
            <h1 className="text-2xl text-gray-400">No products found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
