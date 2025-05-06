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
import { addToCart } from "@/lib/store/Order";
import { redirect, useRouter } from "next/navigation";
import { ItemCartProps } from "@/lib/action";
import { Toast } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import { FaCartArrowDown } from "react-icons/fa";
import { useTranslations } from "next-intl";

const HeaderProduct = ({ item }: { item: ProductFormInput }) => {
  const { toast } = useToast();
  const t = useTranslations("products");
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
    if (type === "increase") {
      const currentQuantity = quantities[selectedColor.name] || 1;
      if (currentQuantity >= item.stock) {
        toast({
          title: "Warning",
          description: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ffa500",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginRight: "8px" }}
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <span>Stock limit reached. Cannot add more items.</span>
            </div>
          ),
          style: {
            backgroundColor: "white",
            color: "#ffa500",
            borderColor: "#ffa500",
            borderWidth: "2px",
            borderRadius: "10px",
            padding: "8px",
          },
        });
        return;
      }
    }

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
          <span>{t("successAction")}</span>
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
      <div className="flex lg:w-full w-full dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-900 shadow-md sm:hover:bg-gray-50 hover:shadow-sm transition-all duration-300 rounded-lg p-2 h-full md:w-[80%] items-center gap-6 flex-col justify-center">
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
          <span>{t("addToCart")}</span>
        </button>
      </div>
    </>
  );
};

export default HeaderProduct;
