"use client";
import { getOrder, getUserById } from "@/lib/action/dashboard";
import { getfavorite, getSaveBlog } from "@/lib/action/fovarit";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, Package, Bookmark } from "lucide-react";
import Image from "next/image";
import CardFavorite from "../favorite/_components/CardFavorite";
import OrderCard from "../historyOrder/_compoents/CardHistory";
import SaveBlogCard from "@/components/blog/SaveBlogCard";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const getblog = await getSaveBlog(user.id);
      const getfavoritedata = await getfavorite(user.id);
      const getorder = await getOrder(user.id);
      return {
        orders: getorder,
        favorites: getfavoritedata,
        savedBlogs: getblog,
      };
    },
  });

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex justify-center py-3 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl p-8 border rounded-xl bg-white shadow-xl"
      >
        <div className="flex flex-col items-center gap-10">
          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <Image
              width={80}
              height={80}
              src={user.imageUrl}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border shadow-lg"
            />
            <h2 className="text-2xl font-bold text-gray-900">
              {user.fullName}
            </h2>
            <p className="text-gray-600">
              {user.primaryEmailAddress?.emailAddress}
            </p>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm text-center">
              <p className="text-gray-600">ID: {user.id || "N/A"}</p>
              <p className="text-gray-600">
                Phone: {user.phoneNumbers?.[0]?.phoneNumber || "N/A"}
              </p>
              <p className="text-gray-600">
                Username: {user.username || "N/A"}
              </p>
              <p className="text-gray-600">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Favorites, Orders, Saved Blogs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 w-full"
          >
            {/* Favorites Section */}
            <div className="bg-white p-7  rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <Heart size={20} className="text-red-500" /> Favorites
                </h3>
                <Link
                  href={"/favorite"}
                  className="text-blue-600 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                {data?.favorites
                  ?.slice(0, 3)
                  .map((item, index) => (
                    <CardFavorite key={index} item={item} />
                  ))}
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <Package size={20} className="text-blue-500" /> Orders
                </h3>
                <Link
                  href={"/historyOrder"}
                  className="text-blue-600 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                {data?.orders?.slice(0, 3).map((order, index) => {
                  const date: any = order.orderDate;
                  const formattedDate = new Date(
                    (date.seconds || 0) * 1000
                  ).toLocaleDateString("en-US");
                  return (
                    <OrderCard key={index} order={order} date={formattedDate} />
                  );
                })}
              </div>
            </div>

            {/* Saved Blogs Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <Bookmark size={20} className="text-yellow-500" /> Saved Blogs
                </h3>
                <Link
                  href={"/saveBlog"}
                  className="text-blue-600 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                {data?.savedBlogs
                  ?.slice(0, 3)
                  .map((blog) => (
                    <SaveBlogCard key={blog.blogId} blog={blog} />
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
