"use client";
import React from "react";
import { CiShop } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { GrRadialSelected } from "react-icons/gr";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const HeaderproductInfo = ({
  productinfos,
  onQuantity,
  quantity,
  onSelectedColor,
  selectedColor,
}: {
  quantity: number;
  selectedColor: string;
  onSelectedColor: (item: { name: string; color: string }) => void;
  productinfos?: {
    name: string;
    colors: { name: string; color: string }[];
    brand: string;
    price: number;
    discount: number;
    infos: { title: string; description: string }[];
  };
  onQuantity: (type: "increase" | "decrease") => void;
}) => {
  const t = useTranslations("productInfo");

  return (
    <>
      {/* Product Name */}
      <motion.h2
        className="font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {productinfos?.name}
      </motion.h2>

      {/* Product Info */}
      <div className="flex justify-between w-full sm:gap-6 gap-0 px-5 items-center">
        <motion.span
          className="flex md:text-12 text-12 lg:text-16 items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CiShop color="blue" className="lg:w-5 lg:h-5 w-5 h-5" />
          <span>{t("inStock")}</span>
        </motion.span>
        <motion.span
          className="flex md:text-12 text-12 lg:text-16 items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GoVerified
            color="blue"
            className="lg:w-5 lg:h-5 w-5 h-5 md:w-4 md:h-4"
          />
          <span>{t("guaranteed")}</span>
        </motion.span>
        <motion.span
          className="flex md:text-12 text-12 lg:text-16 items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TbTruckDelivery
            color="blue"
            className="lg:w-6 lg:h-5 min-w-5 min-h-5"
          />
          <span>{t("freeDelivery")}</span>
        </motion.span>
      </div>

      {/* Select Color */}
      <motion.div
        className="flex md:text-14 lg:text-16 items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <span>{t("selectColor")}</span>
        <div className="flex gap-2 items-center justify-center">
          {productinfos?.colors.map((item) => (
            <motion.div
              key={item.color}
              onClick={() => onSelectedColor(item)}
              style={{ backgroundColor: item.color }}
              className="w-5 h-5 flex items-center justify-center border-black/20 rounded-full duration-300 hover:scale-[1.1] border-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedColor === item.name && (
                <GrRadialSelected className="w-3 h-3" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Price and Quantity Section */}
      <motion.div
        className="flex justify-between flex-col w-[80%] lg:w-[70%] md:w-[90%] items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <span className="flex items-center w-full justify-between">
          <p className="flex items-center gap-2">
            <p className="text-17">{t("price")}:</p>
            <p className="font-serif">{productinfos?.price}</p>$
          </p>
          <span className="flex items-center -mr-2 gap-2">
            <button
              onClick={() => onQuantity("decrease")}
              className="font-semibold p-2 text-22"
            >
              -
            </button>
            <span className="px-3 py-[2px] rounded-lg bg-secondary-400 hover:bg-secondary-600 text-white">
              {quantity}
            </span>
            <button
              onClick={() => onQuantity("increase")}
              className="font-semibold p-2 text-22"
            >
              +
            </button>
          </span>
        </span>
        {productinfos?.discount !== 0 && (
          <p className="flex items-center gap-3">
            <p>{t("discount")}: </p>
            <p className="font-serif">{productinfos?.discount}%</p>
          </p>
        )}
        <p className="flex items-center justify-center gap-3">
          <p>{t("totalPrice")}: </p>
          <span>
            <span className="font-serif">
              {productinfos?.price
                ? productinfos.discount && productinfos.discount !== 0
                  ? (
                      quantity *
                      productinfos.price *
                      (1 - productinfos.discount / 100)
                    ).toFixed(2)
                  : (quantity * productinfos.price).toFixed(2)
                : "0.00"}
              $
            </span>
          </span>
        </p>
      </motion.div>
    </>
  );
};

export default HeaderproductInfo;
