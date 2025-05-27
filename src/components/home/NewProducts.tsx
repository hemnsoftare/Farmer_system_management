"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ProductFormInput, Productsprops } from "@/lib/action";
import { Loader } from "@/app/[locale]/loader";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { addfavorite, deleteFavorite } from "@/lib/action/fovarit";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FileEdit } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MdDiscount } from "react-icons/md";
import { AlertTriangle } from "lucide-react";
import DiscountDialog from "../products/discountModel";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "@/hooks/use-toast";
import { queryClient } from "@/app/[locale]/ClientProviders";

const NewProducts = ({
  title,
  itemDb,
  load,
  favoriteId,
  addFavoriteid,
  deleteFavoriteId,
  deleteProducts,
  onDiscountClick,
}: {
  title?: string;
  itemDb?: ProductFormInput;
  load?: boolean;
  favoriteId?: string[];
  addFavoriteid?: () => void;
  deleteFavoriteId?: () => void;
  deleteProducts?: () => void;
  onDiscountClick?: (product: ProductFormInput) => void;
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormInput | null>(null);

  // Add this function to handle discount updates
  const handleSaveDiscount = async (
    productId: string,
    discount: number,
    isDiscount: boolean
  ) => {
    try {
      await updateDoc(doc(db, "Products", productId), {
        discount: discount,
        isDiscount: isDiscount,
      });
      // Show success toast
      toast({
        title: "Success",
        description: "Discount updated successfully",
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "2px solid #22c55e",
        },
        duration: 3000,
      });
      queryClient.setQueryData(["productsDiscount"], (oldData: any) => {
        return oldData?.map((item: ProductFormInput) =>
          item.id === productId ? { ...item, discount, isDiscount } : item
        );
      });

      console.log("Discount updated successfully");
    } catch (error) {
      console.error("Error updating discount:", error);
      throw error; // Re-throw to be handled by the dialog
    }
  };

  // Function to open discount dialog
  const handleDiscountClick = (
    e: React.MouseEvent,
    product: ProductFormInput
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedProduct(product);
    setDiscountDialogOpen(true);
  };

  const router = useRouter();
  const pathname = usePathname();
  const product: ProductFormInput | undefined = itemDb;
  const { user } = useUser();

  if (load) return <Loader />;

  if (!product) return null;

  const isDashboard = title === "dashboard";
  const isSale = title === "sale";
  const isDiscountPage = pathname?.includes("discount");
  const isLowStock = product.stock < 10;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => {
          router.push(
            isDashboard
              ? `/dashboard/Products/${product.id}`
              : `/products/${product.category}/${product.id}`
          );
        }}
        className={`
          group relative flex flex-col 
          overflow-hidden rounded-xl border
          transition-all duration-300 hover:shadow-xl
          h-full sm:h-full max-w-[250px] lg:min-w-[230px] lg:max-w-[230px] sm:w-full
          border-neutral-200 bg-white dark:border-secondary dark:bg-neutral-900
          dark:shadow-secondary-500 dark:hover:shadow-secondary
          sm:p-3 sm:pb-4
          ${isLowStock && isDashboard ? "ring-2 ring-amber-400 border-amber-300" : ""}
        `}
      >
        {/* Dashboard Action Buttons */}
        {isDashboard && (
          <div className="absolute right-2 top-2 z-10 flex gap-1">
            {/* Discount Button */}
            <button
              onClick={(e) => handleDiscountClick(e, product)}
              className="rounded-full bg-orange-500/90 p-1.5 text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-orange-600 hover:scale-105"
              title="Manage Discount"
            >
              <MdDiscount size={16} />
            </button>

            {/* Edit Button */}
          </div>
        )}

        {/* Discount Page Action Button */}

        {/* Favorite Button - Only for non-dashboard and non-discount pages */}
        {user && user?.id && !isDashboard && !isDiscountPage && (
          <div className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition-all duration-200 dark:bg-neutral-800/80">
            {favoriteId && favoriteId.some((item) => item === product.id) ? (
              <FaHeart
                color="#f45e0c"
                size={20}
                className="transition-transform duration-200 hover:scale-110"
                onClick={(e) => {
                  handleFavoriteClick(e);
                  deleteFavorite(user?.id, product.numberFavorite, product.id);
                  deleteFavoriteId && deleteFavoriteId();
                }}
              />
            ) : (
              <FaRegHeart
                color="#f45e0c"
                size={20}
                className="transition-transform duration-200 hover:scale-110"
                onClick={(e) => {
                  handleFavoriteClick(e);
                  addfavorite({
                    id: user.id,
                    item: {
                      name: product.name,
                      categroy: product.category,
                      price: product.price,
                      colors: product.colors,
                      id: product.id,
                      image: product.bigimageUrl,
                      numberFavorite: product.numberFavorite,
                    },
                  });
                  addFavoriteid && addFavoriteid();
                }}
              />
            )}
          </div>
        )}

        {/* Low Stock Warning */}
        {isDashboard && isLowStock && (
          <div className="absolute left-2 top-2 z-[3] flex items-center gap-1 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white shadow-md">
            <AlertTriangle size={14} />
            Low Stock
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="product-image-container overflow-hidden rounded-lg">
            <Image
              src={product.bigimageUrl}
              alt={product.name}
              width={200}
              height={200}
              className={`
                w-full rounded-lg object-cover bg-neutral-50 
                transition-all duration-300 group-hover:scale-105
                ${
                  isSale
                    ? "above-405:h-[170px] min-h-[160px] max-h-[160px] sm:h-[180px]"
                    : "above-405:h-[190px] min-h-[190px] max-h-[190px] sm:h-[200px]"
                }
              `}
            />
          </div>

          {/* Discount Tag - Only for non-dashboard */}
          {!isDashboard &&
            product.isDiscount &&
            product.discount &&
            product.discount > 0 && (
              <div className="absolute left-2 top-2 z-[2] rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-medium text-white shadow-md">
                -{product.discount}%
              </div>
            )}

          {/* Color Options */}
          {product.colors && (
            <div className="absolute -right-1 top-10 hidden flex-col gap-1.5 sm:flex">
              {product.colors.slice(0, 3).map((color: any) => (
                <span
                  key={color.name}
                  className="h-4 w-4 rounded-full border border-white shadow-md"
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium shadow-md dark:bg-neutral-700">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-3 flex w-full flex-1 flex-col p-1 sm:p-0">
          <h3 className="mb-1 line-clamp-2 h-10 text-sm font-medium sm:text-base text-neutral-800 dark:text-neutral-200">
            {product.name}
          </h3>

          {/* Dashboard Stock Info */}
          {isDashboard && (
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Stock:
                <span
                  className={`ml-1 font-medium ${isLowStock ? "text-amber-600" : "text-green-600"}`}
                >
                  {product.stock}
                </span>
              </span>
            </div>
          )}

          {/* Discount Page Info */}
          {isDashboard && (
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                Discount Status:
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  product.isDiscount
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {product.isDiscount
                  ? `${product.discount}% OFF`
                  : "No Discount"}
              </span>
            </div>
          )}

          <div className="mt-auto flex w-full flex-col">
            {/* Price Section */}
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                ${product.price}
              </span>
              {!isDashboard && product.isDiscount && (
                <span className="text-xs line-through text-neutral-500 dark:text-neutral-400">
                  $
                  {product.discount &&
                    (
                      product.price +
                      product.discount * 0.01 * product.price
                    ).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Discount Dialog */}
      <DiscountDialog
        isOpen={discountDialogOpen}
        onClose={() => {
          setDiscountDialogOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSaveDiscount={handleSaveDiscount}
      />
    </>
  );
};

export default NewProducts;
