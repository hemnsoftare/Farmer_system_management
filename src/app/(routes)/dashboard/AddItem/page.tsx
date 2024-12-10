"use client";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import InputCheckout from "@/components/Cart/InputCheckout";
import { catagoryProps, ProductFormInput } from "../../../../type";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { getFireBase, uploadImage } from "@/lib/action/uploadimage";
import { IoMdArrowDropdown } from "react-icons/io";
import ImageSmallInput from "@/components/ImageSmallInput";

const Page = () => {
  const [selectedcolor, setselectedcolor] = useState<
    { name: string; color: string }[]
  >([]);
  const [discount, setdiscount] = useState(false);
  const [values, setvalues] = useState<ProductFormInput>();
  const [maiinImageNmae, setmaiinImageNmae] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [smallImageFile, setsmallImageFile] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [smallImageName, setsmallImageName] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [Details, setDetails] = useState<
    { title: string; description: string }[]
  >([]);
  const [imageSmallUrl, setimageSmallUrl] = useState<string[]>([]);
  const [catagory, setcatagory] = useState<catagoryProps[]>();
  const [selectedCategoryy, setselectedCategoryy] = useState<string>();
  const db = getFirestore(app);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: ProductFormInput = {
      name: formData.get("name")?.toString().trim() as string,
      price: parseFloat(formData.get("price") as string),
      brand: formData.get("brand") as string,
      colors: selectedcolor,
      category: formData.get("category") as string,
      Bigimage: maiinImageNmae,
      colorsName: selectedcolor.map((item) => item.name),
      bigimageUrl: selectedImage, // Main image URL
      smallimageUrl: imageSmallUrl, // Small images URL array
      imageSmall: smallImageName, // File names of small images
      details: Details,
      numberFavorite: 0,
      numberSale: 0,
      date: new Date(),
      isDiscount: formData.get("discount") ? true : false,
      discount: formData.get("discount")
        ? parseFloat(formData.get("discount") as string)
        : 0,
    };
    console.log(data);

    await setDoc(doc(db, "Products", data.name), data)
      .then((res) => {
        console.log("save data");
        window.location.href = "/dashboard/Products";
      })
      .catch((error) =>
        console.error("Error response:", error.response?.data || error)
      );
  };
  // Handle large image change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file?.name && setmaiinImageNmae(file?.name);
    if (file) {
      try {
        const linkimage = await uploadImage(file); // Upload image and get the URL
        setSelectedImage(linkimage); // Update state with the image URL
      } catch (error) {
        console.error("Error uploading main image:", error);
      }
    }
  };

  // Handle small image change
  const handleSmallImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handleSmallImageChange");
    const updatedImages = [...smallImageFile];
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      console.log(" in if ");
      try {
        const linkimageurl = await uploadImage(file); // Upload small image
        setimageSmallUrl((prev) => [...prev, linkimageurl]); // Store URL in state
        updatedImages[index] = file; // Update file state
        setsmallImageFile(updatedImages);
        setsmallImageName((prevNames) => {
          const updatedNames = [...prevNames];
          updatedNames[index] = file.name; // Store file name
          return updatedNames;
        });
      } catch (error) {
        console.error("Error uploading small image:", error);
      }
    }
  };

  // Handle adding product details
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleAdddetail = () => {
    const titleValue = titleRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;

    if (titleValue && descriptionValue) {
      setDetails((prevDetails) => [
        ...prevDetails,
        {
          title: titleValue,
          description: descriptionValue,
        },
      ]);
      if (titleRef.current) titleRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
    }
  };
  const getdata = async () => {
    const cate: catagoryProps[] = await getFireBase("category");
    setselectedCategoryy(cate[0].name || "");
    setcatagory(cate); // Ensure state is updated with correct type
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className=" z-0 flex-col py-9 sm:h-screen lg:w-full w-full xl:max-w-[900px]  ">
      <h2 className="text-29 font-semibold px-7">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-row flex-col items-start gap-3 px-4    justify-start w-full py-4"
      >
        <div className="flex sm:px-3 flex-col gap-3 self-center items-center justify-center">
          <input
            type="file"
            id="imageBig"
            name="Bigimage"
            onChange={handleImageChange}
            className="rounded-md size-[100px] hidden"
          />
          <label
            htmlFor="imageBig"
            className="flex items-center bg-neutral-300 justify-center text-center text-[150px] rounded-md size-[300px]"
          >
            {selectedImage ? (
              <Image
                src={selectedImage} // Display selected image using URL
                alt="Selected Image"
                width={300}
                height={300}
                className="size-[300px]"
              />
            ) : (
              "+"
            )}
          </label>
          <div className="flex items-center w-[300px] gap-4 justify-between">
            {smallImageFile.map((image, index) => (
              <ImageSmallInput
                key={index}
                name={`imageSmall${index}`}
                image={image}
                onImageChange={(e) => handleSmallImageChange(index, e)}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3 my-3 mb-5 items-start w-full  justify-center flex-col">
          <div className="w-full gap-3 flex-col sm:flex-row flex items-start h-[70px] justify-between">
            <InputCheckout
              label="Product Name"
              name="name"
              placeholder="Product name"
              error=""
            />
            <InputCheckout
              label="Product Price"
              name="price"
              placeholder="Product price"
              error=""
            />
          </div>
          <br />
          <div className="w-full mt-3 items-start flex-col justify-start gap-6 flex">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-semibold min-w-[80px] text-14 sm:text-18">
                Category:
              </h2>
              <select
                name="category"
                className="py-1 px-3  bg-neutral-300 min-w-[230px] rounded-md outline-none border-none"
                onChange={(e) => setselectedCategoryy(e.target.value)}
              >
                {catagory &&
                  catagory.map((item) => (
                    <option
                      className="text-14 sm:text-18"
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-semibold text-14 min-w-[80px] sm:text-18">
                Brand:
              </h2>
              <select
                name="brand"
                className="py-1 px-3 bg-neutral-300 min-w-[230px] rounded-md outline-none border-none"
              >
                {catagory?.map((item) => {
                  if (item.name === selectedCategoryy) {
                    return item.brands.map((brand) => (
                      <option
                        className="text-14  sm:text-18"
                        key={brand}
                        value={brand}
                      >
                        {brand}
                      </option>
                    ));
                  }
                })}
              </select>
            </div>
            {/* color  */}
            <div className="flex items-center  w-full justify-start gap-2">
              <h2 className="font-semibold text-14 sm:text-18 in-range:">
                Colors:
              </h2>
              <div className="flex overflow-x-auto w-full items-center gap-5">
                {catagory
                  ?.filter((item) => item.name === selectedCategoryy)
                  .map((filteredItem) => (
                    <div
                      key={filteredItem.name}
                      className=" flex items-center overflow-x-auto w-full  justify-start gap-3"
                    >
                      {filteredItem.colors.map((color) => (
                        <div
                          key={color.name}
                          className="flex gap-1  items-center"
                          onClick={() => {
                            setselectedcolor((prevSelected) => {
                              // Check if the selected color already exists
                              const colorExists = prevSelected.some(
                                (item) => item.color === color.color
                              );

                              if (!colorExists) {
                                // Find the color's name from available colors
                                const colorName = filteredItem.colors.find(
                                  (item) => item.color === color.color
                                )?.name;

                                // Update the selected colors array by adding the new color
                                return [
                                  ...prevSelected,
                                  { name: colorName || "", color: color.color },
                                ];
                              }

                              // If color already exists, return the current state (no change)
                              return prevSelected;
                            });

                            // Optional: Handle setColors if you want to update a different state as well
                            setselectedcolor((prevColors) => {
                              const colorExists = prevColors.some(
                                (item) => item.color === color.color
                              );

                              if (!colorExists) {
                                const colorName = filteredItem.colors.find(
                                  (item) => item.color === color.color
                                )?.name;

                                // Add the color to the color state if it doesn't exist
                                return [
                                  ...prevColors,
                                  { name: colorName || "", color: color.color },
                                ];
                              }

                              return prevColors;
                            });
                          }}
                        >
                          <input
                            type="checkbox"
                            value={color.name}
                            name="colors"
                            id={color.name}
                          />
                          <label
                            htmlFor={color.name}
                            className="text-14 sm:text-18"
                          >
                            {color.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex h-[60px] items-center py-2 w-full justify-between">
            <div className="w-[49%] flex items-center justify-between">
              <label
                htmlFor="discount"
                className="text-14 font-semibold sm:text-18"
              >
                Discount
              </label>
              <Switch id="discount" onCheckedChange={(e) => setdiscount(e)} />
            </div>
            {discount && (
              <div className="w-1/2">
                <InputCheckout
                  label="Discount"
                  name="discount"
                  placeholder="Product discount"
                  error=""
                  type="number"
                />
              </div>
            )}
          </div>

          <div className=" py-1 w-full  cursor-pointer rounded-md flex-col items-center justify-center flex gap-2">
            <div className="flex justify-between  w-full items-center">
              <h2 className="text-14 w-full sm:text-18 font-semibold">
                product details
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center w-[70%] text-14 sm:text-18 justify-center gap-2">
                  Detials <IoMdArrowDropdown />
                </DropdownMenuTrigger>
                {Details.length > 0 && (
                  <DropdownMenuContent className="bg-white w-screen sm:min-w-[400px]">
                    {Details.map((item, index) => (
                      <DropdownMenuItem
                        key={item.description}
                        className={` ${
                          index % 2 === 0 ? " bg-neutral-50" : "bg-neutral-200"
                        } flex items-center justify-between  px-4`}
                      >
                        <span className="text-neutral-600">{item.title}</span>
                        <span className="text-neutral-500">
                          {item.description}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-between">
              <div className="w-full flex flex-col sm:flex-row  items-center gap-4 ">
                <InputCheckout
                  label="Title Detials"
                  name="titleDetial"
                  placeholder=" enter the title details"
                  ref={titleRef}
                />
                <InputCheckout
                  label="description  Detials"
                  name="descriptionDetial"
                  placeholder="description details"
                  ref={descriptionRef}
                />
              </div>
              <button
                type="button"
                onClick={handleAdddetail}
                className="px-5 py-2 bg-black w-full  text-white rounded-lg "
              >
                add
              </button>
            </div>
          </div>
          <div className="flex justify-end items-center w-full gap-4 ">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border w-full sm:w-fit border-black hover:bg-neutral-200 duration-300 transition-all"
            >
              Back
            </button>
            <button className=" px-5 py-2  border w-full sm:w-fit border-black text-white bg-black rounded-lg hover:bg-neutral-200 hover:text-black duration-300 transition-all ">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
