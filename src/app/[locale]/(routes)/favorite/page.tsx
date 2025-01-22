"use client";
import { Loader } from "@/app/[locale]/loader";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getfavorite } from "@/lib/action/fovarit";
import { favorite } from "@/lib/action";
import CardFavorite from "./_components/CardFavorite";
import { motion } from "framer-motion";

const Page = () => {
  const [load, setload] = useState(false);
  const [state, setstate] = useState(0);
  const [products, setproducts] = useState<favorite[]>([]);
  const [favorriteid, setfavorriteid] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getdata = async () => {
      setload(true);

      const data = await getfavorite(user.id).finally(() => {
        setload(false);
      });
      setproducts(data as favorite[]);
      setfavorriteid(data.map((item) => item.id as string));
    };
    getdata();
  }, [user]);

  useEffect(() => {
    const getdata = async () => {
      if (user?.id) {
        const data = await getfavorite(user.id).finally(() => {});
        setproducts(data as favorite[]);
      }
    };
    getdata();
  }, [state, user]);

  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      {/* Title animation */}
      <motion.h1
        className="self-start px-3 text-26 sm:text-30 my-3 font-semibold"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Favorite Products
      </motion.h1>

      {/* Products Grid animation */}
      {!load && products.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 px-2 gap-2 sm:flex sm:flex-wrap w-full items-center justify-center"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {products.map((itemorder) => (
            <motion.div
              key={itemorder.id}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <CardFavorite
                click={() => setstate((pre) => pre + 1)}
                item={itemorder}
                userId={user.id}
                addFavoriteid={() => {
                  setproducts((pre) =>
                    pre.map((item) =>
                      itemorder.id !== item.id
                        ? item
                        : { ...item, numberFavorite: item.numberFavorite + 1 }
                    )
                  );
                  setfavorriteid((pre) => [...pre, itemorder.id]);
                }}
                favoriteId={favorriteid}
                deleteFavoriteId={() => {
                  setproducts((pre) =>
                    pre.map((item) =>
                      itemorder.id !== item.id
                        ? item
                        : { ...item, numberFavorite: item.numberFavorite - 1 }
                    )
                  );
                  setfavorriteid((pre) =>
                    pre.filter((item) => item !== itemorder.id)
                  );
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : load ? (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </motion.div>
      ) : (
        <motion.h1
          className="text-30 font-black my-[200px]"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          No products found
        </motion.h1>
      )}
    </div>
  );
};

export default Page;
