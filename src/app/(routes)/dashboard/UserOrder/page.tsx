"use client";
import { carts } from "@/app/util/data";
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cont } from "../ConTextData";
import { useContext } from "react";

const Page = () => {
  const { handleShowSlider, handleShowCartSlider, showSliderCart } =
    useContext(cont);
  return (
    <div className="flex overflow-hidden  justify-start w-full gap-2 items-start ">
      <div className="w-full py-9">
        <h2 className="font-semibold text-20">Order History</h2>
        <h2 className="text-17 text-neutral-500">
          Track, return or purchase items
        </h2>
        <table className="table-auto border  w-full">
          <thead className="bg-neutral-200  ">
            <tr>
              <th>user</th>
              <th>number Orders</th>
              <th>Transaction id</th>
              <th>Email</th>
              <th>Total Price</th>
              <th>Order date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={handleShowCartSlider}
              className="text-neutral-500 transition-all duration-300 cursor-pointer border hover:bg-neutral-50 text-center"
            >
              <td>hemn_farhad</td>
              <td>4 </td>
              <td>123934</td>
              <td>hemnfrahd14@gmail.com</td>
              <td>128.18$</td>
              <td>2023/2/25</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className={` ${
          !showSliderCart
            ? "w-0  overflow-hidden translate-x-[250px]"
            : " w-[250px]"
        } border-l py-3 transition-all duration-300`}
      >
        <button onClick={handleShowSlider}>
          <IoIosArrowDroprightCircle size={35} />
        </button>
        <h2 className="text-14 font-bold px-2"> order information </h2>
        <h3 className="text-12 px-4"> user name : hemn farhad</h3>
        <h3 className="text-12 px-4"> total price : 12342.12$</h3>
        <h3 className="text-12 px-4"> oder date :25/2/2020</h3>
        <h3 className="text-12 px-4">location </h3>
        <ul className="text-12 px-8 w-full ">
          <li className="flex w-full justify-between items-center ">
            <span> city : </span> <span>Erbil</span>
          </li>
          <li className="flex w-full justify-between items-center ">
            <span> street name :</span> <span> hibye</span>
          </li>
          <li className="flex w-full justify-between items-center ">
            <span> home name :</span> <span>ha25</span>
          </li>
        </ul>
        <div className="flex items-center justify-between flex-col"></div>
        <div className="w-full divide-y-2 px-2">
          {carts.map((item, index) => {
            return (
              <div key={index}>
                <Image
                  src={item.imageSrc}
                  alt="image "
                  width={200}
                  height={200}
                />
                <h2 className="text-14 font-semibold"> {item.name}</h2>
                <div className="flex items-center text-12 gap-3">
                  <span>color : </span>
                  <span
                    style={{ backgroundColor: item.color }}
                    className="w-3 h-3 rounded-full"
                  ></span>
                </div>
                <p className="flex text-12 items-center justify-between">
                  <span>quantity : {item.quantity}</span>
                  <span> price : {item.price} $</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
