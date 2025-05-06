"use client";
import { ProductFormInput } from "@/lib/action";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { selectedProduct } from "@/lib/store/filterProducts";
import { deleteProducts } from "@/lib/action/uploadimage";

const ProductReviewPage = ({ params }: { params: any }) => {
  const { item: product } = selectedProduct();
  console.log(product);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-6 bg-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="flex items-center justify-between px-8 ">
        <motion.h1
          className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800"
          variants={itemVariants}
        >
          {product.name}
        </motion.h1>
        <div className="flex gap-4">
          {" "}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={() => (window.location.href = `/dashboard/manufactori`)}
          >
            Manufacturing
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() =>
              (window.location.href = `/dashboard/AddItem?id=${product.id}`)
            }
          >
            Edit
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this product?")
              ) {
                deleteProducts(product.id);
                window.location.href = "/dashboard/Products";
              }
            }}
          >
            Delete
          </motion.button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Image */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="w-full max-w-sm">
            <Image
              width={400}
              height={300}
              src={product.bigimageUrl}
              alt={product.name}
              className="w-full h-64 rounded-md shadow-lg object-cover"
            />
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="bg-white p-4 rounded-md shadow-sm"
          variants={itemVariants}
        >
          <div className="space-y-2 text-sm md:text-base text-gray-700">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Initail Price:</strong> ${product.iniPrice}
            </p>
            <p>
              <strong>In Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            {product.isDiscount && (
              <p className="text-red-500">
                <strong>Discount:</strong> {product.discount}%
              </p>
            )}
            <p>
              <strong>Favorites:</strong> {product.numberFavorite}
            </p>
            <p>
              <strong>Sales:</strong> {product.numberSale}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(product.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Search Count:</strong> {product.numSearch}
            </p>
          </div>

          {/* Colors */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Colors</h2>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <motion.div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                  whileHover={{ scale: 1.1 }}
                ></motion.div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Details
            </h2>
            <div className="space-y-2">
              {product.details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="p-2 bg-gray-100 rounded text-sm"
                  variants={itemVariants}
                >
                  <h3 className="font-medium">{detail.title}</h3>
                  <p>{detail.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Small Images */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Gallery
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.smallimageUrl.map((img, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <Image
                    width={80}
                    height={80}
                    src={img}
                    alt={`Small image ${index}`}
                    className="w-20 h-20 object-cover rounded shadow"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductReviewPage;
