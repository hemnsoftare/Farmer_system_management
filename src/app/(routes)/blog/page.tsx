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
import { motion } from "framer-motion";

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
        date: doc.data().date ? doc.data().date.toDate() : new Date(),
      })) as BlogProps[];
      setblog(blogs);
      setload(false);
    };
    getBlogs();
  }, [db]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col w-full max-w-screen mb-7 px-4 md:px-2 lg:px-1 dark:text-gray-200">
      {/* Breadcrumb Navigation */}
      <motion.span
        className="py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href={"/"}>home</Link> &gt; blog{" "}
      </motion.span>

      {/* Main Content */}
      <motion.div
        className="flex flex-col gap-6 lg:flex-row w-full"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Left Column (Blog Posts) */}
        <motion.div
          className="flex flex-col gap-6 w-full lg:w-[70%]"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          {/* Blog Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {blog
              .filter((item) => item.type === "image")
              .slice(0, 6)
              .map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className={`${index > 3 && "hidden md:block"}`}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  viewport={{ once: true }}
                >
                  <Link href={"/blog/" + blog.id}>
                    <BlogCol blog={blog} />
                  </Link>
                </motion.div>
              ))}
          </motion.div>

          {/* Recent Posts Section */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-semibold">Recent Posts</h2>
            {!load && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {blog.length > 0 &&
                  blog
                    .filter((item) => item.type === "image")
                    .map((blog) => (
                      <motion.div
                        key={blog.id}
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeInUp}
                        viewport={{ once: true }}
                      >
                        <Link href={"/blog/" + blog.id}>
                          <BlogRow item={blog} />
                        </Link>
                      </motion.div>
                    ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column (Videos) */}
        <motion.div
          className="flex flex-col gap-4 w-full lg:w-[30%]"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold">Videos</h2>
          <div className="w-full flex flex-col gap-4">
            {blog
              .filter((item) => item.type === "video")
              .map((blog) => (
                <motion.div
                  key={blog.id}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  viewport={{ once: true }}
                >
                  <Link href={"/blog/" + blog.id}>
                    <BlogVideo item={blog} />
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
