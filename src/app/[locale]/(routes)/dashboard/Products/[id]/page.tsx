"use client";
import { app } from "@/config/firebaseConfig";
import { ProductFormInput } from "@/lib/action";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProductReviewPage = ({ params }: { params: any }) => {
  const [product, setProduct] = useState<ProductFormInput | null>(null);
  const db = getFirestore(app);

  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        const getdata = await getDoc(doc(db, "Products", params.id));
        const data = getdata.data();
        setProduct(data as ProductFormInput);
      };

      fetchProduct();
    }
  }, [params.id, db]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="container mx-auto p-4 bg-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Product Name */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-gray-800"
        variants={itemVariants}
      >
        {product.name}
      </motion.h1>

      <div className="grid grid-cols-1 bg-gray-100 md:grid-cols-2 gap-8">
        {/* Main Image */}
        <motion.div variants={itemVariants}>
          <Image
            width={300}
            height={400}
            src={product.bigimageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>
          {product.isDiscount && (
            <p className="text-red-500 text-lg mb-3">
              <span className="font-semibold">Discount:</span>{" "}
              {product.discount}%
            </p>
          )}
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Favorites:</span>{" "}
            {product.numberFavorite}
          </p>
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Sales:</span> {product.numberSale}
          </p>
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(product.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Search Count:</span>{" "}
            {product.numSearch}
          </p>

          {/* Colors */}
          <div className="mb-6 flex gap-3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Colors
            </h2>
            <div className="flex space-x-3">
              {product.colors.map((color, index) => (
                <motion.div
                  key={index}
                  className="w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                  whileHover={{ scale: 1.1 }}
                ></motion.div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Details
            </h2>
            {product.details.map((detail, index) => (
              <motion.div
                key={index}
                className="mb-4 p-4 bg-gray-100 rounded-lg"
                variants={itemVariants}
              >
                <h3 className="font-medium text-lg text-gray-700">
                  {detail.title}
                </h3>
                <p className="text-gray-600">{detail.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Small Images */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Gallery
            </h2>
            <div className="w-full flex-wrap flex gap-4">
              {product.smallimageUrl.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    width={100}
                    height={100}
                    src={image}
                    alt={`${product.name} small image ${index}`}
                    className="object-cover w-full h-full"
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
