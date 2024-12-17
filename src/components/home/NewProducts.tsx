"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ProductFormInput, Productsprops } from "@/type";
import { Loader } from "@/app/loader";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import { useUser } from "@clerk/nextjs";
import { addfavorite, deleteFavorite } from "@/lib/action/fovarit";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const NewProducts = ({
  title,
  itemDb,
  load,
  favoriteId,
  addFavoriteid,
  deleteFavoriteId,
}: {
  title?: string;
  item?: Productsprops;
  itemDb?: ProductFormInput;
  load?: boolean;
  favoriteId?: string[];
  addFavoriteid?: () => void;
  deleteFavoriteId?: () => void;
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the <Link>
    e.preventDefault(); // Prevent default behavior of the <Link>
  };
  const product: ProductFormInput | undefined = itemDb;
  const { user } = useUser();
  if (load) return <Loader />;
  if (product) {
    return (
      <Link
        href={
          title !== "dashboard"
            ? `/products/${product.category}/${product.name}`
            : "#"
        }
        // style={{ boxShadow: shadowColor }} // Apply custom shadow here
        key={product.name}
        className={`${
          title === "sale"
            ? "bg-white border dark:bg-neutral-900/90 max-h-[300px] min-w-[180px]"
            : "sm:h-fit border h-full lg:min-w-[200px] sm:w-full max-w-[300px]"
        } flex sm:gap-5  gap-1 border-neutral-100 shadow-sm dark:shadow-secondary-500 dark:border-secondary sm:shadow-md shadow-neutral-400 overflow-hidden flex-col group relative w-full items-center justify-center dark:hover:shadow-lg dark:hover:shadow-secondary duration-300 transition-all rounded-lg sm:p-2 sm:pb-3 `}
      >
        {user && user.id && title !== "dashboard" && (
          <>
            {favoriteId && favoriteId.some((item) => item === itemDb.name) ? (
              <FaHeart
                color="#f45e0c"
                onClick={(e) => {
                  handleFavoriteClick(e);
                  deleteFavorite(user.id, itemDb.price, itemDb.name).finally(
                    () => {}
                  );
                  deleteFavoriteId();
                }}
                className="absolute p-3 size-[23px] box-content sm:size-[23px] top-1 z-[2] right-1"
              />
            ) : (
              <FaRegHeart
                color="#f45e0c"
                onClick={(e) => {
                  handleFavoriteClick(e);
                  addfavorite({
                    id: user.id,
                    item: {
                      name: itemDb.name,
                      categroy: itemDb.category,
                      price: itemDb.price,
                      colors: itemDb.colors,
                      image: itemDb.bigimageUrl,
                      numberFavorite: itemDb.numberFavorite,
                    },
                  });
                  addFavoriteid();
                }}
                className="absolute p-3 size-[23px] sm:size-[23px] box-content top-1 z-[2] right-1"
              />
            )}
          </>
        )}
        <div className="relative flex items-center  p-[2px] flex-col justify-center w-full">
          <Image
            src={product?.bigimageUrl}
            alt="image"
            width={217}
            height={161}
            className="sm:w-[217px] rounded-lg w-full above-405:h-[140px] h-[130px] sm:h-[161px] sm:group-hover:scale-[1.03] duration-300 transition-all"
          />{" "}
          {product.isDiscount && product.discount && product.discount > 0 && (
            <p className="group-hover:opacity-0 backdrop-blur-md min-w-[30px] absolute flex sm:hidden text-12 left-1  bg-gradient-to-l dark:to-transparent to-red-50 from-red-400 dark:from-red-400 dark:text-red-100 z-[2] duration-300  transition-all top-3 p-2 rounded-full text-secondary-500 ">
              {product?.discount} $
            </p>
          )}
          {product.colors && (
            <div className="sm:flex  hidden group-hover:opacity-0 duration-300 transition-all mt-2 flex-row sm:flex-col gap-1 sm:absolute sm:top-12 sm:-right-1">
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
        <div className="flex gap-2 pt-1 sm:pt-0 p-2 sm:p-[2px] w-full flex-col">
          <hr className="h-[2px] bg-gradient-to-r dark:hidden from-white via-slate-500 to-white border-0" />
          <h3
            className={`lg:text-16 text-14 md:text-10 ${
              title === "sale" || title === "dashboard"
                ? "sm:h-[34px] h-[40px]"
                : "sm:h-[53px] h-[40px]"
            }  overflow-hidden mb-2  text-secondary-400 font-[500]`}
          >
            {product.name}
          </h3>
          <div className="w-full h-fit sm:h-[33px]">
            {title !== "dashboard" && (
              <Link
                className="w-full hidden group px-3 dark:bg-blue-900  dark:hover:bg-blue-800 border opacity-0  rounded-lg py-2 group-hover:opacity-100 border-black hover:border-blue-700 duration-300 transition-all hover:bg-blue-900 text-white bg-primary hover:text-white items-center sm:group-hover:flex justify-center gap-2"
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
              } flex relative text-black mt-1 sm:mt-4 justify-between`}
            >
              {product.isDiscount && (
                <span className="line-through text-11 sm:text-12 absolute dark:text-neutral-400 decoration-secondary  group-hover:opacity-0 -top-4 left-0 text-neutral-600">
                  $
                  {product.discount &&
                    (product.discount * 0.01 * product.price).toFixed(2)}
                </span>
              )}
              <span className="text-12 dark:text-neutral-500 sm:text-16">
                {product.price}$
              </span>
              {product.isDiscount &&
                product.discount &&
                product.discount > 0 && (
                  <p className="group-hover:opacity-0 hidden sm:flex -mr-5 bg-gradient-to-r to-transparent dark:from-red-500 from-red-300 z-[2] duration-300 transition-all top-4 px-3 py-1 rounded-l-full sm:text-secondary-100 text-secondary-500 text-sm">
                    -{product?.discount} $
                  </p>
                )}
              {/* mobile btn add to cart */}
              {/* <Link
                className="flex min-w-[30%] items-center px-3 text-14 py-2 -mt-3 sm:hidden justify-center bg-secondary-300 text-white rounded-lg"
                href={`/products/${product.category}/${product.name}`}
              >
                <MdOutlineShoppingCart size={15} color="white" />
                <span>Add to Cart</span> 
              </Link> */}
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default NewProducts;
