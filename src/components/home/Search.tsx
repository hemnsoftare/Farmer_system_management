"use client";
import {
  Search,
  SearchCategory,
  SearchBlog as fns,
} from "@/lib/action/uploadimage";
import { SearchBlogsProps, SearchCategoryProps, searchProps } from "@/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<searchProps[]>([]);
  const [searchBlog, setsearchBlog] = useState<SearchBlogsProps[]>([]);
  const [searchCategory, setsearchCategory] = useState([]);
  const [show, setshow] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setshow(false);
    setSearchValue("");
    setFilteredData([]);
  }, [pathName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim() === "") {
        setFilteredData([]);
        setsearchBlog([]);
        return;
      }

      const filtered = async () => {
        const data = await Search(searchValue);
        const dataBlog = await fns(searchValue);
        const dataCategory = await SearchCategory(searchValue);
        setsearchCategory(dataCategory as SearchCategoryProps[]);
        setFilteredData(data as searchProps[]);
        setsearchBlog(dataBlog);
        setshow(true);
      };
      filtered();
    }, 200);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (pathName !== "/") return null;

  return (
    <>
      {/* Backdrop Overlay */}
      {searchValue.length > 0 && (
        <div
          className="w-screen z-[3] h-screen fixed top-0 left-0 right-0 backdrop-blur-md"
          onClick={() => {
            setSearchValue("");
            setsearchBlog([]);
            setshow(false);
            setFilteredData([]);
          }}
        ></div>
      )}

      <div className="w-full  relative md:flex mt-3 justify-center px-5 items-center  z-[4]">
        <div className={` flex relative group w-full md:w-1/2`}>
          {/* Input */}
          <input
            type="search"
            value={searchValue}
            onChange={handleSearch}
            className="w-full py-2 rounded-full dark:bg-neutral-800 dark:text-white outline-none dark:focus:bg-neutral-700 focus:bg-gray-200 duration-300 bg-gray-100 px-3 border border-gray-300"
            placeholder="Search"
          />
          <IoSearch className="absolute top-3 right-4 text-gray-500 group-focus-within:hidden block" />
          {/* Dropdown */}
          <ul
            className={`absolute w-full bg-white pb-2 dark:text-white dark:bg-neutral-800 border shadow-xl flex flex-col items-center justify-start rounded-lg transition-all duration-300 border-gray-300 mt-12   z-[100] ${
              show ? "opacity-100 h-full  bg-white" : "opacity-0 max-h-0"
            }`}
          >
            {show && searchValue ? (
              <>
                {/* Categories Section */}
                <p className="px-3 py-2 w-full flex rounded-t-lg justify-between font-semibold items-center duration-300 bg-gray-300 cursor-pointer">
                  Category
                </p>
                {searchCategory.length > 0 ? (
                  searchCategory.map((item, index) => (
                    <Link
                      href={`/products/${item.name}`}
                      key={index}
                      onClick={() => setSearchValue(item.name)}
                      className="px-3 py-2 w-full   flex justify-between items-center bg-white duration-300 hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <span>{item.numberOfSearches}</span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2   w-full text-center bg-gray-50 text-neutral-500">
                    No category found
                  </p>
                )}
                {/* Products Section */}
                <p className="px-3 py-2 w-full flex rounded-t-lg justify-between font-semibold items-center duration-300 bg-gray-300 cursor-pointer">
                  Products
                </p>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <Link
                      href={`/products/${item.category}/${item.id}`}
                      key={index}
                      onClick={() => setSearchValue(item.name)}
                      className="px-3 py-2 w-full   flex justify-between items-center bg-white duration-300 hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <span>{item.numSearch.toFixed(0)}</span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2   w-full text-center bg-gray-50 text-neutral-500">
                    No products found
                  </p>
                )}

                {/* Blogs Section */}
                <p className="px-3 py-2 w-full flex justify-between font-semibold items-center duration-300 bg-gray-300 cursor-pointer">
                  Blogs
                </p>
                {searchBlog.length > 0 ? (
                  searchBlog.map((item) => (
                    <Link
                      href={`/blog/${item.id}`}
                      key={item.id}
                      onClick={() => setSearchValue(item.name)}
                      className="px-3 py-2 w-full  rounded-b-lg bg-white flex justify-between items-center duration-300 hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <span>{item.numberOfSearches.toFixed(0)}</span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2  rounded-b-lg w-full text-center bg-gray-50 text-neutral-500">
                    No blogs found
                  </p>
                )}
              </>
            ) : (
              searchValue && (
                <p className="px-3 py-4 rounded-b-lg w-full text-center text-neutral-500">
                  No results found for your search
                </p>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
