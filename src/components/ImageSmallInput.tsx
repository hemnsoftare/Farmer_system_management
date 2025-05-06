import { Value } from "@radix-ui/react-select";
import Image from "next/image";
import React from "react";

interface ImageSmallInputProps {
  name: string;
  image?: File;
  value?: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageSmallInput: React.FC<ImageSmallInputProps> = ({
  name,
  image,
  onImageChange,
  value,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onImageChange(e); // Pass undefined when no file is selected
  };

  return (
    <>
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleFileChange}
        className="rounded-md size-[100px] hidden"
      />
      <label
        htmlFor={name}
        className="bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center text-center text-3xl rounded-lg size-[70px] cursor-pointer transition duration-200 overflow-hidden"
      >
        {image || value ? (
          <Image
            src={image ? URL.createObjectURL(image) : value}
            alt="Small Image Preview"
            width={70}
            height={70}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          "+"
        )}
      </label>
    </>
  );
};

export default ImageSmallInput;
