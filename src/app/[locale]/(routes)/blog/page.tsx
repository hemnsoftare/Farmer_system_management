"use client";
import BlogVideo from "@/components/blog/BlogVideo";
import BlogCol from "@/components/blog/blogCol";
import BlogRow from "@/components/blog/BlogRow";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getAllBlogs } from "@/lib/action/dashboard";
import { useQuery } from "@tanstack/react-query";

const BlogPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const data = await getAllBlogs();
      return { blog: data };
    },
  });
  const t = useTranslations("blog");

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Multiple Layers */}

      {/* Animated Background Orbs */}

      {/* Geometric Pattern Overlay */}

      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto mb-7 px-4 md:px-6 lg:px-8  dark:text-gray-200">
        {/* Spectacular Header Section */}
        <motion.div
          className="mb-2 text-center relative"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Floating Elements */}
        </motion.div>

        {/* Enhanced Breadcrumb Navigation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 text-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl px-6  border border-white/30 dark:border-gray-700/30  transition-all duration-300">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-200 font-semibold hover:scale-105"
            >
              {t("home")}
            </Link>
            <motion.span
              className="text-gray-400"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {` >`}
            </motion.span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {t("blog")}
            </span>
          </div>
        </motion.div>

        {/* Main Content with Enhanced Layout */}
        <motion.div
          className="flex flex-col gap-16 lg:flex-row w-full"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Column (Blog Posts) */}
          <motion.div
            className="flex flex-col gap-16 w-full lg:w-[70%]"
            variants={slideInFromLeft}
          >
            {/* Featured Blog Grid */}
            <motion.div className="space-y-8">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
              >
                {data?.blog
                  .filter((item) => item.type === "image")
                  .slice(0, 6)
                  .map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      className={`${index > 3 && "hidden lg:block"} group`}
                      variants={scaleIn}
                      whileHover={{
                        y: -12,
                        transition: { duration: 0.4, ease: "easeOut" },
                      }}
                    >
                      <Link href={"/blog/" + blog.id}>
                        <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/80 dark:border-gray-700/50 group-hover:border-purple-200 dark:group-hover:border-purple-600/50 hover:scale-105">
                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                          <BlogCol blog={blog} />
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 z-20"></div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>

            {/* Recent Posts Section */}
            <motion.div className="space-y-8" variants={fadeInUp}>
              <motion.div
                className="flex items-center gap-4 group"
                variants={scaleIn}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {t("recent_posts")}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Fresh content from our writers
                  </p>
                </div>
              </motion.div>

              {!isLoading && (
                <motion.div
                  className="grid grid-cols-1 xl:grid-cols-2 gap-8"
                  variants={staggerContainer}
                >
                  {data.blog.length > 0 &&
                    data.blog
                      .filter((item) => item.type === "image")
                      .map((blog, index) => (
                        <motion.div
                          key={blog.id}
                          variants={fadeInUp}
                          whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.3 },
                          }}
                          className="group"
                        >
                          <Link href={"/blog/" + blog.id}>
                            <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden border border-gray-100/80 dark:border-gray-700/50 group-hover:border-emerald-200 dark:group-hover:border-emerald-600/50">
                              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <BlogRow item={blog} />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column (Videos) */}
          <motion.div
            className="flex flex-col gap-8 w-full lg:w-[30%]"
            variants={slideInFromRight}
          >
            <motion.div
              className="sticky top-8 space-y-8"
              variants={staggerContainer}
            >
              <motion.div
                className="flex items-center gap-4 group"
                variants={scaleIn}
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                    {t("videos")}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Watch and learn
                  </p>
                </div>
              </motion.div>

              <motion.div className="space-y-6" variants={staggerContainer}>
                {data?.blog
                  .filter((item) => item.type === "video")
                  .map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      variants={fadeInUp}
                      whileHover={{
                        x: 8,
                        transition: { duration: 0.3 },
                      }}
                      className="group"
                    >
                      <Link href={"/blog/" + blog.id}>
                        <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100/80 dark:border-gray-700/50 group-hover:border-rose-200 dark:group-hover:border-rose-600/50">
                          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <BlogVideo more={t("more")} item={blog} />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Loading State */}
        {isLoading && (
          <motion.div
            className="flex flex-col items-center justify-center py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Crafting Amazing Content
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Just a moment while we gather the best stories for you...
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
