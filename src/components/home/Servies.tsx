import { servies } from "@/util/data";
import Image from "next/image";
import React from "react";

const Servies = () => {
  return (
    <div className="flex items-center mb-3 px-2 w-full justify-between">
      {servies.map((item) => {
        return (
          <div
            key={item.image}
            className="flex flex-col  sm:flex-row group sm:group-hover:gap-12 duration-300 items-center gap-1"
          >
            <Image
              src={item.image}
              alt="imae"
              width={30}
              height={33}
              className="sm:object-fill sm:min-w-[36px] sm:min-h-[36px] w-[25px] h-[25px] sm:group-hover:scale-[1.07] duration-300"
            />
            <p className=" text-10 above-405:text-11  lg:text-17 w-full h-full group-hover:mx-6 duration-300 group-hover:text-primary-400 group-hover:scale-[1.2]">
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Servies;
