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
                className="flex items-center border-[2px] gap-2 font-semibold px-2 pr-4 py-1 rounded-lg border-neutral-400 w-fit  sm:w-[120px] justify-between"
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
        <div className="flex items-center border-[2px] gap-2 font-semibold px-2 py-1 pr-4 rounded-lg border-neutral-400 min-w-[120px] justify-between">
          <span>
            Price : {item[0]} - {item[1]}
          </span>
        </div>
      )}
      {type === "discount" && item === true ? (
        <div
          onClick={() => onDelete && onDelete("discount", "d")}
          className="flex items-center border-[2px] font-semibold px-2 py-1 rounded-lg pr-4 gap-2 border-neutral-400 w-fit sm:w-[120px] justify-between"
        >
          <span> {item && "Discounted"}</span>
          <IoMdCloseCircleOutline className="w-4 h-4" />
        </div>
      ) : null}
    </>
  );
};

export default Filtered;
