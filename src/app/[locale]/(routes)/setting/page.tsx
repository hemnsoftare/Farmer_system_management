"use client";
import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FiMoon, FiSun, FiSettings, FiLogOut } from "react-icons/fi";
import {
  MdSearch,
  MdFavorite,
  MdHistory,
  MdOutlineManageAccounts,
  MdDelete,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { useToast } from "@/hooks/use-toast";
import {
  addFavoriteBlog,
  deleteSave,
  getSaveBlog,
  getallsaveid,
} from "@/lib/action/fovarit";
import { blogFavriteProps } from "@/lib/action";
import SaveBlogCard from "@/components/blog/SaveBlogCard";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { FaBlog } from "react-icons/fa";
import { OrganizationMembership } from "@clerk/nextjs/dist/types/server";
import { clear_data_user, search_setting } from "../../../../lib/settingFn";
import AcceptDelete from "./_components/AcceptDelete";
import { IconType } from "react-icons";
import { useTheme } from "next-themes";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
const actions: {
  id: string;
  title: string;
  message: string;
  icon: IconType;
}[] = [
  {
    id: "favorite",
    title: "Clear Favorites",
    message: "Are you sure you want to clear your favorites?",
    icon: MdFavorite,
  },
  {
    id: "order",
    title: "Clear Order History",
    message: "Are you sure you want to clear your order history?",
    icon: MdHistory,
  },
  {
    id: "saveBlog",
    title: "Clear Saved Blogs",
    message: "Are you sure you want to clear your saved blogs?",
    icon: FaBlog,
  },
];
const SettingsPage = () => {
  const { user, isSignedIn } = useUser();
  const { setTheme, theme } = useTheme();
  const [searchOption, setSearchOption] = useState<
    ("category" | "product" | "blog" | "team_member")[]
  >(["category", "product", "blog"]);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const db = getFirestore(app);
  const clear_data = (table: string) => {
    clear_data_user({ table, userid: user.id });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    console.log(`Theme set to ${newTheme}`);
  };

  const handleSearchOptionChange = (
    option: "category" | "product" | "blog" | "team_member"
  ) => {
    setSearchOption((prev) => {
      if (prev.includes(option)) {
        // Remove the option if it exists in the state
        search_setting({
          search: prev.filter((item) => item !== option),
          userid: user?.id || "",
        });
        return prev.filter((item) => item !== option);
      } else {
        // Add the option if it doesn't exist
        search_setting({ search: [...prev, option], userid: user?.id || "" });
        return [...prev, option];
      }
    });
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        if (user) {
          const searchBy = await getDoc(
            doc(db, "searchSetting", user.id || "")
          );
          console.log(searchBy.data());
          const searchData = searchBy.exists() ? searchBy.data().search : [];
          console.log(searchData);
          setSearchOption(
            searchData as ("category" | "product" | "blog" | "team_member")[]
          );
        } else {
          const data = localStorage.getItem("search");
          if (data) {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            setSearchOption(
              parsedData.search as (
                | "category"
                | "product"
                | "blog"
                | "team_member"
              )[]
            );
          } else {
            setSearchOption([]); // Fallback for no localStorage data
          }
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };

    getdata();
  }, [user, db]);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="md:w-1/2 w-full px-4 py-10 flex flex-col  items-center justify-center  min-h-screen">
        {/* Page Title */}
        <motion.h1
          className="font-bold text-5xl dark:text-gray-400 text-gray-800 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Settings
        </motion.h1>

        {/* User Greeting */}
        {isSignedIn && (
          <h2 className="text-xl font-medium dark:text-gray-400 text-gray-700 mb-8">
            Hello,{" "}
            <span className="font-bold dark:text-gray-300 text-gray-800">
              {user.fullName}
            </span>
          </h2>
        )}

        {/* Login/Signup Section */}
        <motion.div
          className="w-full max-w-1/2 p-6 dark:bg-gray-700 bg-white shadow-lg rounded-lg mb-10 flex justify-center flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
            Account
          </h2>
          <SignedOut>
            <div className="flex   gap-4">
              <button className="px-4 py-2 w-full md:w-fit bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all">
                <SignInButton>Login</SignInButton>
              </button>
              <button className="px-4 py-2 w-full md:w-fit bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition-all">
                <SignUpButton>Signup</SignUpButton>
              </button>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex w-full items-center justify-center  flex-wrap gap-4">
              <button
                onClick={() => user.delete()}
                className="px-4 py-2 w-full  md:w-fit bg-red-600 text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-red-500 transition-all"
              >
                <MdDelete size={20} />
                Delete Account
              </button>
              <Link
                href={"/user-profile"}
                className="px-4 py-2 bg-green-600 w-full  md:w-fit text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-green-500 transition-all"
              >
                <MdOutlineManageAccounts size={20} />
                Manage Account
              </Link>

              <SignOutButton>
                <span className="px-4 py-2 bg-blue-600 w-full  md:w-fit text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-500 transition-all">
                  <FiLogOut size={20} />
                  Logout
                </span>
              </SignOutButton>
            </div>
          </SignedIn>
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          className="w-full max-w-1/2 p-6 dark:bg-gray-700 bg-white shadow-lg rounded-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
            Theme
          </h2>
          <div className="flex md:gap-6 gap-2 justify-center">
            <button
              onClick={() => handleThemeChange("light")}
              className={`px-6 py-3 rounded-lg shadow-md text-black flex items-center justify-center gap-2 transition-all ${
                theme === "light" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              <FiSun size={20} />
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`px-6 py-3 rounded-lg shadow-md text-black flex items-center justify-center gap-2 transition-all ${
                theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "text-black bg-gray-200"
              }`}
            >
              <FiMoon size={20} />
              Dark
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className={`px-6 py-3 rounded-lg shadow-md flex text-black items-center justify-center gap-2 transition-all ${
                theme === "system" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              System
            </button>
          </div>
        </motion.div>

        {/* Manage Data */}
        <motion.div
          className="w-full max-w-1/2 p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
            Manage Data
          </h2>
          <div className="flex w-full flex-col gap-4">
            {actions.map((item) => (
              <AcceptDelete
                key={item.id}
                message={item.message}
                title=""
                onAccept={(table) => clear_data(item.id)}
              >
                <button className="px-6 py-3 w-full bg-gray-600 text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-gray-500 transition-all">
                  <item.icon size={20} />
                  {item.title}
                </button>
              </AcceptDelete>
            ))}
          </div>
        </motion.div>

        {/* Search Options */}
        <motion.div
          className="w-full dark:bg-gray-700 max-w-1/2 p-6 bg-white shadow-lg rounded-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
            Search Options
          </h2>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center justify-between">
              <span>Category</span>
              <Switch
                checked={searchOption.includes("category")}
                onClick={() => handleSearchOptionChange("category")}
              />
            </li>
            <li className="flex items-center justify-between">
              <span>Product</span>
              <Switch
                checked={searchOption.includes("product")}
                onClick={() => handleSearchOptionChange("product")}
              />
            </li>
            <li className="flex items-center justify-between">
              <span>Blog</span>
              <Switch
                checked={searchOption.includes("blog")}
                onClick={() => handleSearchOptionChange("blog")}
              />
            </li>
            <li className="flex items-center justify-between">
              <span>Team Member</span>
              <Switch
                checked={searchOption.includes("team_member")}
                onClick={() => handleSearchOptionChange("team_member")}
              />
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
