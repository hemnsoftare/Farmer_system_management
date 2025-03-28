"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ProductFormInput, Productsprops } from "@/lib/action";
import { Loader } from "@/app/[locale]/loader";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { addfavorite, deleteFavorite } from "@/lib/action/fovarit";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FileEdit } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const NewProducts = ({
  title,
  itemDb,
  load,
  favoriteId,
  addFavoriteid,
  deleteFavoriteId,
  deleteProducts,
}: {
  title?: string;
  // item?: Productsprops;
  itemDb?: ProductFormInput;
  load?: boolean;
  favoriteId?: string[];
  addFavoriteid?: () => void;
  deleteFavoriteId?: () => void;
  deleteProducts?: () => void;
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the <Link>
    e.preventDefault(); // Prevent default behavior of the <Link>
  };
  const router = useRouter();
  const product: ProductFormInput | undefined = itemDb;
  const { user } = useUser();
  if (load) return <Loader />;
  if (product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          router.push(
            `${
              title !== "dashboard"
                ? `/products/${product.category}/${product.id}`
                : `/dashboard/Products/${product.id}`
            }`
          );
        }}
        key={product.name}
        className={`${
          title === "sale"
            ? "bg-white border dark:bg-neutral-900/90 h-full min-w-[190px]"
            : "sm:h-fit border h-full lg:min-w-[230px] lg:max-w-[230px] sm:w-full max-w-[250px]"
        } flex sm:gap-5  border-neutral-200 shadow-lg dark:shadow-secondary-500 dark:border-secondary shadow-neutral-200 md:shadow-neutral-400 overflow-hidden flex-col group relative items-center justify-center dark:hover:shadow-lg dark:hover:shadow-secondary duration-300 transition-all rounded-lg sm:p-2 sm:pb-3`}
      >
        {user && user?.id && title !== "dashboard" && (
          <>
            {favoriteId && favoriteId.some((item) => item === itemDb.id) ? (
              <FaHeart
                color="#f45e0c"
                onClick={(e) => {
                  handleFavoriteClick(e);
                  deleteFavorite(
                    user?.id,
                    itemDb.numberFavorite,
                    itemDb.id
                  ).finally(() => {});
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
                      id: itemDb.id,
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
        <div className="relative flex items-center p-[2px]  flex-col justify-center w-full">
          <Image
            src={product?.bigimageUrl}
            alt="image"
            width={167}
            height={111}
            className={`rounded-lg  ${
              title === "sale"
                ? "w-full above-405:h-[170px] min-h-[160px] max-h-[160px] sm:h-[211px]"
                : " w-full above-405:h-[190px] min-h-[190px] max-h-[190px] sm:h-[211px]"
            } bg-red-50 sm:group-hover:scale-[1.03] duration-300 transition-all`}
          />{" "}
          {product.isDiscount && product.discount && product.discount > 0 && (
            <p
              className={`group-hover:opacity-0 backdrop-blur-md min-w-[30px] absolute ${
                title === "dashboard" ? "flex" : "flex "
              } text-12 left-1 bg-gradient-to-l dark:to-transparent to-red-50 from-red-400 dark:from-red-400 dark:text-red-100 z-[2] duration-300 transition-all top-3 p-2 rounded-full text-secondary-500`}
            >
              {product?.discount} $
            </p>
          )}
          {product.colors && (
            <div className="sm:flex hidden group-hover:opacity-0 duration-300 transition-all mt-2 flex-row sm:flex-col gap-1 sm:absolute sm:top-12 sm:-right-1">
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
            className={`lg:text-16 text-14 md:text-10 w-full overflow-hidden mb-2 line-clamp-1 text-secondary-400 font-[500]`}
          >
            {product.name}
          </h3>
          <div className="w-full h-fit sm:h-[33px]">
            {title !== "dashboard" && (
              <Link
                className="w-full hidden group px-3 dark:bg-blue-900 dark:hover:bg-blue-800 border opacity-0 rounded-lg py-2 group-hover:opacity-100 border-black hover:border-blue-700 duration-300 transition-all hover:bg-blue-900 text-white bg-primary hover:text-white items-center sm:group-hover:flex justify-center gap-2"
                href={`/products/${product.category}/${product.id}`}
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
              <span className="text-12 dark:text-neutral-500 sm:text-16">
                {product.price}$
              </span>
              {product.isDiscount && (
                <span className="line-through text-11 sm:text-12 dark:text-neutral-400 decoration-secondary group-hover:opacity-0 text-neutral-600">
                  $
                  {product.discount &&
                    (product.discount * 0.01 * product.price).toFixed(2)}
                </span>
              )}
              {title === "dashboard" && (
                <div className="flex gap-2 item-center">
                  <button
                    onClick={(e) => {
                      router.push(`/dashboard/AddItem?id=${product.id}`);
                      handleFavoriteClick(e);
                    }}
                    // href={`/dashboard/AddItem?id=${product.id}`}
                  >
                    <FileEdit />
                  </button>

                  <RiDeleteBin6Line
                    onClick={(e) => {
                      handleFavoriteClick(e);
                      deleteProducts();
                    }}
                    size={24}
                    color="red"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      // <motion.div
      //   initial={{ opacity: 0 }}
      //   whileInView={{ opacity: 1 }}
      //   transition={{ duration: 0.5 }}
      //   // href={
      //   //   title !== "dashboard"
      //   //     ? `/products/${product.category}/${product.id}`
      //   //     : "#"
      //   // }
      //   // style={{ boxShadow: shadowColor }} // Apply custom shadow here

      //   onClick={() => {
      //     router.push(
      //       `${
      //         title !== "dashboard"
      //           ? `/products/${product.category}/${product.id}`
      //           : "#"
      //       }`
      //     );
      //   }}
      //   key={product.name}
      //   className={`${
      //     title === "sale"
      //       ? "bg-white border dark:bg-neutral-900/90 max-h-[300px] min-w-[180px]"
      //       : "sm:h-fit border h-full lg:min-w-[250px] lg:max-w-[250px] sm:w-full max-w-[300px]"
      //   } flex sm:gap-5  py-9 border-neutral-200 shadow-lg    dark:shadow-secondary-500 dark:border-secondary  shadow-neutral-400 overflow-hidden flex-col group relative  items-center justify-center dark:hover:shadow-lg dark:hover:shadow-secondary duration-300 transition-all rounded-lg sm:p-2 sm:pb-3 `}
      // >
      //   {user && user.id && title !== "dashboard" && (
      //     <>
      //       {favoriteId && favoriteId.some((item) => item === itemDb.id) ? (
      //         <FaHeart
      //           color="#f45e0c"
      //           onClick={(e) => {
      //             handleFavoriteClick(e);
      //             deleteFavorite(
      //               user.id,
      //               itemDb.numberFavorite,
      //               itemDb.id
      //             ).finally(() => {});
      //             deleteFavoriteId();
      //           }}
      //           className="absolute p-3 size-[23px] box-content sm:size-[23px] top-1 z-[2] right-1"
      //         />
      //       ) : (
      //         <FaRegHeart
      //           color="#f45e0c"
      //           onClick={(e) => {
      //             handleFavoriteClick(e);
      //             addfavorite({
      //               id: user.id,
      //               item: {
      //                 name: itemDb.name,
      //                 categroy: itemDb.category,
      //                 price: itemDb.price,
      //                 colors: itemDb.colors,
      //                 id: itemDb.id,
      //                 image: itemDb.bigimageUrl,
      //                 numberFavorite: itemDb.numberFavorite,
      //               },
      //             });
      //             addFavoriteid();
      //           }}
      //           className="absolute p-3 size-[23px] sm:size-[23px] box-content top-1 z-[2] right-1"
      //         />
      //       )}
      //     </>
      //   )}
      //   <div className="relative flex items-center  p-[2px] flex-col justify-center w-full">
      //     <Image
      //       src={product?.bigimageUrl}
      //       alt="image"
      //       width={217}
      //       height={161}
      //       className="sm:w-[217px] rounded-lg w-full above-405:h-[160px] h-[190px] sm:h-[241px] sm:group-hover:scale-[1.03] duration-300 transition-all"
      //     />{" "}
      //     {product.isDiscount && product.discount && product.discount > 0 && (
      //       <p
      //         className={`group-hover:opacity-0 backdrop-blur-md min-w-[30px] absolute ${title === "dashboard" ? "flex" : "flex "}  text-12 left-1  bg-gradient-to-l dark:to-transparent to-red-50 from-red-400 dark:from-red-400 dark:text-red-100 z-[2] duration-300  transition-all top-3 p-2 rounded-full text-secondary-500 `}
      //       >
      //         {product?.discount} $
      //       </p>
      //     )}
      //     {product.colors && (
      //       <div className="sm:flex  hidden group-hover:opacity-0 duration-300 transition-all mt-2 flex-row sm:flex-col gap-1 sm:absolute sm:top-12 sm:-right-1">
      //         {product.colors.map((color: any, index: number) => {
      //           if (index < 3)
      //             return (
      //               <span
      //                 key={color.name}
      //                 className="w-4 h-4 rounded-full"
      //                 style={{ backgroundColor: color.color }}
      //               ></span>
      //             );
      //           else if (index === 3) {
      //             return (
      //               <span key={index} className="rounded-full text-18">
      //                 +
      //               </span>
      //             );
      //           }
      //         })}
      //       </div>
      //     )}
      //   </div>
      //   <div className="flex gap-2 pt-1 sm:pt-0 p-2 sm:p-[2px] w-full flex-col">
      //     <hr className="h-[2px] bg-gradient-to-r dark:hidden from-white via-slate-500 to-white border-0" />
      //     <h3
      //       className={`lg:text-16 text-14 md:text-10  w-full overflow-hidden mb-2 line-clamp-1 text-secondary-400 font-[500]`}
      //     >
      //       {product.name}sdaffsdfsd sdf sdf sd sdaf sa sdfa
      //     </h3>
      //     <div className="w-full h-fit sm:h-[33px]">
      //       {title !== "dashboard" && (
      //         <Link
      //           className="w-full hidden group px-3 dark:bg-blue-900  dark:hover:bg-blue-800 border opacity-0  rounded-lg py-2 group-hover:opacity-100 border-black hover:border-blue-700 duration-300 transition-all hover:bg-blue-900 text-white bg-primary hover:text-white items-center sm:group-hover:flex justify-center gap-2"
      //           href={`/products/${product.category}/${product.id}`}
      //         >
      //           <MdOutlineShoppingCart color="white" />
      //           <span>Add to Cart</span>
      //         </Link>
      //       )}
      //       <div
      //         className={`${
      //           title === "dashboard"
      //             ? "opacity-100"
      //             : " sm:group-hover:opacity-0 opacity-100 sm:group-hover:hidden"
      //         } flex relative text-black mt-1 sm:mt-4 justify-between`}
      //       >
      //         <span className="text-12 dark:text-neutral-500 sm:text-16">
      //           {product.price}$
      //         </span>
      //         {product.isDiscount && (
      //           <span className="line-through text-11 sm:text-12  dark:text-neutral-400 decoration-secondary  group-hover:opacity-0  text-neutral-600">
      //             $
      //             {product.discount &&
      //               (product.discount * 0.01 * product.price).toFixed(2)}
      //           </span>
      //         )}
      //         {/* mobile btn add yui to cart */}
      //         {title === "dashboard" && (
      //           <div className="flex gap-2 item-center">
      //             <Link href={`/dashboard/AddItem?id=${product.id}`}>
      //               <FileEdit />
      //             </Link>

      //             <RiDeleteBin6Line
      //               onClick={(e) => {
      //                 handleFavoriteClick(e);
      //                 deleteProducts();
      //               }}
      //               size={24}
      //               color="red"
      //             />
      //           </div>
      //         )}
      //       </div>
      //     </div>
      //   </div>
      // </motion.div>
    );
  }
};

export default NewProducts;
