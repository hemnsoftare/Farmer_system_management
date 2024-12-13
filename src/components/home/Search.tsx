import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const searchData = [
    "MacBook Pro",
    "AirPods Pro",
    "Samsung S9",
    "Tablet",
    "Xiaomi",
    "JBL speaker",
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setFilteredData([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-full flex mt-3 justify-center px-5 items-center">
      <div className="relative group w-full md:w-1/2">
        <input
          type="search"
          value={searchValue}
          onChange={handleSearch}
          className="w-full py-2 rounded-full outline-none focus:bg-gray-200 duration-300 bg-gray-100 px-3 border border-gray-300"
          placeholder="Search"
        />
        <IoSearch className="absolute top-3 right-4 text-gray-500 group-focus-within:hidden block" />

        <ul
          className={`absolute w-full box-border bg-white border shadow-xl flex flex-col items-center justify-start rounded-lg mx-0 px-0 transition-all duration-300 border-gray-300 mt-1 max-h-48 overflow-y-auto z-50 ${
            filteredData.length > 0
              ? "opacity-100 max-h-48"
              : "opacity-0 max-h-0"
          }`}
          style={{
            visibility: filteredData.length > 0 ? "visible" : "hidden", // Maintain visibility for transition
          }}
        >
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => setSearchValue(item)}
              className=" px-3 py-2 w-full duration-300 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
