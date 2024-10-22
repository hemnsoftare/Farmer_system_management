import React, { forwardRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export interface InputCheckoutProps {
  label: string;
  placeholder?: string;
  name: string;
  error?: string;
  isdisabled?: boolean;
  type?: string;
}

// Use forwardRef to forward the ref to the input element
const InputCheckout = forwardRef<HTMLInputElement, InputCheckoutProps>(
  (
    {
      label,
      placeholder = "Enter your name",
      name,
      error,
      type,
      isdisabled = true,
    },
    ref
  ) => {
    return (
      <div className="relative w-full group flex items-start  flex-col">
        <span className="absolute text-16 px-1 opacity-0 group-focus-within:opacity-100 duration-200 transition-all bg-white text-blue-400 -top-3 left-5 rounded-lg">
          {label}
        </span>

        <input
          disabled={!isdisabled}
          type={type ? type : "text"}
          ref={ref}
          name={name}
          placeholder={placeholder}
          className={`${
            !isdisabled ? "border-neutral-300" : "border-neutral-400"
          } outline-none placeholder:text-neutral-300 group-focus-within:placeholder:text-blue-500 focus:border-blue-600 shadow-inner border-2  rounded-lg text-blue-500 px-5 py-2 w-full focus:shadow-blue-100 shadow-neutral-100`}
        />
        <IoIosCloseCircleOutline className="absolute scale-[1.05] right-5 top-[15px]" />
        <p className="text-red-700 ml-2 text-12 text-shadow-lg">
          {error ? error : ""}
        </p>
      </div>
    );
  }
);

InputCheckout.displayName = "InputCheckout"; // Set the displayName for better debugging

export default InputCheckout;
