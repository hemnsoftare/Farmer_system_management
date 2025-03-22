"use client";
import { FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import useFilterProducts from "@/lib/store/filterProducts";
interface FilterSectionProps {
  title: string;
  items: { name: string; color: string }[] | string[];
  filterKey: string;
  selectedItems: string[];
}

const FilterSection = ({
  title,
  items,
  filterKey,
  selectedItems,
}: FilterSectionProps) => {
  const { updateBrand, updateColor } = useFilterProducts();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex border-b-2 w-full mt-2 flex-col items-center gap-2">
      <p
        onClick={handleOpen}
        className="cursor-pointer px-4 py-1 rounded-lg sm:dark:hover:bg-neutral-700 sm:hover:bg-slate-100 duration-300 flex justify-between items-center w-full transition-all"
      >
        <span>{title}</span>
        <span
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transform duration-300 transition-all`}
        >
          <FaChevronDown />
        </span>
      </p>

      <ul
        className={`${
          isOpen ? "h-fit opacity-100" : "h-0 opacity-0"
        } duration-700 w-full transition-all overflow-hidden`}
      >
        {items.map((item, index) => {
          // Check if the item is an object with name and color or a string
          const displayText = typeof item === "string" ? item : item.name;

          return (
            <li
              className="flex w-full dark:text-white/70 items-center gap-2"
              key={index}
            >
              <input
                checked={selectedItems.includes(displayText)}
                type="checkbox"
                name={filterKey}
                value={displayText}
                onChange={(e) => {
                  if (filterKey === "color") updateColor(displayText);
                  else updateBrand(displayText);
                }}
                // handleCheckboxChange(e, filterKey)}}
                id={displayText}
              />
              <label htmlFor={displayText}>{displayText}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterSection;
