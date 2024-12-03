"use client";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { ProductFormInput } from "@/type";
import { Loader } from "@/app/loader";

const Page = ({ params }: { params: { type: string } }) => {
  const type = params.type;
  const db = getFirestore(app);
  const [products, setProducts] = useState<ProductFormInput[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [load, setload] = useState(true);
  useEffect(() => {
    const getData = async (col: string) => {
      setload(true);
      let q;
      if (col !== "discount") {
        q = selectedCategory
          ? query(
              collection(db, "Products"),
              where("category", "==", selectedCategory),
              orderBy(col, "desc"),
              limit(30)
            )
          : query(collection(db, "Products"), orderBy(col, "desc"));
      } else {
        q = selectedCategory
          ? query(
              collection(db, "Products"),
              where("category", "==", selectedCategory),
              where("isDiscount", "==", true),
              limit(30)
            )
          : query(
              collection(db, "Products"),
              where("isDiscount", "==", true),
              limit(30)
            );
      }

      const snapshot = await getDocs(q);
      const fetchedProducts: ProductFormInput[] = [];
      snapshot.forEach((item) => {
        fetchedProducts.push(item.data() as ProductFormInput);
      });
      setload(false);
      setProducts(fetchedProducts);
    };

    if (type === "New") {
      getData("date");
    } else if (type === "discount") {
      getData("discount");
    } else {
      getData("numberSale");
    }
  }, [db, type, selectedCategory]); // Add 'db' and 'type' to dependencies

  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className="self-start px-3 text-26 sm:text-30 my-3 font-semibold">
        Last {products.length < 30 ? products.length : "30"} {type} products
      </h1>
      <CatagoryProducts
        handleSelected={(name) => {
          setProducts([]);
          setSelectedCategory(name);
        }}
      />

      {!load && products.length > 0 ? (
        <div className="grid grid-cols-2 px-2 gap-2 lg:grid-cols-4 md:grid-cols-3 w-full items-center justify-center">
          {products.map((item) => (
            <NewProducts key={item.name} itemDb={item} />
          ))}
        </div>
      ) : load ? (
        <div className="flex items-center justify-center gap-3">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <h1 className="text-30 font-black my-[200px]">have not product</h1>
      )}
    </div>
  );
};

export default Page;
