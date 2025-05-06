"use client";
import CardContactUs from "@/components/contactus/CardContactUs";
import LoadingSpinner from "@/components/contactus/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import {
  addContactUs,
  deleteContactUs,
  getConactUs,
  UpdateContactUUs,
  uploadImage,
} from "@/lib/action/uploadimage";
import { contactUSProps } from "@/lib/action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const Page = () => {
  const [title, setTitle] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();
  const [load, setLoad] = useState(false);
  const [contacts, setContacts] = useState<contactUSProps[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    imageUrl: "",
    formMessage: "",
  });
  const [id, setid] = useState("");
  // Validation schema with zod
  const validation = z.object({
    title: z.string().min(1, { message: "Please enter the title" }),
    imageUrl: z.string().min(1, { message: "Please select the image" }),
    formMessage: z
      .string()
      .min(1, { message: "Please enter the form message" }),
  });

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrors({
      title: "",
      imageUrl: "",
      formMessage: "",
    });
    const file = event.target.files?.[0];
    if (file) {
      const urlImage = await uploadImage(file);
      setImageUrl(urlImage);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      title: "",
      imageUrl: "",
      formMessage: "",
    });

    // Perform validation before submitting
    const validationResult = validation.safeParse({
      title,
      imageUrl,
      formMessage,
    });
    if (!validationResult.success) {
      const newErrors = validationResult.error.formErrors.fieldErrors;
      setErrors({
        title: newErrors.title?.[0] || "",
        imageUrl: newErrors.imageUrl?.[0] || "",
        formMessage: newErrors.formMessage?.[0] || "",
      });
      return;
    } else {
      // Proceed with adding the contact information
      if (id) {
        UpdateContactUUs({
          title: title,
          id: id,
          formMessage: formMessage,
          imageUrl,
        });
        setContacts((pre) =>
          pre.filter((item) =>
            item.id !== id
              ? {
                  title: title,
                  id: id,
                  formMessage: formMessage,
                  imageUrl: imageUrl,
                }
              : item
          )
        );

        toast({ title: "update the contact us information" });
      } else {
        const idSet = await addContactUs({ title, imageUrl, formMessage });
        setContacts((pre) => [
          ...pre,
          { title, imageUrl, formMessage, id: idSet },
        ]);
        toast({ title: "Added the contact us information" });
      }
      setTitle("");
      setFormMessage("");
      setImageUrl("");
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const data = await getConactUs();
      setLoad(false);
      setContacts(data);
    };
    getData();
  }, []);

  return (
    <div className="w-full mt-7 pb-5 px-2 flex items-center justify-center flex-col gap-5 ">
      <div className="flex flex-col w-full items-center justify-center px-5 mt-8 pb-6 pt-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold uppercase mb-6 text-blue-600">
          {id ? "Update " : "Create "} Contact Us
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 items-center"
        >
          {/* Image Upload */}
          <div className="w-full flex flex-col items-center">
            <label
              htmlFor="image"
              className="flex items-center justify-center overflow-hidden bg-blue-100 rounded-xl h-48 w-48 border border-dashed border-blue-400 cursor-pointer hover:bg-blue-200 transition duration-300"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="image"
                  width={192}
                  height={12}
                  className="w-fit h-fit"
                />
              ) : (
                <span className="text-sm font-medium text-blue-500">
                  Upload Image
                </span>
              )}
            </label>
            <input
              onChange={handleUploadImage}
              type="file"
              className="hidden"
              id="image"
            />
            {errors.imageUrl && (
              <p className="text-red-500">{errors.imageUrl}</p>
            )}
          </div>

          {/* Title Input */}
          <div className="w-full">
            <label
              className="text-sm font-medium text-blue-600"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              value={title}
              className="outline-none rounded-lg border w-full mt-2 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm transition duration-300"
              placeholder="Enter the title for your contact"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          {/* Message Input */}
          <div className="w-full">
            <label
              className="text-sm font-medium text-blue-600"
              htmlFor="message"
            >
              Form Message
            </label>
            <input
              type="text"
              id="message"
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              className="outline-none rounded-lg border w-full mt-2 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm transition duration-300"
              placeholder="Enter form message"
            />
            {errors.formMessage && (
              <p className="text-red-500">{errors.formMessage}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 shadow-md transition duration-300 font-medium"
          >
            {id ? "Update Contact US" : "Create Contact US"}
          </button>
        </form>
      </div>
      <h1 className="text-26 font-semibold mt-12 mb-4">Contact Us </h1>
      <div className="w-full flex my-7 flex-wrap gap-1 items-center justify-start md:justify-center">
        {!load ? (
          contacts.map((item) => (
            <CardContactUs
              key={item.title}
              formMessage={item.formMessage}
              imageUrl={item.imageUrl}
              id={item.id}
              showActions={true}
              onDelete={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContacts((pre) =>
                  pre.filter((contact) => contact.id !== item.id)
                );
                deleteContactUs(item.id);
              }}
              onEdit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTitle(item.title);
                setFormMessage(item.formMessage);
                setImageUrl(item.imageUrl);
                setid(item.id);
              }}
              title={item.title}
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Page;
