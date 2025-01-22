"use client";
import { uploadImage } from "@/lib/action/uploadimage";
import { catagoryProps } from "../../../../../lib/action";
import { colors as availableColors } from "@/util/data";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from "../../../../../config/firebaseConfig";
import { z } from "zod";
import Cate from "./_components/Cate";
import { useToast } from "@/hooks/use-toast";

const ModalCategory = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const { toast } = useToast();
  const [category, setCategory] = useState<catagoryProps[]>([]);
  const [colors, setColors] = useState<{ name: string; color: string }[]>([]);
  const [categoryImage, setCategoryImage] = useState<{
    link: string | undefined;
    fileName: string | undefined;
  }>({ fileName: undefined, link: undefined });
  const [error, seterror] = useState<{
    name: string;
    brands: string;
    colors: string;
    image: string;
  }>();
  // const BrandRef = useRef<HTMLInputElement>(null);
  const [brand, setbrand] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const db = getFirestore(app);
  const validation = z.object({
    name: z.string().nonempty(),
    brands: z.array(z.string()).nonempty({ message: "Please add a brand" }),
    colors: z
      .array(
        z.object({
          name: z.string(),
          color: z.string(),
        }),
        { message: "Please select a color" }
      )
      .nonempty({ message: "Please select a color" }),
    image: z.object(
      {
        link: z.string(),
        fileName: z.string(),
      },
      { message: "Please select a image" }
    ),
  });

  const setDateFirebase = async () => {
    console.log("submit add");
    seterror({ name: "", brands: "", colors: "", image: "" });

    const validate = validation.safeParse({
      name: nameRef.current?.value || "",
      brands,
      colors,
      image: categoryImage,
    });
    if (!validate.success) {
      validate.error?.errors.map((item) => {
        seterror((prev) => ({ ...prev, [item.path[0]]: item.message }));
      });
      return;
    }
    await setDoc(doc(db, "category", nameRef.current?.value || ""), {
      name: nameRef.current?.value || "",
      brands,
      colors,
      numberOfSearches: Math.floor(Math.random() * 100),
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
    if (type === "brand" && brand) {
      setBrands((prev) => [...prev, brand]);
      setbrand("");
    } else if (type === "color" && value) {
      const colorExists = colors.some((item) => item.color === value);
      console.log(colorExists);
      if (!colorExists) {
        const colorName = availableColors.find(
          (item) => item.color === value
        )?.name;
        console.log(colorName);
        setColors((prev) => [...prev, { name: colorName || "", color: value }]);
      } else {
        console.log("delete");
        setColors((prev) => prev.filter((item) => item.color !== value));
      }
    }
    seterror({ name: "", brands: "", colors: "", image: "" });
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

  const handleDeleteCategory = async (id: string) => {
    await deleteDoc(doc(db, "category", id)).then(() => {
      toast({ title: "delete category" });
      setCategory((pre) => pre.filter((item) => item.name !== id));
    });
  };
  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDocs(collection(db, "category"));
      const fetchedCategory: catagoryProps[] = [];
      snapshot.forEach((item) => {
        fetchedCategory.push(item.data() as catagoryProps);
      });
      setCategory(fetchedCategory);
    };
    getData();
  }, [db]);
  console.log(brands);
  return (
    <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen rounded-lg shadow-md">
      <h1 className="font-bold text-2xl md:text-3xl text-center text-gray-800 dark:text-white mb-6">
        Add Category
      </h1>
      <div className="w-full grid grid-cols-2 md:flex gap-3 flex-wrap  my-4 overflow-x-auto items-center justify-center">
        {category.map((item) => (
          <Cate
            key={item.name}
            name={item.name}
            image={item.image.link || ""}
            onDelete={(name) => {
              handleDeleteCategory(name);
            }}
            onEdite={(name) => {
              setBrands(item.brands);
              setColors(item.colors);
              setCategoryImage(
                item.image as {
                  link: string;
                  fileName: string;
                }
              );
              nameRef.current.value = item.name;
            }}
          />
        ))}
      </div>
      <form
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
              className="w-full  p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.name && (
              <span className="text-red-500 text-sm">{error.name}</span>
            )}
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
              onChange={(e) => setbrand(e.target.value || "")}
              value={brand}
              placeholder="Enter brand name"
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-2"
            />
            {error?.brands && (
              <span className="text-red-500 text-sm">{error.brands}</span>
            )}
            <ul>
              {brands.map((item) => (
                <li key={item} className="flex justify-between items-center">
                  <span>{item}a</span>
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
            {error?.image && (
              <span className="text-red-500 text-sm">select image please</span>
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
                    checked={colors.some((item) => item.color === color.color)}
                    onClick={(e) => handleAdd("color", color.color)}
                  />
                </label>
              ))}
            </div>
          </div>
          {error?.colors && (
            <span className="text-red-500 text-sm">{error.colors}</span>
          )}
        </div>
      </form>
      <footer className="mt-6 w-full">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => (window.location.href = "/dashboard/Products")}
            className="w-full py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={setDateFirebase}
            className="w-full py-2 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Save Category
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ModalCategory;
