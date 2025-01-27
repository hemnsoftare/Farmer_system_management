"use client";
import ForProducts from "@/components/home/ForProducts";
import NewProducts from "@/components/home/NewProducts";
import { app } from "@/config/firebaseConfig";
import { ProductFormInput } from "@/lib/action";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaHeart, FaSearch, FaStar, FaTag } from "react-icons/fa";
const Page = () => {
  const [select, setSelect] = useState({ name: "Search", order: "numSearch" });
  const [produts, setproduts] = useState<ProductFormInput[]>();
  const [load, setload] = useState(false);
  const db = getFirestore(app);
  const iconArray = [
    { name: "Search", icon: FaSearch, order: "numSearch" },
    { name: "Sale", icon: FaTag, order: "numberSale" },
    { name: "Favorite", icon: FaHeart, order: "numberFavorite" },
  ];

  useEffect(() => {
    const getdata = async (selectedData: any) => {
      setload(true);
      const { name, order } = selectedData;
      const data = query(collection(db, "Products"), orderBy(order, "desc"));
      const qSnapShot = await getDocs(data);
      const pro: ProductFormInput[] = [];
      qSnapShot.forEach((item) =>
        pro.push({ ...(item.data() as ProductFormInput), id: item.id })
      );
      console.log(pro.length);
      setload(false);
      setproduts(pro);
    };

    getdata(select);
  }, [select, db]); // Dependency on `select` state
  return (
    <div className="flex flex-col px-4 mt-8">
      <h1 className="text-30 font-semibold">Poplar Products</h1>
      <div className="flex items-center mt-7 justify-center gap-3">
        {iconArray.map((item) => (
          <div
            key={item.name}
            onClick={() => setSelect(item)} // Handle click to update selected item
            className={`flex flex-col px-6 items-center justify-center gap-2 border py-2 w-[150px] rounded-lg shadow-lg duration-300 transition-all 
            ${select.name === item.name ? "bg-orange-50 border-orange-500" : "bg-white border-transparent"} 
            ${select.name === item.name ? "shadow-orange-300" : "shadow-slate-200"} hover:shadow-orange-200`}
          >
            <item.icon color={select.name === item.name ? "#f45e0c" : "#000"} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center flex-wrap justify-center gap-4">
        {produts && produts.length > 0 ? (
          produts.map((item) => (
            <NewProducts
              itemDb={item}
              key={item.id}
              load={load}
              title="dashboard"
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-96">
            <h1 className="text-2xl text-gray-400">No products found</h1>
          </div>
        )}
      </div>
      {/* <ForProducts products={produts} load={load} title="dashboard" /> */}
    </div>
  );
};

export default Page;

// Compare this snippet from src/app/%5Blocale%5D/%28routes%29/dashboard/popular/page.tsx:
// import React from "react";
// import Layout from "../layout";
// import Page from "./page";
