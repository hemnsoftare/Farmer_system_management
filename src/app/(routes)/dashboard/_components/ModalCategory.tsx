"use client";
import { uploadImage } from "@/lib/action/uploadimage";
import { catagoryProps } from "../../../../type";
import { colors as availableColors } from "@/util/data";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";

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

  const handleClickOutside = async () => {
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
        // Optionally navigate or show success message
      })
      .catch((error) =>
        console.error("Error response:", error.response?.data || error)
      );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: catagoryProps = {
      name: nameRef.current?.value || "",
      image: {
        name: categoryImage.fileName || "",
        link: categoryImage.link || "",
      },
      brands,
      colors,
    };
    // await setFireBase("catagory", data, data.name || "");
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

  const handleColorToggle = (color: string, isChecked: boolean) => {
    if (!isChecked) {
      setColors((prev) => prev.filter((item) => item.color !== color));
    } else {
      const colorName = availableColors.find(
        (item) => item.color === color
      )?.name;
      setColors((prev) => [...prev, { name: colorName || "", color }]);
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
    <form
      onClick={handleClickOutside}
      className="flex items-start gap-3 justify-start mt-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 items-start w-1/2 justify-center">
        {/* Category Name */}
        <div className="flex items-start p-2 w-full justify-start flex-col border-2 gap-2 rounded-lg border-neutral-500">
          <h2>Category name</h2>
          <input
            type="text"
            name="categoryName"
            ref={nameRef}
            placeholder="Enter your category"
            className="border-2 border-neutral-500 outline-none px-3 w-full py-2 rounded-lg"
          />
        </div>

        {/* Category Brand */}
        <div className="flex items-start p-2 w-full justify-start flex-col border-2 gap-2 rounded-lg border-neutral-500">
          <h2 className="flex items-center w-full justify-between">
            <span>Category brand</span>
            <button
              type="button"
              onClick={() => handleAdd("brand")}
              className="px-4 py-1 rounded-lg border-2 border-neutral-500"
            >
              add
            </button>
          </h2>
          {brands.length > 0 ? (
            <ul className="w-full">
              {brands.map((item) => (
                <li
                  key={item}
                  className="flex w-full items-center justify-between"
                >
                  <span>{item}</span>
                  <MdOutlineDelete
                    color="red"
                    size={25}
                    onClick={() => handleDeleteBrand(item)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Have not brand</p>
          )}
          <input
            type="text"
            name="categoryBrand"
            ref={BrandRef}
            placeholder="Enter your category brand"
            className="border-2 border-neutral-500 outline-none px-3 w-full py-2 rounded-lg"
          />
        </div>

        {/* Category Colors */}
        <div className="flex items-start p-2 w-full justify-start flex-col border-2 gap-2 rounded-lg border-neutral-500">
          <h2 className="flex items-center w-full justify-between">
            <span>Category color</span>
          </h2>
          {colors.length > 0 ? (
            <ul className="w-full">
              {colors.map((item) => (
                <li
                  key={item.name}
                  className="flex w-full items-center justify-between"
                >
                  <span>{item.name}</span>
                  <MdOutlineDelete
                    color="red"
                    size={25}
                    onClick={() => handleDeleteColor(item.color)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Have not colors</p>
          )}
          <div className="relative w-full">
            <h2
              className="border-2 flex items-center justify-between border-neutral-500 outline-none px-3 w-full py-2 rounded-lg"
              onClick={handleDropdownToggle}
            >
              <span>Selected colors</span> <RiArrowDropDownLine size={30} />
            </h2>

            <div
              className={`${
                openSelectedColors ? "flex" : "hidden"
              } absolute bottom-0 left-1/4 py-2 scrollbar-hidden px-1 border-neutral-500 border flex-col bg-neutral-200 opacity-100 items-center justify-start w-[140px] gap-1 rounded-lg shadow-neutral-400 h-[300px]`}
              onClick={(e) => e.stopPropagation()}
            >
              {availableColors.map((item) => (
                <div
                  key={item.name}
                  style={{ backgroundColor: item.color }}
                  className="w-[136px] border-neutral-500 border rounded-lg px-3 py-2 flex items-center justify-center gap-2 z-10"
                >
                  <input
                    type="checkbox"
                    name="catagoryColors"
                    id={item.name}
                    checked={colors.some((color) => item.name === color.name)}
                    value={item.color}
                    onChange={(e) =>
                      handleColorToggle(item.color, e.target.checked)
                    }
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={setDateFirebase}
          className="px-9 w-full py-2 bg-black hover:bg-slate-800 rounded-lg duration-300 transition-all text-white"
        >
          Add Category
        </button>
      </div>

      {/* File Input for Category Image */}
      <div className="flex items-start w-1/2 justify-start">
        <input
          type="file"
          name="categoryImage"
          onChange={handleSetImage}
          id="image"
          className="hidden"
        />
        <label
          htmlFor="image"
          className="w-full h-[200px] border-2 border-neutral-500 cursor-pointer flex items-center justify-center"
        >
          {categoryImage.link ? (
            <Image
              src={categoryImage.link}
              alt="Category Image"
              width={200}
              height={200}
              className="object-contain"
            />
          ) : (
            <span>Select Image</span>
          )}
        </label>
      </div>
    </form>
  );
};

export default ModalCategory;
