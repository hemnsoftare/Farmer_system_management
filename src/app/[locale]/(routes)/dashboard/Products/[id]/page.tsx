"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
  Heart,
  ShoppingCart,
  Calendar,
  Search,
  Star,
  ArrowLeft,
} from "lucide-react";
import { selectedProduct } from "@/lib/store/filterProducts";
import { deleteProducts } from "@/lib/action/uploadimage";
import { format } from "date-fns";

const ProductReviewPage = () => {
  const { item: product, selectProduct } = selectedProduct();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
    );

    if (confirmDelete) {
      setIsDeleting(true);
      deleteProducts(product.id);
      try {
        router.push("/dashboard/Products"); // Redirect to products list
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };
  const formatOrderDate = (seconds: number) => {
    try {
      return format(new Date(seconds * 1000), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };
  const discountedPrice = product.isDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div
        className="bg-white shadow-sm border-b border-gray-50"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex gap-3">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href={`/dashboard/AddItem?id=${product.id}`}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Edit3 size={18} />
                  Edit Product
                </Link>
              </motion.div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
                {isDeleting ? "Deleting..." : "Delete"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        {/* Product Title */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent mb-4">
            {product.name}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
              {product.brand}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
              {product.category}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Main Image */}
            <div className="relative group">
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <Image
                  width={600}
                  height={600}
                  src={product.bigimageUrl}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                {product.isDiscount && (
                  <div className="absolute top-6 left-6 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                    -{product.discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.smallimageUrl.length > 0 && (
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  More Views
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <motion.div
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === product.bigimageUrl
                        ? "border-indigo-500 shadow-lg"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(product.bigimageUrl)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={product.bigimageUrl}
                      alt="Main view"
                      className="w-full h-20 object-cover"
                    />
                  </motion.div>
                  {product.smallimageUrl.map((image, index) => (
                    <motion.div
                      key={index}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === image
                          ? "border-indigo-500 shadow-lg"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(image)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Price Section */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                {product.isDiscount ? (
                  <>
                    <span className="text-4xl font-bold text-green-600">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-800">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Heart className="text-red-500" size={20} />
                  <span className="font-medium">
                    {product.numberFavorite} Favorites
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ShoppingCart className="text-green-500" size={20} />
                  <span className="font-medium">
                    {product.numberSale} Sales
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Search className="text-blue-500" size={20} />
                  <span className="font-medium">
                    {product.numSearch} Searches
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="text-purple-500" size={20} />
                  <span className="font-medium">
                    {formatOrderDate(product.date.seconds as any)}
                  </span>
                </div>
              </div>
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500" size={24} />
                  Available Colors
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg cursor-pointer"
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      />
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            {product.details.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Product Details
                </h2>
                <div className="space-y-4">
                  {product.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-indigo-500"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {detail.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {detail.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductReviewPage;
