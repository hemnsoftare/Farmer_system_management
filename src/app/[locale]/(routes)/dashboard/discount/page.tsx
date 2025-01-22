"use client";
import { newProdcuts } from "@/util/data";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ProductFormInput } from "@/lib/action";
import { app } from "@/config/firebaseConfig";
const Page = () => {
  const [prodcts, setproducts] = useState<ProductFormInput[]>();
  const [category, setcategory] = useState("");
  const [load, setload] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const getData = async (col: string) => {
      setload(true);
      let q;
      if (col !== "discount") {
        q = category
          ? query(
              collection(db, "Products"),
              where("category", "==", category),
              orderBy(col, "desc")
            )
          : query(collection(db, "Products"), orderBy(col, "desc"));
      } else {
        q = category
          ? query(
              collection(db, "Products"),
              where("category", "==", category),
              where("isDiscount", "==", true)
            )
          : query(collection(db, "Products"), where("isDiscount", "==", true));
      }

      const snapshot = await getDocs(q);
      const fetchedProducts: ProductFormInput[] = [];
      snapshot.forEach((item) => {
        fetchedProducts.push(item.data() as ProductFormInput);
      });
      setload(false);
      setproducts(fetchedProducts);
    };

    getData("discount");
  }, [db, category]);
  return (
    <div className="flex items-start gap-8 px-4 justify-start w-full flex-col">
      <h1 className="text-30 flex items-center w-full justify-between font-bold mt-8">
        Products Discount
      </h1>
      <div className="w-full flex-wrap flex items-center justify-between">
        <CatagoryProducts handleSelected={setcategory} catagory={category} />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 w-full gap-3 xl:grid-cols-5 ">
        {prodcts &&
          prodcts.length > 0 &&
          prodcts.map((item) => (
            <NewProducts key={item.name} itemDb={item} title="dashboard" />
          ))}
      </div>
    </div>
  );
};

export default Page;
