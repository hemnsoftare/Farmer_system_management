"use client";
import Image from "next/image";
import React from "react";
import { CiShop } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import HeaderProductIMage from "./HeaderProductIMage";
import HeaderproductInfo from "./HeaderproductInfo";
import { useUser } from "@clerk/nextjs";
import { ProductFormInput } from "@/type";
const HeaderProduct = ({ item }: { item: ProductFormInput }) => {
  const { user } = useUser();
  return (
    <>
      <div className="flex w-full flex-col gap-2 items-center justify-center ">
        <HeaderProductIMage
          mainImage={item.bigimageUrl}
          childImage={item.smallimageUrl}
        />
      </div>
      <div className="flex lg:w-full shadow-md hover:bg--50 hover:shadow-sm transition-all duration-300 p-2 h-full md:w-[80%] items-center  gap-6 flex-col justify-center">
        <HeaderproductInfo
          productinfos={{
            colors: item.colors,
            infos: item.details,
            name: item.name,
            price: item.price,
            brand: item.brand,
            discount: item.discount,
          }}
        />
        <button
          disabled={!user}
          onClick={() => console.log("object")}
          className={` ${
            user ? "bg-primary hover:bg-blue-700 " : "bg-primary-75"
          } flex items-center mb-2 lg:w-[79%] self-center md:w-full py-2 rounded-lg duration-300 justify-center gap-2 text-white `}
        >
          <MdOutlineShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </>
  );
};

export default HeaderProduct;
