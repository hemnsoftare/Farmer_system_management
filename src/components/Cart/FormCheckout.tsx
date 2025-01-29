"use client";
import React from "react";

import { errorCheckOutProps } from "@/lib/action";
import { IoIosCloseCircleOutline } from "react-icons/io";
import InputCheckout from "./InputCheckout";
import { DialogTrigger } from "../ui/dialog";
export default function FormCheckout({
  handleSubmit,
  errors,
}: {
  errors?: errorCheckOutProps;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full flex gap-4 flex-col items-start px-1"
    >
      <InputCheckout
        label="full name"
        name="fullName"
        placeholder="hemn software"
        error={errors.fullName}
      />
      <InputCheckout
        type="number"
        label="phone number "
        name="phoneNumber"
        placeholder="+964 750 226 7967"
        error={errors.phoneNumber}
      />
      <InputCheckout
        label="street name "
        name="streetName"
        placeholder="enter your street"
        error={errors.streetName}
      />
      <div className="flex items-center justify-center gap-2">
        {" "}
        <InputCheckout
          label="city"
          name="city"
          placeholder="erbile"
          error={errors.city}
        />
        <InputCheckout
          label=" region"
          name="Select_region"
          placeholder=" region"
          error={errors.Select_region}
        />
      </div>
      <div className="relative w-full group flex items-start  flex-col">
        <span className="absolute text-16 px-1 opacity-0 group-focus-within:opacity-100 duration-200 transition-all bg-white text-blue-400 -top-3 left-5 rounded-lg">
          note
        </span>

        <textarea
          // disabled={!isdisabled}
          // type={type ? type : "text"}
          // ref={ref}
          name={"note"}
          placeholder={"note"}
          className={`${
            false ? "border-neutral-300" : "border-neutral-400"
          } outline-none placeholder:text-neutral-300 group-focus-within:placeholder:text-blue-500 focus:border-blue-600 shadow-inner border-2  rounded-lg text-blue-500 px-5 py-2 w-full focus:shadow-blue-100 shadow-neutral-100`}
        />
        {/* <IoIosCloseCircleOutline className="absolute scale-[1.05] right-5 top-[15px]" /> */}
        <p className="text-red-700 ml-2 text-12 text-shadow-lg">
          {errors.note}
        </p>
      </div>
      <p className="flex px-4 items-center gap-3">
        <input required type="checkbox" id="accept" name="accept" />{" "}
        <label htmlFor="accept">I am the recipient of my order</label>
      </p>
      <div className="flex w-full items-center gap-3">
        <p className="border-blue-500 w-full text-blue-500 px-4 py-2 font-semibold border rounded-lg">
          {" "}
          back
        </p>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 font-semibold rounded-lg"
        >
          submit
        </button>
      </div>
    </form>
  );
}
