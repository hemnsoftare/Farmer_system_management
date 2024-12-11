import { servies } from "@/util/data";
import Image from "next/image";
import React from "react";
import { BiSolidTimer } from "react-icons/bi";
import { FaDesktop, FaShippingFast } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const Servies = () => {
  return (
    <div className="flex items-center mb-3 px-2 w-full justify-between  dark:text-gray-100">
      {servies.map((item) => {
        return (
          <div
            key={item.name}
            className="flex flex-col sm:flex-row group duration-300 items-center gap-1"
          >
            <item.image
              width={30}
              height={33}
              className={
                " sm:min-w-[36px] text-secondary  sm:min-h-[36px] w-[25px] h-[25px] sm:group-hover:scale-[1.07] duration-300"
              }
            />
            <p className="text-10 above-405:text-11 lg:text-17 w-full dark:text-gray-500 h-full sm:group-hover:translate-x-[30px] duration-300 sm:group-hover:text-primary-400 sm:group-hover:scale-[1.2]  dark:sm:group-hover:text-blue-400">
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Servies;
