import { servies } from "@/util/data";
import Image from "next/image";
import React from "react";

const Servies = () => {
  return (
    <div className="flex items-center mb-3 px-2 justify-between">
      {servies.map((item) => {
        return (
          <div
            key={item.image}
            className="flex flex-col sm:flex-row group group-hover:gap-12 duration-300 items-center gap-1"
          >
            <Image
              src={item.image}
              alt="imae"
              width={30}
              height={33}
              className="sm:object-fill w-[25px] h-[25px] sm:group-hover:scale-[1.07] duration-300"
            />
            <span className="md:text-[10px] text-10 lg:text-[15px] group-hover:translate-x-6 duration-300 group-hover:text-primary-400 group-hover:scale-[1.2]">
              {" "}
              {item.name}{" "}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Servies;
