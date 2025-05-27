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
import {
  Upload,
  Image as ImageIcon,
  Video,
  Eye,
  ArrowLeft,
  Save,
  Link,
  FileText,
  Camera,
  Play,
} from "lucide-react";

const Page = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [image, setimage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [vedeoUrl, setvedeoUrl] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [title, settitle] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [type, settype] = useState<"video" | "image">();
  const [error, seterror] = useState<{
    title: string;
    description: string;
    type: string;
  }>({
    title: "",
    description: "",
    type: "",
  });
  const { user } = useUser();
  const { toast } = useToast();
  const db = getFirestore(app);

  const [haveId, setId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, [router]);

  const validation = z.object({
    title: z
      .string()
      .min(3)
      .max(100, { message: "Title must be between 3-100 characters" }),
    description: z
      .string()
      .min(3)
      .max(500, { message: "Description must be between 3-500 characters" }),
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
      setMessage("Upload failed. Please try again.");
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
      setMessage("Please provide an image file.");
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

    setLoading(true);

    try {
      if (haveId) {
        await updateDoc(doc(db, "blogs", haveId), {
          title: title,
          description: description,
          video: vedeoUrl,
          image: imageUrl,
          type: type,
          date: new Date(),
          user: user?.fullName,
          numberOfLikes: Math.floor(Math.random() * 100),
          numberOfDislikes: 0,
          numberOfComments: 0,
          comments: [],
          numberOfViews: 0,
          numberOffavorites: 0,
          numberOfSearches: Math.floor(Math.random() * 100),
        });
        toast({ title: "Blog updated successfully" });
      } else {
        await addDoc(collection(db, "blogs"), {
          title: title,
          description: description,
          video: vedeoUrl,
          image: imageUrl,
          type: type,
          date: new Date(),
          user: user?.fullName,
          numberOfLikes: Math.floor(Math.random() * 100),
          numberOfDislikes: 0,
          numberOfComments: 0,
          comments: [],
          numberOfViews: 0,
          numberOffavorites: 0,
          numberOfSearches: Math.floor(Math.random() * 100),
        });
        toast({ title: "Blog created successfully" });
      }
      router.push("/dashboard/Blog");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard/Blog")}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Blogs</span>
              </button>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {haveId ? "Edit Blog" : "Create New Blog"}
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Auto-save enabled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Blog Content</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Media Upload Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Camera className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-medium text-slate-900">
                      Media Upload
                    </h3>
                  </div>

                  {/* Image Upload */}
                  <div className="relative">
                    <label
                      htmlFor="image-upload"
                      className={`group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                        type === "video" || loading
                          ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-50"
                          : "border-blue-300 hover:border-blue-400 hover:bg-blue-50 bg-blue-25"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                          <ImageIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-slate-700">
                            Upload Image
                          </p>
                          <p className="text-xs text-slate-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={type === "video" || loading}
                      />
                    </label>
                  </div>

                  {/* Video URL Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="video-url"
                      className="flex items-center space-x-2 text-sm font-medium text-slate-700"
                    >
                      <Link className="w-4 h-4" />
                      <span>Video URL</span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="video-url"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://youtube.com/watch?v=..."
                        value={vedeoUrl}
                        onChange={(e) => {
                          settype("video");
                          setvedeoUrl(e.target.value);
                          setimageUrl("");
                          setimage(null);
                        }}
                      />
                      <Play className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {error?.type && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{error.type}</p>
                    </div>
                  )}
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                      error.title
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="Enter an engaging title for your blog..."
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  {error?.title && (
                    <p className="text-sm text-red-600">{error.title}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    {title.length}/100 characters
                  </p>
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none ${
                      error.description
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2`}
                    rows={6}
                    placeholder="Write a compelling description that will engage your readers..."
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                  {error?.description && (
                    <p className="text-sm text-red-600">{error.description}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    {description.length}/500 characters
                  </p>
                </div>

                {/* Progress Bar */}
                {loading && progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Uploading...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all duration-200 flex items-center justify-center space-x-2"
                    onClick={() => router.push("/dashboard/Blog")}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{haveId ? "Update Blog" : "Publish Blog"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span>Live Preview</span>
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Media Preview */}
                <div className="relative bg-slate-50 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 min-h-[200px] flex items-center justify-center">
                  {vedeoUrl ? (
                    <div className="w-full">
                      <ReactPlayer
                        url={vedeoUrl}
                        controls
                        width="100%"
                        height="200px"
                        className="rounded-lg"
                      />
                    </div>
                  ) : imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Blog preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 font-medium">
                          No media selected
                        </p>
                        <p className="text-slate-400 text-sm">
                          Upload an image or add a video URL
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Preview */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">
                      Title
                    </h3>
                    <div className="bg-slate-50 rounded-lg p-4 border">
                      <h4 className="text-lg font-bold text-slate-900">
                        {title || "Your blog title will appear here..."}
                      </h4>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">
                      Description
                    </h3>
                    <div className="bg-slate-50 rounded-lg p-4 border">
                      <p className="text-slate-700 leading-relaxed">
                        {description ||
                          "Your blog description will appear here..."}
                      </p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-slate-600">
                          <span className="font-medium">Author:</span>{" "}
                          {user?.fullName || "Unknown"}
                        </span>
                        <span className="text-slate-600">
                          <span className="font-medium">Type:</span>{" "}
                          {type || "Not selected"}
                        </span>
                      </div>
                      <span className="text-slate-500">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
