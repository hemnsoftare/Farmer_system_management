"use client";
import Link from "next/link";
import React from "react";
import Blog from "./_components/Blog";
import { BlogProps } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { deleteBlog, getAllBlogs } from "@/lib/action/dashboard";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/app/[locale]/ClientProviders";
import { FaSpinner } from "react-icons/fa";

const Page = () => {
  const { toast } = useToast();

  // Fetch blogs with React Query
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const getBlogs = await getAllBlogs();
      return { blogs: getBlogs, allBlogs: getBlogs };
    },
  });

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim().toLowerCase();

    queryClient.setQueryData(
      ["blogs"],
      (oldData: { blogs: BlogProps[]; allBlogs: BlogProps[] }) => {
        if (!oldData || !oldData.blogs || !query) {
          return {
            blogs: oldData?.allBlogs ?? [],
            allBlogs: oldData?.allBlogs ?? [],
          };
        }
        return {
          blogs: oldData.allBlogs.filter((blog) =>
            blog.title.toLowerCase().includes(query)
          ),
          allBlogs: oldData.allBlogs,
        };
      }
    );
  };

  // Handle blog deletion
  const handleDelete = async (id: string) => {
    queryClient.setQueryData(
      ["blogs"],
      (oldData: { blogs: BlogProps[]; allBlogs: BlogProps[] }) => {
        if (!oldData || !oldData.blogs) return oldData;
        return {
          blogs: oldData.allBlogs.filter((blog) => blog.id !== id),
          allBlogs: oldData.allBlogs,
        };
      }
    );

    await deleteBlog(id);
    toast({ title: "Deleted", description: "Blog post deleted successfully." });
  };

  return (
    <div className="flex flex-col py-9 items-start px-4">
      {/* Header */}
      <header className="flex w-full items-center justify-between">
        <h1 className="text-30 font-semibold">Blog</h1>
        <Link
          className="px-7 py-2 bg-cyan-600 hover:bg-cyan-800 transition-all duration-300 text-white rounded-lg text-20"
          href="/dashboard/Blog/CreateBlog"
        >
          Create Blog
        </Link>
      </header>

      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search blogs..."
        className="w-full max-w-md self-center border-2 border-cyan-700 p-2 mt-4 rounded-lg outline-none"
        onChange={handleSearch}
      />

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-96">
          <FaSpinner className="text-cyan-600 animate-spin text-4xl" />
        </div>
      ) : (
        <div className="px-2 md:px-6 grid md:grid-cols-3 grid-cols-2 justify-center w-full flex-wrap items-center mt-7 gap-4">
          {data?.blogs.length > 0 ? (
            data.blogs.map((blog) => (
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
                handleDelete={() => handleDelete(blog.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-96">
              <h1 className="text-2xl text-gray-400">No blogs found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
