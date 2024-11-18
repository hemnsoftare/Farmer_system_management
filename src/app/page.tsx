"use client";
import Banner from "@/components/home/Banner";
import Brand from "@/components/home/Brand";
import Catagory from "@/components/home/Catagory";
import ForProducts from "@/components/home/ForProducts";
import Hero from "@/components/home/Hero";
import Reklam from "@/components/home/Reklam";
import Sales from "@/components/home/Sales";
import Servies from "@/components/home/Servies";
import { app } from "@/config/firebaseConfig";
import { setUser } from "@/lib/action/uploadimage";
import { ProductFormInput } from "@/type";
import { useUser } from "@clerk/nextjs";
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

export default function Home() {
  console.log("in page");
  const [productNew, setproductNew] = useState<ProductFormInput[]>([]);
  const [productSale, setproductSale] = useState<ProductFormInput[]>([]);
  const [loadNew, setloadNew] = useState(true);
  const [loadBestSale, setloadBestSale] = useState(true);
  const { user } = useUser();
  console.log(user);
  const db = getFirestore(app);
  useEffect(() => {
    const getdata = async (col: string) => {
      const q = await query(collection(db, "Products"), orderBy(col, "desc"));
      const qsanpshot = await getDocs(q);
      qsanpshot.forEach((item) => {
        if (col === "date") {
          setloadNew(false);
          setproductNew((pre) => [...pre, item.data() as ProductFormInput]);
        } else {
          setloadBestSale(false);
          setproductSale((pre) => [...pre, item.data() as ProductFormInput]);
        }
      });
    };
    getdata("numberSale");
    getdata("date");
  }, [db]);
  useEffect(() => {
    if (user) {
      setUser({
        id: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        fullName: user.fullName || "",
        username: user.username || "",
        emailAddresses: user.emailAddresses || [],
        primaryEmailAddressId: user.primaryEmailAddressId || "",
      });
    }
  }, [user]);

  return (
    <div className="flex md:bg-slate-50 sm:bg-red-100 lg:bg-white flex-col gap-12">
      <Hero />
      <Catagory />
      <Sales />
      <div className="flex flex-col w-full items-center justify-center">
        <div
          id="newProducts"
          className="flex transition-all duration-300 items-center justify-between w-full border-b-4 pb-4 border-neutral-400"
        >
          <h3 className="text-[32px] flex items-center justify-center  text-black">
            New products
          </h3>
          <Link
            href={"/viewAll?type=New"}
            className="text-[16px] items-center justify-center flex gap-2"
          >
            <span>view all</span> <MdNavigateNext />
          </Link>
        </div>

        <ForProducts load={loadNew} products={productNew} />
      </div>

      <Reklam />
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex justify-between items-center border-b-4 w-full pb-4 border-neutral-400">
          <h3 className="text-[32px] flex items-center justify-center text-black">
            best salery
          </h3>
          <Link
            href={"/viewAll?type=numberSale "}
            className="text-[16px] items-center justify-center flex gap-2"
          >
            <span>view all</span> <MdNavigateNext />
          </Link>
        </div>

        <ForProducts load={loadBestSale} products={productSale} />
      </div>
      <Brand />
      <Banner />
      {/* <Blog /> */}
      <Servies />
    </div>
  );
}
