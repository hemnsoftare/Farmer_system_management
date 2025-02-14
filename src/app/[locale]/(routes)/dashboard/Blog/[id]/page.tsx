// app/blog/[id]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BlogProps } from "@/lib/action";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import ReactPlayer from "react-player";
import { useRouter } from "next/navigation";

const BlogReviewPage = ({ params }) => {
  const param: any = use(params);
  const id = param.id;
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const db = getFirestore(app);
  const router = useRouter();
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const getdata = await getDoc(doc(db, "blogs", id));
        const data = getdata.data();
        setBlog(data as BlogProps);
      };

      fetchProduct();
    }
  }, [id, db]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="container mx-auto p-4 bg-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Blog Title */}
      <motion.div
        className="md:text-4xl flex w-full justify-between items-center text-20 font-bold my-12 text-center text-gray-800"
        variants={itemVariants}
      >
        <h1> {blog.title}</h1>
        <h1 className="text-blue-800" onClick={() => router.back()}>
          Back
        </h1>
      </motion.div>

      {/* Media Section */}
      <motion.div className="mb-8" variants={itemVariants}>
        {blog.type === "video" ? (
          <div className="relative pt-[56.25%]">
            {" "}
            {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              url={blog.video}
              width="100%"
              height="100%"
              controls
              className="absolute top-0 left-0"
            />
          </div>
        ) : (
          <Image
            src={blog.image!}
            alt={blog.title}
            width={800}
            height={450}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </motion.div>

      {/* Blog Details */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        variants={itemVariants}
      >
        <p className="text-gray-700 text-lg mb-4">{blog.description}</p>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Author:</span> {blog.user}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(blog.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Likes:</span> {blog.numberOfLikes}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Dislikes:</span>{" "}
            {blog.numberOfDislikes}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Comments:</span>{" "}
            {blog.numberOfComments}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Views:</span> {blog.numberOfViews}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Favorites:</span>{" "}
            {blog.numberOffavorites}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Searches:</span>{" "}
            {blog.numberOfSearches}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Comments
          </h2>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">{comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No comments yet.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogReviewPage;
