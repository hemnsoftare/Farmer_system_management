import { Search } from "@/lib/action/uploadimage";
import { searchProps } from "@/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<searchProps[]>([]);
  const pathName = usePathname();
  useEffect(() => {
    setSearchValue("");
    setFilteredData([]);
  }, [pathName]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim() === "") {
        setFilteredData([]);
        return;
      }

      const filtered = async () => {
        const data = await Search(searchValue);
        setFilteredData(data as searchProps[]);
      };
      filtered();
    }, 500);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  if (pathName.startsWith("/dash")) return;
  return (
    <>
      {/* Backdrop Overlay */}
      {filteredData.length > 0 && (
        <div
          className="w-screen z-[2] h-screen fixed top-0 left-0 right-0 backdrop-blur-md"
          onClick={() => setFilteredData([])}
        ></div>
      )}

      <div className="w-full flex mt-3 justify-center px-5 items-center relative z-[3]">
        <div className="relative group w-full md:w-1/2">
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
            className={`absolute w-full bg-white dark:text-white dark:bg-neutral-800 border shadow-xl flex flex-col items-center justify-start rounded-lg transition-all duration-300 border-gray-300 mt-1 max-h-48 overflow-y-auto z-[100] ${
              filteredData.length > 0
                ? "opacity-100 max-h-48"
                : "opacity-0 max-h-0"
            }`}
            style={{
              visibility: filteredData.length > 0 ? "visible" : "hidden",
            }}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <Link
                  href={`/products/${item.category}/${item.name}`}
                  key={index}
                  onClick={() => setSearchValue(item.name)}
                  className="px-3 py-2 w-full flex justify-between items-center  duration-300 hover:bg-gray-100 cursor-pointer"
                >
                  <span>{item.name}</span>
                  <span>{item.numSearch.toFixed(0)}</span>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No data found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
