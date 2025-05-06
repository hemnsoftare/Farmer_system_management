"use client";

import { getOrder, getUserById } from "@/lib/action/dashboard";
import { getfavorite, getSaveBlog } from "@/lib/action/fovarit";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { ChevronLeft, Heart, BookOpen, ShoppingBag, User2 } from "lucide-react";
import ReactPlayer from "react-player";
import { OrderType, userProps, UserType } from "@/lib/action";
import type { User } from "../page";
import { selectedOrder } from "@/lib/store/filterProducts";

// Custom components
const ProfileSection = ({
  user,
  email,
  totalOrder,
  isLoading,
}: {
  user: User;

  email: string;
  totalOrder: number;
  isLoading: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-blue-100"
  >
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      {isLoading ? (
        <div className="w-28 h-28 rounded-full border-4 border-blue-200 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-28 h-28 rounded-full border-4 border-blue-200 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
        >
          <Image
            src={user?.imageUrl || "/user.png"}
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </motion.div>
      )}

      <div className="flex flex-col md:flex-1 w-full">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isLoading
              ? "Loading..."
              : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
          </h2>
          <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-2">
            <User2 size={16} />
            {user?.emailAddresses?.[0]?.emailAddress || "Loading email..."}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-center">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-blue-600 font-medium">
              {user?.username ?? "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-blue-600 font-medium">{totalOrder ?? 0}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="text-gray-600 text-xs break-words">
              {user?.id ?? "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 col-span-1 sm:col-span-2 md:col-span-1">
            <p className="text-sm text-gray-500">Last Sign In</p>
            <p className="text-blue-600 font-medium">
              {user?.lastSignInAt
                ? new Date(user.lastSignInAt).toLocaleString()
                : "Never"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const SectionHeading = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-6">
    {icon}
    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      {title}
    </h3>
  </div>
);

const FavoriteItem = ({ favorite }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-blue-300/50 transition-all duration-300 border border-blue-100"
  >
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={favorite.image || "/placeholder.png"}
        alt={favorite.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${favorite.price}
        </span>
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
        {favorite.name}
      </h4>
    </div>
  </motion.div>
);

const BlogCard = ({ blog }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-indigo-300/50 transition-all duration-300 border border-blue-100"
  >
    <div className="relative h-40 w-full overflow-hidden">
      {blog.type === "video" && blog.video ? (
        <div className="absolute top-0 left-0 w-full h-full">
          <ReactPlayer
            url={blog.video}
            width="100%"
            height="100%"
            controls={false}
            light={false}
            playing={false}
            className="react-player"
          />
        </div>
      ) : (
        <>
          <Image
            src={blog.image || "/blog-placeholder.jpg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
        </>
      )}
    </div>

    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
          {blog.category || "Article"}
        </span>
        <span className="text-xs text-gray-500">
          {blog.date ? new Date(blog.date).toLocaleDateString() : "N/A"}
        </span>
      </div>

      <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
        {blog.title}
      </h4>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {blog.description || "No description available"}
      </p>
    </div>
  </motion.div>
);

const OrderCard = ({ order, date }: { order: OrderType; date: any }) => {
  const { selectOrder } = selectedOrder();
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => {
        selectOrder(order);
        redirect("/dashboard/UserOrder/id");
      }}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-blue-200 transition-all duration-300 border border-blue-100"
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-xs text-gray-500">Order ID</span>
          <p className="text-gray-800 font-medium">
            {order.id.substring(0, 8)}...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <span className="text-xs text-gray-500">Date</span>
          <p className="text-blue-600">{date}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Total</span>
          <p className="text-gray-800 font-bold">
            ${order.totalAmount || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg transition-colors duration-300">
          View Details
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-lg transition-colors duration-300">
          Track
        </button>
      </div>
    </motion.div>
  );
};

const LoadingSection = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
    ))}
  </div>
);

const EmptySection = ({ message }) => (
  <div className="bg-blue-50 rounded-xl p-8 shadow-md text-center border border-blue-100">
    <p className="text-gray-500">{message}</p>
  </div>
);

const UserProfilePage = ({ params }) => {
  const param: any = use(params);
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", param.id],
    queryFn: async () => {
      const getblog = await getSaveBlog(param.id);
      const getfavoritedata = await getfavorite(param.id);
      const getorder = await getOrder(param.id);
      console.log(`/api/users/${param.id}`);
      const res = await fetch(`/api/users/${param.id}`);
      if (!res.ok) throw new Error("Failed to fetch user");

      const userData = await res.json();

      return {
        user: userData.user,
        orders: getorder,
        favorites: getfavoritedata,
        savedBlogs: getblog,
      };
    },
    enabled: !!param.id, // ensure query only runs when param.id is available
  });

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Update icon colors for light theme
  const iconColors = {
    heart: <Heart className="text-pink-500" size={24} />,
    blog: <BookOpen className="text-indigo-500" size={24} />,
    order: <ShoppingBag className="text-blue-500" size={24} />,
  };
  if (!isLoading)
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="mb-8 px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </motion.button>

          {/* USER PROFILE */}
          <ProfileSection
            user={data?.user}
            email={email}
            totalOrder={data?.orders.length}
            isLoading={isLoading}
          />

          {/* TABS CONTENT */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="mt-12 space-y-12"
          >
            {/* FAVORITES SECTION */}
            <motion.div variants={itemVariants} className="w-full">
              <SectionHeading icon={iconColors.heart} title="Favorites" />

              {isLoading ? (
                <LoadingSection />
              ) : data?.favorites?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.favorites.map((fav) => (
                    <FavoriteItem key={fav.id} favorite={fav} />
                  ))}
                </div>
              ) : (
                <EmptySection message="No favorites added yet" />
              )}
            </motion.div>

            {/* SAVED BLOGS SECTION */}
            <motion.div variants={itemVariants} className="w-full">
              <SectionHeading icon={iconColors.blog} title="Saved Blogs" />

              {isLoading ? (
                <LoadingSection />
              ) : data?.savedBlogs?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.savedBlogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                  ))}
                </div>
              ) : (
                <EmptySection message="No blogs saved yet" />
              )}
            </motion.div>

            {/* USER ORDER INFO */}
            <motion.div variants={itemVariants} className="w-full">
              <SectionHeading icon={iconColors.order} title="Order History" />

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-800/60 rounded-xl h-40"
                    ></div>
                  ))}
                </div>
              ) : data?.orders?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.orders.map((order, index) => {
                    const date: any = order.orderDate;
                    const formattedDate = new Date(
                      (date.seconds || 0) * 1000
                    ).toLocaleDateString("en-US");
                    return (
                      <OrderCard
                        date={formattedDate}
                        order={order}
                        key={index}
                      />
                    );
                  })}
                </div>
              ) : (
                <EmptySection message="No orders placed yet" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
};

export default UserProfilePage;
