import { Skeleton } from "@nextui-org/react";
import React from "react";

const LoadingProducts = () => {
  return (
    <div className="flex w-full justify-center items-center space-x-8">
      {/* Left Section (Image) */}
      <div className="flex flex-col space-y-4">
        <Skeleton className="w-72 bg-gray-100 h-64 rounded-md" />
        <div className="flex space-x-2">
          <Skeleton className="w-16 bg-gray-100 h-16 rounded-md" />
          <Skeleton className="w-16 bg-gray-100 h-16 rounded-md" />
          <Skeleton className="w-16 bg-gray-100 h-16 rounded-md" />
          <Skeleton className="w-16 bg-gray-100 h-16 rounded-md" />
        </div>
      </div>

      {/* Right Section (Details) */}
      <div className="flex w-1/3 flex-col space-y-4">
        <Skeleton className="w-40 bg-gray-300 h-6" /> {/* Title */}
        <div className="flex space-x-4">
          <Skeleton className="w-12 rounded-lg bg-gray-100 h-6" />{" "}
          {/* Badge 1 */}
          <Skeleton className="w-12 rounded-lg bg-gray-100 h-6" />{" "}
          {/* Badge 2 */}
          <Skeleton className="w-12 rounded-lg bg-gray-100 h-6" />{" "}
          {/* Badge 3 */}
        </div>
        <Skeleton className="w-24  rounded-lg  bg-gray-300 h-6" />{" "}
        {/* Select Color */}
        <Skeleton className="w-32  rounded-lg bg-gray-300 h-6" /> {/* Brand */}
        <div className="flex items-center w-full justify-between">
          <Skeleton className="w-32  rounded-lg bg-gray-300 h-6" />{" "}
          {/* Price */}
          <div className=" flex items-center justify-center gap-3">
            <Skeleton className="w-5  rounded-full bg-gray-300 h-6" />{" "}
            {/* Price */}
            <Skeleton className="w-7  rounded-lg bg-gray-300 h-6" />{" "}
            <Skeleton className="w-5  rounded-full bg-gray-300 h-6" />{" "}
          </div>
        </div>
        <Skeleton className="w-full  rounded-lg bg-gray-300 h-10" />{" "}
        {/* Add to Cart Button */}
      </div>
    </div>
  );
};

export default LoadingProducts;
