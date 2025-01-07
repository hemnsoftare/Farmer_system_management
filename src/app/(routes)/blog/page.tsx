"use client";
import BlogVideo from "@/components/blog/BlogVideo";
import BlogCol from "@/components/blog/blogCol";
import BlogRow from "@/components/blog/BlogRow";
import { blogs } from "@/util/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BlogProps } from "@/type";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
const BlogPage = () => {
  const [blog, setblog] = useState<BlogProps[]>([]);
  const [load, setload] = useState(false);
  const db = getFirestore(app);
  useEffect(() => {
    const getBlogs = async () => {
      setload(true);
      const data = await getDocs(collection(db, "blogs"));
      const blogs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        date: doc.data().date ? doc.data().date.toDate() : new Date(), // Handle Firestore Timestamp conversion
      })) as BlogProps[];
      setblog(blogs);
      setload(false);
    };
    getBlogs();
  }, [db]);

  return (
    <div className="flex w-screen mb-7 px-3 dark:text-gray-500 md:px-[100px] lg:px-0 flex-col ">
      <span className="py-4">
        <Link href={"/"}> home</Link> &gt; blog{" "}
      </span>
      <div className=" lg:flex-row flex gap-4  md:flex-col flex-col  w-full ">
        <div className=" lg:w-[70%] md:w-full flex flex-col gap-4 ">
          <div className="grid  w-full grid-cols-2  md:items-center gap-2 divide-y-2 divide-transparent  h-fit py-4  2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 justify-start items-start content-start ">
            {blog
              .filter((item) => item.type === "image")
              .slice(0, 6)
              .map((blog, index) => (
                <Link
                  href={"/blog/" + blog.id}
                  key={blog.id}
                  className={`${index > 3 && "hidden md:block"}`}
                >
                  <BlogCol blog={blog} />
                </Link>
              ))}
          </div>
          <div className="flex w-full flex-col gap-4 ">
            <h2>Recent post</h2>

            {!load && (
              <div className=" lg:grid flex flex-col  lg:grid-cols-2 gap-3">
                {blog.length > 0 &&
                  blog
                    .filter((item) => item.type === "image")
                    .map((blog) => (
                      <Link href={"/blog/" + blog.id} key={blog.id}>
                        <BlogRow item={blog} />
                      </Link>
                    ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex mr-6 lg:w-[29%] flex-col gap-3">
          <span className="text-20 font-semibold">video</span>
          {blog
            .filter((item) => item.type === "video")
            .map((blog) => (
              <Link href={"/blog/" + blog.id} key={blog.id}>
                <BlogVideo item={blog} />
              </Link>
            ))}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default BlogPage;
