import { newProdcuts } from "@/util/data";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React from "react";

const page = () => {
  return (
    <div className="flex items-start gap-8 px-4 justify-start w-full flex-col">
      <h1 className="text-30 flex items-center w-full justify-between font-bold mt-8">
        <span> Products Discount </span>
      </h1>
      <div className="w-full flex-wrap flex items-center justify-between">
        <CatagoryProducts catagory="mobile" />
      </div>
      <div className="grid lg:grid-cols-4 gap-3 xl:grid-cols-5 ">
        {newProdcuts.map((item) => (
          <NewProducts key={item.name} item={item} title="dashboard" />
        ))}
      </div>
    </div>
  );
};

export default page;
