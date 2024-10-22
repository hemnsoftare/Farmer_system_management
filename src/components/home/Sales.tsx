"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Sales = () => {
  const [NewProducts, setNewProducts] = useState<
    { count: number; name: string; image: string; discount?: number }[]
  >([
    { count: 0, name: "Logitech G502 Gaming Mouse", image: "mouse.svg" },
    {
      count: 1,
      name: "Apple Watch Series 7 (GPS, 41MM)",
      image: "smartWatch.svg",
      discount: 15,
    },
    {
      count: 2,
      name: "NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Resistant Design",
      image: "keyboard.svg",
    },
    {
      count: 3,
      name: "Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)",
      image: "laptop.svg",
      discount: 12,
    },
    {
      count: 4,
      name: "samsung Titan smart watch",
      image: "oldSmart.svg",
    },
  ]);
  const [count, setcount] = useState(0);
  return (
    <div className="flex bg-primary-500 shadow-blue-950 shadow-md relative rounded-md overflow-hidden py-3 px-7 text-white gap-4">
      <Image
        src={"salesShape.svg"}
        alt="image"
        width={361}
        height={156}
        className="absolute z-1 top-0 left-0 rotate-[-100]"
      />
      <div className="w-[25%] flex z-10 flex-col items-center justify-between   ">
        <div className="flex flex-col items-center py-12 gap-2">
          <h2 className="font-bold text-2xl">Products On Sales</h2>
          <h3>Shop now!</h3>
        </div>
        <Link
          href={""}
          className="hover:tracking-wider duration-200 pb-11 transition-all hover:text-secondary-300"
        >
          View all &gt;
        </Link>
      </div>
      {/* new products */}

      <div className="flex flex-1 text-black content-end flex-col flex-wrap  gap-0">
        <div className="flex md:gap-3 xl:gap-12   lg:gap-7  items-center overflow-hidden flex-row-reverse justify-center">
          {NewProducts.map((item, index) => {
            const islast = index > count + 3;
            console.log(islast, index);
            if (islast || index < count) {
              console.log("in if");
              return null;
            } else {
              return (
                <Link
                  key={index}
                  href={item.name}
                  className="relative hover:shadow-lg hover:shadow-white duration-200 transition-all p-2 bg-white flex w-[180px] rounded-md flex-col gap-2"
                >
                  <Image
                    src={item.image}
                    alt="image"
                    width={180}
                    height={186}
                    className="w-[150px] h-[150px] "
                  />
                  <p className="text-xs h-[30px] font-light overflow-hidden">
                    {item.name}
                  </p>
                  <p className="flex justify-between w-full items-center">
                    <span className="text-xs line-through text-neutral-600">
                      $432.23
                    </span>
                    <span className="text-xs"> $234.3</span>
                  </p>
                  <p className="absolute  left-0 top-4 bg-secondary-100 px-2 text-xs py-1 rounded-r-full text-secondary">
                    {item.discount} -34$
                  </p>
                </Link>
              );
            }
          })}
        </div>
        <div className="flex self-end gap-2 pt-2">
          <button
            disabled={count == 0}
            onClick={() => setcount(count - 1)}
            className=" text-xs bg-white font-medium hover:text-primary duration-200 rounded-full px-2 py-1 transition-all"
          >
            &lt;
          </button>
          <button
            onClick={() =>
              setcount(count + 4 >= NewProducts.length ? 0 : count + 1)
            }
            className=" text-xs bg-white font-medium hover:text-primary duration-200 rounded-full px-2 py-1 transition-all"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
