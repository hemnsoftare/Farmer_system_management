"use client";
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cont } from "../ConTextData";
import { useContext, useEffect, useState } from "react";
import { OrderType } from "@/lib/action";
import { getAllOrder } from "@/lib/action/uploadimage";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { redirect } from "next/navigation";

const Page = () => {
  const { handleShowSlider, handleShowCartSlider, showSliderCart } =
    useContext(cont);
  const [orders, setorders] = useState<OrderType[]>([]);
  const [viewOrder, setviewOrder] = useState<any>();
  const [showOrder, setshowOrder] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllOrder();
      setorders(data as OrderType[]);
    };
    getData();
  }, []);

  let date;
  if (viewOrder) {
    date = new Date(
      (viewOrder.orderDate?.seconds || 0) * 1000
    ).toLocaleDateString("en-US");
  }
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden justify-start w-full gap-2 px-2 items-start">
      {/* Order History Section */}
      <br />
      <div className="w-full py-9">
        <h2 className="font-semibold text-20">Order History</h2>
        <h2 className="text-17 text-neutral-500">
          Track, return or purchase items
        </h2>
        {/* Table Container */}
        <div className="overflow-x-auto px-2">
          <table className="border-collapse w-full rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r w-full from-indigo-500 to-purple-500 text-white text-sm md:text-base">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4 min-w-[120px]">User</th>
                <th className="py-3 px-4 min-w-[120px]">Orders Item</th>
                <th className="py-3 px-4 min-w-[120px]">Transaction ID</th>
                <th className="py-3 px-4 min-w-[120px]">Email</th>
                <th className="py-3 px-4 min-w-[120px]">Total Price</th>
                <th className="py-3 px-4 min-w-[120px]">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((item: any, index) => {
                  const formattedDate = new Date(
                    (item.orderDate?.seconds || 0) * 1000
                  ).toLocaleDateString("en-US");

                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        redirect(`/dashboard/UserOrder/${item.id}`);
                      }}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                      } hover:bg-indigo-100 text-gray-700 text-sm md:text-base transition-all duration-300 cursor-pointer border-b`}
                    >
                      <td className="py-3 px-4 text-center">{index + 1}</td>
                      <td className="py-3 px-4">{item.fullName}</td>
                      <td className="py-3 px-4 text-center">
                        {item.orderItems.length}
                      </td>
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.email}</td>
                      <td className="py-3 px-4">${item.totalAmount}</td>
                      <td className="py-3 px-4">{formattedDate}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Slider Section */}
    </div>
  );
};

export default Page;
