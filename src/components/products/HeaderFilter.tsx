import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sort } from "@/util/data";
const HeaderDilter = () => {
  return (
    <div className="flex justify-between items-center">
      <span className="flex gap-5 items-center">
        <span className="font-semibold">Filters (123) </span>
        <button className="text-primary">Clear Filter</button>
      </span>
      <span className="flex items-center gap-1 ">
        <span className="text-14">Sort by </span>
        <Select>
          <SelectTrigger className="w-[170px] text-10 ring-0 outline-none">
            <SelectValue
              className="text-9     text-red-600 "
              placeholder="Featured"
            />
          </SelectTrigger>
          <SelectContent className="bg-white ">
            {Sort.map((item) => (
              <SelectItem
                className="text-10 hover:bg-slate-100 duration-300 transition-all"
                value={item.key}
                key={item.key}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </span>
    </div>
  );
};

export default HeaderDilter;
