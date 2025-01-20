"use client";
import React, { memo, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Switch } from "../ui/switch";
import { catagoryProps, typeFilter } from "@/lib/action";
import { Slider } from "@nextui-org/react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import FilterSection from "./FilterSection ";
import { cn } from "@/lib/utils";
import { on } from "events";
import { motion } from "framer-motion";

const FilterItem = ({
  onFilter,
  filters,
  selected,
  filter,
  onClear,
  onOpen,
  type,
  closeFiltered,
}: {
  onFilter: (filter: typeFilter) => void;
  filters: typeFilter;
  closeFiltered?: () => void;
  onClear?: () => void;
  selected: string;
  filter: { [key: string]: boolean };
  type?: "page" | "header";
  onOpen: (type: string) => void;
}) => {
  const db = getFirestore(app);
  // const [filter, setFilter] = useState<{ [key: string]: boolean }>({});
  const [price, setPrice] = useState<number[]>([1, 100000]); // Default price range
  const [color, setColor] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [discount, setDiscount] = useState<boolean>(false);
  const [category, setcategory] = useState<catagoryProps | undefined>();

  useEffect(() => {
    if (filters) {
      setColor(filters.color || []);
      setBrand(filters.brand || []);
      setDiscount(filters.discount);
      setPrice(filters.price || [1, 100000]);
    }
  }, [filters]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!selected) return;
        const q = query(
          collection(db, "category"),
          where("name", "==", selected.trim())
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return;
        querySnapshot.forEach((doc) => {
          setcategory(doc.data() as catagoryProps);
        });
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    getData();
  }, [selected, db]);

  useEffect(() => {
    if (type === "page") {
      const filter: typeFilter = { brand, color, discount, price };
      onFilter(filter); // Trigger the filter update
    }
  }, [brand, color, discount, price, onFilter, type]); // Avoid unnecessary rerender by only triggering when relevant state changes

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemName: string
  ) => {
    const { value, checked } = e.target;

    if (itemName === "color") {
      setColor((prev) =>
        checked ? [...prev, value] : prev.filter((c) => c !== value)
      );
    } else if (itemName === "brand") {
      setBrand((prev) =>
        checked ? [...prev, value] : prev.filter((b) => b !== value)
      );
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    const newValue: [number, number] =
      Array.isArray(value) && value.length === 2
        ? (value as [number, number])
        : [1, 100000];
    setPrice(newValue);
  };

  const handleOpen = (type: string) => {
    onOpen(type);
  };

  return (
    <motion.div
      layout
      key="df"
      className="flex flex-col h-full duration-300 transition-all dark:text-secondary w-full items-center justify-start"
    >
      <FilterSection
        title="brand"
        items={category?.brands || []}
        filterKey="brand"
        selectedItems={brand}
        handleCheckboxChange={handleCheckboxChange}
      />
      <FilterSection
        title="color"
        items={category?.colors || []}
        filterKey="color"
        selectedItems={color}
        handleCheckboxChange={handleCheckboxChange}
      />
      {/* Discount */}
      <div className="flex items-center border-b-2 py-2 w-full justify-between px-4">
        <label htmlFor="discount">Discount</label>
        <Switch
          onClick={() => setDiscount((prev) => !prev)}
          className=" "
          id="discount"
        />
      </div>
      {/* Price Slider */}
      <div className="flex w-full items-center h-fit flex-col mt-2">
        <p
          onClick={() => handleOpen("price")}
          className="cursor-pointer px-4 py-1 rounded-lg sm:dark:hover:bg-neutral-700 sm:hover:bg-slate-100 duration-300 flex justify-between items-center w-full transition-all"
        >
          <span>price</span>
          <span
            className={`${filter["price"] ? "rotate-180" : "rotate-0"} transform duration-300`}
          >
            <FaChevronDown />
          </span>
        </p>
        <div
          className={`${filter["price"] ? "h-fit opacity-100" : "h-0 w-0 opacity-0"} duration-300 w-[85%] relative transition-all mt-2`}
        >
          <Slider
            size="lg"
            label="Price Range"
            maxValue={100000}
            step={100}
            defaultValue={price}
            onChange={handleSliderChange}
            formatOptions={{ style: "currency", currency: "USD" }}
            classNames={{
              base: "w-full dark:text-white/70 gap-3",
              filler:
                "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
              track: "h-3 bg-gray-300 dark:bg-gray-600",
            }}
            renderThumb={({ index, ...props }) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span
                  className={cn(
                    "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                    index === 0
                      ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600"
                      : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800"
                  )}
                />
              </div>
            )}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      {type === "header" && (
        <div className="w-full flex items-center gap-3 justify-between">
          <button
            onClick={() => {
              const filter: typeFilter = { brand, color, discount, price };
              onFilter(filter);
              closeFiltered();
            }}
            className="w-1/2 text-center py-2 bg-secondary-400 text-white rounded-lg"
          >
            Apply
          </button>
          <button
            onClick={() => closeFiltered?.()}
            className="w-1/2 text-center py-2 border-secondary-400 border-2 text-secondary-400 rounded-lg"
          >
            Back
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default FilterItem;
