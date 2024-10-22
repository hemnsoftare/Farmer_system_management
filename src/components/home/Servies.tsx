import { servies } from "@/util/data";
import Image from "next/image";
import React from "react";

const Servies = () => {
  return (
    <div className="flex items-center  justify-between">
      {servies.map((item) => {
        return (
          <div
            key={item.image}
            className="flex group group-hover:gap-12 duration-300 items-center gap-2"
          >
            <Image
              src={item.image}
              alt="imae"
              width={30}
              height={33}
              className="object-fill group-hover:scale-[1.2] duration-300"
            />
            <span className="md:text-[10px] lg:text-[15px] group-hover:translate-x-6 duration-300 group-hover:text-primary-400 group-hover:scale-[1.2]">
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
