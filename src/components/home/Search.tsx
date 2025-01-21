"use client";

import {
  Search,
  SearchCategory,
  SearchBlog as fns,
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

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<searchProps[]>([]);
  const [searchBlog, setSearchBlog] = useState<SearchBlogsProps[]>([]);
  const [searchCategory, setSearchCategory] = useState<SearchCategoryProps[]>(
    []
  );
  const [searchTeam, setSearchTeam] = useState<SearchTeamProps[]>([]);
  const [search_by, setSearchBy] = useState<{ search: string[] }>({
    search: [],
  });
  const [show, setShow] = useState(false);
  const { user } = useUser();
  const pathName = usePathname();
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
      console.log(user, "searchhhhhhhhhhhhhhhhhhhh");
      if (user) {
        const searchBy = await getDoc(doc(db, "searchSetting", user.id || ""));
        setSearchBy(searchBy.data() as { search: string[] });
      } else {
        const data = localStorage.getItem("search");
        if (data) setSearchBy(JSON.parse(data));
      }
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
        <p className="px-3 py-2 w-full flex justify-between font-semibold items-center duration-300 bg-gray-300 cursor-pointer">
          {title}
        </p>
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              href={link(item)}
              key={keyExtractor(item)}
              onClick={() => setSearchValue(displayValue(item))}
              className="px-3 py-2 w-full flex justify-between items-center bg-white duration-300 hover:bg-gray-100 cursor-pointer"
            >
              <span>{displayValue(item)}</span>
              {extraValue && <span>{extraValue(item)}</span>}
            </Link>
          ))
        ) : (
          <p className="px-3 py-2 w-full text-center bg-gray-50 text-neutral-500">
            No {title.toLowerCase()} found
          </p>
        )}
      </>
    );
  };

  return (
    <>
      {searchValue.length > 0 && (
        <div
          className="w-screen z-[3] h-screen fixed top-0 left-0 right-0 backdrop-blur-md"
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

      <div className="w-full relative md:flex mt-3 justify-center px-5 items-center z-[4]">
        <div className="flex relative group w-full md:w-1/2">
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onChangeHandle(e.target.value)}
            className="w-full py-2 rounded-full placeholder:text-secondary shadow-sm  shadow-secondary dark:bg-neutral-800 dark:text-white outline-none focus:bg-secondary-100/15 duration-300 px-3 bsorder border-secondary"
            placeholder="Search"
          />

          <IoSearch className="absolute top-3 right-4 text-secondary" />

          <ul
            className={`absolute w-full bg-white pb-2 dark:text-white dark:bg-neutral-800 border shadow-xl flex flex-col items-center justify-start rounded-lg transition-all duration-300 border-gray-300 mt-12 z-[100] ${
              show && searchValue.length
                ? "opacity-100 h-full"
                : "opacity-0 max-h-0"
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
                    (item) => "/About#" + item.fullName,
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
            ) : (
              <p className="px-3 py-4 w-full text-center text-neutral-500">
                No results found for your search
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
