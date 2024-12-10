"use client";
import { carts } from "@/util/data";
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cont } from "../ConTextData";
import { useContext } from "react";

const Page = () => {
  const { handleShowSlider, handleShowCartSlider, showSliderCart } =
    useContext(cont);

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden justify-start w-full gap-2 px-2 items-start">
      {/* Order History Section */}
      <div className="w-full py-9">
        <h2 className="font-semibold text-20">Order History</h2>
        <h2 className="text-17 text-neutral-500">
          Track, return or purchase items
        </h2>
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="border w-full min-w-[600px]">
            <thead className="bg-neutral-200">
              <tr>
                <th className="min-w-[150px]">User</th>
                <th className="min-w-[150px]">Number Orders</th>
                <th className="min-w-[150px]">Transaction ID</th>
                <th className="min-w-[150px]">Email</th>
                <th className="min-w-[150px]">Total Price</th>
                <th className="min-w-[150px]">Order Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={handleShowCartSlider}
                className="text-neutral-500 transition-all duration-300 cursor-pointer border hover:bg-neutral-50 text-center"
              >
                <td>hemn_farhad</td>
                <td>4</td>
                <td>123934</td>
                <td>hemnfrahd14@gmail.com</td>
                <td>128.18$</td>
                <td>2023/2/25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Slider Section */}
      <div
        className={`${
          !showSliderCart
            ? "w-0 overflow-hidden translate-x-[250px]"
            : "w-full lg:w-[250px]"
        } sm:border-l  py-3 transition-all duration-300`}
      >
        <button onClick={handleShowSlider} className="mb-3">
          <IoIosArrowDroprightCircle size={35} />
        </button>
        <h2 className="text-14 font-bold px-2">Order Information</h2>
        <h3 className="text-12 px-4">User Name: hemn farhad</h3>
        <h3 className="text-12 px-4">Total Price: 12342.12$</h3>
        <h3 className="text-12 px-4">Order Date: 25/2/2020</h3>
        <h3 className="text-12 px-4">Location:</h3>
        <ul className="text-12 px-8 w-full">
          <li className="flex w-full justify-between items-center">
            <span>City:</span> <span>Erbil</span>
          </li>
          <li className="flex w-full justify-between items-center">
            <span>Street Name:</span> <span>Hibye</span>
          </li>
          <li className="flex w-full justify-between items-center">
            <span>Home Name:</span> <span>HA25</span>
          </li>
        </ul>
        <div className="flex items-center justify-between flex-col"></div>
        <div className="w-full divide-y-2 px-2">
          {carts.map((item, index) => (
            <div
              key={index}
              className="flex sm:flex-col flex-row items-center text-center"
            >
              <Image
                src={"/s.png"}
                alt="image"
                width={150}
                height={150}
                className="object-cover rounded-md"
              />
              <div className="w-full ">
                <h2 className="sm:text-14 text-12 font-semibold">
                  {item.name}
                </h2>
                <div className="flex items-center justify-center text-12 gap-3">
                  <span>Color:</span>
                  <span
                    style={{ backgroundColor: item.color }}
                    className="w-3 h-3 rounded-full"
                  ></span>
                </div>
                <p className="flex flex-col text-12">
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: {item.price} $</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
