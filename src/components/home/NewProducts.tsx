"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { Productsprops } from "../../../type";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";

const NewProducts = ({
  data,
  title,
}: {
  title: string;
  data: Productsprops[];
}) => {
  const [state, setState] = useState<number[]>([]);

  const handlef = (index: number) => {
    setState((prevState) => {
      const exists = prevState.some((item) => item === index);
      if (exists) {
        // Remove the item if it exists
        return prevState.filter((item) => item !== index);
      } else {
        // Add the item if it doesn't exist
        return [...prevState, index];
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* top */}
      <div className="flex justify-between border-b-4 pb-4 border-neutral-400">
        <h3 className="text-[32px] text-black">{title}</h3>
        <Link href={"/"} className="text-[16px] flex gap-2">
          view all <MdNavigateNext />
        </Link>
      </div>

      {/* card */}
      <div className="flex items-center xl:gap-8 xl:justify-center justify-between">
        {data.map((item, index) => {
          const exists = state.some((f) => f === index);
          const f = exists ? "bg-blue-500" : "";
          return (
            <div
              key={item.name}
              className="flex gap-5 flex-col group relative w-[23%] xl:w-[20%] items-center lg:h-[400px] justify-center h-[347px] rounded-md shadow-gray-400 shadow-md hover:shadow-lg p-4"
            >
              <div className="relative">
                {item.persentageDiscount && (
                  <p className="absolute group-hover:opacity-0 z-10 duration-300 transition-all left-0 top-4 bg-secondary-100 px-3 py-1 rounded-r-full text-secondary-400 text-sm">
                    -{item.persentageDiscount} $
                  </p>
                )}

                <CiHeart
                  className={`object-cover opacity-0 ${f} z-10 group-hover:opacity-100 duration-300 xl:scale-[1.2] transition-all absolute top-4 left-4`}
                  onClick={() => handlef(index)}
                />

                <Image
                  src={item.image}
                  alt="image"
                  width={217}
                  height={161}
                  className="bg-rose-600 overflow-hidden w-[217px] h-[161px] group-hover:transform group-hover:scale-[1.1] scale-[1] duration-300 transition-all"
                />
                {item.color && (
                  <div className="flex group-hover:opacity-0 duration-300 transition-all flex-col gap-1 absolute top-12 right-2">
                    {item.color.map((color, index) => {
                      if (index < 3)
                        return (
                          <span
                            key={color}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          ></span>
                        );
                      else if (index === 3) {
                        return (
                          <span
                            key={index}
                            className="rounded-full w-4 h-4 text-center"
                          >
                            +
                          </span>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
              <div className="flex gap-10 h-fit w-full flex-col">
                <hr className="h-[2px] bg-gradient-to-r from-white via-slate-500 to-white border-0" />
                <h3 className="text-[16px] h-[53px] overflow-hidden text-primary-500 font-light">
                  {item.name}
                </h3>
                <div className="flex justify-between relative -mb-8 items-center">
                  {item.discount && (
                    <span className="line-through absolute -top-4 text-sm left-0 text-neutral-600">
                      ${item.discount}
                    </span>
                  )}
                  <span>{item.price}$</span>
                  <span className="flex items-center justify-center gap-1">
                    {item.pointStart} <FaStar />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewProducts;
