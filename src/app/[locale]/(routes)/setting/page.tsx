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
import { useToast } from "@/hooks/use-toast";

import { FaBlog } from "react-icons/fa";
import { clear_data_user, search_setting } from "../../../../lib/settingFn";
import AcceptDelete from "./_components/AcceptDelete";
import { IconType } from "react-icons";
import { useTheme } from "next-themes";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  const { user, isSignedIn } = useUser();
  const { setTheme, theme } = useTheme();
  const [searchOption, setSearchOption] = useState<
    ("category" | "product" | "blog" | "team_member")[]
  >(["category", "product", "blog"]);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const db = getFirestore(app);
  const router = useRouter();
  const t = useTranslations("setting");
  const actions: {
    id: string;
    title: string;
    message: string;
    icon: IconType;
  }[] = [
    {
      id: "favorite",
      title: t("manageData.clearFavorites"),
      message: t("manageData.mclearFavorites"),
      icon: MdFavorite,
    },
    {
      id: "order",
      title: t("manageData.clearOrderHistory"),
      message: t("manageData.mclearOrderHistory"),
      icon: MdHistory,
    },
    {
      id: "saveBlog",
      title: t("manageData.clearSavedBlogs"),
      message: t("manageData.mclearBlogs"),
      icon: FaBlog,
    },
  ];
  const clear_data = (table: string) => {
    clear_data_user({ table, userid: user?.id });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
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
    const getData = async () => {
      setLoading(true);
      let searchBy: ("category" | "product" | "blog" | "team_member")[] = [
        "blog",
        "product",
      ]; // Default fallback

      try {
        if (user) {
          const docSnapshot = await getDoc(
            doc(db, "searchSetting", user?.id || "")
          );
          if (docSnapshot.exists()) {
            searchBy = docSnapshot.data().search as (
              | "category"
              | "product"
              | "blog"
              | "team_member"
            )[];
          }
        } else {
          const localData = localStorage.getItem("search");
          if (localData) {
            searchBy = JSON.parse(localData);
          }
        }
      } catch (error) {}
      setSearchOption(searchBy);
      setLoading(false);
    };

    getData();
  }, [user, db]);
  const changelanguage = (lang: string) => {
    // Get the current URL
    const currentPath = window.location.pathname; // Use the browser's `pathname`
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`); // Replace the language prefix

    // Push the new path
    router.push(newPath);
  };
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  } else
    return (
      <div className="w-full flex items-center justify-center">
        <div className="md:w-1/2 w-full px-4 py-10 flex flex-col items-center justify-center min-h-screen">
          {/* Page Title */}
          <motion.h1
            className="font-bold text-5xl dark:text-gray-400 text-gray-800 mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("title")}
          </motion.h1>

          {/* User Greeting */}
          {isSignedIn && (
            <h2 className="text-xl font-medium dark:text-gray-400 text-gray-700 mb-8">
              {t("manageData.hello")},{" "}
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
              {t("account.title")}
            </h2>
            <SignedOut>
              <div className="flex w-full gap-4">
                <button className="px-4 py-2 w-full md:w-fit bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all">
                  <SignInButton>{t("account.login")}</SignInButton>
                </button>
                <button className="px-4 py-2 w-full md:w-fit bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition-all">
                  <SignUpButton>{t("account.signup")}</SignUpButton>
                </button>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex w-full items-center justify-center flex-wrap gap-4">
                <button
                  onClick={() => user.delete()}
                  className="px-4 py-2 w-full md:w-fit bg-red-600 text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-red-500 transition-all"
                >
                  <MdDelete size={20} />
                  {t("account.deleteAccount")}
                </button>
                <button className="px-4 py-2 bg-green-600 w-full md:w-fit text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-green-500 transition-all">
                  <MdOutlineManageAccounts size={20} />
                  {t("account.manageAccount")}
                </button>

                <SignOutButton>
                  <span className="px-4 py-2 bg-blue-600 w-full md:w-fit text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-500 transition-all">
                    <FiLogOut size={20} />
                    {t("account.logout")}
                  </span>
                </SignOutButton>
              </div>
            </SignedIn>
          </motion.div>

          {/* Theme Selection */}
          <motion.div
            className="w-full max-w-1/2 py-6 px-4 overflow-hidden dark:bg-gray-700 bg-white shadow-lg rounded-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
              {t("theme.title")}
            </h2>
            <div className="flex md:gap-6 gap-2 justify-center">
              <button
                onClick={() => handleThemeChange("light")}
                className={`w-full py-3 rounded-lg shadow-md text-black flex items-center justify-center gap-2 transition-all ${
                  theme === "light" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                <FiSun size={20} />
                {t("theme.light")}
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`w-full py-3 rounded-lg shadow-md text-black flex items-center justify-center gap-2 transition-all ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "text-black bg-gray-200"
                }`}
              >
                <FiMoon size={20} />
                {t("theme.dark")}
              </button>
              <button
                onClick={() => handleThemeChange("system")}
                className={`w-full py-3 rounded-lg shadow-md flex text-black items-center justify-center gap-2 transition-all ${
                  theme === "system" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {t("theme.system")}
              </button>
            </div>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            className="w-full max-w-1/2 p-6 dark:bg-gray-700 bg-white shadow-lg rounded-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
              {t("language.title")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* English */}
              <button
                onClick={() => changelanguage("en")}
                className="p-4 rounded-lg dark:shadow-lg dark:shadow-neutral-700 active:bg-neutral-200 dark:text-white dark:bg-gray-600 md:hover:bg-neutral-300 duration-200 transition-all text-black flex items-center justify-center gap-2 shadow-md active:scale-[1.2] md:hover:scale-105"
              >
                <Image
                  alt="image"
                  src={"/english.png"}
                  width={25}
                  height={25}
                  className="w-[25] h-[25]"
                />
                {t("language.english")}
              </button>

              {/* Kurdish */}
              <button
                onClick={() => changelanguage("ku")}
                className="p-4 rounded-lg dark:shadow-lg dark:shadow-neutral-700 active:bg-neutral-200 dark:text-white dark:bg-gray-600 md:hover:bg-neutral-300 duration-200 transition-all text-black flex items-center justify-center gap-2 shadow-md active:scale-[1.2] md:hover:scale-105"
              >
                <Image
                  alt="image"
                  src={"/kurdish.png"}
                  width={25}
                  height={25}
                  className="w-[25] h-[25]"
                />
                {t("language.kurdish")}
              </button>

              {/* Turkish */}
              <button
                onClick={() => changelanguage("tr")}
                className="p-4 rounded-lg dark:shadow-lg dark:shadow-neutral-700 active:bg-neutral-200 dark:text-white dark:bg-gray-600 md:hover:bg-neutral-300 duration-200 transition-all text-black flex items-center justify-center gap-2 shadow-md active:scale-[1.2] md:hover:scale-105"
              >
                <Image
                  alt="image"
                  src={"/turkish.png"}
                  width={25}
                  height={25}
                  className="w-[25] h-[25]"
                />
                {t("language.turkish")}
              </button>

              {/* Arabic */}
              <button
                onClick={() => changelanguage("ar")}
                className="p-4 rounded-lg dark:shadow-lg dark:shadow-neutral-700 active:bg-neutral-200 dark:text-white dark:bg-gray-600 md:hover:bg-neutral-300 duration-200 transition-all text-black flex items-center justify-center gap-2 shadow-md active:scale-[1.2] md:hover:scale-105"
              >
                <Image
                  alt="image"
                  src={"/arabic.png"}
                  width={25}
                  height={25}
                  className="w-[25] h-[25]"
                />
                {t("language.arabic")}
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
              {t("manageData.title")}
            </h2>
            <div className="flex w-full flex-col gap-4">
              {actions.map((item) => (
                <AcceptDelete
                  key={item.id}
                  cancel={t("manageData.cancel")}
                  confirem={t("manageData.confirm")}
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
          {searchOption.length >= 0 && (
            <motion.div
              className="w-full dark:bg-gray-700 max-w-1/2 p-6 bg-white shadow-lg rounded-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold dark:text-gray-400 text-gray-800 text-center mb-6">
                {t("searchOptions.title")}
              </h2>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between">
                  <span>{t("searchOptions.category")}</span>
                  <Switch
                    className="rtl:flex rtl:flex-row-reverse"
                    checked={searchOption.includes("category")}
                    onClick={() => handleSearchOptionChange("category")}
                  />
                </li>
                <li className="flex items-center justify-between">
                  <span>{t("searchOptions.product")}</span>
                  <Switch
                    className="rtl:flex rtl:flex-row-reverse"
                    checked={searchOption.includes("product")}
                    onClick={() => handleSearchOptionChange("product")}
                  />
                </li>
                <li className="flex items-center justify-between">
                  <span>{t("searchOptions.blog")}</span>
                  <Switch
                    className="rtl:flex rtl:flex-row-reverse"
                    checked={searchOption.includes("blog")}
                    onClick={() => handleSearchOptionChange("blog")}
                  />
                </li>
                <li className="flex items-center justify-between">
                  <span>{t("searchOptions.teamMember")}</span>
                  <Switch
                    className="rtl:flex rtl:flex-row-reverse"
                    checked={searchOption.includes("team_member")}
                    onClick={() => handleSearchOptionChange("team_member")}
                  />
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    );
};

export default SettingsPage;
