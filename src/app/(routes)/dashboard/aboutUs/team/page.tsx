"use client";
import CardTeam from "@/components/about/CardTeam";
import { useToast } from "@/hooks/use-toast";
import {
  deleteTeam,
  getTeam,
  setMemeber,
  UpdateTeam,
  uploadImage,
} from "@/lib/action/uploadimage";
import { teamProps } from "@/type";
import { current } from "@reduxjs/toolkit";
import { ref } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { set, z } from "zod";
const Page = () => {
  const reffullName = React.useRef<HTMLInputElement>(null);
  const refposition = React.useRef<HTMLInputElement>(null);
  const refdescription = React.useRef<HTMLTextAreaElement>(null);
  const [imagePreview, setimagePreview] = useState<File>();
  const [imageUrl, setimageUrl] = useState<string>();
  const [error, seterror] = useState({
    fullName: "",
    position: "",
    description: "",
    imageUrl: "",
  });
  const [id, setid] = useState("");
  const { toast } = useToast();
  const [team, setteam] = useState<teamProps[]>([]);
  const validation = z.object({
    fullName: z.string({ message: "Please enter full name" }),
    position: z.string({ message: "Please enter position" }),
    description: z.string({ message: "Please enter description" }),
    imageUrl: z.string({ message: "Please upload image" }),
  });

  const handleUploadimage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    const imagedowlad = await uploadImage(file);
    setimageUrl(imagedowlad);
    setimagePreview(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seterror({
      fullName: "",
      position: "",
      description: "",
      imageUrl: "",
    });
    const validate = validation.safeParse({
      fullName: reffullName.current?.value,
      position: refposition.current?.value,
      description: refdescription.current?.value,
      imageUrl: imageUrl,
    });
    if (!validate.success) {
      validate.error.errors.forEach((err) => {
        seterror((prev) => ({
          ...prev,
          [err.path[0]]: err.message,
        }));
      });
    } else {
      if (id) {
        UpdateTeam({
          id: id,
          fullName: reffullName.current!.value,
          position: refposition.current!.value,
          description: refdescription.current!.value,
          imageUrl: imageUrl,
        });

        setteam((prev) =>
          prev.filter((i) => {
            if (i.id === id) {
              return {
                id: id,
                name: reffullName.current!.value,
                position: refposition.current!.value,
                description: refdescription.current!.value,
                image: imageUrl,
              };
            }
            return i;
          })
        );

        toast({ title: "Member edited successfully" });
        reffullName.current!.value = "";
        refposition.current!.value = "";
        refdescription.current!.value = "";
        setimageUrl("");
        setimagePreview(null);
        setid("");
      } else {
        setMemeber(
          reffullName.current?.value,
          refposition.current?.value,
          refdescription.current?.value,
          imageUrl
        );
        setteam((pre) => [
          ...pre,
          {
            description: refdescription.current.value,
            fullName: reffullName.current.value,
            imageUrl: imageUrl,
            position: refposition.current.value,
          },
        ]);
        toast({ title: "Member added successfully" });
        reffullName.current!.value = "";
        refposition.current!.value = "";
        refdescription.current!.value = "";
        setimageUrl("");
        setimagePreview(null);
      }
    }
  };
  useEffect(() => {
    const getdata = async () => {
      const data = await getTeam();

      setteam(data);
    };
    getdata();
  }, []);

  return (
    <div className="w-screen flex mt-8 px-5 py-2 items-center justify-center flex-col ">
      <h1 className="self-start text-30 font-semibold">My team</h1>
      <div className="w-full h-full flex flex-wrap gap-4">
        {team.map((item) => (
          <CardTeam
            key={item.id}
            name={item.fullName}
            description={item.description}
            imageUrl={item.imageUrl}
            role={item.position}
            isDashboard={true}
            onEdit={() => {
              refdescription.current!.value = item.description;
              refposition.current!.value = item.position;
              reffullName.current!.value = item.fullName;
              setimageUrl(item.imageUrl);
              setid(item.id);
            }}
            onDelete={() => {
              setteam((prev) => prev.filter((i) => i.id !== item.id));
              deleteTeam(item.id);
              toast({ title: "Member deleted successfully" });
            }}
          />
        ))}
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full mt-6 flex flex-col rounded-2xl items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-md"
      >
        <h1 className="text-xl font-bold mb-4">
          {id ? "Edit Member" : "Add Member"}
        </h1>

        {/* Image Upload Section */}
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed rounded-md cursor-pointer hover:border-white transition-all duration-200 bg-white bg-opacity-10"
        >
          {imagePreview || imageUrl ? (
            <Image
              src={imageUrl ? imageUrl : URL.createObjectURL(imagePreview)}
              alt="Uploaded Preview"
              width={192}
              height={192}
              className="rounded-md object-cover"
            />
          ) : (
            <span className="text-gray-200 text-sm text-center font-medium">
              Click to Upload Image
            </span>
          )}
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleUploadimage}
        />
        {error.imageUrl && (
          <p className="text-red-500 text-sm">{error.imageUrl}</p>
        )}
        {/* Full Name Input */}
        <label htmlFor="fullName" className="mt-4 text-sm font-semibold w-full">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          ref={reffullName}
          placeholder="Enter full name"
          className="w-full rounded-md border-2 border-transparent p-2 my-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
          // onChange={handleFullName}
        />
        {error.fullName && (
          <p className="text-red-500 text-sm">{error.fullName}</p>
        )}
        {/* Position Input */}
        <label htmlFor="position" className="text-sm font-semibold w-full">
          Position
        </label>
        <input
          type="text"
          id="position"
          ref={refposition}
          placeholder="Enter position"
          className="w-full rounded-md border-2 border-transparent p-2 my-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
          // onChange={handlePosition}
        />
        {error.position && (
          <p className="text-red-500 text-sm">{error.position}</p>
        )}
        {/* Description Input */}
        <label htmlFor="description" className="text-sm font-semibold w-full">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter description"
          rows={3}
          ref={refdescription}
          className="w-full rounded-md border-2 border-transparent p-2 my-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500 resize-none"
          // onChange={handleDescription}
        ></textarea>
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}
        {/* Submit Button */}
        <footer className="w-full mt-3  flex items-center justify-between gap-3 ">
          <button
            type="button"
            onClick={() => {
              setimageUrl("");
              setid("");
              setimagePreview(null);
              reffullName.current.value = "";
              refposition.current.value = "";
              refdescription.current.value = "";
            }}
            className="w-full p-2 md:hover:bg-cyan-900 duration-300 transition-all active:bg-cyan-800  border rounded-lg border-white "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold rounded-md p-2  hover:bg-gray-100 transition-all duration-200 shadow-sm"
          >
            {id ? "Edit Member" : "Add Member"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Page;
