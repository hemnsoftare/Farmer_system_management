import React from "react";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";

type SearchedItems = {
  name: string;
  items: string[];
};
const Search = ({
  isopen,
  onclose,
}: {
  isopen: boolean;
  onclose: () => void;
}) => {
  const searchData: SearchedItems[] = [
    {
      name: "The Most Searched Items",
      items: [
        "MacBook Pro",
        "AirPods Pro",
        "Samsung S9",
        "Tablet",
        "Xiaomi",
        "JBL speaker",
        "Canon",
        "AirPods Max",
        "Asus",
        "MagSafe",
      ],
    },
    {
      name: "Most used keywords",
      items: [
        "Tablets",
        "Headphones",
        "Smartphones",
        "Smartwatch",
        "Laptops",
        "USB Drive",
        "Phone Cases",
      ],
    },
  ];

  return (
    <>
      <div
        onClick={onclose}
        className=" h-screen fixed top-0 right-0 bg-re w-screen backdrop-blur-xl  z-10   400"
      ></div>
      <dialog
        open={isopen}
        className=" md:w-[80%] md:ml-[10%] md:mr-[10%]  md:mt-[50%] bg-white rounded-2xl px-12  shadow-2xl shadow-black py-4 flex flex-col z-40  lg:w-[60%] lg:ml-[20%] lg:mr-[20%] lg:mt-[50%]"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center lg:w-[85%] md:w-[90%] ">
            <input
              type="search"
              className="w-full px-8 py-3  rounded-md outline-none relative  bg-gray-200 border-gray-500 "
              placeholder="search"
            />
            <IoSearchOutline className="-translate-x-8" />
          </div>
          <IoCloseSharp onClick={onclose} className="w-[20px] h-[20px] mr-2 " />
        </div>
        <div className="flex items-start justify-cente  mt-6 md:w-[90%]  lg:w-[85%]">
          {searchData.map((item) => (
            <div key={item.name} className="flex gap-4   w-full  flex-col">
              <h2 className=" font-semibold lg:text-15 md:text-15 ">
                {item.name}
              </h2>
              <div className="grid gap-3 grid-cols-2">
                {item.items.map((type) => (
                  <span className="text-13 md:text-10" key={type}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
};

export default Search;
