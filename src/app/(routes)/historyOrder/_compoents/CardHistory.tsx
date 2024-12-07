import { ItemCartProps } from "@/type";
import Image from "next/image";
import React from "react";

interface CardHistoryProps {
  item: ItemCartProps;
  date: any;
}

const CardHistory: React.FC<CardHistoryProps> = ({ item, date }) => {
  // Format the date to MM/DD/YYYY
  //   console.log(date);
  const formattedDate = new Date(date.seconds || 0 * 1000).toLocaleDateString(
    "en-US"
  );

  //   console.log(FormData);
  return (
    <div className="flex flex-col gap-3 max-w-[400px] rounded-sm sm:rounded-lg justify-center items-center shadow-md shadow-neutral-300 p-2">
      {/* Item Image */}
      <Image
        src={item.image}
        alt={item.name}
        width={150}
        height={150}
        className="w-[150px] sm:w-[240px]  sm:h-[240px] h-[150px] object-cover rounded-lg "
      />

      {/* Item Name */}
      <h2 className="text-sm text-start w-full sm:text-lg text-secondary-400">
        {item.name}
      </h2>

      {/* Price and Quantity */}
      <div className="flex justify-between w-full items-center">
        <h2 className="text-sm sm:text-lg">{item.price}$</h2>
        <h2 className="text-sm sm:text-lg">x{item.quantity}</h2>
      </div>

      {/* Date */}
      <h2 className="text-sm text-start w-full sm:text-lg">{formattedDate}</h2>
    </div>
  );
};

export default CardHistory;
