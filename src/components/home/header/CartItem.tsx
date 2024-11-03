"use client";
import React from "react";
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { Cart } from "@/type";
import { ItemCartProps } from "@/type/globals";
import { useDispatch } from "react-redux";
import { updateItem } from "@/lib/action/Order";
const CartItem = ({
  item,
  type,
}: {
  type?: "headerItem";
  item: ItemCartProps;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={` ${
        type === "headerItem"
          ? "items-center min-w-[500px]"
          : "  w-full items-center"
      } shadow-md p-2   flex gap-2 rounded-md group duration-300 hover:shadow-lg `}
    >
      <Image
        src={item.image}
        alt="image "
        width={174}
        height={140}
        className={` ${
          type === "headerItem" ? "w-[154px] h-[100px]" : " w-[200px] h-[150px]"
        }  group-hover:scale-[1.1] duration-300 transition-all `}
      />
      <div className="flex flex-col h-full  items-start bg-white   shadow-neutral-50    w-full justify-between py-3 gap-2">
        <h2 className="lg:text-16 md:text-14 w-full font-semibold text-neutral-900 text-wrap">
          {item.name}
        </h2>
        <p className="text-10 flex items-center gap-2 text-neutral-600">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.colors.color }}
          />
          <span>{item.colors.name}</span>
        </p>
        <p
          className={` ${
            type === "headerItem" && "hidden"
          } flex  gap-2 md:text-12 lg:text-14 items-center`}
        >
          <TbTruckDelivery className="text-blue-500 w-4 h-4" />
          <span>free</span>
        </p>
        <p
          className={` ${
            type === "headerItem" && "hidden"
          } flex  gap-2 md:text-12 lg:text-14 items-center`}
        >
          <MdOutlineVerified className="text-blue-500 w-4 h-4" />
          <span>guarantee</span>
        </p>
        <div className="flex items-center  w-full gap-6 justify-between ">
          <p className="text-12 text-neutral-900">
            $ {item.price * item.quantity}
          </p>
          <div className="flex  items-center  px-5 gap-2">
            <GoTrash color="red" />
            <button
              onClick={() =>
                dispatch(
                  updateItem({
                    name: item.name,
                    type: "increase",
                    color: item.colors.color,
                  })
                )
              }
              className="p-1 hover:bg-purple-50"
            >
              +
            </button>
            <span className="border-b-2  border-neutral-300">
              {" " + item.quantity + " "}
            </span>
            <button
              // disabled={item.quantity === 1}
              onClick={() =>
                dispatch(
                  updateItem({
                    name: item.name,
                    type: "decrease",
                    color: item.colors.color,
                  })
                )
              }
              className="p-1 hover:bg-purple-50"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
