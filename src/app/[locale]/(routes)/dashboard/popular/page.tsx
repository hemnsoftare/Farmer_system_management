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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50/90 to-white">
      {/* Header Section */}
      <div className="flex flex-col items-center py-8 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Popular Products
        </h1>
        <p className="text-gray-600 text-center max-w-2xl">
          Discover trending products sorted by popularity, sales, and customer
          favorites
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 px-6 mb-8">
        {iconArray.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelect(item)}
            className={`flex flex-col items-center justify-center gap-1 px-6 py-2 min-w-[140px] rounded-xl 
              transition-all duration-300 transform hover:scale-105 active:scale-95
              ${
                select.name === item.name
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-300/50 border-2 border-orange-400"
                  : "bg-white text-gray-700 shadow-md border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg"
              }`}
          >
            <item.icon
              size={24}
              className={`${
                select.name === item.name ? "text-white" : "text-gray-600"
              } transition-colors duration-300`}
            />
            <span className="font-medium text-sm">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center px-6 mb-8">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl 
              focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100
              transition-all duration-300 bg-white shadow-sm"
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 px-6 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
              <p className="text-lg text-gray-600 font-medium">
                Loading products...
              </p>
            </div>
          </div>
        ) : data?.products.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {data.products.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <NewProducts itemDb={item} load={isLoading} title="dashboard" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                <FaSearch className="text-3xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700">
                No products found
              </h2>
              <p className="text-gray-500 max-w-md">
                Try adjusting your search criteria or browse different
                categories
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
