import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import { newProdcuts } from "@/util/data";
import Link from "next/link";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalCategory from "../_components/ModalCategory";

const page = () => {
  return (
    <div className="flex items-start gap-8 px-4 justify-start w-full flex-col">
      <h1 className="text-30 flex items-center w-full justify-between font-bold mt-8">
        <span> products</span>
        <div className="flex items-center gap-2 justify-center ">
          <Link href={"/dashboard/category"}>
            <button className="rounded-lg text-18 bg-black text-white px-6 py-2 hover:bg-slate-800 duration-300 transition-all">
              Add Catagory
            </button>
          </Link>

          <Link href={"/dashboard/AddItem"}>
            <button className="rounded-lg text-18 bg-black text-white px-6 py-2 hover:bg-slate-800 duration-300 transition-all">
              Create Product
            </button>
          </Link>
        </div>
      </h1>
      <div className="w-full flex-wrap flex items-center justify-between">
        <CatagoryProducts catagory="mobile" title="products" />
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
