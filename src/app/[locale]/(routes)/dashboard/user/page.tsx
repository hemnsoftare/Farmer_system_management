"use client";

import { getAllUser } from "@/lib/action/dashboard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserDashboardPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const getusers = await getAllUser();
      return { getusers };
    },
  });
  const router = useRouter().push;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg">
        User Dashboard
      </h1>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-xl text-red-500">
          Error loading users. Please try again.
        </p>
      )}

      {/* Data Cards */}
      {!isLoading && !error && data?.getusers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.getusers.map((user, index) => {
            console.log(user);
            const email: any = user.emailAddresses[0];
            return (
              <motion.div
                key={user.id}
                // onClick={() => router(`/dashboard/user/${user.id}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-2xl p-6 hover:shadow-cyan-500/50 transition-shadow duration-300"
              >
                <Link
                  href={`/dashboard/user/${user.id}`}
                  className="flex flex-col space-y-4"
                >
                  {/* User ID */}
                  <Image
                    alt="image"
                    src={"/user.png"}
                    width={50}
                    height={50}
                    className="object-cover self-center bg-white rounded-full"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-cyan-300">
                      ID:
                    </span>
                    <span className="text-sm line-clamp-1 text-gray-300">
                      {user.id}
                    </span>
                  </div>

                  {/* Full Name */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-cyan-300">
                      Name:
                    </span>
                    <span className="text-sm text-gray-300">
                      {user.fullName}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-cyan-300">
                      Email:
                    </span>
                    <span className="text-sm line-clamp-1 text-gray-300 break-all">
                      {email}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* No Data State */}
      {!isLoading && !error && data?.getusers.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UserDashboardPage;
