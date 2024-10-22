"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import NewProducts from "./NewProducts";
import { newProdcuts } from "@/app/util/data";
import { ProductFormInput } from "@/type";

const ForProducts = ({ products }: { products?: ProductFormInput[] }) => {
  const [startProducts, setStartProducts] = useState(0);
  const [limt, setLimt] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setLimt(4);
      } else {
        setLimt(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="grid w-full  lg:grid-cols-5 md:grid-cols-4 grid-rows-1 bg-blue-10 gap-3 relative px-2 justify-between items-center">
      <MdNavigateNext
        className="absolute z-10 top-[50%] rounded-full hover:bg-slate-300 duration-300 w-5 h-5 -right-3"
        onClick={() =>
          setStartProducts(
            startProducts <= newProdcuts.length - 4
              ? startProducts + 1
              : startProducts
          )
        }
      />
      <IoChevronBack
        aria-disabled={newProdcuts.length <= startProducts}
        className="absolute z-10 top-[50%] rounded-full hover:bg-slate-300 duration-300 w-5 h-5 -left-3"
        onClick={() =>
          setStartProducts(startProducts === 0 ? 0 : startProducts - 1)
        }
      />
      {products &&
        products
          .slice(startProducts, limt + startProducts)
          .map((product) => (
            <NewProducts
              key={product.price}
              title="single_product"
              itemDb={product}
            />
          ))}
      {!products &&
        newProdcuts
          .slice(startProducts, limt + startProducts)
          .map((product) => (
            <NewProducts
              key={product.price}
              title="single_product"
              item={product}
            />
          ))}
    </div>
  );
};

export default ForProducts;
