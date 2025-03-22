"use client";
import React, { memo, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Switch } from "../ui/switch";
import { catagoryProps, typeFilter } from "@/lib/action";
import { Slider } from "@nextui-org/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app, db } from "../../config/firebaseConfig";
import FilterSection from "./FilterSection ";
import { cn } from "@/lib/utils";
import { on } from "events";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useFilterProducts from "@/lib/store/filterProducts";
import { useQuery } from "@tanstack/react-query";

const FilterItem = ({
  onOpen,
  type,
  closeFiltered,
}: {
  closeFiltered?: () => void;
  type?: "page" | "header";
  onOpen: (type: string) => void;
}) => {
  const {
    updateDiscount,
    updatePrice,
    filter,
    category: selected,
    setAllFilter,
  } = useFilterProducts();
  const t = useTranslations("products");
  const { data: category } = useQuery({
    queryKey: ["category", selected],
    queryFn: async () =>
      (await getDoc(doc(db, "category", selected))).data() as catagoryProps,
  });

  // const handleCheckboxChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   itemName: string
  // ) => {
  //   const { value, checked } = e.target;

  //   if (itemName === "color") {
  //     updateColor(value);
  //   } else if (itemName === "brand") {
  //     updateBrand(value);
  //   }
  // };

  const handleSliderChange = (value: number | number[]) => {
    const newValue: [number, number] =
      Array.isArray(value) && value.length === 2
        ? (value as [number, number])
        : [1, 100000];
    updatePrice(newValue);
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
        title={t("brand")}
        items={category?.brands || []}
        filterKey="brand"
        selectedItems={filter.brand}
      />
      <FilterSection
        title={t("color")}
        items={category?.colors || []}
        filterKey="color"
        selectedItems={filter.color}
      />
      {/* Discount */}
      <div className="flex items-center border-b-2 py-2 w-full justify-between px-4">
        <label htmlFor="discount">{t("discount")}</label>
        <Switch
          onClick={() => {
            updateDiscount();
          }}
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
          <span>{t("price")}</span>
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
            label={t("priceRange")}
            maxValue={100000}
            step={100}
            defaultValue={filter.price}
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
              closeFiltered();
            }}
            className="w-1/2 text-center py-2 bg-secondary-400 text-white rounded-lg"
          >
            {t("apply")}
          </button>
          <button
            onClick={() => closeFiltered?.()}
            className="w-1/2 text-center py-2 border-secondary-400 border-2 text-secondary-400 rounded-lg"
          >
            {t("back")}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default FilterItem;
