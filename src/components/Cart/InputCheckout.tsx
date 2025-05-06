import React, { forwardRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export interface InputCheckoutProps {
  label: string;
  placeholder?: string;
  name: string;
  error?: string;
  isdisabled?: boolean;
  type?: string;
  defaultValue?: string;
}

const InputCheckout = forwardRef<HTMLInputElement, InputCheckoutProps>(
  (
    {
      label,
      placeholder = "Enter your name",
      name,
      error,
      type = "text",
      isdisabled = true,
      defaultValue = "",
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-1 relative">
        <label
          htmlFor={name}
          className="text-sm font-medium text-blue-500 px-1"
        >
          {label}
        </label>

        <input
          id={name}
          ref={ref}
          type={type}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={!isdisabled}
          className={`peer transition-all duration-200 border-2 rounded-xl px-4 py-2 w-full shadow-sm text-blue-600 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
            !isdisabled
              ? "border-neutral-300 bg-neutral-100"
              : "border-neutral-400 bg-white"
          }`}
        />

        {error && (
          <div className="flex items-center gap-1 text-red-600 text-sm mt-1 px-1">
            <IoIosCloseCircleOutline className="text-base" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

InputCheckout.displayName = "InputCheckout";

export default InputCheckout;
