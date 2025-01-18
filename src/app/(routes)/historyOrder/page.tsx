"use client";
import { Loader } from "@/app/loader";
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
import { motion } from "framer-motion";

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

  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      {/* Title Animation */}
      <motion.h1
        className="self-start px-3 text-26 sm:text-30 my-3 font-semibold"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Order History
      </motion.h1>

      {/* Products Rendering */}
      {!load && products.length > 0 ? (
        <motion.div
          transition={{ staggerChildren: 0.5, delayChildren: 0.6 }}
          className="grid grid-cols-2 px-2 gap-2 lg:grid-cols-4 md:grid-cols-3 w-full items-center overflow-hidden py-8 justify-center"
        >
          {products.map((itemorder) =>
            itemorder.orderItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8, y: 80, x: 80 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CardHistory item={item} date={itemorder.orderDate} />
              </motion.div>
            ))
          )}
        </motion.div>
      ) : load ? (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          No products found
        </motion.h1>
      )}
    </div>
  );
};

export default Page;
