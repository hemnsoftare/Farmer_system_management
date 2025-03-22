import React from "react";
import { typeFilter } from "@/lib/action";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useFilterProducts from "@/lib/store/filterProducts";

const Filtered = ({
  type,
  item,
}: {
  type: "color" | "brand" | "discount" | "price";
  item: any;
}) => {
  const { updateBrand, updateColor, updateDiscount, updatePrice } =
    useFilterProducts();
  return (
    <>
      {type !== "price" &&
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
                  onClick={() => {
                    // updatePrice()
                    type === "brand" ? updateBrand(item) : updateColor(item);
                  }}
                />
              </div>
            )
        )}
      {type === "price" && item && item[0] !== "" && (
        <div className="flex items-center border-[2px] gap-2 font-semibold px-2 py-1 pr-4 rounded-lg border-neutral-400 min-w-[120px] justify-between">
          <span>
            Price : {item[0]} - {item[1]}
          </span>
        </div>
      )}
      {type === "discount" && item === true ? (
        <div
          onClick={() => updateDiscount()}
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
