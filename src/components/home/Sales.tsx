"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { newProdcuts } from "@/app/util/data";

import { GrFormNextLink } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";

import NewProducts from "./NewProducts";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { app } from "../../../config/firebaseConfig";
import { ProductFormInput } from "@/type";

const Sales = () => {
  const [start, setStart] = useState(0);
  const [products, setproducts] = useState<ProductFormInput[]>([]);
  const db = getFirestore(app);
  useEffect(() => {
    const getdata = async () => {
      const q = query(collection(db, "Products"), where("discount", ">", 0));
      const querysnapshot = await getDocs(q);
      console.log("++++++++++++++++++++++++++++++++++++++++++++");
      querysnapshot.forEach((item) => {
        setproducts((pre) => [...pre, item.data() as ProductFormInput]);
        console.log(item.data());
      });
    };
    getdata();
  }, [db]);
  return (
    <div className="flex bg-primary-500 h-full w-full py-3 pb-7  px-3  items-center justify-center shadow-blue-950 shadow-md relative rounded-md text-white gap-4">
      <Image
        src={"/salesShape.svg"}
        width={400}
        height={400}
        alt="image"
        className="absolute left-0 z-10 -top-5"
      />
      <div className="flex w-[20%] z-20 text-white items-center  flex-col gap-3 ">
        <h1 className="text-white mt-8 font-bold text-23 ">Products On Sale</h1>
        <h2>Shop Now!</h2>
        <br />
        <button className="mt-auto bg-blue-500 z-30 hover:bg-blue-700 text-white mb-3 font-bold py-2 px-12 rounded">
          <Link href={"/view_all?type=discount"}> View All</Link>
        </button>
      </div>
      <div className="grid w-[80%] gap-3 items-center   grid-cols-4 justify-center">
        {products.slice(start, 4 + start).map((item) => (
          <NewProducts key={item.name} itemDb={item} title="sale" />
        ))}
      </div>
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
          className="hover:bg-slate-50/15 bg-red-500 duration-300 scale-[1.4]"
        />
      </div>
    </div>
  );
};

export default Sales;
