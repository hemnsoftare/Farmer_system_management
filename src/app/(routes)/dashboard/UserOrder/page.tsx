"use client";
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cont } from "../ConTextData";
import { useContext, useEffect, useState } from "react";
import { OrderType } from "@/type";
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

const Page = () => {
  const { handleShowSlider, handleShowCartSlider, showSliderCart } =
    useContext(cont);
  const [orders, setorders] = useState<OrderType[]>([]);
  const [viewOrder, setviewOrder] = useState<any>();
  const [showOrder, setshowOrder] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllOrder();
      console.log(data[0].orderDate);
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
  console.log(orders);
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
            <thead className="bg-neutral-200 text-10 md:text-16">
              <tr>
                <th>id</th>
                <th className="">User</th>
                <th className="">Orders Item</th>
                <th className="">Transaction ID</th>
                <th className="">Email</th>
                <th className="">Total Price</th>
                <th className="">Order Date</th>
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
                        setviewOrder(item);
                        setshowOrder(true);
                        handleShowCartSlider();
                      }}
                      className={` ${index % 2 == 0 ? "bg-neutral-50" : "bg-neutral-200"} text-neutral-500 text-9 md:text-14 transition-all duration-300 cursor-pointer border md:hover:bg-neutral-50 px-1 py-1 text-center`}
                    >
                      <td>{index + 1}</td>
                      <td>{item.fullName}</td>
                      <td>{item.orderItems.length}</td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.totalAmount}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Sheet open={showOrder} onOpenChange={setshowOrder}>
        <SheetOverlay onClick={() => setshowOrder(false)}></SheetOverlay>
        <SheetContent
          side={"bottom"}
          className="dark:text-gray-400 border-b text-black outline-0"
        >
          <SheetDescription>
            {viewOrder && (
              <div className="py-3 transition-all flex flex-col md:flex-row w-full duration-300">
                <div className="flex flex-col min-w-[200px] gap-2">
                  <h2 className="text-14 font-bold px-2">Order Information</h2>
                  <h3 className="text-12 px-4">
                    User Name : {viewOrder.fullName}
                  </h3>
                  <h3 className="text-12 px-4">
                    Total Price: {viewOrder.totalAmount}$
                  </h3>
                  <h3 className="text-12 px-4">Order Date: {date}</h3>
                  <h3 className="text-12 px-4">Location:</h3>
                  <ul className="text-12 px-8 w-full">
                    <li className="flex w-full justify-between items-center">
                      <span>City:</span> <span>{viewOrder.address.city}</span>
                    </li>
                    <li className="flex w-full justify-between items-center">
                      <span>Street Name:</span>{" "}
                      <span>{viewOrder.address.streetName}</span>
                    </li>
                    <li className="flex w-full justify-between items-center">
                      <span>Home Name:</span>{" "}
                      <span>{viewOrder.address.region}</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full overflow-x-auto overflow-y-auto flex flex-col md:flex-row md:min-h-full md:max-h-full max-h-[300px] min-h-[300px] items-center gap-4 px-2">
                  {viewOrder.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex shadow-md p-1 min-w-[280px] md:hover:shadow-lg transition-all duration-300 shadow-lime-100 flex-row items-center text-start"
                    >
                      <Image
                        src={item.image}
                        alt="image"
                        width={150}
                        height={150}
                        className="object-cover max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] rounded-md"
                      />
                      <div className="w-full pl-3">
                        <h2 className="sm:text-14 text-12 font-semibold">
                          {item.name}
                        </h2>
                        <div className="flex items-center justify-start text-12 gap-3">
                          <span>Color:</span>
                          <span
                            style={{ backgroundColor: item.colors.color }}
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
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
      {/* Order Details Slider Section */}
    </div>
  );
};

export default Page;
