"use client";
import { uploadImage } from "@/lib/action/uploadimage";
import { catagoryProps } from "../../../../type";
import { colors as availableColors } from "@/util/data";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../../../config/firebaseConfig";

const ModalCategory = () => {
  const [openSelectedColors, setOpenSelectedColors] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<{ name: string; color: string }[]>([]);
  const [categoryImage, setCategoryImage] = useState<{
    link: string | undefined;
    fileName: string | undefined;
  }>({ fileName: undefined, link: undefined });
  const BrandRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const db = getFirestore(app);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSelectedColors((prevState) => !prevState);
  };

  const handleClickOutside = () => {
    setOpenSelectedColors(false);
  };

  const setDateFirebase = async () => {
    console.log("submit add");
    await setDoc(doc(db, "category", nameRef.current?.value || ""), {
      name: nameRef.current?.value || "",
      brands,
      colors,
      image: categoryImage,
    })
      .then(() => {
        console.log("save data");
        window.location.href = "/dashboard/Products";
      })
      .catch((error) =>
        console.error("Error response:", error.response?.data || error)
      );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAdd = (type: "brand" | "color", value?: string) => {
    if (type === "brand" && BrandRef.current?.value) {
      setBrands((prev) => [...prev, BrandRef.current!.value]);
      BrandRef.current.value = "";
    } else if (type === "color" && value) {
      const colorExists = colors.find((item) => item.color === value);
      if (!colorExists) {
        const colorName = availableColors.find(
          (item) => item.color === value
        )?.name;
        setColors((prev) => [...prev, { name: colorName || "", color: value }]);
      }
    }
  };

  const handleDeleteBrand = (brand: string) => {
    setBrands((prev) => prev.filter((item) => item !== brand));
  };

  const handleDeleteColor = (color: string) => {
    setColors((prev) => prev.filter((item) => item.color !== color));
  };

  const handleSetImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image")) {
      const linkImageUrl = await uploadImage(file);
      setCategoryImage({ fileName: file.name, link: linkImageUrl });
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen rounded-lg shadow-md">
      <h1 className="font-bold text-2xl md:text-3xl text-center text-gray-800 dark:text-white mb-6">
        Add Category
      </h1>
      <form
        onClick={handleClickOutside}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <label className="block text-lg font-semibold mb-2">
              Category Name
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Enter category name"
              className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <label className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Brands</span>
              <button
                type="button"
                onClick={() => handleAdd("brand")}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </label>
            <input
              type="text"
              ref={BrandRef}
              placeholder="Enter brand name"
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-2"
            />
            <ul>
              {brands.map((item) => (
                <li key={item} className="flex justify-between items-center">
                  <span>{item}</span>
                  <MdOutlineDelete
                    className="cursor-pointer text-red-500"
                    size={20}
                    onClick={() => handleDeleteBrand(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <label className="block text-lg font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              onChange={handleSetImage}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {categoryImage.link && (
              <Image
                src={categoryImage.link}
                alt="Category"
                width={200}
                height={200}
                className="mt-4 rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <label className="block text-lg font-semibold mb-2">
              Category Colors
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableColors.map((color) => (
                <label
                  key={color.color}
                  style={{ backgroundColor: color.color }}
                  className="p-2 rounded-lg flex items-center justify-between cursor-pointer text-white"
                >
                  <span>{color.name}</span>
                  <input
                    type="checkbox"
                    checked={colors.some((c) => c.color === color.color)}
                    onChange={(e) =>
                      handleAdd("color", e.target.checked ? color.color : "")
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
      <button
        onClick={setDateFirebase}
        className="w-full mt-6 py-2 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
      >
        Save Category
      </button>
    </div>
  );
};

export default ModalCategory;
