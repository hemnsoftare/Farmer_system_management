"use client";
import React, { memo, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Switch } from "../ui/switch";
import { catagoryProps, typeFilter } from "@/type";
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
import { SheetTrigger } from "../ui/sheet";
const FilterItem = ({
  onFilter,
  filters,
  selected,
  type,
  closeFiltered,
}: {
  onFilter: (filter: typeFilter) => void;
  filters: typeFilter;
  closeFiltered?: () => void;
  selected: string;
  type?: "page" | "header";
}) => {
  console.log(type);
  const db = getFirestore(app);
  const [filter, setFilter] = useState<{ [key: string]: boolean }>({});
  const [price, setPrice] = useState<number[]>(filters.price); // Default price range
  const [color, setColor] = useState<string[]>(filters?.color);
  const [brand, setBrand] = useState<string[]>(filters.brand);
  const [discount, setDiscount] = useState<boolean>(filters.discount);
  const [category, setcategory] = useState<catagoryProps>();
  const handleOpen = (type: string) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

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
    // Ensure value is an array of two numbers
    const newValue: [number, number] =
      Array.isArray(value) && value.length === 2
        ? (value as [number, number])
        : [0, 1000]; // Fallback if not an array of length 2

    setPrice(newValue); // Update state with new slider values
  };

  useEffect(() => {
    if (filters) {
      setColor(filters.color || []);
      setBrand(filters.brand || []);
      setDiscount(filters.discount);
      setPrice(filters.price || [200, 300]);
    }
  }, [filters]);

  useEffect(() => {
    const getdata = async () => {
      // console.log(selected, "]]]]]]]]]]]");
      try {
        // console.log("Fetching data for selected category:", selected);

        if (!selected) {
          console.error("No category selected");
          return;
        }

        // Firestore query
        const q = query(
          collection(db, "category"),
          where("name", "==", selected.trim())
        );

        const querySnapShot = await getDocs(q);

        if (querySnapShot.empty) {
          // console.log("No matching documents found.");
        } else {
          querySnapShot.forEach((doc) => {
            setcategory(doc.data() as catagoryProps);
          });
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getdata();
  }, [selected, db]);

  useEffect(
    () => {
      const filter: typeFilter = { brand, color, discount, price };
      if (type === "page") {
        console.log(type);
        console.log(filter);
        onFilter(filter);
      }
    },
    type === "page" ? [color, discount, brand, price, onFilter, type] : [type]
  );

  console.log(discount);
  return (
    <div className="flex flex-col duration-300 transition-all  w-full items-center justify-start">
      <FilterSection
        title="brand"
        items={category?.brands || []}
        filterKey="brand"
        selectedItems={brand}
        handleCheckboxChange={handleCheckboxChange}
      />{" "}
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
          onClick={() => setDiscount(discount === true ? false : true)}
          className="bg-blue-600"
          id="discount"
        />
      </div>
      {/* Price Slider */}
      <div className="flex w-full items-center h-fit flex-col mt-2">
        <span
          onClick={() => handleOpen("price")}
          className="cursor-pointer px-4 py-1 rounded-lg hover:bg-slate-100 duration-300 flex justify-between items-center w-full transition-all"
        >
          <span>price</span>
          <span
            className={`${
              filter["price"] ? "rotate-180" : "rotate-0"
            } transform duration-300 transition-all`}
          >
            <FaChevronDown />
          </span>
        </span>
        <div
          className={`${
            filter["price"] ? "h-fit opacity-100" : "h-0 w-0 opacity-0"
          } duration-300 w-[85%] relative transition-all mt-2`}
        >
          {/* React Range Slider */}
          {/* <div className="flex text-12 my-5 justify-between items-center">
            {" "}
            <span className="text-14">price range </span>{" "}
            <span className="text-14 ">
              {price[0]}$ - {price[1]}${" "}
            </span>{" "}
          </div> */}
          <div>
            <Slider
              size="lg"
              label="Price Range"
              maxValue={100000}
              step={100}
              defaultValue={price}
              onChange={handleSliderChange}
              formatOptions={{ style: "currency", currency: "USD" }}
              classNames={{
                base: "w-full gap-3", // Ensure width is full or increased
                filler:
                  "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
                track: "h-3 bg-gray-300 dark:bg-gray-600", // Add track styling
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
                        ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                        : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800" // second thumb
                    )}
                  />
                </div>
              )}
            />
            {/* <Slider
              label="Price Range"
              step={50}
              minValue={0}
              maxValue={100000}
              defaultValue={price}
              onChange={handleSliderChange}
              formatOptions={{ style: "currency", currency: "USD" }}
              className="max-w-md "
            /> */}
            {/* <Slider
              size="lg"
              maxValue={100000}
              step={10}
              defaultValue={price}
              formatOptions={{ style: "currency", currency: "USD" }}
              classNames={{
                base: "max-w-md  text-12 gap-3",
                filler:
                  "bg-gradient-to-r  text-12 from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
              }}
              value={price} // Bind value to state
              onChange={handleSliderChange} // Attach handler to onChange
              renderThumb={({ index, ...props }) => (
                <div
                  {...props}
                  className="group p-1 text-12 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span
                    className={`transition-transform  text-12  bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80 ${
                      index === 0
                        ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                        : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800" // second thumb
                    }`}
                  />
                </div>
              )}
            /> */}
            {/* Display the selected price range */}
            {/* <div className=" absolute -bottom-[16px]  transform scale-x-[1.2] -translate-x-1 rounded-2xl w-full -z-50 h-[34px] left-0 bg-slate-100"></div> */}
          </div>
        </div>
      </div>
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
            className="w-1/2 text-center py-2 bg-secondary-400 text-white rounded-lg "
          >
            Apply
          </button>
          <button
            onClick={() => {
              closeFiltered();
            }}
            className="w-1/2 text-center py-2 border-secondary-400 border-2 text-secondary-400 rounded-lg "
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterItem;
