"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FileEdit } from "lucide-react";
import { ProductFormInput } from "@/lib/action";
import { Loader } from "@/app/[locale]/loader";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { addfavorite, deleteFavorite } from "@/lib/action/fovarit";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { selectedProduct } from "@/lib/store/filterProducts";

const NewProducts = ({
  title,
  itemDb,
  load,
  favoriteId,
  addFavoriteid,
  deleteFavoriteId,
  deleteProducts,
}: {
  title?: string;
  itemDb?: ProductFormInput;
  load?: boolean;
  favoriteId?: string[];
  addFavoriteid?: () => void;
  deleteFavoriteId?: () => void;
  deleteProducts?: () => void;
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const router = useRouter().push;
  const product: ProductFormInput | undefined = itemDb;
  const { user } = useUser();
  const { selectProduct } = selectedProduct();

  if (load) return <Loader />;

  // Check if stock is low (less than 10)
  const isLowStock = product?.stock && product.stock < 10;

  if (product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => {
          selectProduct(product);
          router(
            title === "dashboard"
              ? "/dashboard/Products/id"
              : `/products/${product.category}/${product.id}`
          );
        }}
        key={product.name}
        className={`${
          title === "sale"
            ? "bg-white border dark:bg-neutral-900/90 h-full min-w-[190px]"
            : "bg-white dark:bg-neutral-800/40 backdrop-blur-sm sm:h-fit border h-full lg:min-w-[230px] lg:max-w-[230px] sm:w-full max-w-[250px]"
        } flex sm:gap-3 border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl dark:shadow-secondary-600/20 overflow-hidden flex-col group relative items-center justify-center hover:border-primary/30 dark:hover:border-secondary/50 duration-300 transition-all rounded-xl sm:p-2`}
      >
        {/* Favorite Icon with improved styling */}
        {user && user?.id && title !== "dashboard" && (
          <>
            {favoriteId && favoriteId.some((item) => item === itemDb.id) ? (
              <button
                onClick={(e) => {
                  handleFavoriteClick(e);
                  deleteFavorite(
                    user?.id,
                    itemDb.numberFavorite,
                    itemDb.id
                  ).finally(() => {});
                  deleteFavoriteId();
                }}
                className="absolute top-2 right-2 z-10 size-10 flex items-center justify-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110"
              >
                <FaHeart className="size-5 text-rose-500 hover:text-rose-600 transition-colors" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  handleFavoriteClick(e);
                  addfavorite({
                    id: user.id,
                    item: {
                      name: itemDb.name,
                      categroy: itemDb.category,
                      price: itemDb.price,
                      colors: itemDb.colors,
                      id: itemDb.id,
                      image: itemDb.bigimageUrl,
                      numberFavorite: itemDb.numberFavorite,
                    },
                  });
                  addFavoriteid();
                }}
                className="absolute top-2 right-2 z-10 size-10 flex items-center justify-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <FaRegHeart className="size-5 text-rose-500 hover:text-rose-600 transition-colors" />
              </button>
            )}
          </>
        )}

        {/* Stock Warning Badge with improved styling */}
        {title === "dashboard" && isLowStock && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-red-100 dark:bg-red-900/70 text-red-600 dark:text-red-200 px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm">
            <IoMdWarning className="text-red-600 dark:text-red-300 size-4" />
            <span className="text-xs font-semibold">
              Stock: {product.stock}sdfa
            </span>
          </div>
        )}

        {/* Main Image Container with improved styling */}
        <div className="relative w-full overflow-hidden rounded-lg group-hover:rounded-xl transition-all duration-300">
          <div className="w-full aspect-[4/3] relative">
            <Image
              src={product?.bigimageUrl}
              alt={product.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out rounded-lg"
            />

            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Discount Badge with improved styling */}
            {product.isDiscount && product.discount && product.discount > 0 && (
              <div className="absolute top-2 left-2 z-10 flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
                <span className="text-xs font-bold">-{product?.discount}%</span>
              </div>
            )}
          </div>

          {/* Color Options with improved styling */}
          {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-2 right-2 flex flex-row gap-1.5 z-10">
              {product.colors.slice(0, 3).map((color: any, index: number) => (
                <span
                  key={color.name || index}
                  className="size-4 rounded-full ring-1 ring-white dark:ring-neutral-700 shadow-md transform group-hover:translate-y-0 translate-y-10 transition-transform duration-300 delay-100"
                  style={{
                    backgroundColor: color.color,
                    transitionDelay: `${index * 50}ms`,
                  }}
                ></span>
              ))}
              {product.colors.length > 3 && (
                <span className="size-4 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-full ring-1 ring-white dark:ring-neutral-700 shadow-md text-xs font-medium transform group-hover:translate-y-0 translate-y-10 transition-transform duration-300 delay-300">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Details Container with improved styling */}
        <div className="flex flex-col gap-2 w-full p-3 pt-2">
          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
            {product.name}
          </h3>

          {/* Stock Indicator for Dashboard */}
          {title === "dashboard" && product.stock !== undefined && (
            <div
              className={`inline-flex items-center gap-1.5 ${
                isLowStock
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                  : "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
              } py-1 px-2 rounded-md w-fit`}
            >
              <span className="size-2 rounded-full bg-current"></span>
              <span className="text-xs font-medium">
                Stock: {product.stock}
              </span>
            </div>
          )}

          {/* Price Section with improved styling */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                ${product.price}
              </span>

              {product.isDiscount && product.discount && (
                <span className="line-through text-xs text-neutral-500 dark:text-neutral-400">
                  $
                  {(
                    product.price +
                    (product.price * product.discount) / 100
                  ).toFixed(2)}
                </span>
              )}
            </div>

            {/* Dashboard Actions */}
            {/* {title === "dashboard" && (
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/AddItem?id=${product.id}`}
                  className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileEdit className="size-4 text-blue-600 dark:text-blue-400" />
                </Link>

                <button
                  onClick={(e) => {
                    handleFavoriteClick(e);
                    deleteProducts && deleteProducts();
                  }}
                  className="p-1.5 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors"
                >
                  <RiDeleteBin6Line className="size-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            )} */}
          </div>

          {/* Add to Cart Button with improved styling */}
          {title !== "dashboard" && (
            <div className="mt-2 w-full transition-all duration-300">
              <Link
                href={`/products/${product.category}/${product.id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg"
              >
                <MdOutlineShoppingCart className="size-4" />
                <span>Add to Cart</span>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default NewProducts;
