"use client";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import { app } from "@/config/firebaseConfig";
import { deleteProducts, getProducts } from "@/lib/action/uploadimage";
import { ProductFormInput } from "@/type";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
        fetchedProducts.push({
          ...(item.data() as ProductFormInput), // Spread item data
          id: item.id, // Add the `id` field
        });
      });
      setload(false);
      setproducts(fetchedProducts);
    };

    getData("date");
  }, [db, category]);
  return (
    <div className="flex items-start gap-8 px-2 mt-3 justify-start w-full flex-col">
      <h1 className="sm:text-30 text-20 flex items-center w-full justify-between font-bold mt-8">
        <span> products</span>
        <div className="flex items-center gap-2 justify-center ">
          <Link href={"/dashboard/category"}>
            <button className="rounded-lg text-12  sm:text-18 bg-black text-white px-2 sm:px-6 py-2 hover:bg-slate-800 duration-300 transition-all">
              Add Catagory
            </button>
          </Link>
          <Link href={"/dashboard/AddItem"}>
            <button className="rounded-lg text-12 sm:text-18 bg-black text-white px-2 sm:px-6 py-2 hover:bg-slate-800 duration-300 transition-all">
              Create Product
            </button>
          </Link>
        </div>
      </h1>
      <div className="w-full flex-wrap flex items-center justify-between">
        <CatagoryProducts
          catagory={category}
          handleSelected={setcategory}
          title="products"
        />
      </div>
      <div className="grid lg:grid-cols-4 w-full grid-cols-2 gap-3 xl:grid-cols-5 ">
        {prodcts &&
          prodcts.map((item) => (
            <NewProducts
              deleteProducts={() => {
                deleteProducts(item.name);
                setproducts(prodcts.filter((i) => i.name !== item.name));
              }}
              key={item.name}
              itemDb={item}
              title="dashboard"
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
