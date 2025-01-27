import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFavorite, MdHistory } from "react-icons/md";
import { FaBlog } from "react-icons/fa";

type AcceptDeleteProps = {
  children: ReactNode;
  message: string;
  title: string;
  cancel: string;
  confirem: string;
  onAccept: (table: string) => void;
};

const AcceptDelete = ({
  children,
  message,
  cancel,
  confirem,
  title,
  onAccept,
}: AcceptDeleteProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="w-4/5 md:w-full dark:bg-neutral-800">
        <DialogHeader className="text-black  dark:text-white">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <footer className="w-full flex justify-end items-center gap-3 mt-4">
          <DialogTrigger asChild>
            <button className="px-4 py-2 rounded-lg transition-all duration-300 bg-blue-600 active:bg-blue-400 hover:bg-blue-400 text-white">
              {cancel}
            </button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <button
              onClick={() => onAccept(title.toLowerCase())}
              className="px-4 py-2 rounded-lg transition-all duration-300 bg-red-600 active:bg-red-400 hover:bg-red-400 text-white"
            >
              {confirem}
            </button>
          </DialogTrigger>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
export default AcceptDelete;
