"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sort } from "@/util/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const HeaderDilter = ({
  selectedSortBy,
  onClear,
  length,
}: {
  selectedSortBy: (sort: string) => void;
  onClear: () => void;
  length: number;
}) => {
  const [state, setstate] = useState("newest");
  return (
    <div className="flex justify-between items-center">
      <span className="flex gap-5 items-center">
        <span className="font-semibold">Filters ({length})</span>
        <button
          onClick={onClear}
          className="text-primary px-3 py-1 hover:bg-blue-200 duration-300 transition-all"
        >
          Clear Filter
        </button>
      </span>
      <span className="flex items-center gap-1">
        <span className="text-18">Sort by : </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-18 text-start px-2 border-e outline-none w-[200px]">
            {state}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
