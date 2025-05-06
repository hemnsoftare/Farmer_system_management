"use client";

import { ProductFormInput } from "@/lib/action";
import { getAllCategories } from "@/lib/action/dashboard";
import { uploadImage } from "@/lib/action/uploadimage";
import { selectedProductsManufacturer } from "@/lib/store/Manufacturer";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import z from "zod";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
const Page = () => {
  const validation = z.object({
    name: z.string().min(3),
    price: z.number().min(1),
    brand: z.string(),
    category: z.string(),
    bigimageUrl: z.string(),
    smallimageUrl: z.array(z.string()).length(4),
    stock: z.number().min(1),
    iniPrice: z.number().min(1),
    colors: z
      .array(
        z.object({
          name: z.string().min(1),
          color: z.string().min(1),
        })
      )
      .min(1)

      .nonempty(),
    details: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
    discount: z.number().optional(),
  });
  const initialState = {
    name: "",
    price: "",
    brand: "",
    category: "",
    Bigimage: "",
    colors: "",
    bigimageUrl: "",
    stock: "",
    iniPrice: "",
    smallimageUrl: "",
    details: "",
    date: "",
    discount: "", // Optional value can be omitted
  };
  const { items } = selectedProductsManufacturer();
  const [selectCategory, setselectCategory] = useState<string>(null);
  const [colors, setcolors] = useState<{ name: string; color: string }[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [mainImageUrl, setmainImageUrl] = useState(null);
  const [childImageRul, setchildImageRul] = useState<string[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [error, seterror] = useState(initialState);
  const [isProduction, setisProduction] = useState(true);
  const [details, setdetails] = useState<
    {
      title: string;
      description: string;
    }[]
  >(null);

  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  // add details
  const handleAddDetails = () => {
    if (titleRef.current && descriptionRef.current) {
      const newDetail = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      };

      setdetails((prev) => (prev ? [...prev, newDetail] : [newDetail]));

      // Clear inputs after adding
      titleRef.current.value = "";
      descriptionRef.current.value = "";
    }
  };

  // get cattegory
  const { data, isLoading } = useQuery({
    queryKey: ["create"],
    queryFn: async () => {
      const data = await getAllCategories();
      setselectCategory(data[0].name);
      setcolors([data[0].colors[0]]);
      return data;
    },
  });
  const handleUploadImage = async (file: File) => await uploadImage(file);
  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror(initialState);
    const formData = new FormData(e.currentTarget);
    const data: ProductFormInput = {
      name: formData.get("name")?.toString().trim() || "",
      iniPrice: parseFloat(formData.get("iniPrice").toString().trim()),
      price: parseFloat(formData.get("price") as string) || 0,
      stock: parseFloat(formData.get("stock") as string) || 0,
      isev: true,
      brand: formData.get("brand")?.toString() || "",
      colors: colors,
      numSearch: Math.floor(Math.random() * 67), // Generates a whole number between 0 and 66
      category: formData.get("category")?.toString() || "",
      Bigimage: "",
      colorsName: colors.map((item) => item.name),
      bigimageUrl: mainImageUrl, // Main image URL
      smallimageUrl: childImageRul, // Small images URL array
      // imageSmall: smallImageName, // File names of small images
      details: details,
      numberFavorite: 0,
      isProduction,
      numberSale: 0,
      date: new Date(),
      isDiscount: !!formData.get("discount"),
      discount: formData.get("discount")
        ? parseFloat(formData.get("discount") as string)
        : 0,
    };

    try {
      const validatedData = validation.safeParse(data);
      if (!validatedData.success) {
        validatedData.error.errors.map((item) => {
          seterror((prev) => ({
            ...prev,
            [item.path[0]]: item.message,
          }));
        });
        return;
      }
      if (false) {
        await updateDoc(doc(db, "Products", "haveId"), { ...data });
        toast({ title: "update the product successfully" });
        window.location.href = "/dashboard/Products";
      } else {
        if (isProduction) await addDoc(collection(db, "Products"), data);
        else await addDoc(collection(db, "PrivateProducts"), data);

        await toast({ title: "add the product successfully" });
        window.location.href = "/dashboard/Products";
      }
      // window.location.href = "/dashboard/Products";
    } catch (error) {}
  };
  if (!isLoading)
    return (
      <div className="p-6 flex items-center flex-col justify-start flex-wrap gap-6">
        <div className="flex items-center justify-start gap-3">
          {items.map((product, index) => (
            <div
              key={index}
              className="bg-white w-full dark:bg-gray-800 rounded-2xl shadow-md p-4"
            >
              <Image
                src={product.bigimageUrl}
                width={190}
                height={190}
                alt={product.name}
                className="w-[190px] h-[190px] object-cover rounded-xl mb-4"
              />
              <h2 className="text-18 font-semibold ">{product.name}</h2>

              <p className="text-green-600 text-16 dark:text-green-400 font-bold ">
                Price: ${product.price}
              </p>
              <StockUpdater initialStock={product.stock} id={product.id} />
            </div>
          ))}
        </div>
        <form
          className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          onSubmit={handlesubmit}
        >
          <div className="gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter product name"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage error={error.name} />
            </div>

            {/* Initial Price */}
            <div className="flex flex-col">
              <label
                htmlFor="initialPrice"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Initial Price
              </label>
              <input
                id="c"
                type="number"
                name="iniPrice"
                placeholder="Initial price"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage error={error.iniPrice} />
            </div>

            {/* Stock */}
            <div className="flex flex-col">
              <label
                htmlFor="stock"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Stock
              </label>
              <input
                id="stock"
                type="number"
                name="stock"
                placeholder="Stock"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage error={error.stock} />
            </div>

            {/* Final Price */}
            <div className="flex flex-col">
              <label
                htmlFor="finalPrice"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Final Price
              </label>
              <input
                id="finalPrice"
                type="number"
                name="price"
                placeholder="Final price"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage error={error.price} />
            </div>

            {/* Discount */}
            <div className="flex flex-col">
              <label
                htmlFor="discount"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Discount (%)
              </label>
              <input
                id="discount"
                type="number"
                placeholder="Discount"
                name="discount"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Category Select */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Category
              </label>
              <select
                id="category"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setselectCategory(e.target.value as string)}
                name="category"
                defaultValue={data[0].name}
              >
                {data?.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ErrorMessage error={error.category} />
            </div>
            {/* Color */}
            <div className="flex flex-col">
              <label
                htmlFor="color"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Color
              </label>
              <select
                id="color"
                multiple
                value={colors?.map((c) => c.name) || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions);
                  const selectedColors = selectedOptions.map((option) => ({
                    name: option.value,
                    color: option.value,
                  }));
                  setcolors(selectedColors);
                }}
                className={`p-2 border  border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]`}
              >
                {data
                  ?.filter((item) =>
                    selectCategory === null
                      ? item[0]
                      : item.name === selectCategory
                  )
                  .map((category) =>
                    category.colors.map((color) => (
                      <option
                        value={color.name}
                        key={color.name}
                        className={`flex items-center  justify-start gap-3`}
                      >
                        {color.name}
                      </option>
                    ))
                  )}
              </select>
              <input
                type="hidden"
                name={"colors"}
                value={JSON.stringify(colors)}
              />
              <p>{error.colors}</p>
            </div>

            {/* Brand Select */}
            <div className="flex flex-col">
              <label
                htmlFor="brand"
                className="mb-1 font-medium text-gray-700 dark:text-gray-200"
              >
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                defaultValue={data[0].brands[0]}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {data
                  ?.filter((item) =>
                    selectCategory === null
                      ? item[0]
                      : item.name === selectCategory
                  )
                  .map((brand, index) =>
                    brand.brands.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))
                  )}
              </select>
            </div>
            <ErrorMessage error={error.brand} />
          </div>
          <div className="flex items-center justify-between w-full  gap-2">
            <label className="font-semibold mt-8 mb-3 text-sm sm:text-base">
              Add to Production:
            </label>
            <Switch
              checked={isProduction}
              onClick={() => setisProduction((pre) => !pre)}
            />
          </div>
          {/* Main Image Upload */}
          <div className="mt-6">
            <label
              htmlFor="mainImage"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
            >
              Main Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="mainImage"
              className="p-2 border border-gray-300 rounded w-full"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                const url = await handleUploadImage(file);
                setmainImageUrl(url);
                if (file) {
                  setMainImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            {mainImagePreview ? (
              <Image
                width={50}
                height={50}
                src={mainImagePreview}
                alt="Main preview"
                className="mt-2 w-48 h-48 object-cover rounded border"
              />
            ) : (
              <div className="mt-2 w-48 h-48 flex items-center justify-center rounded border text-gray-400 bg-gray-100 dark:bg-gray-800">
                No image selected
              </div>
            )}
            <input type="hidden" name="bigimageUrl" value={mainImageUrl} />
            <ErrorMessage error={error.bigimageUrl} />
          </div>

          {/* Additional Images */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Additional Images
            </label>
            <div className="flex flex-wrap items-center justify-center mt-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex w-full justify-between px-4 py-2 border items-center gap-2"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        const urlimage = await handleUploadImage(file);
                        setchildImageRul((prev) => {
                          const updated = [...prev];
                          updated[i] = urlimage;
                          return updated;
                        });
                        setAdditionalPreviews((prev) => {
                          const updated = [...prev];
                          updated[i] = url;
                          return updated;
                        });
                      }
                    }}
                    className="p-2 border border-gray-300 rounded"
                  />
                  {additionalPreviews[i] ? (
                    <Image
                      width={50}
                      height={60}
                      src={additionalPreviews[i]}
                      alt={`Preview ${i + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded border text-sm text-gray-400 bg-gray-100 dark:bg-gray-800">
                      No image
                    </div>
                  )}
                </div>
              ))}
            </div>
            <input type="hidden" name="smallimageUrl" value={childImageRul} />

            <ErrorMessage error={error.smallimageUrl} />
          </div>

          {/* Details Section */}
          <div className="mt-6">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Details Title
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Details Title"
              className="p-2 border border-gray-300 rounded w-full mb-3"
            />

            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Details Description
            </label>
            <textarea
              ref={descriptionRef}
              placeholder="Details Description"
              className="p-2 border border-gray-300 rounded w-full h-32 mb-3"
            />
            <input
              type="hidden"
              name="details"
              value={JSON.stringify(details || [])}
            />
            <button
              type="button"
              onClick={handleAddDetails}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Detail
            </button>

            {/* Details Cards */}
            <div className="mt-4 space-y-3">
              {details?.map((detail, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <h3 className="font-medium">{detail.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {detail.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedDetails = [...details];
                        updatedDetails.splice(index, 1);
                        setdetails(updatedDetails);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (titleRef.current && descriptionRef.current) {
                          titleRef.current.value = detail.title;
                          descriptionRef.current.value = detail.description;
                          const updatedDetails = [...details];
                          updatedDetails.splice(index, 1);
                          setdetails(updatedDetails);
                        }
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
};

const StockUpdater = ({
  initialStock,
  id,
}: {
  initialStock: number;
  id: string;
}) => {
  const [stock, setStock] = useState(initialStock);

  const incrementStock = async () => {
    if (stock + 1 > initialStock) return;
    setStock((prev) => (prev + 1 > initialStock ? initialStock : prev + 1));
    await updateDoc(doc(db, "Products", id), {
      stock: stock + 1,
    });
  };
  const decrementStock = async () => {
    if (stock - 1 === -1) return;
    setStock((prev) => (prev > 0 ? prev - 1 : 0));
    await updateDoc(doc(db, "Products", id), {
      stock: stock - 1,
    });
  };

  return (
    <div className="flex text-16 justify-between items-center gap-3 ">
      <span className="text-gray-600 dark:text-gray-300">Stock:</span>
      <div className="flex items-center justify-between">
        <button
          onClick={decrementStock}
          className="px-2 py-1 text-lg  rounded-full hover:opacity-80"
        >
          −
        </button>
        <span className="w-8 text-center  font-medium">{stock}</span>
        <button
          onClick={incrementStock}
          className="px-2 py-1 text-lg  rounded-full hover:opacity-80"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Page;

const ErrorMessage = ({ error }: { error: string }) => {
  if (error)
    return (
      <div className="text-red-500 text-sm mt-1">
        <div>{error}</div>
      </div>
    );
};
