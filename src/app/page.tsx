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
import { motion } from "framer-motion";
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
      const pro: ProductFormInput[] = [];
      const qsanpshot = await getDocs(q);
      qsanpshot.forEach((item) => {
        if (col === "date") {
          pro.push({ ...(item.data() as ProductFormInput), id: item.id });
          setloadNew(false);
        } else {
          pro.push({ ...(item.data() as ProductFormInput), id: item.id });
          setloadBestSale(false);
        }
        if (col === "date") {
          setproductNew(pro);
        } else {
          setproductSale(pro);
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
  // const { inboxNotifications } = useInboxNotifications();
  return (
    <div className="flex flex-col justify-center w-full overflow-hidden items-center gap-12">
      {/* <InboxNotificationList>
        {inboxNotifications.map((inboxNotification) => (
          <InboxNotification
            key={inboxNotification.id}
            inboxNotification={inboxNotification}
          />
        ))}
      </InboxNotificationList> */}
      <Hero /> <Catagory /> <Sales />
      <motion.div className="flex flex-col px-3 dark:text-white w-full items-center justify-center">
        <div
          id="newProducts"
          className="flex transition-all px-2 duration-300 items-center justify-between w-full border-b-4 pb-4 border-neutral-400"
        >
          <h3 className="sm:text-[32px] text-20 flex items-center justify-center  ">
            New products
          </h3>
          <Link
            href={"/viewAll?type=New"}
            className="text-[16px] items-center  justify-center flex gap-2"
          >
            <span className="text-18">view all</span> <MdNavigateNext />
          </Link>
        </div>

        <ForProducts load={loadNew} products={productNew} />
      </motion.div>
      <Reklam />
      <div className="flex flex-col px-3 w-full  items-center justify-center">
        <div className="flex justify-between px-2 dark:text-white items-center border-b-4 w-full pb-4 border-neutral-400">
          <h3 className="text-[20px] sm:text-30 flex items-center justify-center ">
            best salery
          </h3>
          <Link
            href={"/viewAll?type=numberSale "}
            className="text-[16px] items-center justify-center flex gap-2"
          >
            <span className="text-18">view all</span> <MdNavigateNext />
          </Link>
        </div>

        <ForProducts load={loadBestSale} products={productSale} />
      </div>
      <Brand />
      <div className="w-full overflow-hidden flex items-center justify-center px-3">
        <Banner />
      </div>
      <Servies />
      {/*
      {/* 
      <Blog /> 
       */}
    </div>
  );
}
