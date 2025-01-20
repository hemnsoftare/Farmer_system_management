"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiShop } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import HeaderProductIMage from "./HeaderProductIMage";
import HeaderproductInfo from "./HeaderproductInfo";
import { useUser } from "@clerk/nextjs";
import { ProductFormInput } from "@/lib/action";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/action/Order";
import { redirect, useRouter } from "next/navigation";
import { ItemCartProps } from "@/lib/action";
import { Toast } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import { FaCartArrowDown } from "react-icons/fa";

const HeaderProduct = ({ item }: { item: ProductFormInput }) => {
  const { toast } = useToast();

  const cartItems = useSelector(
    (state: { cart: ItemCartProps[] }) => state.cart || []
  );

  const initialQuantities = cartItems.reduce(
    (acc, cartItem) => {
      if (cartItem.id === item.id) {
        acc[cartItem.colors.name] = cartItem.quantity;
      }
      return acc;
    },
    {} as { [color: string]: number }
  );

  const [quantities, setQuantities] = useState<{ [color: string]: number }>(
    initialQuantities
  );

  const [selectedColor, setSelectedColor] = useState(
    item.colors[0] || { name: "", color: "" }
  );

  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [selectedColor.name]: Math.max(
        1,
        (prevQuantities[selectedColor.name] || 1) +
          (type === "increase" ? 1 : -1)
      ),
    }));
  };

  const handleAddToCart = () => {
    if (item.colors.length === 0) {
      toast({
        title: "No Colors Available",
        description: "Please select a color to add the product to the cart.",
        style: {
          backgroundColor: "white",
          color: "#ff0000", // Red color for error
          borderColor: "#ff0000",
          borderWidth: "2px",
          borderRadius: "10px",
          padding: "8px",
        },
      });
      return; // Exit early if there are no colors
    }

    toast({
      title: "Success",
      description: (
        <div
          style={{ display: "flex", alignItems: "center", color: "#008000" }}
        >
          <FaCartArrowDown color="#008000" style={{ marginRight: "8px" }} />
          <span>Success action </span>
        </div>
      ),
      style: {
        backgroundColor: "white",
        color: "#008000",
        borderColor: "#00FA9A",
        borderWidth: "2px",
        borderRadius: "10px",
        padding: "8px",
      },
    });

    dispatch(
      addToCart({
        colors: selectedColor,
        image: item.bigimageUrl,
        name: item.name,
        id: item.id,
        price: item.price,
        discount: item.discount ? item.discount : 0,
        quantity: quantities[selectedColor.name] || 1,
      })
    );
    router.push("/products/" + item.category);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 items-center justify-center">
        <HeaderProductIMage
          mainImage={item.bigimageUrl}
          childImage={item.smallimageUrl}
        />
      </div>
      <div className="flex lg:w-full w-full dark:bg-neutral-800 dark:hover:bg-neutral-900 shadow-md sm:hover:bg-gray-50 hover:shadow-sm transition-all duration-300 p-2 h-full md:w-[80%] items-center gap-6 flex-col justify-center">
        <HeaderproductInfo
          productinfos={{
            colors: item.colors,
            infos: item.details,
            name: item.name,
            price: item.price,
            brand: item.brand,
            discount: item.discount,
          }}
          onQuantity={handleQuantityChange}
          quantity={quantities[selectedColor.name] || 1}
          onSelectedColor={(color) => setSelectedColor(color)}
          selectedColor={selectedColor.name}
        />
        <button
          onClick={handleAddToCart}
          className={` flex px-3 bg-primary dark:bg-blue-900 w-[80%] sm:hover:bg-blue-700 items-center mb-2 lg:w-[79%] self-center md:w-full py-2 rounded-lg duration-300 justify-center gap-2 text-white`}
        >
          <MdOutlineShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </>
  );
};

export default HeaderProduct;
