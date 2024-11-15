"use client";
import React from "react";
import { PiCheckFatFill } from "react-icons/pi";

import { OrderType } from "@/type";
import { useRouter } from "next/navigation";

const Success = ({ order }: { order: OrderType | undefined }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 justify-center flex-col">
      <div className="flex items-center rounded-full shadow-xl shadow-neutral-400 justify-center p-6 ">
        <PiCheckFatFill color="#146C43" className="w-10 h-10 " />
      </div>
      <h2 className="text-[#146C43] mt-4 font-black  text-24 ">
        Successful Payment
      </h2>
      <ul className=" flex flex-col gap-3 w-full text-neutral-500 ">
        <li className="flex capitalize items-center justify-between ">
          <span>Full Name</span> <span>{order?.fullName}</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>email</span>
          <span>{order?.email[0].emailAddress}</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>phone number </span> <span> {order?.phoneNumber}</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>Transaction id</span> <span>{order?.id}</span>
        </li>
        {order?.totaldiscountPrice && order?.totaldiscountPrice > 0 ? (
          <li className="flex capitalize items-center justify-between ">
            <span>Amount discount</span> <span> $ {order?.totalAmount}</span>
          </li>
        ) : null}
        <li className="flex capitalize text-black items-center justify-between ">
          <span>Amount Paid</span> <span> $ {order?.totalAmount}</span>
        </li>
      </ul>
      <>
        {" "}
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-primary px-10 rounded-lg py-2 hover:bg-blue-800 duration-300 text-white self-end"
        >
          Order status
        </button>
      </>
    </div>
  );
};

export default Success;
