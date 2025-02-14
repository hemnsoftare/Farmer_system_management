"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Blog from "./_components/Blog";
import { BlogProps } from "@/lib/action";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { set } from "zod";
import { toast, useToast } from "@/hooks/use-toast";
const Page = () => {
  const [blogs, setblogs] = useState<BlogProps[]>([]);
  const db = getFirestore(app);
  const toast = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blogs", id)).then(() => {
        console.log("Document successfully deleted!");
        setblogs(blogs.filter((blog) => blog.id !== id));
        toast.dismiss("Blog Deleted");
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(collection(db, "blogs"));
      const blogs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        date: doc.data().date ? doc.data().date.toDate() : new Date(), // Handle Firestore Timestamp conversion
      })) as BlogProps[];
      setblogs(blogs);
    };
    getBlogs();
  }, [db]);
  console.log(blogs);
  return (
    <div className="flex flex-col py-9 items-start px-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="text-30 font-semibold">Blog</h1>
        <Link
          className="px-7 py-2 bg-cyan-600  md:hover:bg-cyan-800 duration-300 transition-all   text-white rounded-lg text-20 "
          href={"/dashboard/Blog/CreateBlog"}
        >
          Create Blog
        </Link>
      </header>
      <div className="md:flex px-2 md:px-6 grid  justify-center grid-cols-1 w-full flex-wrap items-center mt-7  gap-4">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            date={blog.date.toDateString()}
            description={blog.description}
            image={blog.image}
            title={blog.title}
            type={blog.type}
            user={blog.user}
            video={blog.video}
            id={blog.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
