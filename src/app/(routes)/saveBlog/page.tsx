"use client";
import SaveBlogCard from "@/components/blog/SaveBlogCard";
import { useToast } from "@/hooks/use-toast";
import {
  addFavoriteBlog,
  deleteSave,
  getallsaveid,
  getSaveBlog,
} from "@/lib/action/fovarit";
import { blogFavriteProps } from "@/type";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [saveblog, setsaveblog] = useState<blogFavriteProps[]>([]);
  const [idBlogSave, setidBlogSave] = useState<string[]>([]);
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getdata = async () => {
      setLoading(true);
      try {
        const data = await getSaveBlog(user.id);
        const dataId = await getallsaveid(user.id);
        setidBlogSave(dataId);
        setsaveblog(data as blogFavriteProps[]);
      } catch (error) {
        toast({ title: "Error fetching saved blogs", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    if (isLoaded) getdata();
  }, [isLoaded, user, toast]);

  if (loading) {
    return (
      <div className="w-full px-5 flex flex-col my-8 items-center justify-center">
        <h1 className="font-semibold text-28">Loading saved blogs...</h1>
      </div>
    );
  }

  if (saveblog.length === 0) {
    return (
      <div className="w-full px-5 flex flex-col my-8 items-center justify-center">
        <h1 className="font-semibold text-28">No saved blogs found</h1>
      </div>
    );
  }

  return (
    <div className="w-full px-5 flex flex-col my-8 items-start justify-center flex-wrap">
      <p className="text-12">
        <Link
          href={"/"}
          className="md:hover:text-cyan-700 active:text-cyan-600 duration-300 transition-all"
        >
          home
        </Link>
        {" > "}
        <span className="text-blue-700">Save Blog</span>
      </p>
      <h1 className="font-semibold text-28">Save Blog</h1>

      {/* Animate the grid of cards */}
      <motion.div
        className="w-full grid md:grid-cols-2 my-5 lg:grid-cols-3 gap-3 items-center justify-center"
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {saveblog.map((item) => (
          <motion.div
            key={item.id}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            initial={{ opacity: 0, y: 50, x: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SaveBlogCard
              disabledBtn={idBlogSave.includes(item.id)}
              blog={item}
              onSave={() => {
                addFavoriteBlog({ item });
                setidBlogSave((pre) => [...pre, item.id]);
                toast({ title: "Saved the blog" });
              }}
              onUnsave={() => {
                deleteSave({
                  id: item.id,
                  numberOffavorites: item.numberOffavorites,
                  userId: user.id,
                });
                setidBlogSave((pre) => pre.filter((id) => id !== item.id));
                toast({ title: "Un-saved the blog" });
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Page;
