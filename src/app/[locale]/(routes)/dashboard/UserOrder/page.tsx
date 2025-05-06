"use client";
import { cont } from "../ConTextData";
import { useContext, useEffect, useState } from "react";
import { OrderType } from "@/lib/action";
import { getAllOrder } from "@/lib/action/uploadimage";

import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectedOrder } from "@/lib/store/filterProducts";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const Page = () => {
  const [orders, setorders] = useState<OrderType[]>([]);
  const [allOrders, setAllOrders] = useState<OrderType[]>([]);
  const { selectOrder } = selectedOrder();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllOrder();
      setorders(data as OrderType[]);
      setAllOrders(data as OrderType[]); // <- Save unfiltered copy
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden justify-start w-full gap-2 px-2 md:px-6 items-start">
      {/* Order History Section */}
      <br />
      <div className="w-full py-9">
        <h2 className="font-semibold text-20">Order History</h2>
        <header className="flex items-center justify-between">
          <h2 className="text-17 mb-2 mt-6 text-neutral-500">
            Track, return or purchase items
          </h2>
          <Select
            onValueChange={(e) => {
              const now = new Date();
              let filteredOrders;

              switch (e) {
                case "current-month":
                  filteredOrders = allOrders.filter((order: any) => {
                    const orderDate = new Date(order.orderDate.seconds * 1000);
                    return (
                      orderDate.getMonth() === now.getMonth() &&
                      orderDate.getFullYear() === now.getFullYear()
                    );
                  });
                  break;

                case "last-6-months":
                  filteredOrders = allOrders.filter((order: any) => {
                    const orderDate = new Date(order.orderDate.seconds * 1000);
                    return (
                      now.getTime() - orderDate.getTime() <=
                      180 * 24 * 60 * 60 * 1000
                    );
                  });
                  break;

                case "current-year":
                  filteredOrders = allOrders.filter((order: any) => {
                    const orderDate = new Date(order.orderDate.seconds * 1000);
                    return orderDate.getFullYear() === now.getFullYear();
                  });
                  break;

                default:
                  filteredOrders = allOrders.filter((order: any) => {
                    const orderDate = new Date(order.orderDate.seconds * 1000);
                    return orderDate.getFullYear() === parseInt(e);
                  });
              }

              setorders(filteredOrders);
            }}
          >
            <SelectTrigger className="w-[160px] bg-white border border-gray-300 rounded-md shadow-sm hover:border-cyan-700 transition-all">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>

            <SelectContent className="bg-white w-[180px] border border-gray-300 rounded-md shadow-md">
              <SelectGroup>
                <SelectLabel className="text-sm text-gray-600 px-2 py-1">
                  Time Periods
                </SelectLabel>
                {[
                  { label: "Current Month", value: "current-month" },
                  { label: "Last 6 Months", value: "last-6-months" },
                  { label: "Current Year", value: "current-year" },
                  { label: "2024", value: "2024" },
                  { label: "2023", value: "2023" },
                  { label: "2022", value: "2022" },
                  { label: "2021", value: "2021" },
                  { label: "2020", value: "2020" },
                ].map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="cursor-pointer  hover:bg-cyan-100 px-6 py-2 rounded transition-colors"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </header>
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
                <th className="py-3 px-4 min-w-[120px]">Order check</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                <>
                  {orders.map((item: any, index) => {
                    const formattedDate = new Date(
                      (item.orderDate?.seconds || 0) * 1000
                    ).toLocaleDateString("en-US");

                    return (
                      <tr
                        key={item.id}
                        onClick={() => {
                          redirect("/dashboard/UserOrder/d");
                          selectOrder(item);
                        }}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                        } hover:bg-indigo-100 text-gray-700 text-sm md:text-base transition-all duration-300 cursor-pointer border-b`}
                      >
                        <td className="py-3 px-4 text-center">{index + 1}</td>
                        <td className="py-3 px-4 text-center">
                          {item.fullName}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.orderItems.length}
                        </td>
                        <td className="py-3 px-4 text-center">{item.id}</td>
                        <td className="py-3 px-4 text-center">{item.email}</td>
                        <td className="py-3 px-4 text-center">
                          ${item.totalAmount}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {formattedDate}
                        </td>
                        <td className="py-3 px-4 flex items-center justify-center gap-3">
                          <label htmlFor="f">
                            {item.view ? "viewed" : "view"}
                          </label>
                          {!item.view && (
                            <input
                              type="checkbox"
                              name="f"
                              id="f"
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setAllOrders((prev) =>
                                  prev.map((order) =>
                                    order.id === item.id
                                      ? { ...order, view: !order.view }
                                      : order
                                  )
                                );

                                setorders((prev) =>
                                  prev.map((order) =>
                                    order.id === item.id
                                      ? { ...order, view: !order.view }
                                      : order
                                  )
                                );

                                await updateDoc(doc(db, "order", item.id), {
                                  ...item,
                                  view: !item.view,
                                });
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gradient-to-r text-center from-indigo-500 to-purple-500 text-white font-semibold">
                    <td className="py-3 px-4 text-center">Total</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4 text-center">
                      {orders.reduce(
                        (sum, item) => sum + item.orderItems.length,
                        0
                      )}
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">
                      $
                      {orders
                        .reduce((sum, item) => sum + item.totalAmount, 0)
                        .toFixed(2)}
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">-</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Slider Section */}
    </div>
  );
};

export default Page;
