"use client";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import InputCheckout from "@/components/Cart/InputCheckout";
import { catagoryProps, ProductFormInput } from "../../../../../lib/action";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { getFireBase, uploadImage } from "@/lib/action/uploadimage";
import { IoMdArrowDropdown } from "react-icons/io";
import ImageSmallInput from "@/components/ImageSmallInput";
import { useSearchParams } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { colors } from "@nextui-org/react";
const initialProductFormInput: ProductFormInput = {
  id: undefined, // Optional ID
  name: "", // Default empty string
  price: 0, // Default price to 0
  brand: "", // Default empty string
  colors: [], // Default empty array
  category: "", // Default empty string
  Bigimage: null, // Default null
  imageSmall: [], // Default empty array
  discount: 0, // Default discount to 0
  details: [], // Default empty array for details
  numberFavorite: 0, // Default to 0
  numberSale: 0, // Default to 0
  date: new Date(), // Default to current date
  isDiscount: false, // Default to false
  bigimageUrl: "", // Default empty string
  numSearch: 0, // Default to 0
  smallimageUrl: [], // Default empty array
};
const initialState = {
  name: "",
  price: "",
  brand: "",
  category: "",
  Bigimage: "",
  colors: "",
  bigimageUrl: "",
  smallimageUrl: "",
  details: "",
  date: "",
  discount: "", // Optional value can be omitted
};
const Page = () => {
  const [haveId, sethaveId] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    sethaveId(id);
  }, []);
  const [selectedcolor, setselectedcolor] = useState<
    { name: string; color: string }[]
  >([]);
  const [value, setvalue] = useState<ProductFormInput>(initialProductFormInput);
  const [discount, setdiscount] = useState(value.isDiscount || false);
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
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [brand, setbrand] = useState("");
  const [error, seterror] = useState(initialState);
  const { toast } = useToast();
  const db = getFirestore(app);

  const validation = z.object({
    name: z.string().min(3),
    price: z.number().min(1),
    brand: z.string(),
    category: z.string(),
    Bigimage: z.string(),
    bigimageUrl: z.string(),
    smallimageUrl: z.array(z.string()).length(4),
    details: z
      .array(
        z.object({
          title: z.string().min(3),
          description: z.string().min(3),
        })
      )
      .nonempty(),
    date: z.date(),
    colors: z
      .array(
        z.object({
          name: z.string(),
          color: z.string(),
        })
      )
      .nonempty(),

    discount: z.number().optional(),
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seterror(initialState);
    const formData = new FormData(e.currentTarget);
    console.log(imageSmallUrl);
    const data: ProductFormInput = {
      name: formData.get("name")?.toString().trim() || "",
      price: parseFloat(formData.get("price") as string) || 0,
      brand: formData.get("brand")?.toString() || "",
      colors: selectedcolor,
      numSearch: Math.floor(Math.random() * 67), // Generates a whole number between 0 and 66
      category: formData.get("category")?.toString() || "",
      Bigimage: maiinImageNmae || "",

      bigimageUrl: selectedImage, // Main image URL
      smallimageUrl: imageSmallUrl, // Small images URL array
      // imageSmall: smallImageName, // File names of small images
      details: Details,
      numberFavorite: 0,
      numberSale: 0,
      date: new Date(),
      isDiscount: !!formData.get("discount"),
      discount: formData.get("discount")
        ? parseFloat(formData.get("discount") as string)
        : 0,
    };

    const sanitizedData = {
      ...data,
      id: haveId,
    } as { [key: string]: any };

    try {
      const validatedData = validation.safeParse(sanitizedData);
      if (!validatedData.success) {
        validatedData.error.errors.map((item) => {
          console.log(item);
          seterror((prev) => ({
            ...prev,
            [item.path[0]]: item.message,
          }));
        });
        return;
      }
      if (haveId) {
        await updateDoc(doc(db, "Products", haveId), { ...sanitizedData });
        console.log("Data updated successfully");
        toast({ title: "update the product successfully" });
        window.location.href = "/dashboard/Products";
      } else {
        await addDoc(collection(db, "Products"), data);
        console.log("Data added successfully");
      }
      window.location.href = "/dashboard/Products";
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

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

  const handleSmallImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("in handleSmallImageChange");
    const updatedImages = [...smallImageFile];
    const file = e.target.files?.[0];
    if (file) {
      try {
        const linkimageurl = await uploadImage(file); // Upload small image
        setimageSmallUrl((prevUrls) => {
          const updatedUrls = [...prevUrls];
          updatedUrls[index] = linkimageurl; // Replace the value at the specific index
          return updatedUrls;
        });

        updatedImages[index] = file; // Update file state
        setsmallImageFile(updatedImages);

        setsmallImageName((prevNames) => {
          const updatedNames = [...prevNames];
          updatedNames[index] = file.name; // Replace the file name at the specific index
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

  // Handle deleting product details
  const handleDeleteDetail = (index: number) => {
    setDetails((pre) => pre.filter((_, i) => i !== index));
  };

  type Color = { name: string; color: string };
  const handleColorSelection = (
    color: Color,
    filteredColors: Color[],
    prevSelected: Color[]
  ): Color[] => {
    // Check if the color already exists in the selected array
    const colorExists = prevSelected.filter(
      (item) => item.color === color.color
    ).length;
    console.log(colorExists);
    if (colorExists) {
      // If the color exists, remove it from the selected array
      return prevSelected.filter((item) => item.color !== color.color);
    } else {
      // If the color doesn't exist, add it to the selected array
      const colorName = filteredColors.find(
        (item) => item.color === color.color
      )?.name;

      return [...prevSelected, { name: colorName || "", color: color.color }];
    }
  };

  useEffect(() => {
    const getdata = async () => {
      const cate: catagoryProps[] = await getFireBase("category");
      setselectedCategoryy(cate[0].name || "");
      setcatagory(cate); // Ensure state is updated with correct type
    };
    getdata();
  }, []);
  useEffect(() => {
    const getdata = async () => {
      const data = await getDoc(doc(db, "Products", haveId));
      // setvalue(data.data() as ProductFormInput);
      console.log(data.data());
      setselectedCategoryy(data.data().category);
      setname(data.data().name);
      setprice(data.data().price);
      setselectedcolor(data.data().colors);
      setSelectedImage(data.data().bigimageUrl);
      setimageSmallUrl(data.data().smallimageUrl);
      setmaiinImageNmae(data.data().Bigimage);
      setDetails(data.data().details);
      setdiscount(data.data().discount);
      setbrand(data.data().brand);
    };
    if (haveId) getdata();
  }, [haveId, db]);

  return (
    <div className=" z-0 flex-col py-9 sm:h-screen lg:w-full w-full xl:max-w-[900px]  ">
      <h2 className="text-29 font-semibold px-7">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-row flex-col items-start gap-3 px-4    justify-start w-full py-4"
      >
        <div className="flex sm:px-3 flex-col gap-3  items-center justify-center">
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
            {selectedImage || value.bigimageUrl ? (
              <Image
                src={selectedImage ? selectedImage : value.bigimageUrl} // Display selected image using URL
                alt="Selected Image"
                width={300}
                height={300}
                className="size-[300px]"
              />
            ) : (
              "+"
            )}
          </label>
          {error.Bigimage && (
            <span className="text-red-500 text-14">{error.Bigimage}</span>
          )}
          <div className="flex items-center w-[300px] gap-4 justify-between">
            {smallImageFile.map((image, index) => (
              <ImageSmallInput
                key={index}
                name={`imageSmall${index}`}
                image={image}
                value={imageSmallUrl[index]}
                onImageChange={(e) => handleSmallImageChange(index, e)}
              />
            ))}
          </div>
          {error.smallimageUrl && (
            <span className="text-red-500 text-14">{error.smallimageUrl}</span>
          )}
        </div>
        <div className="flex gap-3 my-3 mb-5 items-start w-full  justify-center flex-col">
          <div className="w-full gap-3 flex-col sm:flex-row flex items-start h-[70px] justify-between">
            <InputCheckout
              label="Product Name"
              name="name"
              defualtValue={name}
              placeholder="Product name"
              error={error.name}
            />
            <InputCheckout
              label="Product Price"
              name="price"
              type="number"
              defualtValue={price as unknown as string}
              placeholder="Product price"
              error={error.price}
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
                defaultValue={selectedCategoryy}
                value={selectedCategoryy}
                className="py-1 px-3  bg-neutral-300 min-w-[230px] rounded-md outline-none border-none"
                onChange={(e) => {
                  setselectedcolor([]);
                  setselectedCategoryy(e.target.value);
                }}
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
              {error.category && (
                <span className="text-red-500 text-14">{error.category}</span>
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-semibold text-14 min-w-[80px] sm:text-18">
                Brand:
              </h2>
              <select
                name="brand"
                className="py-1 px-3 bg-neutral-300 min-w-[230px] rounded-md outline-none border-none"
              >
                <option
                  className="text-14  sm:text-18"
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
                {catagory?.map((item) => {
                  if (item.name === selectedCategoryy) {
                    return item.brands.map((branditem) => (
                      <option
                        className="text-14  sm:text-18"
                        key={branditem}
                        value={branditem}
                      >
                        {branditem}
                      </option>
                    ));
                  }
                })}
              </select>
              {error.brand && (
                <span className="text-red-500 text-14">{error.brand}</span> // Display error message
              )}
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
                      className="flex items-center overflow-x-auto w-full justify-start gap-3"
                    >
                      {filteredItem.colors.map((color) => (
                        <div
                          key={color.name}
                          className="flex gap-1 items-center"
                          onClick={() =>
                            setselectedcolor((prev) =>
                              prev.some((item) => item.color === color.color)
                                ? prev.filter(
                                    (item) => item.color !== color.color
                                  )
                                : [
                                    ...prev,
                                    { name: color.name, color: color.color },
                                  ]
                            )
                          }
                        >
                          <input
                            type="checkbox"
                            value={color.name}
                            name="colors"
                            checked={selectedcolor.some(
                              (item) => item.color === color.color
                            )}
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
            {error.colors && (
              <span className="text-red-500 text-14">{error.colors}</span>
            )}
          </div>

          {/* discount */}
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
                  defualtValue={discount.toString()}
                  placeholder="Product discount"
                  error={error.discount}
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
                <DropdownMenuTrigger className="flex items-center w-[70%] outline-none border-none text-14 sm:text-18 justify-center gap-2">
                  Details <IoMdArrowDropdown />
                </DropdownMenuTrigger>
                {(Details.length > 0 || value.details.length > 0) && (
                  <DropdownMenuContent className="bg-white -translate-x-[90px] w-screen sm:max-w-[400px]">
                    {(Details.length > 0 ? Details : value.details).map(
                      (item, index) => (
                        <DropdownMenuItem
                          key={item.description}
                          className={`${
                            index % 2 === 0 ? "bg-neutral-50" : "bg-neutral-200"
                          } flex items-center justify-between px-4`}
                        >
                          <span className="text-neutral-600">{item.title}</span>
                          <p className="flex items-center gap-3">
                            <span className="text-neutral-500 ">
                              {item.description}
                            </span>
                            <span
                              onClick={() => handleDeleteDetail(index)}
                              className=" hover:bg-red-200 rounded-full   transition-all duration-300 cursor-pointer p-2 box-content"
                            >
                              <MdOutlineDelete color="red" />
                            </span>
                          </p>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
            <div className="flex flex-col items-center gap-2 w-full justify-between">
              <div className="w-full flex flex-col   items-center gap-4 ">
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
                className="px-5 py-2 bg-blue-500 w-full  text-white rounded-lg "
              >
                add
              </button>
            </div>
            {error.details && (
              <span className="text-red-500 text-14">{error.details}</span>
            )}
          </div>
          <div className="flex justify-end items-center w-full gap-4 ">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/dashboard/Products";
              }}
              className="px-5 py-2 rounded-lg border w-full sm:w-fit border-black hover:bg-neutral-200 duration-300 transition-all"
            >
              Back
            </button>
            <button className=" px-5 py-2  border w-full sm:w-fit border-black text-white bg-black rounded-lg hover:bg-neutral-200 hover:text-black duration-300 transition-all ">
              {haveId ? "Update Products" : "Add Products"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
