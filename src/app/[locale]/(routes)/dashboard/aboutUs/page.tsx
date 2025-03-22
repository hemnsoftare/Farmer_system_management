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

const Page = () => {
  const [descriptions, setDescriptions] = useState<
    {
      title: string;
      description: string;
    }[]
  >([]);
  const [imagePreview, setImagePreview] = useState(null); // To hold the preview URL for the uploaded image
  const [error, seterror] = useState({
    image: "",
    descriptions: "",
    description: "",
  });
  const [isUpdate, setisUpdate] = useState(false);
  const [image, setimage] = useState<string>();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const descriptionImage = useRef<HTMLTextAreaElement>(null);
  const [about, setabout] = useState({
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
    image: z.string({ required_error: "please upload inage" }),
    description: z
      .string({ message: "add teh description of about page " })
      .min(1, { message: "description is too short" }),
  });
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
      const imagedowlad = await uploadImage(file);
      setimage(imagedowlad);
    }
  };

  const addAnotherDescription = () => {
    setDescriptions([
      ...descriptions,
      { title: title.current.value, description: description.current.value },
    ]);
    title.current.value = "";
    description.current.value = "";
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = validation.safeParse({
      descriptions,
      image,
      description: descriptionImage.current.value,
    });
    if (!validate.success) {
      validate.error.errors.map((err) => {
        seterror((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
    } else {
      if (isUpdate) {
        updateAbout(
          image,
          descriptionImage.current.value,
          descriptions
        ).finally(() => {
          setabout({
            imageUrl: image,
            description: descriptionImage.current.value,
            descriptions,
          });

          setDescriptions([]);
          setImagePreview(null);
          setimage("");
          descriptionImage.current.value = "";
          title.current.value = "";
          description.current.value = "";
          setisUpdate(false);
          toast({
            title: "About Us Updated Successfully",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          }); // Show success message
        });
      } else {
        setAbouut(image, descriptionImage.current.value, descriptions).finally(
          () => {
            setDescriptions([]);
            setImagePreview(null);
            setimage("");
            descriptionImage.current.value = "";
            title.current.value = "";
            description.current.value = "";

            toast({
              title: "About Us Added Successfully",
              style: {
                backgroundColor: "green",
                color: "white",
              },
            }); // Show success message
          }
        );
      }
    }
  };
  useEffect(() => {
    const getdata = async () => {
      const data = await getAboutUs();
      setabout(data as any);
    };
    getdata();
  }, []);
  return (
    <div className="flex flex-col py-9 px-6 items-center justify-center w-full">
      <div className="w-full flex items-center justify-between ">
        <h1 className="self-start text-30 font-semibold">About Us</h1>
        <Link
          href={"/dashboard/aboutUs/team"}
          className="px-7 bg-secondary text-white font-semibold text-18 rounded-lg active:bg-secondary-400 active:text-white duration-300 transition-all hover:bg-secondary-500 hover:text-white py-1"
        >
          My Team{" "}
        </Link>
      </div>
      <div className="flex w-full sm:px-40 flex-col py-8 gap-4 px-2 sm:gap-4">
        <Image
          src={about.imageUrl ? about.imageUrl : "/About.png"}
          alt="about image"
          width={600}
          height={400}
          className="w-full rounded-md md:h-full h-[250px]"
        />
        <p className="text-neutral-400 dark:text-neutral-600 px-3 text-12 sm:text-16 line-clamp-0 indent-2 -mt-2">
          {about.description
            ? about.description
            : " Tech Heim is an innovative online store that offers a diverse  selection of digital gadgets, available for purchase in both cash and   installment options. Embodying the motto Join the digital revolution          today the website not only provides a seamless shopping experience but          also features a captivating blog section filled with insightful          reviews, articles, and videos about cutting-edge technology and          digital gadgets. The platform also includes a user comments and Q&A "}
        </p>
        <div className="">
          {about.description ? (
            about.descriptions.map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <h2 className="text-20 font-semibold">{item.title}</h2>
                <p className="text-14">{item.description}</p>
              </div>
            ))
          ) : (
            <>
              <h2 className="font-semibold text-16 sm:text-20 ">
                Some of Tech Heim’s impressive features :{" "}
              </h2>
              <p className="text-neutral-400 px-3 dark:text-neutral-600  text-12 sm:text-18 indent-2 ">
                Diverse digital gadgets for purchase in cash or installments A
                blog with reviews and articles about the latest technology and
                gadgets User comments and Q&A section for community interaction
                Represents a tech-savvy home with all necessary technology
                Easy-to-use interface for a great user experience Consistent and
                visually appealing design A hub for tech enthusiasts to connect
                and share insights Helps users make informed purchase decisions
              </p>
            </>
          )}
        </div>
        <footer className="flex items-center justify-end w-full gap-4">
          <button
            onClick={() => {
              descriptionImage.current.value = about.description;
              setDescriptions(about.descriptions);
              setimage(about.imageUrl);
              setImagePreview(null);
              setisUpdate(true);
            }}
            className="px-7 rounded-lg py-1 bg-secondary text-white md:hover:bg-secondary-300 duration-300 transition-all active:bg-secondary-300"
          >
            edite abot{" "}
          </button>
        </footer>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-3/4 gap-6 px-4 sm:gap-6 bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <div className="flex w-full justify-between gap-4">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full min-h-[450px] max-h-[450px] border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 transition-all duration-200"
          >
            {imagePreview || image ? (
              <Image
                src={image ? image : imagePreview}
                alt="about image"
                width={600}
                height={400}
                className="w-full rounded-md md:h-full h-[450px]"
              />
            ) : (
              <span className="text-gray-500">Click to Upload Image</span>
            )}
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload} // Handle image upload
          />
        </div>
        {error.image && <p className="text-red-500">{error.image}</p>}

        <div className="flex flex-col w-full">
          <label
            htmlFor="description"
            className="text-gray-600 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            ref={descriptionImage}
            id="description"
            className="border rounded-lg outline-none w-full p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            cols={5}
            placeholder="Enter a description..."
          ></textarea>
          {error.description && (
            <p className="text-red-500">{error.description}</p>
          )}
        </div>

        <div
          id="additional-descriptions"
          className="w-full flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-600 font-medium">Title</label>
            <input
              type="text"
              ref={title}
              className="border rounded-lg outline-none w-full p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter a title..."
            />
            <label className="text-gray-600 font-medium">Description</label>
            <textarea
              className="border rounded-lg outline-none w-full p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              ref={description}
              rows={3}
              placeholder="Enter a description..."
            ></textarea>

            {
              /* Additional descriptions */
              descriptions.map((desc, index) => (
                <div
                  key={index}
                  className="flex flex-col transition-all duration-300 w-full gap-2 border border-gray-200 p-4 rounded-lg"
                >
                  <h2 className="text-lg font-semibold">{desc.title}</h2>
                  <p className="text-gray-600">{desc.description}</p>
                  <div className=" flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        title.current.value = desc.title;
                        description.current.value = desc.description;
                      }}
                      className="w-[120px] rounded-lg  py-1 text-blue-800 border duration-300 transition-all md:hover:bg-blue-700 md:hover:text-white active:text-white active:bg-blue-700  border-blue-800 "
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDescriptions(
                          descriptions.filter((item, i) => i !== index)
                        )
                      }
                      className="w-[120px] py-1  rounded-lg text-red-500 border border-red-500 duration-300 transition-all md:hover:bg-red-700 md:hover:text-white active:text-white active:bg-red-700                                   
                    "
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            }

            <button
              type="button"
              onClick={addAnotherDescription}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Add Another Description
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 md:hover:text-white  rounded-lg text-white bg-green-600 md:hover:bg-green-800 duration-300 transition-all active:bg-green-800 "
        >
          {isUpdate ? "Update About Us" : "Add About Us"}
        </button>
      </form>
    </div>
  );
};

export default Page;
