import React from "react";
import { typeFilter } from "@/type";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Filtered = ({
  type,
  onDelete,
  item,
}: {
  type: "color" | "brand" | "discount" | "price";
  item: any;
  onDelete?: (type: string, item: string) => void;
}) => {
  return (
    <>
      {type !== "price" &&
        onDelete &&
        Array.isArray(item) &&
        item.length > 0 &&
        item.map(
          (item) =>
            item !== "" && (
              <div
                key={item}
                className="flex items-center border-[2px] font-semibold px-2 py-1 rounded-lg border-black w-[120px] justify-between"
              >
                <span> {item} </span>
                <IoMdCloseCircleOutline
                  className="w-4 h-4"
                  onClick={() => onDelete(type, item)}
                />
              </div>
            )
        )}
      {type === "price" && item[0] !== "" && (
        <div className="flex items-center border-[2px] font-semibold px-2 py-1 rounded-lg border-black w-[120px] justify-between">
          <span>
            {" "}
            {item[0]} - {item[1]}
          </span>
          <IoMdCloseCircleOutline className="w-4 h-4" />
        </div>
      )}
      {type === "discount" && item === "true" ? (
        <div className="flex items-center border-[2px] font-semibold px-2 py-1 rounded-lg border-black w-[120px] justify-between">
          <span> {item && "discounted"}</span>
          <IoMdCloseCircleOutline className="w-4 h-4" />
        </div>
      ) : null}
    </>
  );
};

export default Filtered;
