"use client";

import { queryClient } from "@/app/[locale]/ClientProviders";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
export interface User {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  locked: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string | null;
  primaryWeb3WalletId: string | null;
  lastSignInAt: number;
  externalId: string | null;
  username: string;
  firstName: string;
  lastName: string;
  publicMetadata: {
    role: string;
    [key: string]: any;
  };
  privateMetadata: {
    [key: string]: any;
  };
  unsafeMetadata: {
    [key: string]: any;
  };
  emailAddresses: EmailAddress[];
}

export interface EmailAddress {
  id: string;
  emailAddress: string;
  verification: {
    status: string;
    strategy: string;
    externalVerificationRedirectURL: string | null;
    attempts: number | null;
    expireAt: number | null;
    nonce: string | null;
    message: string | null;
  };
  linkedTo: {
    id: string;
    type: string;
  }[];
}

const UserDashboardPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      const json = await res.json();
      console.log(json);
      return { user: json.users.data, allUser: json.users.data };
    },
  });

  const router = useRouter().push;
  if (!isLoading) console.log(data);
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br text-black">
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

      {/* Search Input */}
      <div className="mb-4 self-center flex items-center justify-center">
        <input
          type="search"
          placeholder="Search users..."
          onChange={(e) => {
            const searchQuery = e.target.value.trim().toLowerCase();
            queryClient.setQueryData(["user"], (oldData: any) => {
              if (!oldData || !oldData.user || !searchQuery)
                return { user: oldData.allUser, allUser: oldData.allUser };
              return {
                user: oldData.allUser.filter((item: any) =>
                  `${item.firstName} ${item.lastName}`
                    .toLowerCase()
                    .includes(searchQuery)
                ),
                allUser: oldData.allUser,
              };
            });
          }}
          className="w-full md:w-1/2 p-2 rounded-lg border-2 border-gray-600 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-300"
        />
      </div>

      {/* Users Grid */}
      {!isLoading && !error && data.user.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.user.map((user: User) => {
            const email = user.emailAddresses[0]?.emailAddress ?? "N/A";
            return (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-br text-black rounded-lg shadow-md p-6 hover:shadow-cyan-500/50 transition-shadow duration-300"
              >
                <Link
                  href={`/dashboard/user/${user.id}`}
                  className="flex flex-col space-y-2"
                >
                  <Image
                    alt="User Image"
                    src={user.imageUrl || "/user.png"}
                    width={90}
                    height={90}
                    className="object-cover self-center max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px] bg-white rounded-full"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold ">ID:</span>
                    <span className="text-sm line-clamp-1 text-gray-800">
                      {user.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold ">Name:</span>
                    <span className="text-sm text-gray-500">
                      {user.firstName
                        ? user.firstName + " " + user.lastName
                        : "No name provided"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold ">Email:</span>
                    <span className="text-sm line-clamp-1 text-gray-500 break-all">
                      {email}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* No Data Found */}
      {!isLoading && !error && data.user.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UserDashboardPage;
