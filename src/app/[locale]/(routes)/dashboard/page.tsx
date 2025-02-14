"use client";
import CountUp from "react-countup";
import {
  getAllBlogs,
  getAllFavorite,
  getAllProducts,
  getAllTeam,
  getAllUsers,
} from "@/lib/action/dashboard";
import { getAllSaveBlog } from "@/lib/action/fovarit";
import { getAllOrder } from "@/lib/action/uploadimage";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaBox,
  FaClipboardList,
  FaHeart,
  FaBookmark,
  FaUserTie,
} from "react-icons/fa";
const DashboardPage = () => {
  const router = useRouter().push;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const users = await getAllUsers();
      const blogs = await getAllBlogs();
      const orders = await getAllOrder();
      const team = await getAllTeam();
      const products = await getAllProducts();
      const favorites = await getAllFavorite();
      const savedBlogs = await getAllSaveBlog();
      return { users, blogs, orders, team, products, favorites, savedBlogs };
    },
  });
  return (
    <div className="min-h-screen p-10  text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-10"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-extrabold text-cyan-600 drop-shadow-xl">
            Dashboard
          </h1>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 5px 20px rgba(0, 255, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-700 to-blue-500 text-white rounded-xl shadow-2xl hover:shadow-cyan-500/50"
          >
            Refresh Data
          </motion.button>
        </div>

        {isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-center text-xl text-gray-700"
          >
            Loading data...
          </motion.p>
        )}
        {error && (
          <p className="text-center text-xl text-red-500">Error loading data</p>
        )}

        {!isLoading && !error && data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              onRouter={() => {}}
              title="Total Users"
              count={data.users.length}
              icon={<FaUsers />}
              color="bg-cyan-800"
            />
            <StatCard
              onRouter={() => router("/dashboard/Products")}
              title="Total Products"
              count={data.products.length}
              icon={<FaBox />}
              color="bg-green-800"
            />
            <StatCard
              onRouter={() => router("/dashboard/UserOrder")}
              title="Total Orders"
              count={data.orders.length}
              icon={<FaClipboardList />}
              color="bg-orange-800"
            />
            <StatCard
              onRouter={() => {}}
              title="Favorites"
              count={data.products.reduce(
                (total, item) => total + item.numberFavorite,
                0
              )}
              icon={<FaHeart />}
              color="bg-red-800"
            />
            <StatCard
              onRouter={() => {}}
              title="Saved Blogs"
              count={
                Array.isArray(data.savedBlogs)
                  ? data.blogs.reduce(
                      (total, item) => total + (item.numberOffavorites || 0),
                      0
                    )
                  : 0
              }
              icon={<FaBookmark />}
              color="bg-purple-800"
            />
            <StatCard
              onRouter={() => {
                router("/dashboard/aboutUs/team");
              }}
              title="Team Members"
              count={data.team.length}
              icon={<FaUserTie />}
              color="bg-indigo-800"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, count, icon, color, onRouter }) => {
  return (
    <motion.div
      onClick={onRouter}
      className={`p-8 md:hover:scale-105 active:scale-75 transition-all duration-300  rounded-2xl shadow-2xl ${color} text-white flex items-center space-x-6 relative overflow-hidden border border-gray-600`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-5xl drop-shadow-lg"
      >
        {icon}
      </motion.div>
      <div>
        <h2 className="text-3xl font-bold drop-shadow-lg">{title}</h2>
        <CountUp className="text-24" start={0} end={count} duration={4} />
      </div>
      <motion.div
        className="absolute inset-0 bg-white/30 blur-3xl opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

export default DashboardPage;
