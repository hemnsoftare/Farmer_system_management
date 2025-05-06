"use client";
import { uploadImage } from "@/lib/action/uploadimage";
import { catagoryProps } from "../../../../../lib/action";
import { colors as availableColors } from "@/util/data";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FiTrash2, FiEdit, FiPlus, FiX } from "react-icons/fi";
import { MdColorLens } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../../../config/firebaseConfig";
import { useToast } from "@/hooks/use-toast";

const ModalCategory = () => {
  // State management
  const [categories, setCategories] = useState<catagoryProps[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState<{ name: string; color: string }[]>([]);
  const [categoryImage, setCategoryImage] = useState<{
    link: string | undefined;
    fileName: string | undefined;
  }>({ fileName: undefined, link: undefined });
  const [errors, setErrors] = useState<{
    name: string;
    brands: string;
    colors: string;
    image: string;
  }>({ name: "", brands: "", colors: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // References
  const nameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const db = getFirestore(app);

  // Form validation
  const validateForm = () => {
    const newErrors = { name: "", brands: "", colors: "", image: "" };
    let isValid = true;

    if (!nameRef.current?.value) {
      newErrors.name = "Category name is required";
      isValid = false;
    }

    if (brands.length === 0) {
      newErrors.brands = "Please add at least one brand";
      isValid = false;
    }

    if (colors.length === 0) {
      newErrors.colors = "Please select at least one color";
      isValid = false;
    }

    if (!categoryImage.link) {
      newErrors.image = "Please select an image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const snapshot = await getDocs(collection(db, "category"));
      const fetchedCategories: catagoryProps[] = [];
      snapshot.forEach((item) => {
        fetchedCategories.push(item.data() as catagoryProps);
      });
      setCategories(fetchedCategories);
    } catch (error) {
      toast({
        title: "Error fetching categories",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const categoryName = nameRef.current?.value || "";
    const categoryData = {
      name: categoryName,
      brands,
      colors,
      numberOfSearches: isEditing
        ? categories.find((cat) => cat.name === editId)?.numberOfSearches || 0
        : Math.floor(Math.random() * 100),
      image: categoryImage,
    };

    try {
      setIsLoading(true);
      if (isEditing) {
        // Delete the old document if name changed
        if (editId !== categoryName) {
          await deleteDoc(doc(db, "category", editId));
        }
        await setDoc(doc(db, "category", categoryName), categoryData);
        toast({
          title: "Category updated",
          description: `${categoryName} has been updated successfully!`,
        });
      } else {
        await setDoc(doc(db, "category", categoryName), categoryData);
        toast({
          title: "Category added",
          description: `${categoryName} has been added successfully!`,
        });
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing
          ? "Failed to update category"
          : "Failed to add category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    if (nameRef.current) nameRef.current.value = "";
    setBrands([]);
    setColors([]);
    setCategoryImage({ fileName: undefined, link: undefined });
    setErrors({ name: "", brands: "", colors: "", image: "" });
    setIsEditing(false);
    setEditId("");
  };

  // Handle brand management
  const handleAddBrand = () => {
    if (!brand.trim()) return;

    if (!brands.includes(brand.trim())) {
      setBrands((prev) => [...prev, brand.trim()]);
      setBrand("");
      setErrors((prev) => ({ ...prev, brands: "" }));
    } else {
      toast({
        title: "Brand already exists",
        description: "This brand is already added",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBrand = (brandToDelete: string) => {
    setBrands((prev) => prev.filter((b) => b !== brandToDelete));
  };

  // Handle color management
  const handleToggleColor = (color: string, name: string) => {
    setErrors((prev) => ({ ...prev, colors: "" }));

    const colorExists = colors.some((item) => item.color === color);
    if (colorExists) {
      setColors((prev) => prev.filter((item) => item.color !== color));
    } else {
      setColors((prev) => [...prev, { name, color }]);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(file);
      setCategoryImage({ fileName: file.name, link: imageUrl });
      setErrors((prev) => ({ ...prev, image: "" }));
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (categoryName: string) => {
    if (confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      try {
        setIsLoading(true);
        await deleteDoc(doc(db, "category", categoryName));
        toast({
          title: "Category deleted",
          description: `${categoryName} has been removed`,
        });
        setCategories((prev) =>
          prev.filter((cat) => cat.name !== categoryName)
        );
      } catch (error) {
        toast({
          title: "Delete failed",
          description: "Failed to delete category",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle category edit
  const handleEditCategory = (category: catagoryProps) => {
    setIsEditing(true);
    setEditId(category.name);

    if (nameRef.current) nameRef.current.value = category.name;
    setBrands(category.brands);
    setColors(category.colors);
    setCategoryImage(category.image as { link: string; fileName: string });

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-lg shadow-md">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl text-center text-gray-800 dark:text-white mb-8">
          {isEditing ? "Edit Category" : "Add New Category"}
        </h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Category Name */}
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Category Name
                  </label>
                  <input
                    type="text"
                    ref={nameRef}
                    placeholder="Enter category name"
                    className={`w-full p-3 border-2 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Brands */}
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Brands
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Enter brand name"
                      className={`flex-grow p-3 border-2 ${
                        errors.brands ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600`}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddBrand();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddBrand}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.brands && (
                    <p className="mt-1 text-red-500 text-sm">{errors.brands}</p>
                  )}

                  {/* Brand Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {brands.map((item) => (
                      <div
                        key={item}
                        className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full"
                      >
                        <span className="mr-2">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBrand(item)}
                          className="text-blue-500 hover:text-red-500 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload Image */}
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Category Image
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600`}
                  >
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                      accept="image/*"
                    />
                    {!categoryImage.link ? (
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center justify-center py-6"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        <span className="text-gray-500 dark:text-gray-400">
                          Click to upload image
                        </span>
                      </label>
                    ) : (
                      <div className="relative">
                        <Image
                          src={categoryImage.link}
                          alt="Category"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setCategoryImage({
                              fileName: undefined,
                              link: undefined,
                            })
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-red-500 text-sm">{errors.image}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div>
                  <label className=" text-lg font-medium mb-2 text-gray-700 dark:text-gray-200 flex items-center justify-between">
                    <span>Category Colors</span>
                    <button
                      type="button"
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                      <MdColorLens className="w-5 h-5 mr-1" />
                      {showColorPicker ? "Hide Colors" : "Show Colors"}
                    </button>
                  </label>

                  {errors.colors && (
                    <p className="mt-1 mb-2 text-red-500 text-sm">
                      {errors.colors}
                    </p>
                  )}

                  {/* Selected Colors */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {colors.map((colorItem) => (
                      <div key={colorItem.color} className="relative group">
                        <div
                          style={{ backgroundColor: colorItem.color }}
                          className="w-10 h-10 rounded-full border border-gray-300 shadow cursor-pointer"
                          title={colorItem.name}
                        ></div>
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleColor(colorItem.color, colorItem.name)
                          }
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Color Picker */}
                  {showColorPicker && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                        Available Colors
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {availableColors.map((color) => (
                          <div
                            key={color.color}
                            onClick={() =>
                              handleToggleColor(color.color, color.name)
                            }
                            className="cursor-pointer"
                          >
                            <div
                              className={`flex items-center p-2 rounded-lg ${
                                colors.some((c) => c.color === color.color)
                                  ? "ring-2 ring-blue-500"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: color.color,
                                color: [
                                  "#ffffff",
                                  "#f8fafc",
                                  "#f1f5f9",
                                  "#e5e7eb",
                                  "#fafafa",
                                ].includes(color.color.toLowerCase())
                                  ? "#000000"
                                  : "#ffffff",
                              }}
                            >
                              <span className="flex-grow text-sm font-medium">
                                {color.name}
                              </span>
                              {colors.some((c) => c.color === color.color) && (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 ${
                  isEditing
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-medium rounded-lg transition-colors flex items-center`}
              >
                {isLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isEditing ? "Update Category" : "Save Category"}
              </button>
            </div>
          </div>
        </form>

        {/* Category List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-xl text-gray-800 dark:text-white mb-6">
            Existing Categories
          </h2>

          {isLoading && categories.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No categories found. Add your first category above.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-36">
                    {category.image?.link ? (
                      <Image
                        src={category.image.link}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">
                          No image
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">
                      {category.name}
                    </h3>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {category.colors.slice(0, 5).map((color) => (
                        <div
                          key={color.color}
                          style={{ backgroundColor: color.color }}
                          className="w-6 h-6 rounded-full"
                          title={color.name}
                        ></div>
                      ))}
                      {category.colors.length > 5 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                          +{category.colors.length - 5}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {category.brands.length} brands ·{" "}
                      {category.numberOfSearches} searches
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <FiEdit className="w-4 h-4 mr-1" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteCategory(category.name)}
                        className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCategory;
