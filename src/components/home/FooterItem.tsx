import { footer } from "@/util/data";
import React from "react";

import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
const FooterItem = () => {
  return (
    <div className="flex justify-between flex-1 mr-12  items-center lg:gap-8 md:gap-4">
      {footer.map((items) => (
        <div
          key={items.name}
          className="flex justify-between b flex-col gap-2 text-white"
        >
          <h2 className="text-[16px] font-semibold">{items.name}</h2>
          {items.item.map((data) => (
            <p
              key={data.name}
              className="flex items-center group cursor-pointer hover:underline hover:text-blue-400 hover:underline-offset-4    gap-2"
            >
              {data.icon && (
                <span className="mr-2">
                  {data.icon === "phone" ? (
                    <FaPhoneVolume className="group-hover:text-blue-400 text-white" />
                  ) : data.icon === "location" ? (
                    <IoLocationOutline className="group-hover:text-blue-400" />
                  ) : (
                    <MdOutlineMailOutline className="group-hover:text-blue-400" />
                  )}
                </span>
              )}{" "}
              <span className="text-[14px]"> {data.name}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterItem;
