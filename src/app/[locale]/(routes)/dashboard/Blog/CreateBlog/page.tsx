"use client";

import { app } from "@/config/firebaseConfig";
import { useToast } from "@/hooks/use-toast";
import { handleUpload } from "@/lib/action/blog";
import { uploadImage } from "@/lib/action/uploadimage";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { z } from "zod";

const Page = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [image, setimage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [vedeoUrl, setvedeoUrl] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [title, settitle] = useState<string>();
  const [description, setdescription] = useState<string>();
  const [type, settype] = useState<"video" | "image">();
  const [error, seterror] = useState<{
    title: string;
    description: string;
    type: string;
  }>();
  const { user } = useUser();
  const { toast } = useToast();
  const db = getFirestore(app);

  const [haveId, setId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Parse the query string
    setId(params.get("id")); // Get the 'id' parameter
  }, [router]);

  const validation = z.object({
    title: z.string().min(3).max(100, { message: "Title is required" }),
    description: z
      .string()
      .min(3)
      .max(500, { message: "Description is required" }),
  });

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
      handleUploadVideo();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setimage(e.target.files[0]);
      setvedeoUrl("");
      setVideo(null);
      settype("image");
      handleUploadImage();
    }
  };

  const handleUploadVideo = async () => {
    try {
      setLoading(true);
      setProgress(0);
      const url = await handleUpload(
        video,
        (progress) => setProgress(progress),
        (message) => setMessage(message),
        (error) => setMessage(error)
      );
      setMessage("Upload successful!");
      setvedeoUrl(url);
      settype("video");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async () => {
    if (image) {
      setLoading(true);
      setProgress(0);
      const imageUrl = await uploadImage(image).finally(() => {
        setLoading(false);
      });
      setimageUrl(imageUrl);
    } else {
      setMessage("Please provide a video file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    seterror({
      title: "",
      description: "",
      type: "",
    });
    e.preventDefault();
    const validate = validation.safeParse({ title, description });
    if (!validate.success) {
      validate.error.errors.map((error) => {
        seterror((prev) => ({ ...prev, [error.path[0]]: error.message }));
      });
      return;
    }
    if (!type) {
      seterror((prev) => ({ ...prev, type: "Please select a media type" }));
      return;
    }
    if (haveId) {
      // Updating existing blog
      await updateDoc(doc(db, "blogs", haveId), {
        title: title,
        description: description,
        video: vedeoUrl,
        image: imageUrl,
        type: type,
        date: new Date(),
        user: user.fullName,
        numberOfLikes: Math.floor(Math.random() * 100),
        numberOfDislikes: 0,
        numberOfComments: 0,
        comments: [],
        numberOfViews: 0,
        numberOffavorites: 0,
        numberOfSearches: Math.floor(Math.random() * 100),
      })
        .then(() => {
          toast({ title: "Blog updated successfully" });
          router.push("/dashboard/Blog");
        })
        .catch((error) => {});
      return;
    }
    // Submitting a new blog
    await addDoc(collection(db, "blogs"), {
      title: title,
      description: description,
      video: vedeoUrl,
      image: imageUrl,
      type: type,
      date: new Date(),
      user: user.fullName,
      numberOfLikes: Math.floor(Math.random() * 100),
      numberOfDislikes: 0,
      numberOfComments: 0,
      comments: [],
      numberOfViews: 0,
      numberOffavorites: 0,
      numberOfSearches: Math.floor(Math.random() * 100),
    })
      .then(() => {
        toast({ title: "Blog submitted successfully" });
        router.push("/dashboard/Blog");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (haveId) {
      const getData = async () => {
        const data = await getDoc(doc(db, "blogs", haveId));
        const blog = data.data();
        if (blog) {
          settitle(blog.title);
          setdescription(blog.description);
          setimageUrl(blog.image);
          setvedeoUrl(blog.video);
          settype(blog.type);
        }
      };
      getData();
    }
  }, [db, haveId]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Create Blog</h1>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full lg:w-1/2 gap-6 bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between gap-4">
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${
                type === "video" || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-gray-600">Upload Image</span>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="veidio">Link to video</label>
            <input
              type="text"
              id="veidio"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter video link"
              value={vedeoUrl}
              onChange={(e) => {
                settype("video");
                setvedeoUrl(e.target.value);
              }}
            />
          </div>
          {error?.type && <p className="text-red-500">{error.type}</p>}

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            {error?.title && <p className="text-red-500">{error.title}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={5}
              placeholder="Enter blog description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            {error?.description && (
              <p className="text-red-500">{error.description}</p>
            )}
          </div>

          <footer className="flex gap-3 w-full">
            <button
              type="button"
              className="w-full py-3 border-blue-700 border-2 duration-300 transition-all text-black rounded-lg hover:bg-red-100"
              onClick={() => router.push("/dashboard/Blog")}
            >
              back to Blogs
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {haveId ? "Update Blog" : "Submit Blog"}
            </button>
          </footer>
        </form>

        <div className="flex flex-col w-full lg:w-1/2 gap-6 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
          <div className="flex justify-center items-center bg-white p-4 rounded-lg border">
            {vedeoUrl ? (
              <ReactPlayer
                url={vedeoUrl}
                controls
                className="w-full rounded-lg object-contain"
              />
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded Preview"
                width={500}
                height={500}
                className="w-full max-h-64 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">No media selected</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg border space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Title</h3>
            <p className="text-gray-800">{title || "No title provided"}</p>
            <h3 className="text-lg font-semibold text-gray-700">Description</h3>
            <p className="text-gray-800">
              {description || "No description provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
