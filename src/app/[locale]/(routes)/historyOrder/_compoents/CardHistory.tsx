"use client";

import { OrderType } from "@/lib/action";
import { selectedOrder } from "@/lib/store/filterProducts";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const OrderCard = ({
  order,
  date,
  title,
}: {
  order: OrderType;
  date: any;
  title?: "user";
}) => {
  const router = useRouter();
  const { selectOrder } = selectedOrder();
  return (
    <motion.div
      key={order.id}
      onClick={() => {
        selectOrder(order);
        router.push(
          title === "user"
            ? "Cart/detisalOrder"
            : `/dashboard/UserOrder/${order.id}`
        );
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="active:scale-[.6] bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 cursor-pointer"
    >
      <h4 className="font-semibold text-cyan-300 overflow-hidden">
        Order ID: {order.id}
      </h4>
      <p className="text-gray-400">Name: {order.fullName}</p>
      <p className="text-gray-400">Total: ${order.totalAmount}</p>
      <p className="text-gray-400">City: {order.address.city}</p>
      <p className="text-gray-400">Street: {order.address.streetName}</p>
      <p className="text-gray-400">Phone: {order.phoneNumber}</p>
      <p className="text-gray-400">Date: {date}</p>
    </motion.div>
  );
};

export default OrderCard;
