import React from "react";
import PropTypes from "prop-types";
import { PiCheckFatFill } from "react-icons/pi";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogTrigger } from "../ui/dialog";

const Success = ({ onClose }: { onClose: () => void }) => {
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
          <span>Full Name</span> <span>hemn software</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>email</span>
          <span> hemnsoftware@gmail.com</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>phone number </span> <span> +964 750 226 7967</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>Transaction id</span> <span>32423423</span>
        </li>
        <li className="flex capitalize items-center justify-between ">
          <span>Amount discount</span> <span> $ 21.23</span>
        </li>
        <li className="flex capitalize text-black items-center justify-between ">
          <span>Amount Paid</span> <span> $ 432.23</span>
        </li>
      </ul>
      <DialogTrigger>
        {" "}
        <button
          onClick={onClose}
          className="bg-primary px-10 rounded-lg py-2 hover:bg-blue-800 duration-300 text-white self-end"
        >
          Order status
        </button>
      </DialogTrigger>
    </div>
  );
};

export default Success;
