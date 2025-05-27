"use client";

import {
  Search,
  SearchCategory,
  SearchBlog as fns,
  lang,
  search_Team,
} from "@/lib/action/uploadimage";
import {
  SearchBlogsProps,
  SearchCategoryProps,
  searchProps,
  SearchTeamProps,
} from "@/lib/action";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { useTranslations } from "next-intl";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<searchProps[]>([]);
  const [searchBlog, setSearchBlog] = useState<SearchBlogsProps[]>([]);
  const [searchCategory, setSearchCategory] = useState<SearchCategoryProps[]>(
    []
  );
  const [searchTeam, setSearchTeam] = useState<SearchTeamProps[]>([]);
  const [search_by, setSearchBy] = useState<{ search: string[] }>({
    search: ["blog"],
  }); // Default fallback
  const [show, setShow] = useState(false);
  const { user } = useUser();
  const t = useTranslations("search");
  const db = getFirestore(app);

  const onChangeHandle = (value: string) => {
    setSearchValue(value);

    if (!value.trim()) {
      // Reset all results if the search input is empty
      setFilteredData([]);
      setSearchBlog([]);
      setSearchCategory([]);
      setSearchTeam([]);
      setShow(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      const results: {
        products?: searchProps[];
        blogs?: SearchBlogsProps[];
        categories?: SearchCategoryProps[];
        team?: SearchTeamProps[];
      } = {};

      if (search_by.search.includes("product")) {
        results.products = await Search(value);
      }
      if (search_by.search.includes("blog")) {
        results.blogs = await fns(value);
      }
      if (search_by.search.includes("category")) {
        results.categories = await SearchCategory(value);
      }
      if (search_by.search.includes("team_member")) {
        results.team = await search_Team(value);
      }

      setFilteredData(results.products || []);
      setSearchBlog(results.blogs || []);
      setSearchCategory(results.categories || []);
      setSearchTeam(results.team || []);
      setShow(true);
    }, 300); // Debounce delay of 300ms

    return () => clearTimeout(debounceTimer); // Cleanup previous timer
  };

  useEffect(() => {
    const getData = async () => {
      let searchBy = { search: ["blog", "product"] }; // Default fallback

      try {
        if (user) {
          const docSnapshot = await getDoc(
            doc(db, "searchSetting", user?.id || "")
          );
          if (docSnapshot.exists()) {
            searchBy = docSnapshot.data() as { search: string[] };
          }
        } else {
          const localData = localStorage.getItem("search");
          if (localData) {
            searchBy = JSON.parse(localData);
          }
        }
      } catch (error) {}
      setSearchBy(searchBy);
    };

    getData();
  }, [db, user]);

  const renderResults = (
    title: string,
    data: any[],
    keyExtractor: (item: any) => string,
    link: (item: any) => string,
    displayValue: (item: any) => string,
    extraValue?: (item: any) => string
  ) => {
    return (
      <>
        <p className="w-full px-5  text-sm font-bold text-neutral-700 dark:text-white bg-gray-100/40 dark:bg-neutral-700/40 tracking-wide uppercase backdrop-blur-sm">
          {t(
            title === "Products"
              ? "product"
              : title === "Category"
                ? "category"
                : title === "Team Member"
                  ? "team"
                  : "blog"
          )}
        </p>
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              href={link(item)}
              key={keyExtractor(item)}
              onClick={() => setSearchValue(displayValue(item))}
              className="w-full px-5 py-3 flex items-center justify-between text-sm hover:bg-white/20 dark:hover:bg-neutral-700/30 transition-colors backdrop-blur-sm"
            >
              <span className="truncate">{displayValue(item)}</span>
              {extraValue && (
                <span className="text-xs text-neutral-500">
                  {extraValue(item)}
                </span>
              )}
            </Link>
          ))
        ) : (
          <p className="w-full px-5 py-6 text-center text-neutral-400 text-sm">
            {t(title)}
          </p>
        )}
      </>
    );
  };

  return (
    <>
      {searchValue.length > 0 && (
        <div
          className="w-screen z-[3] h-screen fixed top-0 left-0 right-0 "
          onClick={() => {
            setSearchValue("");
            setShow(false);
            setFilteredData([]);
            setSearchBlog([]);
            setSearchCategory([]);
            setSearchTeam([]);
          }}
        ></div>
      )}

      <div className="w-full relative md:flex  justify-center px-5 items-center z-[4]">
        <div className="flex relative group w-full md:w-1/2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onChangeHandle(e.target.value)}
            className={`${lang() === "ar" || lang() === "ku" ? "text-right " : "text-left "}

              w-full py-2 rounded-full placeholder:text-secondary shadow-sm focus-within:shadow-md focus-within:shadow-secondary/75 shadow-secondary/50 dark:bg-neutral-800 dark:text-white bg-transparent backdrop-blur-md  outline-none focus:bg-secondary-100/15 duration-300 px-4 border-b-2 border-x-2 border-t-[1px] border-secondary/50`}
            placeholder={t("Search")}
          />

          <IoSearch
            className={`absolute ${lang() === "ar" || lang() === "ku" ? "left-4 " : "right-4 "} top-3  text-secondary`}
          />

          <ul
            className={`absolute w-full bg-white/30 dark:bg-neutral-800/30 backdrop-blur-md border border-gray-300 shadow-2xl flex flex-col items-start rounded-2xl transition-all duration-300 mt-12 z-[100] overflow-hidden ${
              show && searchValue.length ? "opacity-100 " : "opacity-0 max-h-0"
            }`}
          >
            {show && searchValue.length > 0 ? (
              <>
                {search_by.search.includes("category") &&
                  renderResults(
                    "Category",
                    searchCategory,
                    (item) => item.name,
                    (item) => `/products/${item.name}`,
                    (item) => item.name,
                    (item) => item.numberOfSearches.toString()
                  )}
                {search_by.search.includes("product") &&
                  renderResults(
                    "Products",
                    filteredData,
                    (item) => item.id,
                    (item) => `/products/${item.category}/${item.id}`,
                    (item) => item.name,
                    (item) => item.numSearch.toFixed(0)
                  )}
                {search_by.search.includes("team_member") &&
                  renderResults(
                    "Team Member",
                    searchTeam,
                    (item) => item.fullName,
                    (item) => `/About#${item.fullName}`,
                    (item) => item.fullName,
                    (item) => item.numOfSearch.toFixed(0)
                  )}
                {search_by.search.includes("blog") &&
                  renderResults(
                    "Blogs",
                    searchBlog,
                    (item) => item.id,
                    (item) => `/blog/${item.id}`,
                    (item) => item.name,
                    (item) => item.numberOfSearches.toFixed(0)
                  )}
              </>
            ) : !search_by.search.length ? (
              <p className="px-4 py-6 w-full text-center text-neutral-400 text-base">
                {t("allowSearch")}
              </p>
            ) : (
              <p className="px-4 py-6 w-full text-center text-neutral-400 text-base">
                {t("messageNotFound")}
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
