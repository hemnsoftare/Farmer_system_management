import React, { useState } from "react";
import { CiShop } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { ProductInfoProps } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "@/lib/action/Order";
import { GrRadialSelected } from "react-icons/gr";

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
  productinfos?: ProductInfoProps;
  onQuantity: (type: "increase" | "decrease") => void;
}) => {
  console.log(selectedColor);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <>
      <h2 className="font-bold">{productinfos?.name}</h2>
      <div className="flex justify-between gap-6 items-center">
        <span className="flex md:text-12 lg:text-16 items-center gap-2">
          <CiShop color="blue" className="lg:w-5 lg:h-5 md:w-4 md:h-4" />
          <span>in stock</span>
        </span>
        <span className="flex md:text-12 lg:text-16 items-center gap-2">
          <GoVerified color="blue" className="lg:w-5 lg:h-5 md:w-4 md:h-4" />
          <span>Guaranteed</span>
        </span>
        <span className="flex md:text-12 lg:text-16 items-center gap-2">
          <TbTruckDelivery
            color="blue"
            className="lg:w-6 lg:h-5 md:w-4 md:h-4"
          />
          <span>Free Delivery</span>
        </span>
      </div>
      <div className="flex md:text-14 lg:text-16 items-center gap-5">
        <span>Select color</span>
        <div className="flex gap-2 items-center justify-center">
          {productinfos?.colors.map((item) => (
            <div
              onClick={() => onSelectedColor(item)}
              key={item.color}
              style={{ backgroundColor: item.color }}
              className="w-5 h-5 flex items-center justify-center border-black/20 rounded-full duration-300 hover:scale-[1.1] border-2 "
            >
              {selectedColor === item.name && (
                <GrRadialSelected className="w-3 h-3" />
              )}
            </div>
          ))}
        </div>
      </div>
      <ul className="text-neutral-500 list-disc px-8 lg:w-[70%] md:w-[90%]  flex flex-col items-center justify-between">
        <li className="w-full md:text-12 lg:text-14 flex justify-between items-center">
          <span>Brand</span>
          <span className="text-black font-semibold">
            {productinfos?.brand}
          </span>
        </li>
        {productinfos?.infos.map((item) => (
          <li
            key={item.title}
            className="w-full md:text-12 lg:text-14 flex justify-between items-center"
          >
            <span>{item.title}</span>
            <span className="text-black font-semibold">{item.description}</span>
          </li>
        ))}
      </ul>
      <span className="flex justify-between flex-col lg:w-[70%] md:w-[90%] items-start">
        <span className="flex items-center w-full justify-between">
          {" "}
          <span className="flex items-center gap-2">
            <span className="text-17 ">Price:</span>
            <span className="font-serif">{productinfos?.price}</span>$
          </span>
          <span className="flex items-center gap-2">
            <button
              onClick={() => {
                onQuantity("decrease");
              }}
              className="font-semibold text-18"
            >
              -
            </button>
            <span className="px-3 py-[2px] rounded-lg bg-secondary-400 hover:bg-secondary-600 text-white">
              {quantity}
            </span>
            <button
              onClick={() => {
                onQuantity("increase");
              }}
              className="font-semibold text-18"
            >
              +
            </button>
          </span>
        </span>
        {productinfos?.discount && (
          <span>
            <span>discount : </span>{" "}
            <span className="font-serif">{productinfos?.discount}%</span>
          </span>
        )}
        <span>
          <span>total price : </span>{" "}
          <span className="font-serif">129,122.2$</span>
        </span>
      </span>
    </>
  );
};

export default HeaderproductInfo;
