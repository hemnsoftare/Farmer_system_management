"use client";
import React, { useState, use, useEffect } from "react";

import ForProducts from "@/components/home/ForProducts";
import HeaderProduct from "@/components/products/HeaderProduct";
import { ProductFormInput } from "@/lib/action";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getproductByCategory } from "@/lib/action/uploadimage";
import Link from "next/link";
import { app } from "@/config/firebaseConfig";
import LoadingProducts from "@/components/products/loadingProducts";
import { useTranslations } from "next-intl";
const SingleProduct = ({ params }) => {
  const param: any = use(params);
  const [product, setProduct] = useState<ProductFormInput>();
  const [load, setload] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<ProductFormInput[]>(
    []
  );

  const db = getFirestore(app);
  const t = useTranslations("products");
  useEffect(() => {
    const getProduct = async () => {
      setload(true);
      const productId = param.productsId;
      const refDoc = await getDoc(doc(db, "Products", productId));
      setProduct(refDoc.data() as ProductFormInput);
      const productsByCategory = await getproductByCategory(param.catagory);
      setSimilarProducts(productsByCategory);
      setload(false);
    };

    getProduct();
  }, [db, param.catagory, param.productsId]); // Add dependencies here

  return (
    <div className="flex flex-col w-full py-4">
      <span className="lg:text-12 mb-4 px-3 md:text-12">
        <Link href="/" className="hover:text-blue-800 hover:underline">
          {t("home")}
        </Link>{" "}
        &gt;
        <Link
          href={`/products/${param.catagory}`}
          className="hover:text-blue-800 hover:underline"
        >
          {t("products")}
        </Link>{" "}
        &gt; {param.catagory}
      </span>
      <header className="flex flex-col dark:text-gray-600 sm:flex-row w-full sm:items-start justify-center items-center sm:justify-start gap-4">
        {load ? (
          <LoadingProducts />
        ) : (
          product && <HeaderProduct item={product} />
        )}
      </header>
      <br className="hidden dark:block" />
      <main>
        <hr />
        <div className="flex mt-6 py-3 flex-col w-full">
          <h2 className="font-semibold px-3 dark:text-gray-500 text-22">
            {t("similarProducts")}
          </h2>
          <div className="flex flex-nowrap w-full px-3 items-center overflow-x-auto sm:overflowx-x-hidden   justify-start">
            <ForProducts products={similarProducts} />
          </div>
          {/* <ForProducts products={similarProducts} /> */}
        </div>
      </main>
    </div>
  );
};

export default SingleProduct;

// "use client";
// import ForProducts from "@/components/home/ForProducts";
// import HeaderProduct from "@/components/products/HeaderProduct";
// import { ProductFormInput } from "@/type";
// import { doc, getDoc, getFirestore } from "firebase/firestore";

// import React, { useState, useEffect } from "react";
// import { app } from "../../../../../config/firebaseConfig";
// import { getproductByCategory } from "@/lib/action/uploadimage";
// import Link from "next/link";
// const SingleProduct = ({
//   params,
// }: {
//   params: { catagory: string; productsId: string };
// }) => {
//   const [product, setproduct] = useState<ProductFormInput>();
//   const [smilierProducts, setsmilierProducts] = useState<ProductFormInput[]>(
//     []
//   );
//   // const state = useSelector((state) => stat);

//   const db = getFirestore(app);
//   useEffect(() => {
//     const getProduct = async () => {
//       console.log(params.productsId.replaceAll("%20", " "));
//       const refdoc = await getDoc(
//         doc(db, "Products", params.productsId.replaceAll("%20", " ").trim())
//       );
//       console.log(refdoc.data());
//       setproduct(refdoc.data() as ProductFormInput);
//       const getProducts = await getproductByCategory(params.catagory);
//       setsmilierProducts(getProducts);
//     };
//     getProduct();
//   }, []);
//   return (
//     <div className="flex flex-col w-full py-4 ">
//       <span className="lg:text-12  md:text-12">
//         <Link href={"/"} className="hover:text-blue-800 hover:underline">
//           home
//         </Link>{" "}
//         &gt;{" "}
//         <Link
//           href={"/products/" + params.catagory}
//           className="hover:text-blue-800 hover:underline"
//         >
//           products
//         </Link>{" "}
//         &gt; laptop
//       </span>
//       <header className="flex w-full items-start justify-start gap-4 ">
//         {product && <HeaderProduct item={product} />}
//       </header>
//       <main>
//         {/* card new products */}
//         <div className="flex mt-3 flex-col w-full">
//           <h2 className="font-semibold">Similar products</h2>

//           <ForProducts products={smilierProducts} />
//         </div>
//         {/* comment */}
//         {/* <div className="flex flex-col mt-8 justify-between gap-2 items-start">
//           <h2 className="font-semibold text-20">Comments</h2>
//           <div className="flex items-start gap-2">
//              create comments *
//             <div className="flex gap-3 flex-col">
//               <h2>Leave your comments here for other customers</h2>
//               <textarea
//                 name="comment"
//                 id=""
//                 rows={6}
//                 placeholder="Share your thoughts about this product here"
//                 className="p-3 w-full border-2 border-gray-200 rounded-lg bg-slate-50 outline-none px-4"
//               />
//               <button className="border-2 hover:bg-blue-500 hover:text-white duration-300 transition-all rounded-lg font-semibold border-primary text-primary w-full py-2 text-18">
//                 Comment
//               </button>
//             </div>
//             <Comments type="products" />
//           </div>
//         </div> */}
//       </main>
//     </div>
//   );
// };

// export default SingleProduct;
