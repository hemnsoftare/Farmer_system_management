"use client";

import SaveBlogCard from "@/components/blog/SaveBlogCard";
import { getOrder, getUserById } from "@/lib/action/dashboard";
import { getfavorite, getSaveBlog } from "@/lib/action/fovarit";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import OrderCard from "../../../historyOrder/_compoents/CardHistory";

const UserProfilePage = ({ params }) => {
  const param: any = use(params);
  const router = useRouter();
  const [eamil, seteamil] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const getblog = await getSaveBlog(param.id);
      const getfavoritedata = await getfavorite(param.id);
      const getuser = await getUserById(param.id);
      const em: any = getuser.emailAddresses[0];
      seteamil(em);
      const getorder = await getOrder(param.id);
      return {
        user: getuser,
        orders: getorder,
        favorites: getfavoritedata,
        savedBlogs: getblog,
      };
    },
  });

  // Handle rating selection

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-300"
      >
        ← Back
      </button>

      {/* USER PROFILE */}
      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="w-12 h-12 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-24 h-24 rounded-full border-4 border-cyan-300 shadow-lg overflow-hidden"
            >
              <Image
                src={data?.user?.image || "/user.png"}
                alt="User Avatar"
                fill
                className="object-cover bg-white"
              />
            </motion.div>
            <h2 className="text-2xl font-bold mt-3 text-cyan-300">
              {data?.user?.fullName}
            </h2>
            <p className="text-gray-400">{eamil}</p>
          </>
        )}
      </div>

      {/* FAVORITES SECTION */}
      <div className="mt-8 w-full">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4 border-cyan-300">
          Favorites
        </h3>
        {!data?.favorites ? (
          <p className="text-gray-400">Loading favorites...</p>
        ) : (
          <div className="flex items-center justify-start w-full py-8 overflow-x-auto gap-4">
            {data?.favorites?.map((fav) => (
              <motion.div
                key={fav.id}
                className="bg-gradient-to-br max-w-[250px] min-w-[250px] from-gray-800 to-gray-700 p-4 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-56 w-full rounded overflow-hidden">
                  <Image
                    src={fav.image || "/placeholder.png"}
                    alt={fav.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-2 font-semibold text-cyan-300">{fav.name}</h4>
                <p className="text-gray-400">${fav.price}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* SAVED BLOGS SECTION */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4 border-cyan-300">
          Saved Blogs
        </h3>
        {!data?.savedBlogs ? (
          <p className="text-gray-400">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.savedBlogs?.map((blog, index) => (
              <SaveBlogCard key={index} blog={blog} type="dashboard" />
            ))}
          </div>
        )}
      </div>

      {/* USER ORDER INFO */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4 border-cyan-300">
          Order History
        </h3>
        {!data?.orders ? (
          <p className="text-gray-400">Loading orders...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.orders?.map((order, index) => {
              const date: any = order.orderDate;
              const formattedDate = new Date(
                (date.seconds || 0) * 1000
              ).toLocaleDateString("en-US");
              return (
                <OrderCard date={formattedDate} order={order} key={index} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
