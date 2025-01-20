import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";
import { FaBlog } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Setting = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        {" "}
        <p className="flex sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2  border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <p className="flex items-center gap-2">
            {" "}
            <IoSettingsOutline color=" #f45e0c" className="size-[23px]" />{" "}
            <span> Setting </span>
          </p>
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Setting;
