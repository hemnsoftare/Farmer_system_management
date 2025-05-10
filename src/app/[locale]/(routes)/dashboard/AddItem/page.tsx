"use client";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import InputCheckout from "@/components/Cart/InputCheckout";
import { catagoryProps, ProductFormInput } from "../../../../../lib/action";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { getFireBase, uploadImage } from "@/lib/action/uploadimage";
import { IoMdArrowDropdown } from "react-icons/io";
import ImageSmallInput from "@/components/ImageSmallInput";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  EditIcon,
  Image as ImageIcon,
  Info,
  Plus,
  Save,
  Tag,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

// Define the notification type
interface Notification {
  productId: string;
  productName: string;
  action: "added" | "updated" | "deleted";
  timestamp: any;
  seen: boolean;
  userId: string;
  userEmail: string;
}

const initialProductFormInput: ProductFormInput = {
  id: undefined,
  colorsName: [],
  name: "",
  price: 0,
  brand: "",
  iniPrice: 0,
  isev: false,
  stock: 0,
  isProduction: true,
  colors: [],
  category: "",
  Bigimage: null,
  imageSmall: [],
  discount: 0,
  details: [],
  numberFavorite: 0,
  numberSale: 0,
  date: new Date(),
  isDiscount: false,
  bigimageUrl: "",
  numSearch: 0,
  smallimageUrl: [],
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
  discount: "",
};

const Page = () => {
  const [haveId, setHaveId] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [selectedcolor, setSelectedcolor] = useState<
    { name: string; color: string }[]
  >([]);
  const [value, setValue] = useState<ProductFormInput>(initialProductFormInput);
  const [discount, setDiscount] = useState(value.isDiscount || false);
  const [dis, setdis] = useState(0);
  const [mainImageName, setMainImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [smallImageFile, setSmallImageFile] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [smallImageName, setSmallImageName] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [details, setDetails] = useState<
    { title: string; description: string }[]
  >([]);
  const [imageSmallUrl, setImageSmallUrl] = useState<string[]>([]);
  const [category, setCategory] = useState<catagoryProps[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [iniPrice, setIniPrice] = useState(0);
  const [error, setError] = useState(initialState);
  const [isProduction, setIsProduction] = useState(true);
  const [editingDetailIndex, setEditingDetailIndex] = useState<number | null>(
    null
  );
  const { toast } = useToast();
  const db = getFirestore(app);

  // Get current user info from localStorage (assuming user is stored there)
  const getUserInfo = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        return {
          id: parsedUser.uid || "unknown",
          email: parsedUser.email || "unknown@example.com",
        };
      }
    }
    return { id: "unknown", email: "unknown@example.com" };
  };

  // Create notification function
  const createNotification = async (
    productId: string,
    productName: string,
    action: "added" | "updated" | "deleted"
  ) => {
    try {
      const user = getUserInfo();
      const notification: Notification = {
        productId,
        productName,
        action,
        timestamp: serverTimestamp(),
        seen: false,
        userId: user.id,
        userEmail: user.email,
      };

      await addDoc(collection(db, "notifications"), notification);
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) setHaveId(id);
  }, []);

  const validation = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    price: z.number().min(1, "Price must be greater than 0"),
    iniPrice: z.number().min(1, "Initial price must be greater than 0"),
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
    Bigimage: z.string().min(1, "Main image is required"),
    bigimageUrl: z.string().min(1, "Main image URL is required"),
    smallimageUrl: z
      .array(z.string())
      .length(4, "All 4 small images are required"),
    details: z
      .array(
        z.object({
          title: z.string().min(3, "Title must be at least 3 characters"),
          description: z
            .string()
            .min(3, "Description must be at least 3 characters"),
        })
      )
      .nonempty("At least one detail is required"),
    date: z.date(),
    stock: z.number().min(1, "Stock must be at least 1"),
    colors: z
      .array(
        z.object({
          name: z.string(),
          color: z.string(),
        })
      )
      .nonempty("At least one color must be selected"),
    discount: z.number().optional(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(initialState);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data: ProductFormInput = {
        name: formData.get("name")?.toString().trim() || "",
        iniPrice: parseFloat(
          formData.get("iniPrice")?.toString().trim() || "0"
        ),
        price: parseFloat(formData.get("price")?.toString().trim() || "0"),
        stock: parseFloat(formData.get("stock")?.toString().trim() || "0"),
        isev: false,
        brand: formData.get("brand")?.toString().trim() || "",
        colors: selectedcolor,
        numSearch: Math.floor(Math.random() * 67),
        category: formData.get("category")?.toString().trim() || "",
        Bigimage: mainImageName || "",
        colorsName: selectedcolor.map((item) => item.name.trim()),
        bigimageUrl: selectedImage,
        smallimageUrl: imageSmallUrl,
        details: details,
        numberFavorite: 0,
        numberSale: 0,
        date: new Date(),
        isProduction,
        isDiscount: !!formData.get("discount"),
        discount: dis,
      };

      const sanitizedData = {
        ...data,
        id: haveId,
      } as { [key: string]: any };

      const validatedData = validation.safeParse(sanitizedData);

      if (!validatedData.success) {
        validatedData.error.errors.forEach((item) => {
          setError((prev) => ({
            ...prev,
            [item.path[0]]: item.message,
          }));
        });

        // Show first error as toast
        toast({
          title: "Validation Error",
          description: validatedData.error.errors[0].message,
          variant: "destructive",
        });

        setLoading(false);
        return;
      }

      // Update or create document based on if we have an ID
      if (haveId) {
        await updateDoc(doc(db, "Products", haveId), { ...sanitizedData });
        await createNotification(haveId, data.name, "updated");
        toast({
          title: "Product Updated",
          description: `${data.name} has been successfully updated.`,
          variant: "default",
        });
      } else {
        const docRef = await addDoc(
          collection(db, isProduction ? "Products" : "PrivateProducts"),
          data
        );
        await createNotification(docRef.id, data.name, "added");
        toast({
          title: "Product Added",
          description: `${data.name} has been successfully added to the catalog.`,
          variant: "default",
        });
      }

      window.location.href = "/dashboard/Products";
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageName(file.name);
      try {
        setLoading(true);

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return prev;
            }
            return prev + 5;
          });
        }, 100);

        const linkimage = await uploadImage(file);
        setSelectedImage(linkimage);

        clearInterval(interval);
        setUploadProgress(100);

        setTimeout(() => {
          setUploadProgress(0);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        toast({
          title: "Upload Failed",
          description:
            "There was an error uploading your image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSmallImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return prev;
            }
            return prev + 5;
          });
        }, 100);

        const linkImageUrl = await uploadImage(file);

        setImageSmallUrl((prevUrls) => {
          const updatedUrls = [...prevUrls];
          while (updatedUrls.length < 4) {
            updatedUrls.push("");
          }
          updatedUrls[index] = linkImageUrl;
          return updatedUrls;
        });

        const updatedImages = [...smallImageFile];
        updatedImages[index] = file;
        setSmallImageFile(updatedImages);

        setSmallImageName((prevNames) => {
          const updatedNames = [...prevNames];
          updatedNames[index] = file.name;
          return updatedNames;
        });

        clearInterval(interval);
        setUploadProgress(100);

        setTimeout(() => {
          setUploadProgress(0);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        toast({
          title: "Upload Failed",
          description:
            "There was an error uploading your small image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle adding product details
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleAddDetail = () => {
    const titleValue = titleRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;

    if (titleValue && descriptionValue) {
      if (editingDetailIndex !== null) {
        // Update existing detail
        setDetails((prevDetails) =>
          prevDetails.map((detail, index) =>
            index === editingDetailIndex
              ? { title: titleValue, description: descriptionValue }
              : detail
          )
        );
        setEditingDetailIndex(null);
      } else {
        // Add new detail
        setDetails((prevDetails) => [
          ...prevDetails,
          {
            title: titleValue,
            description: descriptionValue,
          },
        ]);
      }

      if (titleRef.current) titleRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
    } else {
      toast({
        title: "Missing Information",
        description:
          "Both title and description are required for product details.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const cate: catagoryProps[] = await getFireBase("category");
        setSelectedCategory(cate[0]?.name || "");
        setCategory(cate);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please refresh the page.",
          variant: "destructive",
        });
      }
    };
    getdata();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      try {
        const docSnap = await getDoc(doc(db, "Products", haveId));
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setSelectedCategory(productData.category);
          setName(productData.name);
          setIniPrice(productData.iniPrice);
          setStock(productData.stock);
          setPrice(productData.price);
          setSelectedcolor(productData.colors || []);
          setSelectedImage(productData.bigimageUrl);
          setImageSmallUrl(productData.smallimageUrl || []);
          setMainImageName(productData.Bigimage);
          setDetails(productData.details || []);
          setDiscount(productData.discount || 0);
          setBrand(productData.brand);
          setIsProduction(productData.isProduction !== false);
        } else {
          toast({
            title: "Product Not Found",
            description: "The requested product could not be found.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product information. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (haveId) {
      getdata();
    }
  }, [haveId, db, toast]);

  const editDetail = (index: number) => {
    const detail = details[index];
    if (titleRef.current) titleRef.current.value = detail.title;
    if (descriptionRef.current)
      descriptionRef.current.value = detail.description;
    setEditingDetailIndex(index);
  };

  const deleteDetail = (index: number) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full py-8 px-4 md:px-8">
      <Card className="max-w-6xl mx-auto bg-white shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Badge
                variant={haveId ? "secondary" : "default"}
                className="mb-2"
              >
                {haveId ? "Edit Product" : "New Product"}
              </Badge>
              <CardTitle className="text-2xl font-bold">
                {haveId ? `Edit ${name}` : "Add New Product"}
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = "/dashboard/Products")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Uploading...
                </span>
                <span className="ml-auto text-sm font-medium">
                  {uploadProgress}%
                </span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="basic-info">
                  <Info className="h-4 w-4 mr-2" /> Basic Info
                </TabsTrigger>
                <TabsTrigger value="images">
                  <ImageIcon className="h-4 w-4 mr-2" /> Images
                </TabsTrigger>
                <TabsTrigger value="variations">
                  <Tag className="h-4 w-4 mr-2" /> Variations
                </TabsTrigger>
                <TabsTrigger value="details">
                  <AlertCircle className="h-4 w-4 mr-2" /> Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic-info" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputCheckout
                      label="Product Name"
                      name="name"
                      defaultValue={name}
                      placeholder="Enter product name"
                      error={error.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputCheckout
                        label="Initial Price"
                        name="iniPrice"
                        type="number"
                        defaultValue={iniPrice === 0 ? "" : String(iniPrice)}
                        placeholder="Initial price"
                        error={error.iniPrice}
                        onChange={(e) => setIniPrice(parseInt(e.target.value))}
                        value={iniPrice}
                      />
                      <InputCheckout
                        label="Sale Price"
                        name="price"
                        type="number"
                        defaultValue={price === 0 ? "" : String(price)}
                        placeholder="Sale price"
                        error={error.price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        value={price}
                      />
                    </div>
                  </div>
                  <div>
                    <InputCheckout
                      label="Stock Quantity"
                      name="stock"
                      type="number"
                      defaultValue={stock === 0 ? "" : String(stock)}
                      placeholder="Stock quantity"
                      error={error.stock}
                      onChange={(e) => setStock(parseInt(e.target.value))}
                      value={stock}
                    />
                  </div>
                  <div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="discount">Discount (%)</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="discount-toggle"
                          checked={!!discount}
                          onCheckedChange={(checked) => setDiscount(checked)}
                        />
                        <label htmlFor="a"></label>
                        <InputCheckout
                          name="discount"
                          label=""
                          placeholder="Discount percentage"
                          error={error.discount}
                          type="number"
                          onChange={(e) => setdis(parseInt(e.target.value))}
                          value={dis}
                          defaultValue={discount ? discount.toString() : ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col space-y-1.5">
                      <Label>Category</Label>
                      <select
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedcolor([]);
                          setSelectedCategory(e.target.value);
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {category?.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {error.category && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col space-y-1.5">
                      <Label>Brand</Label>
                      <select
                        name="brand"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        {category
                          ?.find((item) => item.name === selectedCategory)
                          ?.brands.map((branditem) => (
                            <option key={branditem} value={branditem}>
                              {branditem}
                            </option>
                          ))}
                      </select>
                      {error.brand && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.brand}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label>Add to Production</Label>
                      <Switch
                        checked={isProduction}
                        onCheckedChange={setIsProduction}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isProduction
                        ? "This product will be visible in the store"
                        : "This product will be saved as draft"}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Main Product Image
                    </h3>
                    <div className="flex flex-col items-center justify-center">
                      <input
                        type="file"
                        id="imageBig"
                        name="Bigimage"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="imageBig"
                        className="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 cursor-pointer hover:bg-gray-50 transition duration-300 overflow-hidden"
                      >
                        {selectedImage ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={selectedImage}
                              alt="Selected Image"
                              fill
                              className="object-contain p-4"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                              <span className="text-white opacity-0 hover:opacity-100 font-medium">
                                Change Image
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-center">
                            <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-700">
                              Click to upload main product image
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, or WebP (recommended 1200x1200px)
                            </p>
                          </div>
                        )}
                      </label>
                      {error.Bigimage && (
                        <p className="text-red-500 text-sm mt-1 text-center">
                          {error.Bigimage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Product Gallery
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload up to 4 additional product images for the gallery
                      view
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="relative">
                          <ImageSmallInput
                            name={`imageSmall${index}`}
                            image={smallImageFile[index]}
                            value={imageSmallUrl[index]}
                            onImageChange={(e) =>
                              handleSmallImageChange(index, e)
                            }

                            // customClass="h-40 w-full"
                          />
                          <Badge
                            variant="outline"
                            className="absolute top-2 left-2 bg-white bg-opacity-70"
                          >
                            {index + 1}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {error.smallimageUrl && (
                      <p className="text-red-500 text-sm mt-2">
                        {error.smallimageUrl}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="variations">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Available Colors
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {category
                        ?.find((item) => item.name === selectedCategory)
                        ?.colors.map((color) => {
                          const isSelected = selectedcolor.some(
                            (item) => item.color === color.color
                          );
                          return (
                            <motion.div
                              key={color.name}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() =>
                                setSelectedcolor((prev) =>
                                  prev.some(
                                    (item) => item.color === color.color
                                  )
                                    ? prev.filter(
                                        (item) => item.color !== color.color
                                      )
                                    : [
                                        ...prev,
                                        {
                                          name: color.name,
                                          color: color.color,
                                        },
                                      ]
                                )
                              }
                            >
                              <div
                                className="w-6 h-6 rounded-full mr-3"
                                style={{ backgroundColor: color.color }}
                              />
                              <span className="text-sm font-medium">
                                {color.name}
                              </span>
                              {isSelected && (
                                <div className="ml-auto">
                                  <Badge
                                    variant="outline"
                                    className="bg-primary text-primary-foreground"
                                  >
                                    Selected
                                  </Badge>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                    </div>
                    {error.colors && (
                      <p className="text-red-500 text-sm mt-2">
                        {error.colors}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-3">
                      Selected Colors
                    </h3>
                    {selectedcolor.length === 0 ? (
                      <div className="bg-muted/50 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">
                          No colors selected. Please select at least one color
                          above.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedcolor.map((color, index) => (
                          <div
                            key={index}
                            className="group flex items-center space-x-2 bg-gray-100 rounded-full pl-2 pr-3 py-1.5"
                          >
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color.color }}
                            />
                            <span className="text-sm">{color.name}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedcolor((prev) =>
                                  prev.filter(
                                    (item) => item.color !== color.color
                                  )
                                )
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Product Details
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add important details about the product that customers
                      should know
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <InputCheckout
                          label="Detail Title"
                          name="titleDetial"
                          placeholder="E.g., Material, Dimensions"
                          ref={titleRef}
                        />
                        <InputCheckout
                          label="Detail Description"
                          name="descriptionDetial"
                          placeholder="E.g., 100% Cotton, 10cm x 20cm"
                          ref={descriptionRef}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleAddDetail}
                        className="w-full flex items-center justify-center"
                      >
                        {editingDetailIndex !== null ? (
                          <>Update Detail</>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" /> Add Detail
                          </>
                        )}
                      </Button>
                    </div>

                    {details.length > 0 ? (
                      <div className="overflow-hidden bg-white border rounded-lg">
                        <div className="grid grid-cols-12 text-sm font-medium bg-gray-100 px-4 py-3">
                          <div className="col-span-4">Title</div>
                          <div className="col-span-6">Description</div>
                          <div className="col-span-2 text-right">Actions</div>
                        </div>
                        <div className="divide-y">
                          {details.map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-12 px-4 py-3 items-center text-sm"
                            >
                              <div className="col-span-4 font-medium break-words">
                                {item.title}
                              </div>
                              <div className="col-span-6 text-gray-600 break-words">
                                {item.description}
                              </div>
                              <div className="col-span-2 flex justify-end space-x-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => editDetail(index)}
                                >
                                  <EditIcon className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteDetail(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/50 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">
                          No details added yet. Add details about the product to
                          improve customer understanding.
                        </p>
                      </div>
                    )}
                    {error.details && (
                      <p className="text-red-500 text-sm mt-2">
                        {error.details}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => (window.location.href = "/dashboard/Products")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-current border-r-transparent animate-spin rounded-full mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {haveId ? "Update Product" : "Add Product"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
