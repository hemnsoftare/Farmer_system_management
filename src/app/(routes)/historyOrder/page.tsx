"use client";
import { Loader } from "@/app/loader";
import NewProducts from "@/components/home/NewProducts";
import { app } from "@/config/firebaseConfig";
import { OrderType } from "@/type";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CardHistory from "./_compoents/CardHistory";

const Page = () => {
  const db = getFirestore(app);
  const [products, setProducts] = useState<OrderType[]>([]);
  const [load, setload] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const getorder = async () => {
      setload(true);
      if (user?.id) {
        const q = query(
          collection(db, "order"),
          where("userId", "==", user?.id)
        );
        const querySnapshot = await getDocs(q);

        const newProducts: OrderType[] = [];
        querySnapshot.forEach((doc) => {
          newProducts.push(doc.data() as OrderType);
        });
        setProducts(newProducts);
        setload(false);
      }
    };
    getorder();
  }, [db, user]);
  if (products.length > 0) console.log(products[0].orderDate);
  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className="self-start px-3 text-26 sm:text-30 my-3 font-semibold">
        Order Histroy
      </h1>

      {!load && products.length > 0 ? (
        <div className="grid grid-cols-2 px-2 gap-2 lg:grid-cols-5  md:grid-cols-3 w-full items-center justify-center">
          {products.map((itemorder) =>
            itemorder.orderItems.map((item) => (
              <CardHistory
                key={item.name}
                item={item}
                date={itemorder.orderDate}
              />
            ))
          )}
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
