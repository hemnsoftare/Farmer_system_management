"use client";
import { Loader } from "@/app/[locale]/loader";
import { useUser } from "@clerk/nextjs";

import React from "react";
import CardHistory from "./_compoents/CardHistory";
import { motion, sync } from "framer-motion";
import { getOrder } from "@/lib/action/dashboard";
import { useQuery } from "@tanstack/react-query";
import { clear_data_user } from "@/lib/settingFn";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "../../ClientProviders";
import OrderCard from "./_compoents/CardHistory";

const Page = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["historyOrder"],
    queryFn: async () => {
      const data = await getOrder(user?.id);
      return { products: data };
    },
  });
  return (
    <div className="flex items-center w-full py-8 md:px-12 px-3 gap-3 justify-center flex-col">
      {/* Title Animation */}
      <header className="flex w-full justify-between items-center ">
        <motion.h1
          className="self-start px-3 text-26 sm:text-30 my-3 font-semibold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Order History
        </motion.h1>

        <Dialog>
          <DialogTrigger asChild>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Clear All
            </motion.button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear Order</DialogTitle>
              <DialogDescription>
                <h1> you aggre to clear all order</h1>
                <div className="flex w-full justify-end items-center gap-3 mt-4">
                  <button
                    onClick={() => {
                      clear_data_user({ table: "order", userid: user?.id });
                      queryClient.setQueryData(["historyOrder"], () => ({
                        products: [],
                      }));
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Confirm
                  </button>
                  <DialogTrigger className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Cancel
                  </DialogTrigger>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>

      {/* Products Rendering */}
      {!isLoading && data.products.length > 0 ? (
        <motion.div
          transition={{ staggerChildren: 0.5, delayChildren: 0.6 }}
          className="grid grid-cols-2 px-2 gap-2 lg:grid-cols-5 md:grid-cols-5 w-full items-center overflow-hidden py-8 justify-center"
        >
          {data.products.map((itemorder, index) => {
            const date: any = itemorder.orderDate;
            const formattedDate = new Date(
              (date.seconds || 0) * 1000
            ).toLocaleDateString("en-US");
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 80, x: 80 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <OrderCard
                  order={itemorder}
                  date={formattedDate}
                  title="user"
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : isLoading ? (
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
