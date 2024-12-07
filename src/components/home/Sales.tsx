"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { GrFormNextLink } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";

import NewProducts from "./NewProducts";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import { ProductFormInput } from "@/type";
import { Loader } from "@/app/loader";
const Sales = () => {
  const [load, setload] = useState(true);
  const [start, setStart] = useState(0);
  const [products, setproducts] = useState<ProductFormInput[]>([]);
  const db = getFirestore(app);
  useEffect(() => {
    const getdata = async () => {
      const q = query(
        collection(db, "Products"),
        where("discount", ">", 0),
        orderBy("date", "asc")
      );
      const querysnapshot = await getDocs(q);
      querysnapshot.forEach((item) => {
        setproducts((pre) => [...pre, item.data() as ProductFormInput]);
      });
      setload(false);
    };
    getdata();
  }, [db]);

  return (
    <div className="flex flex-col lg:max-w-[1200px] sm:flex-row rounded-2xl overflow-hidden bg-primary-500 h-full w-full py-3 pb-7  px-3  items-center justify-center shadow-blue-950 shadow-md relative sm:rounded-md text-white gap-4">
      <Image
        src={"/shape.png"}
        width={400}
        height={400}
        alt="image"
        className="absolute left-0 z-[0] -top-5"
      />
      <div className="flex w-full sm:w-[20%] z-20 text-white items-center  flex-col gap-3 ">
        <h1 className="text-white mt-8 font-bold text-29 sm:text-23 ">
          Products On Sale
        </h1>
        <h2>Shop Now!</h2>
        <br />
        <button className="mt-auto bg-blue-500 z-30 sm:hover:bg-blue-700 text-white mb-3 font-bold py-2 px-12 rounded">
          <Link href={"/viewAll?type=discount"}> View All</Link>
        </button>
      </div>
      {load && (
        <div className="sm:grid w-full sm:w-[80%] gap-3  items-center flex overflow-x-auto  sm:overflow-hidden sm:grid-cols-4 justify-start">
          <Loader />
          <Loader />
          <div className="hidden sm:block">
            <Loader />
            <Loader />
          </div>
        </div>
      )}
      {!load && (
        <div className="sm:grid w-full sm:w-[80%] gap-3  items-center flex overflow-x-auto  sm:overflow-hidden sm:grid-cols-4 justify-start">
          {products.slice(start, 4 + start).map((item) => (
            <NewProducts key={item.name} itemDb={item} title="sale" />
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 absolute bottom-1 right-3">
        <IoArrowBackOutline
          color="white"
          onClick={() => setStart((pre) => (pre === 0 ? 0 : pre - 1))}
          className="hover:bg-slate-50/15   duration-300 scale-[1.4]"
        />
        <GrFormNextLink
          color="white"
          onClick={() =>
            setStart((pre) => (pre >= products.length - 4 ? pre : pre + 1))
          }
          className="hover:bg-slate-50/15  duration-300 scale-[1.4]"
        />
      </div>
    </div>
  );
};

export default Sales;
