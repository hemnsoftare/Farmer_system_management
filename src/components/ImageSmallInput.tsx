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
        className="bg-neutral-300 flex items-center justify-center text-center text-[30px] rounded-md size-[60px]"
      >
        {image || value ? (
          <Image
            src={image ? URL.createObjectURL(image) : value}
            alt="Small Image Preview"
            width={60}
            height={60}
            className="size-[60px] object-cover rounded"
          />
        ) : (
          "+"
        )}
      </label>
    </>
  );
};

export default ImageSmallInput;
