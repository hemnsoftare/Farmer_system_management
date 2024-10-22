import React from "react";

interface MultiinputProps {
  name: string;
  id: string;
  label: string;
  checked?: boolean;
  type: "radio" | "checkbox";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Multiinput: React.FC<MultiinputProps> = ({
  name,
  id,
  label,
  checked = false,
  type,
  onChange,
}) => {
  return (
    <div className={` flex gap-2 text-18  items-center`}>
      <input type={type} name={name} id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Multiinput;
