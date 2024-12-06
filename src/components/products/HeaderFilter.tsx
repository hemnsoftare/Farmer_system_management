"use client";
import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { Sort } from "@/util/data";
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
import { typeFilter } from "@/type";

const HeaderDilter = ({
  selectedSortBy,
  length,
  onFilter,
  filters,
  selected,
  openfilter,
  closeFilter,
}: {
  selectedSortBy: (sort: string) => void;
  onClear: () => void;
  length: number;
  closeFilter?: () => void;
  onFilter: (filter: typeFilter) => void;
  filters: typeFilter;
  selected: string;
  openfilter: boolean;
}) => {
  const [state, setstate] = useState("newest");
  return (
    <div className="flex w-full gap-3  justify-between items-center">
      <Sheet open={openfilter}>
        <SheetTrigger
          onClick={() => closeFilter()}
          className="flex   gap-2 sm:justify-start px-3 sm:px-0 border py-1 shadow-center-shadow rounded-lg   sm:w-fit w-1/2 items-center"
        >
          <VscSettings className="block sm:hidden" />
          <span className="font-semibold">Filters ({length})</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-full">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              <FilterItem
                closeFiltered={closeFilter}
                key={selected}
                selected={selected}
                filters={filters}
                type="header"
                onFilter={onFilter}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <span className="flex w-1/2 sm:w-fit border  shadow-center-shadow rounded-lg justify-center px-3 items-center gap-">
        <span className="text-16 font-semibold above-405:text-18 py-1 ">
          Sort by :{" "}
        </span>
        <DropdownMenu modal>
          <DropdownMenuTrigger className="text-16 font-semibold above-405:text-18  pl-1 text-start  border-e outline-none w-1/2 sm:w-[200px]">
            {state}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full">
            {Sort.map((item) => (
              <DropdownMenuItem
                className="text-10 hover:bg-slate-100 duration-300 transition-all"
                onClick={() => {
                  setstate(item.key);
                  selectedSortBy(item.label);
                }}
                key={item.key}
              >
                {item.key}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );
};

export default HeaderDilter;
