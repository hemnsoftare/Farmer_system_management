import React from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ProductFormInput, Productsprops } from "@/type";

import { Loader } from "@/app/loader";
import Link from "next/link";

const NewProducts = ({
  item,
  title,
  itemDb,
  load,
}: {
  title?: string;
  item?: Productsprops;
  itemDb?: ProductFormInput;
  load?: boolean;
}) => {
  const product: ProductFormInput | undefined = itemDb;

  if (load) return <Loader />;
  if (product) {
    return (
      <div
        // style={{ boxShadow: shadowColor }} // Apply custom shadow here
        key={product.name}
        className={`${
          title === "sale"
            ? "bg-white min-w-[180px]"
            : "sm:h-fit border lg:min-w-[200px] sm:w-full max-w-[300px]"
        } flex gap-5   border-neutral-100 shadow-lg shadow-neutral-400 overflow-hidden flex-col group relative w-full items-center justify-center duration-300 transition-all rounded-lg p-4`}
      >
        <div className="relative flex items-center justify-center w-full">
          <Image
            src={product?.bigimageUrl}
            alt="image"
            width={217}
            height={161}
            className="sm:w-[217px] w-[180px] h-[120px] sm:h-[161px] group-hover:scale-[1.03] duration-300 transition-all"
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
                ? "h-[34px]"
                : "h-[53px]"
            }  overflow-hidden text-primary-500 font-[500]`}
          >
            {product.name}
          </h3>
          <div className="w-full h-[33px]">
            {title !== "dashboard" && (
              <Link
                className="w-full group border opacity-0 hidden rounded-lg py-2 group-hover:opacity-100 border-black hover:border-blue-700 duration-300 transition-all hover:bg-blue-900 text-white bg-primary hover:text-white items-center group-hover:flex justify-center gap-2"
                href={`/products/${product.category}/${product.name}`}
              >
                <MdOutlineShoppingCart color="white" />
                <span>Add to Cart</span>
              </Link>
            )}
            <div
              className={`${
                title === "dashboard"
                  ? "opacity-100"
                  : " group-hover:opacity-0 opacity-100 group-hover:hidden"
              } flex relative text-black mt-3 justify-between`}
            >
              {product.isDiscount && (
                <span className="line-through absolute  group-hover:opacity-0 -top-4 text-sm left-0 text-neutral-600">
                  $
                  {product.discount &&
                    (product.discount * 0.01 * product.price).toFixed(3)}
                </span>
              )}
              <span>{product.price}$</span>
              {product.isDiscount &&
                product.discount &&
                product.discount > 0 && (
                  <p className="group-hover:opacity-0 -mr-5 bg-gradient-to-r to-transparent from-red-300 z-10 duration-300 transition-all top-4 px-3 py-1 rounded-l-full text-secondary-500 text-sm">
                    -{product?.discount} $
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewProducts;
