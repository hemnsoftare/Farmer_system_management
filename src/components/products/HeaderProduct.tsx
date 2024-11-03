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
import { ProductFormInput } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/action/Order";
import { redirect, useRouter } from "next/navigation";
import { ItemCartProps } from "@/type/globals";

const HeaderProduct = ({ item }: { item: ProductFormInput }) => {
  const cartItems = useSelector(
    (state: { cart: ItemCartProps[] }) => state.cart || []
  );

  // Find existing items in the cart and initialize color-based quantities
  const initialQuantities = cartItems.reduce((acc, cartItem) => {
    if (cartItem.name === item.name) {
      acc[cartItem.colors.name] = cartItem.quantity;
    }
    return acc;
  }, {} as { [color: string]: number });

  const [quantities, setQuantities] = useState<{ [color: string]: number }>(
    initialQuantities
  );

  const [selectedColor, setSelectedColor] = useState(
    item.colors[0] || { name: "", color: "" }
  );

  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  // Update quantity for the selected color
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
    dispatch(
      addToCart({
        colors: selectedColor,
        image: item.bigimageUrl,
        name: item.name,
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
      <div className="flex lg:w-full shadow-md hover:bg-gray-50 hover:shadow-sm transition-all duration-300 p-2 h-full md:w-[80%] items-center gap-6 flex-col justify-center">
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
          disabled={!user}
          onClick={handleAddToCart}
          className={`${
            user ? "bg-primary hover:bg-blue-700 " : "bg-primary-75"
          } flex items-center mb-2 lg:w-[79%] self-center md:w-full py-2 rounded-lg duration-300 justify-center gap-2 text-white`}
        >
          <MdOutlineShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </>
  );
};

export default HeaderProduct;
