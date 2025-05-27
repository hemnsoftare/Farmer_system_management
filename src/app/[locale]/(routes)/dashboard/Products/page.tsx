"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/[locale]/ClientProviders";
import { motion } from "framer-motion";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import useFilterProducts, {
  deleteProduct,
  getProductsFromFirebase,
} from "@/lib/store/filterProducts";
import {
  MdOutlineInventory2,
  MdOutlineLock,
  MdOutlineFactory,
  MdOutlineInventory,
} from "react-icons/md";
import { FiSearch, FiPlus } from "react-icons/fi";
import { BsFilterLeft } from "react-icons/bs";

// Import your utility functions from the separate fi

// Import types
import type { ProductFormInput } from "@/lib/action";

// Define the ProductTab type
type ProductTab = "in-stock" | "out-stock" | "private" | "manufacturer";

// Props for TabButton component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}

// Tab Button Component - moved inside the page file to avoid export issues
const TabButton: React.FC<TabButtonProps> = ({
  active,
  onClick,
  icon,
  label,
  count,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm flex-1 justify-center transition-all ${
      active
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
  >
    {icon}
    <span>{label}</span>
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full ${
        active
          ? "bg-blue-700 text-blue-100"
          : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
      }`}
    >
      {count}
    </span>
  </button>
);

// Page component - this is the only export from this file
export default function ProductsPage() {
  const { category } = useFilterProducts();
  const [activeTab, setActiveTab] = useState<ProductTab>("in-stock");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Main products query
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const products = await getProductsFromFirebase({
        category: category,
        sortBy: "date",
        isPrivate: false,
      });
      return { products, allProducts: products };
    },
  });

  // Private products query
  const { data: privateProductsData, isLoading: privateProductsLoading } =
    useQuery({
      queryKey: ["privateProducts", category],
      queryFn: async () => {
        const products = await getProductsFromFirebase({
          category: category,
          sortBy: "date",
          isPrivate: true,
        });
        return { products, allProducts: products };
      },
      enabled: activeTab === "private", // Only fetch when the private tab is active
    });

  // Manufacturer products query
  const {
    data: manufacturerProductsData,
    isLoading: manufacturerProductsLoading,
  } = useQuery({
    queryKey: ["manufacturerProducts", category],
    queryFn: async () => {
      const products = await getProductsFromFirebase({
        category: category,
        sortBy: "date",
        isPrivate: false,
        isev: true,
      });
      return { products, allProducts: products };
    },
    enabled: activeTab === "manufacturer",
  });

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    // Client-side search filtering for regular products
    queryClient.setQueryData(["products", category], (oldData: any) => {
      if (!oldData || !oldData.allProducts) return oldData;
      return {
        products: !query
          ? oldData.allProducts
          : oldData.allProducts.filter((item: ProductFormInput) =>
              item.name.toLowerCase().includes(query)
            ),
        allProducts: oldData.allProducts,
      };
    });

    // Client-side search filtering for private products
    queryClient.setQueryData(["privateProducts", category], (oldData: any) => {
      if (!oldData || !oldData.allProducts) return oldData;
      return {
        products: !query
          ? oldData.allProducts
          : oldData.allProducts.filter((item: ProductFormInput) =>
              item.name.toLowerCase().includes(query)
            ),
        allProducts: oldData.allProducts,
      };
    });

    // Client-side search filtering for manufacturer products
    queryClient.setQueryData(
      ["manufacturerProducts", category],
      (oldData: any) => {
        if (!oldData || !oldData.allProducts) return oldData;
        return {
          products: !query
            ? oldData.allProducts
            : oldData.allProducts.filter((item: ProductFormInput) =>
                item.name.toLowerCase().includes(query)
              ),
          allProducts: oldData.allProducts,
        };
      }
    );
  };

  // Filter products based on active tab
  const getFilteredProducts = () => {
    if (activeTab === "private") {
      return privateProductsData?.products || [];
    }

    if (!productsData?.products) return [];

    return productsData.products.filter((item: ProductFormInput) => {
      if (activeTab === "in-stock") {
        return item.stock > 0;
      } else if (activeTab === "out-stock") {
        return item.stock === 0 || item.stock === undefined;
      } else if (activeTab === "manufacturer") {
        return item.isev === true;
      }
      return false;
    });
  };

  // Get loading state based on active tab
  const isLoading =
    activeTab === "private" ? privateProductsLoading : productsLoading;

  // Get product count for each tab
  const getTabCount = (tab: ProductTab) => {
    if (tab === "private") {
      return privateProductsData?.products?.length || 0;
    }

    if (tab === "manufacturer") {
      return manufacturerProductsData?.products?.length || 0;
    }

    if (!productsData?.products) return 0;

    // For in-stock and out-stock tabs
    return productsData.products.filter((item: ProductFormInput) => {
      if (tab === "in-stock") {
        return item.stock > 0;
      } else if (tab === "out-stock") {
        return item.stock === 0 || item.stock === undefined;
      }
      return false;
    }).length;
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId: string, isPrivate = false) => {
    try {
      await deleteProduct(productId, isPrivate);
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["privateProducts"] });
      queryClient.invalidateQueries({ queryKey: ["manufacturerProducts"] });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Inventory Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your product inventory, stock levels and listings
            </p>
          </div>

          <div className="flex gap-3 self-end sm:self-auto">
            <Link href="/dashboard/category">
              <button className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <span>Categories</span>
              </button>
            </Link>
            <Link href="/dashboard/AddItem">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-all">
                <FiPlus className="size-4" />
                <span>Add Product</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="size-4 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products by name..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <BsFilterLeft className="size-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Categories
              </h3>
              <div className="w-full flex flex-wrap items-center gap-2">
                <CatagoryProducts />
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-1 mb-6 bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm">
          <TabButton
            active={activeTab === "in-stock"}
            onClick={() => setActiveTab("in-stock")}
            icon={<MdOutlineInventory2 className="size-5" />}
            label="In Stock"
            count={getTabCount("in-stock")}
          />
          <TabButton
            active={activeTab === "out-stock"}
            onClick={() => setActiveTab("out-stock")}
            icon={<MdOutlineInventory className="size-5" />}
            label="Out of Stock"
            count={getTabCount("out-stock")}
          />
          <TabButton
            active={activeTab === "private"}
            onClick={() => setActiveTab("private")}
            icon={<MdOutlineLock className="size-5" />}
            label="Private Products"
            count={getTabCount("private")}
          />
          <TabButton
            active={activeTab === "manufacturer"}
            onClick={() => setActiveTab("manufacturer")}
            icon={<MdOutlineFactory className="size-5" />}
            label="Manufacturer"
            count={getTabCount("manufacturer")}
          />
        </div>

        {/* Products Section */}
        {isLoading ? (
          <div className="w-full py-16 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading products...
              </p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
              {activeTab === "in-stock" && (
                <MdOutlineInventory2 className="size-8 text-gray-500" />
              )}
              {activeTab === "out-stock" && (
                <MdOutlineInventory2 className="size-8 text-gray-500" />
              )}
              {activeTab === "private" && (
                <MdOutlineLock className="size-8 text-gray-500" />
              )}
              {activeTab === "manufacturer" && (
                <MdOutlineFactory className="size-8 text-gray-500" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No products found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchQuery
                ? "Try changing your search query"
                : "No products in this category"}
            </p>
            <Link href="/dashboard/AddItem">
              <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <FiPlus className="size-4" />
                <span>Create New Product</span>
              </button>
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((item: ProductFormInput) => (
              <motion.div key={item.id} variants={itemVariants}>
                <NewProducts
                  itemDb={item}
                  title="dashboard"
                  deleteProducts={() =>
                    handleDeleteProduct(item.id, activeTab === "private")
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
