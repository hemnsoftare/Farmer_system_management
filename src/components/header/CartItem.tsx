"use client";
import React from "react";
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDeleteOutline, MdOutlineVerified } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { Cart } from "@/lib/action";
import { ItemCartProps } from "@/lib/action";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "@/lib/store/Order";
import { useToast } from "@/hooks/use-toast";
const CartItem = ({
  item,
  lngRemove,
  type,
}: {
  type?: "headerItem";
  item: ItemCartProps;
  lngRemove?: string;
}) => {
  const { toast } = useToast();

  const dispatch = useDispatch();
  return (
    <div
      className={` ${
        type === "headerItem"
          ? "items-center w-full b sm:min-w-[500px]"
          : "  w-full items-center"
      } shadow-md p-2   flex gap-2 rounded-md group duration-300 hover:shadow-lg `}
    >
      <Image
        src={item.image}
        alt="image "
        width={174}
        height={140}
        className={` ${
          type === "headerItem" ? "w-[154px] h-[100px]" : " w-[150px] h-[100px]"
        }  md:group-hover:scale-[1.1] duration-300 rounded-lg  transition-all `}
      />
      <div className="flex flex-col h-full  px-3 items-start dark:bg-transparent bg-white   shadow-neutral-50    w-full justify-between py-3 gap-2">
        <h2 className="lg:text-16 md:text-14 w-full font-semibold dark:text-neutral-600 text-neutral-900 text-wrap">
          {item.name}
        </h2>
        <p className="text-10 flex items-center gap-2 text-neutral-600">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.colors.color }}
          />
          <span>{item.colors.name}</span>
        </p>

        <div className="flex items-center  w-full gap-6 justify-between ">
          <p className="text-12 dark:text-neutral-600 text-neutral-900">
            $ {item.price * item.quantity}
          </p>
          <div className="flex  items-center  px-5 gap-2">
            <GoTrash
              onClick={() => {
                toast({
                  title: "Remove ",
                  description: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "red",
                      }}
                    >
                      <MdDeleteOutline
                        color="red"
                        style={{ marginRight: "8px" }}
                      />
                      <span>{lngRemove}</span>
                    </div>
                  ),
                  style: {
                    backgroundColor: "#fef7f7",
                    color: "red",
                    borderColor: "red",
                    borderWidth: "2px",
                    borderRadius: "10px",
                    padding: "8px",
                  },
                });
                dispatch(
                  removeItem({
                    name: item.name,
                    id: item.id,
                    color: item.colors.color,
                  })
                );
              }}
              color="red"
            />
            <button
              onClick={() =>
                dispatch(
                  updateItem({
                    name: item.name,
                    type: "increase",
                    id: item.id,
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
                    id: item.id,
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
