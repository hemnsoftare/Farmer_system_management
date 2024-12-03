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
        } flex sm:gap-5  gap-1  border-neutral-100 shadow-sm sm:shadow-lg shadow-neutral-400 overflow-hidden flex-col group relative w-full items-center justify-center pb-3 duration-300 transition-all rounded-lg sm:p-4 p-2`}
      >
        <div className="relative flex items-center mb-1 flex-col justify-center w-full">
          <Image
            src={product?.bigimageUrl}
            alt="image"
            width={217}
            height={161}
            className="sm:w-[217px] w-[180px] h-[120px] sm:h-[161px] group-hover:scale-[1.03] duration-300 transition-all"
          />{" "}
          {product.isDiscount && product.discount && product.discount > 0 && (
            <p className="group-hover:opacity-0 absolute flex sm:hidden text-12 left-0  bg-gradient-to-l to-red-50 from-red-400 z-10 duration-300  transition-all top-0 w-[50px] pl-3  py-1 rounded-r-full text-secondary-500 ">
              -{product?.discount} $
            </p>
          )}
          {product.colors && (
            <div className="sm:flex  hidden group-hover:opacity-0 duration-300 transition-all mt-2 flex-row sm:flex-col gap-1 sm:absolute sm:top-12 sm:-right-3">
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
                    <span key={index} className="rounded-full text-18">
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
                ? "sm:h-[34px] h-[30px]"
                : "sm:h-[53px] h-[30px]"
            }  overflow-hidden  text-primary-500 font-[500]`}
          >
            {product.name}
          </h3>
          <div className="w-full h-[33px]">
            {title !== "dashboard" && (
              <Link
                className="w-full hidden group border opacity-0  rounded-lg py-2 group-hover:opacity-100 border-black hover:border-blue-700 duration-300 transition-all hover:bg-blue-900 text-white bg-primary hover:text-white items-center sm:group-hover:flex justify-center gap-2"
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
                  : " sm:group-hover:opacity-0 opacity-100 sm:group-hover:hidden"
              } flex relative text-black mt-3 justify-between`}
            >
              {product.isDiscount && (
                <span className="line-through absolute  group-hover:opacity-0 -top-4 left-0 text-neutral-600">
                  $
                  {product.discount &&
                    (product.discount * 0.01 * product.price).toFixed(2)}
                </span>
              )}
              <span>{product.price}$</span>
              {product.isDiscount &&
                product.discount &&
                product.discount > 0 && (
                  <p className="group-hover:opacity-0 hidden sm:flex -mr-5 bg-gradient-to-r to-transparent from-red-300 z-10 duration-300 transition-all top-4 px-3 py-1 rounded-l-full text-secondary-500 text-sm">
                    -{product?.discount} $
                  </p>
                )}
              {/* mobile btn add to cart */}
              <Link
                className="flex min-w-[30%] items-center px-3 text-14 py-2 -mt-3 sm:hidden justify-center bg-secondary-300 text-white rounded-lg"
                href={`/products/${product.category}/${product.name}`}
              >
                <MdOutlineShoppingCart size={15} color="white" />
                {/* <span>Add to Cart</span> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewProducts;
