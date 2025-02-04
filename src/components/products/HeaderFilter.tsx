"use client";
import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterItem from "./FilterItem";
import { typeFilter } from "@/lib/action";
import { on } from "events";
import { useTranslations } from "use-intl";

const HeaderDilter = ({
  selectedSortBy,
  length,
  onFilter,
  filter,
  onOpen,
  filters,
  selected,
  openfilter,
  closeFilter,
  onClear,
}: {
  selectedSortBy: (sort: string) => void;
  onClear: () => void;
  length: number;
  closeFilter?: () => void;
  onOpen: (type: string) => void;
  onFilter: (filter: typeFilter) => void;
  filters: typeFilter;
  selected: string;
  openfilter: boolean;
  filter: { [key: string]: boolean };
}) => {
  const [state, setstate] = useState("new");
  const t = useTranslations("products");
  return (
    <div className="flex w-full gap-3  justify-between items-center">
      <Sheet open={openfilter}>
        <SheetTrigger
          onClick={() => closeFilter()}
          className="flex dark:text-gray-600 dark:shadow-secondary sm:hidden  gap-2 sm:justify-start px-3 sm:px-0 border py-1 shadow-center-shadow rounded-lg   sm:w-fit w-1/2 items-center"
        >
          <VscSettings className="block sm:hidden" />
          <span className="font-semibold">
            {t("filters")} ({length})
          </span>
        </SheetTrigger>
        <SheetContent side="left" className="w-full h-full">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span> {t("filters")} </span>
              <button
                onClick={onClear}
                className="text-blue-800 active:bg-blue-300 px-2 py-1 rounded-lg duration-300 transition-all font-semibold text-18 "
              >
                {t("clearAll")}
              </button>
            </SheetTitle>
            <SheetDescription className="h-full">
              <FilterItem
                onOpen={onOpen}
                closeFiltered={closeFilter}
                key={selected}
                filter={filter}
                selected={selected}
                filters={filters}
                type="header"
                onFilter={onFilter}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <button className=" px-3 dark:text-gray-600 dark:shadow-secondary md:flex hidden   gap-6   border py-1 shadow-center-shadow rounded-lg w-fit justify-between items-center">
        <span className="flex gap-2 items-center ">
          <VscSettings className="block sm:hidden" />
          <span className="font-semibold">
            {t("filters")} ({length})
          </span>
        </span>
        <button className="text-blue-500 font-semibold" onClick={onClear}>
          {t("clearAll")}
        </button>
      </button>
      <div className="flex w-1/2 sm:w-fit border  dark:text-gray-600 dark:shadow-secondary shadow-center-shadow rounded-lg justify-center px-3 items-center gap-">
        <span className="text-16 font-semibold above-405:text-18 py-1 ">
          {t("sortBy")} :{" "}
        </span>
        <DropdownMenu modal>
          <DropdownMenuTrigger className="text-16 w-fit font-semibold above-405:text-18  pl-1 text-start  border-e outline-none  sm:w-[200px]">
            {state === "new"
              ? t("newest")
              : state.startsWith("price")
                ? state.startsWith("priceA")
                  ? ` ${t("price")}: ${t("low")} ${t("to")} ${t("high")}`
                  : ` ${t("price")}: ${t("high")} ${t("to")} ${t("low")}`
                : state.startsWith("a-z")
                  ? ` Name : A to Z `
                  : ` Name : Z to A `}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-neutral-black dark:text-white border dark:border-secondary w-full">
            {[
              { key: t("newest"), label: "new" },
              {
                key: ` ${t("price")}: ${t("low")} ${t("to")} ${t("high")}`,
                label: "priceA",
              },
              {
                key: ` ${t("price")}: ${t("high")} ${t("to")} ${t("low")}`,
                label: "priceB",
              },
              {
                key: ` Name : A to Z `,
                label: "a-z",
              },
              {
                key: ` Name : Z to A `,
                label: "z-a",
              },
            ].map((item) => (
              <DropdownMenuItem
                className="text-10 hover:bg-slate-100 w-full  rtl:justify-end ltr:justify-start flex items-center duration-300 transition-all"
                onClick={() => {
                  setstate(item.label);
                  selectedSortBy(item.label);
                }}
                key={item.key}
              >
                {item.key}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeaderDilter;
