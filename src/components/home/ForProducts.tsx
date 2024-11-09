"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import NewProducts from "./NewProducts";
import { newProdcuts } from "@/util/data";
import { ProductFormInput } from "@/type";
import { Loader } from "@/app/loader";

const ForProducts = ({
  products,
  load,
}: {
  load?: boolean;
  products?: ProductFormInput[];
}) => {
  const [startProducts, setStartProducts] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setLimit(4);
      } else {
        setLimit(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxProducts = products ? products.length : newProdcuts.length;

  const handleNext = () => {
    if (startProducts + limit < maxProducts) {
      setStartProducts((prev) => Math.min(prev + 1, maxProducts - limit));
    }
  };

  const handlePrev = () => {
    if (startProducts > 0) {
      setStartProducts((prev) => Math.max(prev - 1, 0));
    }
  };
  if (load)
    return (
      <div className="flex mt-4 justify-between items-center gap-4">
        <Loader />

        <Loader />

        <Loader />

        <Loader />
      </div>
    );
  return (
    <div className="grid mt-3 w-full lg:grid-cols-5 md:grid-cols-4 grid-rows-1 bg-blue-10 gap-3 relative px-2 justify-between items-center">
      {products &&
        products
          .slice(startProducts, startProducts + limit)
          .map((product) => (
            <NewProducts
              key={product.price}
              title="single_product"
              itemDb={product}
            />
          ))}
    </div>
  );
};

export default ForProducts;
