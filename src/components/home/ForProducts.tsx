"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import NewProducts from "./NewProducts";
import { newProdcuts } from "@/util/data";
import { ProductFormInput } from "@/lib/action";
import { Loader } from "@/app/[locale]/loader";
import { useUser } from "@clerk/nextjs";
import { getAllItemNames } from "@/lib/action/fovarit";
import { motion } from "framer-motion";
const ForProducts = ({
  products,
  load,
  title,
}: {
  load?: boolean;
  products?: ProductFormInput[];
  title?: "dashboard" | "viewAll";
}) => {
  const [startProducts, setStartProducts] = useState(0);
  const [pro, setpro] = useState(products);
  const [limit, setLimit] = useState(5);
  const [favoriteId, setfavoriteId] = useState<string[]>();
  const { user } = useUser();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1300) {
        setLimit(4);
      } else {
        setLimit(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const getdata = async () => {
      const data = await getAllItemNames(user?.id);
      setfavoriteId(data as string[]);
    };
    getdata();
  }, [user]);
  const maxProducts = products ? products.length : newProdcuts.length;
  console.log("favorete", favoriteId);
  if (load)
    return (
      <div className="flex mt-4 px-3 py-8  justify-center w-full items-center gap-4">
        <Loader />

        <Loader />
        <div className="hidden sm:flex w-full items-center justify-center gap-2">
          <Loader />

          <Loader />
        </div>
      </div>
    );
  return (
    <motion.div className=" mt-3 w-full md:flex-wrap  overflow-hidden sm:flex  grid grid-cols-2 bg-blue-10 gap-2 md:gap-6 relative px- justify-center  items-center">
      {products &&
        products
          .slice(
            !title ? startProducts : 0,
            !title ? startProducts + limit : products.length
          )
          .map((product, index) => (
            <motion.div
              initial={{
                y: 200,
                x: index % 2 === 0 ? -40 : 40,
                opacity: 0,
              }}
              whileInView={{ y: 0, x: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0.2 }}
              transition={{ duration: 0.6, type: "spring" }}
              key={index}
              className={`${index === 4 && "hidden sm:block"} py-2 md:py-6   `}
            >
              <NewProducts
                favoriteId={favoriteId}
                title={title ? title : "single_product"}
                itemDb={product}
                addFavoriteid={() => {
                  setpro((pre) =>
                    pre.map((item) =>
                      item.id !== product.id
                        ? item
                        : { ...item, numberFavorite: item.numberFavorite + 1 }
                    )
                  );
                  console.log(product.id);
                  setfavoriteId((pre) => [product.id, ...pre]);
                }}
                deleteFavoriteId={() => {
                  setpro((pre) =>
                    pre.map((item) =>
                      item.id !== product.id
                        ? item
                        : { ...item, numberFavorite: item.numberFavorite - 1 }
                    )
                  );
                  setfavoriteId(
                    (prev) =>
                      prev.includes(product.id)
                        ? prev.filter((item) => item !== product.id) // Remove the product if it exists
                        : [...prev, product.id] // Add the product if it doesn't exist
                  );
                }}
              />
            </motion.div>
          ))}
    </motion.div>
  );
};

export default ForProducts;
