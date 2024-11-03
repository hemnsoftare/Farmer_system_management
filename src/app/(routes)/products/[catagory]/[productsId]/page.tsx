"use client";
import Comments from "@/components/blog/Comments";
import ForProducts from "@/components/home/ForProducts";
import HeaderProduct from "@/components/products/HeaderProduct";
import { ProductFormInput } from "@/type";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { app } from "../../../../../config/firebaseConfig";
import { getproductByCategory } from "@/lib/action/uploadimage";
import { useDispatch, useSelector } from "react-redux";
const SingleProduct = ({
  params,
}: {
  params: { catagory: string; productsId: string };
}) => {
  const [product, setproduct] = useState<ProductFormInput>();
  const [smilierProducts, setsmilierProducts] = useState<ProductFormInput[]>(
    []
  );
  // const state = useSelector((state) => stat);

  const db = getFirestore(app);
  useEffect(() => {
    const getProduct = async () => {
      console.log(params.productsId.replaceAll("%20", " "));
      const refdoc = await getDoc(
        doc(db, "Products", params.productsId.replaceAll("%20", " ").trim())
      );
      console.log(refdoc.data());
      setproduct(refdoc.data() as ProductFormInput);
      const getProducts = await getproductByCategory(params.catagory);
      setsmilierProducts(getProducts);
    };
    getProduct();
  }, []);
  return (
    <div className="flex flex-col w-full py-4 ">
      <span className="lg:text-12  md:text-12">
        home &gt; products &gt; laptop
      </span>
      <header className="flex w-full items-start justify-start gap-4 ">
        {product && <HeaderProduct item={product} />}
      </header>
      <main>
        {/* card new products */}
        <div className="flex mt-3 flex-col w-full">
          <h2 className="font-semibold">Similar products</h2>

          <ForProducts products={smilierProducts} />
        </div>
        {/* comment */}
        {/* <div className="flex flex-col mt-8 justify-between gap-2 items-start">
          <h2 className="font-semibold text-20">Comments</h2>
          <div className="flex items-start gap-2">
             create comments *
            <div className="flex gap-3 flex-col">
              <h2>Leave your comments here for other customers</h2>
              <textarea
                name="comment"
                id=""
                rows={6}
                placeholder="Share your thoughts about this product here"
                className="p-3 w-full border-2 border-gray-200 rounded-lg bg-slate-50 outline-none px-4"
              />
              <button className="border-2 hover:bg-blue-500 hover:text-white duration-300 transition-all rounded-lg font-semibold border-primary text-primary w-full py-2 text-18">
                Comment
              </button>
            </div>
            <Comments type="products" />
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default SingleProduct;
