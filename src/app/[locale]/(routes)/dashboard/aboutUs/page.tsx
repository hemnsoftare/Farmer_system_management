"use client";
import { useToast } from "@/hooks/use-toast";
import {
  getAboutUs,
  setAbouut,
  updateAbout,
  uploadImage,
} from "@/lib/action/uploadimage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  Upload,
  Plus,
  Edit3,
  Trash2,
  Save,
  Users,
  ImageIcon,
  FileText,
  Eye,
} from "lucide-react";

const Page = () => {
  const [descriptions, setDescriptions] = useState<
    {
      title: string;
      description: string;
    }[]
  >([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState({
    image: "",
    descriptions: "",
    description: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const descriptionImage = useRef<HTMLTextAreaElement>(null);
  const [about, setAbout] = useState({
    description: "",
    imageUrl: "",
    descriptions: [
      {
        title: "",
        description: "",
      },
    ],
  });
  const { toast } = useToast();

  const validation = z.object({
    descriptions: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    image: z.string({ required_error: "Please upload image" }),
    description: z
      .string({ message: "Add the description of about page" })
      .min(1, { message: "Description is too short" }),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setIsLoading(true);
      try {
        const imageDownload = await uploadImage(file);
        setImage(imageDownload);
        setError((prev) => ({ ...prev, image: "" }));
      } catch (err) {
        setError((prev) => ({ ...prev, image: "Failed to upload image" }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addAnotherDescription = () => {
    if (title.current && description.current) {
      if (!title.current.value.trim() || !description.current.value.trim()) {
        toast({
          title: "Please fill in both title and description",
          variant: "destructive",
        });
        return;
      }

      setDescriptions([
        ...descriptions,
        {
          title: title.current.value.trim(),
          description: description.current.value.trim(),
        },
      ]);
      title.current.value = "";
      description.current.value = "";
      setError((prev) => ({ ...prev, descriptions: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const validate = validation.safeParse({
      descriptions,
      image,
      description: descriptionImage.current?.value,
    });

    if (!validate.success) {
      setError({ image: "", descriptions: "", description: "" });
      validate.error.errors.map((err) => {
        setError((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isUpdate) {
        await updateAbout(
          image,
          descriptionImage.current?.value || "",
          descriptions
        );

        setAbout({
          imageUrl: image,
          description: descriptionImage.current?.value || "",
          descriptions,
        });

        toast({
          title: "About Us Updated Successfully",
          description: "Your changes have been saved.",
        });
      } else {
        await setAbouut(
          image,
          descriptionImage.current?.value || "",
          descriptions
        );

        toast({
          title: "About Us Added Successfully",
          description: "Your about page has been created.",
        });
      }

      // Reset form
      setDescriptions([]);
      setImagePreview(null);
      setImage("");
      if (descriptionImage.current) descriptionImage.current.value = "";
      if (title.current) title.current.value = "";
      if (description.current) description.current.value = "";
      setIsUpdate(false);
      setError({ image: "", descriptions: "", description: "" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAboutUs();
        setAbout(data as any);
      } catch (err) {
        console.error("Failed to fetch about us data:", err);
      }
    };
    getData();
  }, []);

  const PreviewSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Preview
        </h3>
      </div>
      <div className="p-6">
        <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={about.imageUrl || "/About.png"}
            alt="about image"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {about.description || "No description available yet."}
        </p>
        <div className="space-y-4">
          {about.descriptions.length > 0 ? (
            about.descriptions.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              No additional descriptions added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
              <p className="text-gray-600 mt-1">
                Manage your company s about page content
              </p>
            </div>
            <Link
              href="/dashboard/aboutUs/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5" />
              My Team
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="order-2 lg:order-1">
            <PreviewSection />

            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={() => {
                  if (descriptionImage.current) {
                    descriptionImage.current.value = about.description;
                  }
                  setDescriptions(about.descriptions);
                  setImage(about.imageUrl);
                  setImagePreview(null);
                  setIsUpdate(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit3 className="w-5 h-5" />
                Edit About
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {isUpdate ? "Update About Us" : "Create About Us"}
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Cover Image
                    </label>
                    <label
                      htmlFor="image-upload"
                      className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                    >
                      {imagePreview || image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={image || imagePreview!}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center">
                              <Upload className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm font-medium">
                                Change Image
                              </p>
                            </div>
                          </div>
                          {isLoading && (
                            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-600 mb-2">
                            Upload Cover Image
                          </p>
                          <p className="text-sm text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isLoading}
                    />
                    {error.image && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <span className="w-4 h-4 text-red-500">⚠</span>
                        {error.image}
                      </p>
                    )}
                  </div>

                  {/* Main Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Main Description
                    </label>
                    <textarea
                      ref={descriptionImage}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                      placeholder="Enter a compelling description of your company..."
                    />
                    {error.description && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <span className="w-4 h-4 text-red-500">⚠</span>
                        {error.description}
                      </p>
                    )}
                  </div>

                  {/* Additional Descriptions */}
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Additional Sections
                    </h4>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            ref={title}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Enter section title..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Description
                          </label>
                          <textarea
                            ref={description}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                            placeholder="Enter section description..."
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addAnotherDescription}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        Add Section
                      </button>
                    </div>

                    {/* Added Descriptions */}
                    {descriptions.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <h5 className="font-medium text-gray-700">
                          Added Sections ({descriptions.length})
                        </h5>
                        {descriptions.map((desc, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                          >
                            <h6 className="font-semibold text-gray-800 mb-2">
                              {desc.title}
                            </h6>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {desc.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (title.current && description.current) {
                                    title.current.value = desc.title;
                                    description.current.value =
                                      desc.description;
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-200"
                              >
                                <Edit3 className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setDescriptions(
                                    descriptions.filter((_, i) => i !== index)
                                  )
                                }
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {isUpdate ? "Update About Us" : "Create About Us"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
