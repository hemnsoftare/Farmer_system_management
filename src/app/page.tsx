"use client";
import Banner from "@/components/home/Banner";
import Brand from "@/components/home/Brand";
import Catagory from "@/components/home/Catagory";
import ForProducts from "@/components/home/ForProducts";
import Hero from "@/components/home/Hero";
import NewProducts from "@/components/home/NewProducts";
import Reklam from "@/components/home/Reklam";
import Sales from "@/components/home/Sales";
import Servies from "@/components/home/Servies";
import { ProductFormInput } from "@/type";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { app } from "../../config/firebaseConfig";

export default function Home() {
  const [productNew, setproductNew] = useState<ProductFormInput[]>([]);
  const [productSale, setproductSale] = useState<ProductFormInput[]>([]);

  const db = getFirestore(app);
  useEffect(() => {
    const getdata = async (col: string) => {
      const q = await query(collection(db, "Products"), orderBy(col, "desc"));
      const qsanpshot = await getDocs(q);
      qsanpshot.forEach((item) => {
        if (col === "date") {
          setproductNew((pre) => [...pre, item.data() as ProductFormInput]);
        } else {
          setproductSale((pre) => [...pre, item.data() as ProductFormInput]);
        }
      });
    };
    getdata("numberSale");
    getdata("date");
  }, []);
  return (
    <div className="flex md:bg-slate-50 sm:bg-red-100 lg:bg-white flex-col gap-12">
      <Hero />
      <Catagory />
      <Sales />
      <div className="flex flex-col w-full items-center justify-center">
        <div
          id="newProducts"
          className="flex transition-all duration-300  justify-between w-full border-b-4 pb-4 border-neutral-400"
        >
          <h3 className="text-[32px] text-black">New products</h3>
          <Link href={"/view_all?type=New"} className="text-[16px] flex gap-2">
            view all <MdNavigateNext />
          </Link>
        </div>

        <ForProducts products={productNew} />
      </div>

      <Reklam />
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex justify-between border-b-4 w-full pb-4 border-neutral-400">
          <h3 className="text-[32px] text-black">best salery</h3>
          <Link
            href={"/view_all?type=numberSale "}
            className="text-[16px] flex gap-2"
          >
            view all <MdNavigateNext />
          </Link>
        </div>

        <ForProducts products={productSale} />
      </div>
      <Brand />
      <Banner />
      {/* <Blog /> */}
      <Servies />
    </div>
  );
}
