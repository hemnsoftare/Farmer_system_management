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
  updateDoc,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { getFireBase, uploadImage } from "@/lib/action/uploadimage";
import { IoMdArrowDropdown } from "react-icons/io";
import ImageSmallInput from "@/components/ImageSmallInput";
import { MdOutlineDelete } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { EditIcon, Trash2 } from "lucide-react";
const initialProductFormInput: ProductFormInput = {
  id: undefined, // Optional ID
  colorsName: [], // Default empty array
  name: "", // Default empty string
  price: 0, // Default price to 0
  brand: "", // Default empty string
  iniPrice: 0,
  isev: false,
  stock: 0,
  isProduction: true,

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
  stock: "",
  iniPrice: "",
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
  const [stock, setstock] = useState(0);
  const [iniPrice, setiniPrice] = useState(0);
  const [error, seterror] = useState(initialState);
  const [isProduction, setisProduction] = useState(true);
  const { toast } = useToast();
  const db = getFirestore(app);

  const validation = z.object({
    name: z.string().min(3),
    price: z.number().min(1),
    iniPrice: z.number().min(1),
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
    stock: z.number().min(1),
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

    const data: ProductFormInput = {
      name: formData.get("name")?.toString().trim() || "",
      iniPrice: parseFloat(formData.get("iniPrice").toString().trim()),
      price: parseFloat(formData.get("price") as string) || 0,
      stock: parseFloat(formData.get("stock") as string) || 0,
      isev: false,
      brand: formData.get("brand")?.toString().trim() || "",
      colors: selectedcolor,
      numSearch: Math.floor(Math.random() * 67), // Generates a whole number between 0 and 66
      category: formData.get("category")?.toString().trim() || "",
      Bigimage: maiinImageNmae || "",
      colorsName: selectedcolor.map((item) => item.name.trim()),
      bigimageUrl: selectedImage, // Main image URL
      smallimageUrl: imageSmallUrl, // Small images URL array
      // imageSmall: smallImageName, // File names of small images
      details: Details,
      numberFavorite: 0,
      numberSale: 0,
      date: new Date(),
      isProduction,
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
          seterror((prev) => ({
            ...prev,
            [item.path[0]]: item.message,
          }));
        });
        return;
      }
      if (haveId) {
        await updateDoc(doc(db, "Products", haveId), { ...sanitizedData });
        toast({ title: "update the product successfully" });
        window.location.href = "/dashboard/Products";
      } else {
        if (isProduction) await addDoc(collection(db, "Products"), data);
        else await addDoc(collection(db, "PrivateProducts"), data);
        toast({ title: "add the product successfully" });
      }
      window.location.href = "/dashboard/Products";
    } catch (error) {}
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file?.name && setmaiinImageNmae(file?.name);
    if (file) {
      try {
        const linkimage = await uploadImage(file); // Upload image and get the URL
        setSelectedImage(linkimage); // Update state with the image URL
      } catch (error) {}
    }
  };

  const handleSmallImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      } catch (error) {}
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

  type Color = { name: string; color: string };

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
      setselectedCategoryy(data.data().category);
      setname(data.data().name);
      setiniPrice(data.data().iniPrice);
      setstock(data.data().stock);
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
  console.log(error);
  return (
    <div className="z-0 flex-col w-full py-10 px-4 items-center justify-center h-full md:px-8 ">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className=" w-full flex flex-col gap-6 items-center justify-center "
      >
        {/* Images Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Big Image Input */}
          <input
            type="file"
            id="imageBig"
            name="Bigimage"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="imageBig"
            className="flex items-center justify-center bg-neutral-200 hover:bg-neutral-300 text-neutral-500 text-[80px] rounded-xl size-[250px] transition duration-200 cursor-pointer overflow-hidden"
          >
            {selectedImage || value.bigimageUrl ? (
              <Image
                src={selectedImage || value.bigimageUrl}
                alt="Selected Image"
                width={250}
                height={250}
                className="object-cover w-full h-full rounded-xl"
              />
            ) : (
              "+"
            )}
          </label>
          {error.Bigimage && (
            <span className="text-red-500 text-sm font-medium">
              {error.Bigimage}
            </span>
          )}

          {/* Small Images */}
          <div className="flex flex-wrap gap-3 justify-center">
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
            <span className="text-red-500 text-sm font-medium">
              {error.smallimageUrl}
            </span>
          )}
        </div>

        {/* Basic Info Section */}
        <div className="flex w-full md:w-1/2 flex-col gap-4">
          <InputCheckout
            label="Product Name"
            name="name"
            defaultValue={name}
            placeholder="Product name"
            error={error.name}
          />
          <InputCheckout
            label="Initial Product Price"
            name="iniPrice"
            type="number"
            defaultValue={iniPrice === 0 ? "" : String(iniPrice)}
            placeholder="Initial price"
            error={error.iniPrice}
          />
          <InputCheckout
            label="Last Product Price"
            name="price"
            type="number"
            defaultValue={price === 0 ? "" : String(price)}
            placeholder="Last price"
            error={error.price}
          />
          <InputCheckout
            label="Stock"
            name="stock"
            type="number"
            defaultValue={stock === 0 ? "" : String(stock)}
            placeholder="Stock amount"
            error={error.stock}
          />{" "}
          <InputCheckout
            label="Discount"
            name="discount"
            defaultValue={discount.toString()}
            placeholder="Discount amount"
            error={error.discount}
            type="number"
          />
        </div>

        {/* Category & Brand */}
        <div className="flex w-full md:w-1/2 flex-col gap-4">
          <div className="flex justify-between items-center gap-3">
            <label className="font-semibold text-sm sm:text-base min-w-[80px]">
              Category:
            </label>
            <select
              title="asdf"
              name="category"
              value={selectedCategoryy}
              onChange={(e) => {
                setselectedcolor([]);
                setselectedCategoryy(e.target.value);
              }}
              className="bg-neutral-200 rounded-md px-3 py-2 w-full max-w-xs"
            >
              {catagory?.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {error.category && (
            <span className="text-red-500 text-sm">{error.category}</span>
          )}

          <div className="flex items-center justify-between gap-3">
            <label className="font-semibold text-sm sm:text-base min-w-[80px]">
              Brand:
            </label>
            <select
              title="fds"
              name="brand"
              className="bg-neutral-200 rounded-md px-3 py-2 w-full max-w-xs"
              value={brand}
              onChange={(e) => setbrand(e.target.value)}
            >
              {catagory
                ?.find((item) => item.name === selectedCategoryy)
                ?.brands.map((branditem) => (
                  <option key={branditem} value={branditem}>
                    {branditem}
                  </option>
                ))}
            </select>
          </div>
          {error.brand && (
            <span className="text-red-500 text-sm">{error.brand}</span>
          )}
        </div>
        <div className="flex items-center justify-between w-full md:w-1/2 gap-2">
          <label className="font-semibold text-sm sm:text-base">
            Add to Production:
          </label>
          <Switch
            checked={isProduction}
            onClick={() => setisProduction((pre) => !pre)}
          />
        </div>
        {/* Colors */}
        <div className="flex w-full md:w-1/2 flex-col gap-2">
          <label className="font-semibold text-sm sm:text-base">Colors:</label>
          <div className="flex flex-wrap gap-4">
            {catagory
              ?.find((item) => item.name === selectedCategoryy)
              ?.colors.map((color) => (
                <div
                  key={color.name}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() =>
                    setselectedcolor((prev) =>
                      prev.some((item) => item.color === color.color)
                        ? prev.filter((item) => item.color !== color.color)
                        : [...prev, { name: color.name, color: color.color }]
                    )
                  }
                >
                  <input
                    type="checkbox"
                    name="colors"
                    id={color.name}
                    checked={selectedcolor.some(
                      (item) => item.color === color.color
                    )}
                    readOnly
                  />
                  <label htmlFor={color.name}>{color.name}</label>
                </div>
              ))}
          </div>
          {error.colors && (
            <span className="text-red-500 text-sm">{error.colors}</span>
          )}
        </div>

        {/* Production Switch */}

        {/* Product Details */}
        <div className="flex w-full md:w-1/2 flex-col gap-3">
          <div className="flex flex-col w-full  sm:flex-row gap-3">
            <InputCheckout
              label="Title"
              name="titleDetial"
              placeholder="Enter title"
              ref={titleRef}
            />
            <InputCheckout
              label="Description"
              name="descriptionDetial"
              placeholder="Enter description"
              ref={descriptionRef}
            />
          </div>
          <button
            type="button"
            onClick={handleAdddetail}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 sm:mt-6"
          >
            Add
          </button>
          {Details.length > 0 && (
            <div className="gird w-full border bg-slate-200 rounded-lg  gap-y-2 items-center ">
              <div className="flex items-center px-2 w-full justify-between">
                <span>Title</span>
                <span>Description</span>
                <div className="flex items-center  justify-between gap-3">
                  <span>Edite</span>
                  <span>Delete</span>
                </div>
              </div>

              {Details?.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                  } items-center py-1 px-2 w-full justify-between`}
                >
                  <span>{item.title}</span>{" "}
                  <span className="text-center">{item.description}</span>{" "}
                  <div className="flex items-center justify-center gap-4 px-5">
                    <EditIcon
                      onClick={() => {
                        titleRef.current.value = item.title;
                        descriptionRef.current.value = item.description;
                        setDetails((pre) =>
                          pre.filter((det) => det.title !== item.title)
                        );
                      }}
                      color="green"
                    />
                    <Trash2
                      color="red"
                      onClick={() =>
                        setDetails((pre) =>
                          pre.filter((det) => det.title !== item.title)
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error.details && (
            <span className="text-red-500 text-sm">{error.details}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 w-full md:w-1/2 mt-6">
          <button
            type="button"
            onClick={() => (window.location.href = "/dashboard/Products")}
            className="px-5 py-2 border border-black rounded-lg hover:bg-neutral-200 transition"
          >
            Back
          </button>
          <button className="px-5 py-2 flex-1 bg-black text-white border border-black rounded-lg hover:bg-neutral-200 hover:text-black transition">
            {haveId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Page;
