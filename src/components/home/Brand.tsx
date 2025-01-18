import { brand } from "@/util/data";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const Brand = () => {
  return (
    <div className="flex flex-col px-3 dark:bg-neutral-800 rounded-lg items-center w-full justify-center">
      <div className="flex justify-between border-b-4 w-full  pb-4 border-neutral-400">
        <h3 className="sm:text-[32px] text-[20px] pl-3 dark:text-white ">
          Top Brand
        </h3>
      </div>
      <motion.div
        initial={{ translateY: 150 }}
        whileInView={{ translateY: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="flex gap-2 items-center w-full justify-between  sm:justify-center md:gap-4 lg:gap-5"
      >
        {brand.map((item) => {
          return (
            <Image
              key={item}
              src={item}
              alt=""
              width={60}
              height={70}
              className={` ${
                item === "/Apple.webp"
                  ? "w-[55px] lg:min-w-[100px] lg:min-h-[60px] h-[40px]"
                  : "lg:min-w-[140px] lg:min-h-[90px]  above-405:w-[70px] above-405:h-[60] w-[60px] h-[50px] xl:w-[150px] xl:h-[90px] mt-4 md:w-[100px] md:h-[80px]"
              } ${item === "/canon.svg" ? "hidden sm:block" : "block"}  `}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default Brand;
