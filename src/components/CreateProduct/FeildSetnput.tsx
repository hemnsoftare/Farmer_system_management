import React from "react";

const FeildSetnput = ({
  id,
  label,
  placeholder,
  type,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}) => {
  return (
    <fieldset className="border focus-within:border-primary transition-all duration-300 group w-[300px] border-neutral-500">
      <legend className="ml-2 capitalize group-focus-within:text-primary ">
        {label}
      </legend>
      <input
        type={type === "number" ? "number" : "text"}
        name={id}
        id={id}
        placeholder={placeholder}
        className="outline-none w-full px-2 placeholder:focus-within:text-primary rounded-md py-1 placeholder:text-neutral-500"
      />
    </fieldset>
  );
};

export default FeildSetnput;
