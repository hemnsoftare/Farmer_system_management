import React from "react";
import InputCheckout from "./InputCheckout";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { errorCheckOutProps } from "../../../type";

const FormCheckout = ({
  handleSubmit,
  errors,
}: {
  errors: errorCheckOutProps;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full flex gap-4 flex-col items-start px-1"
    >
      <InputCheckout
        label="full name"
        name="fullName"
        placeholder="hemn software"
      />
      <InputCheckout
        label="phone number "
        name="phoneNumber"
        placeholder="+964 750 226 7967"
      />
      <InputCheckout
        label="street name "
        name="streetName"
        placeholder="enter your street"
      />
      <InputCheckout label="city" name="city" placeholder="erbile" />
      <p className="flex px-4 items-center gap-3">
        <input type="checkbox" name="accept" />{" "}
        <span>I am the recipient of my order</span>
      </p>
      <InputCheckout
        label="recipient name"
        name="recipientName"
        placeholder="rebin burhan"
      />
      <InputCheckout
        label="phone number "
        name="phoneNumberAnother"
        placeholder="+964 750 226 7967"
      />
      <div className="flex w-full items-center gap-3">
        <DialogTrigger>
          {" "}
          <button
            type="button"
            className="border-blue-500 w-full text-blue-500 px-4 py-2 font-semibold border rounded-lg"
          >
            back
          </button>
        </DialogTrigger>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 font-semibold rounded-lg"
        >
          submit
        </button>
      </div>
    </form>
  );
};

export default FormCheckout;
