import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const NotSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center gap-4 justify-center flex-col">
      <div className="flex items-center rounded-full shadow-xl shadow-neutral-400 justify-center p-6 ">
        <IoCloseSharp color="#C91433" className="w-10 h-10 " />
      </div>
      <h2 className="text-[#C91433] mt-4 font-black  text-24 ">
        Payment Failed
      </h2>
      <p className="text-neutral-400 px-10 w-full text-center">
        Unfortunately we have an issue with your payment, try again later.
      </p>
      <button
        onClick={onClose}
        className="bg-primary px-10 rounded-lg py-2 hover:bg-blue-800 duration-300 text-white self-end"
      >
        Tye againm
      </button>
    </div>
  );
};

export default NotSuccess;
