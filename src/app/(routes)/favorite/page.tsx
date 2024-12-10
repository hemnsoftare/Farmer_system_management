"use client";
import { Loader } from "@/app/loader";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getfavorite } from "@/lib/action/fovarit";
import { favorite } from "@/type";
import CardFavorite from "./_components/CardFavorite";
const Page = () => {
  const [load, setload] = useState(false);
  const [state, setstate] = useState(0);
  const [products, setproducts] = useState<favorite[]>([]);
  const [favorriteid, setfavorriteid] = useState<string[]>([]);
  const { user } = useUser();
  useEffect(() => {
    const getdata = async () => {
      console.log("in getdata");
      setload(true);
      if (user?.id) {
        const data = await getfavorite(user.id).finally(() => {
          setload(false);
        });
        setproducts(data as favorite[]);
        setfavorriteid(data.map((item) => item.name as string));
      }
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
  }, [state]);
  console.log(products);
  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className="self-start px-3 text-26 sm:text-30 my-3 font-semibold">
        Favorite Products
      </h1>

      {!load && products.length > 0 ? (
        <div className="grid grid-cols-2 px-2 gap-2  sm:flex sm:flex-wrap   w-full items-center justify-center">
          {products.map((itemorder) => (
            <CardFavorite
              click={() => setstate((pre) => pre + 1)}
              item={itemorder}
              userId={user.id}
              key={itemorder.name}
              addFavoriteid={() => {
                setproducts((pre) =>
                  pre.map((item) =>
                    itemorder.name !== item.name
                      ? item
                      : { ...item, numberFavorite: item.numberFavorite + 1 }
                  )
                );
                setfavorriteid((pre) => [...pre, itemorder.name]);
              }}
              favoriteId={favorriteid}
              deleteFavoriteId={() => {
                setproducts((pre) =>
                  pre.map((item) =>
                    itemorder.name !== item.name
                      ? item
                      : { ...item, numberFavorite: item.numberFavorite - 1 }
                  )
                );
                setfavorriteid((pre) =>
                  pre.map((item) => (item !== itemorder.name ? item : null))
                );
              }}
            />
          ))}
        </div>
      ) : load ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <h1 className="text-30 font-black my-[200px]">have not product</h1>
      )}
    </div>
  );
};

export default Page;
