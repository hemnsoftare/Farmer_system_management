"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdDelete, MdOutlineShoppingCart } from "react-icons/md";
import { ProductFormInput, Productsprops } from "@/type";
import { CiHeart } from "react-icons/ci";
import { useUser } from "@clerk/nextjs";
import { FaRegEdit } from "react-icons/fa";

const NewProducts = ({
  item,
  title,
  itemDb,
}: {
  title?: string;
  item?: Productsprops;
  itemDb?: ProductFormInput;
}) => {
  const [state, setState] = useState<number[]>([]);
  const { user } = useUser();
  const handlef = (index: number) => {
    setState((prevState) => {
      const exists = prevState.some((item) => item === index);
      if (exists) {
        return prevState.filter((item) => item !== index);
      } else {
        return [...prevState, index];
      }
    });
  };
  const product: ProductFormInput | undefined = itemDb;
  if (product) {
    return (
      <Link
        href={
          title !== "dashboard"
            ? `/products/${product.category}/${product.name}`
            : "#"
        }
        key={product.name}
        className={` ${
          title === "sale" && "bg-white "
        } flex gap-5 border border-neutral-100 overflow-hidden flex-col group relative w-full items-center justify-center duration-300 transition-all rounded-lg shadow-gray-200 shadow-md hover:shadow-lg p-4`}
      >
        <div className="relative flex items-center justify-center w-full">
          {user && title !== "dashboard" && (
            <CiHeart
              color="black"
              className={`opacity-0 w-7 h-7 z-10 group-hover:opacity-100 duration-300 transition-all absolute top-0 left-0`}
              onClick={() => handlef(product.price)}
            />
          )}
          <Image
            src={product?.bigimageUrl}
            alt="image"
            width={217}
            height={161}
            className="overflow-hidden w-[217px] h-[161px] group-hover:transform group-hover:scale-[1.03] scale-[1] duration-300 transition-all"
          />
          {product.colors && (
            <div className="flex group-hover:opacity-0 duration-300 transition-all flex-col gap-1 absolute top-12 -right-3">
              {product.colors.map((color: any, index: number) => {
                if (index < 3)
                  return (
                    <span
                      key={color.name}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.color }}
                    ></span>
                  );
                else if (index === 3) {
                  return (
                    <span
                      key={index}
                      className="rounded-full w-4 h-4 text-center"
                    >
                      +
                    </span>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className="flex gap-2 w-full flex-col">
          <hr className="h-[2px] bg-gradient-to-r from-white via-slate-500 to-white border-0" />
          <h3
            className={`lg:text-12 md:text-10 ${
              title === "sale" || title === "dashboard"
                ? "h-[14px]"
                : "h-[53px]"
            }  overflow-hidden text-primary-500 font-light`}
          >
            {product.name}
          </h3>
          <div className="w-full h-[33px]">
            {user && title !== "dashboard" && (
              <button className="w-full group border opacity-0 hidden rounded-lg py-2 group-hover:opacity-100 border-black hover:border-blue-700 duration-300 transition-all text-black hover:text-primary items-center group-hover:flex justify-center gap-2">
                <MdOutlineShoppingCart className="text-black group-hover:text-primary" />{" "}
                <span>Add to Cart</span>
              </button>
            )}
            <div
              className={` ${
                !user || title === "dashboard"
                  ? "opacity-100"
                  : " group-hover:opacity-0 opacity-100 group-hover:hidden"
              } flex relative   text-black   mt-3 justify-between`}
            >
              {product.discount && (
                <span className="line-through absolute -top-4 text-sm left-0   text-neutral-600">
                  $234.234
                </span>
              )}
              <span className="z-10">{product.price}$</span>
              {product.discount && product.discount > 0 && (
                <p className=" group-hover:opacity-0 -mr-5  bg-gradient-to-r to-transparent from-red-300 z-10 duration-300 transition-all  top-4 px-3 py-1 rounded-l-full text-secondary-500 text-sm">
                  -{product?.discount} $
                </p>
              )}
              {title === "dashboard" && (
                <div className="flex items-center justify-between gap-2">
                  <button>
                    <FaRegEdit color="blue" size={20} />
                  </button>
                  <button>
                    <MdDelete color="red" size={24} />
                  </button>
                </div>
              )}
              {/* <span className="flex items-center justify-center gap-1">
              {item.pointStart} <FaStar color="yollow" />
            </span> */}
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default NewProducts;
