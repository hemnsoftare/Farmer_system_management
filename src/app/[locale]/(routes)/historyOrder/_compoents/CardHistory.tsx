"use client";

import { OrderType } from "@/lib/action";
import { selectedOrder } from "@/lib/store/filterProducts";
import { motion } from "framer-motion";
import { redirect, useRouter } from "next/navigation";
const OrderCard = ({ order, date }: { order: OrderType; date: any }) => {
  const { selectOrder } = selectedOrder();
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => {
        selectOrder(order);
        redirect("/Cart/id");
      }}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-blue-200 transition-all duration-300 border border-blue-100"
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-xs text-gray-500">Order ID</span>
          <p className="text-gray-800 font-medium">
            {order.id.substring(0, 8)}...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <span className="text-xs text-gray-500">Date</span>
          <p className="text-blue-600">{date}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Total</span>
          <p className="text-gray-800 font-bold">
            ${order.totalAmount || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg transition-colors duration-300">
          View Details
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-lg transition-colors duration-300">
          Track
        </button>
      </div>
    </motion.div>
  );
};
export default OrderCard;
