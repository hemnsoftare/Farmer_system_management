"use client";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import { newProdcuts } from "@/app/util/data";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../../config/firebaseConfig";
import { ProductFormInput } from "@/type";
const Page = () => {
  const searchparams = useSearchParams();
  const type = searchparams.get("type");
  const db = getFirestore(app);
  const [products, setproducts] = useState<ProductFormInput[]>([]);
  const [selectedCategory, setselectedCategory] = useState("");
  useEffect(() => {
    const getdata = async (col: string) => {
      if (col !== "discount")
        var q = selectedCategory
          ? query(
              collection(db, "Products"),
              where("category", "==", selectedCategory),
              orderBy(col, "desc")
            )
          : query(collection(db, "Products"), orderBy(col, "desc"));
      else {
        console.log(type);
        var q = selectedCategory
          ? query(
              collection(db, "Products"),
              where("category", "==", selectedCategory),
              where("isDiscount", "==", true)
            )
          : query(collection(db, "Products"), where("isDiscount", "==", true));
      }
      const qsanpshot = await getDocs(q);
      qsanpshot.forEach((item) => {
        setproducts((pre) => [...pre, item.data() as ProductFormInput]);
      });
    };
    if (type === "New") {
      getdata("date");
    } else if (type === "discount") {
      getdata("discount");
    } else {
      getdata("numberSale");
    }
  }, [selectedCategory]);
  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className=" self-start text-30 my-3 font-semibold">
        last {newProdcuts.length < 30 ? newProdcuts.length : "30"} {type}{" "}
        products
      </h1>
      <CatagoryProducts
        handleSelected={(name) => {
          setproducts([]);
          setselectedCategory(name);
        }}
      />
      <div className="grid  lg:grid-cols-4 md:grid-cols-3 w-full items-center justify-center ">
        {products.map((item) => (
          <NewProducts key={item.name} itemDb={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
