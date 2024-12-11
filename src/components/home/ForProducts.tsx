"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import NewProducts from "./NewProducts";
import { newProdcuts } from "@/util/data";
import { ProductFormInput } from "@/type";
import { Loader } from "@/app/loader";
import { useUser } from "@clerk/nextjs";
import { getAllItemNames } from "@/lib/action/fovarit";

const ForProducts = ({
  products,
  load,
}: {
  load?: boolean;
  products?: ProductFormInput[];
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
      <div className="flex mt-4 px-3 justify-between items-center gap-4">
        <Loader />

        <Loader />
        <div className="hidden sm:flex gap-2">
          <Loader />

          <Loader />
        </div>
      </div>
    );
  console.log(favoriteId);
  return (
    <div className=" mt-3 w-full overflow-x- py-7 sm:overflow-x-hidden sm:flex  grid grid-cols-2 bg-blue-10 gap-2 md:gap-4 relative px- justify-center  items-center">
      {products &&
        products
          .slice(startProducts, startProducts + limit)
          .map((product, index) => (
            <div
              key={product.name}
              className={`${index === 4 && "hidden sm:block"}`}
            >
              <NewProducts
                favoriteId={favoriteId}
                title="single_product"
                itemDb={product}
                addFavoriteid={() => {
                  setpro((pre) =>
                    pre.map((item) =>
                      item.name !== product.name
                        ? item
                        : { ...item, numberFavorite: item.numberFavorite + 1 }
                    )
                  );
                  setfavoriteId((pre) => [...pre, product.name]);
                }}
                deleteFavoriteId={() => {
                  setpro((pre) =>
                    pre.map((item) =>
                      item.name !== product.name
                        ? item
                        : { ...item, numberFavorite: item.numberFavorite - 1 }
                    )
                  );
                  setfavoriteId(
                    (prev) =>
                      prev.includes(product.name)
                        ? prev.filter((item) => item !== product.name) // Remove the product if it exists
                        : [...prev, product.name] // Add the product if it doesn't exist
                  );
                }}
              />
            </div>
          ))}
    </div>
  );
};

export default ForProducts;
