"use client";

import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import CartItem from "./CartItem";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ItemCartProps } from "@/lib/action";
import { useTranslations } from "next-intl";

const CartHeader = ({
  onclose,
  items,
}: {
  items: ItemCartProps[];
  onclose?: () => void;
}) => {
  const cartItems = useSelector((state: { cart: ItemCartProps[] }) => {
    return state.cart;
  });
  const [total, setTotal] = useState(cartItems.length);
  const [grandTotal, setGrandTotal] = useState(0);
  const t = useTranslations("cart");

  useEffect(() => {
    const qua = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(qua);
    const calculatedGrandTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setGrandTotal(calculatedGrandTotal);
  }, [cartItems]);

  return (
    <>
      <div
        onClick={onclose}
        className="h-screen fixed top-20 right-0  w-screen backdrop-blur-sm z-[100]"
      />
      <div className="flex gap-4 z-[101] sm:h-fitc sm:w-fit w-screen overflow-hidden absolute top-full dark:bg-gray-800 bg-gray-50 px-4 pb-3 shadow-md right-0 flex-col items-start justify-start">
        <p className="mt-3 w-full flex items-center justify-between">
          <span>
            {total} {t("items")}
          </span>
          <Link
            href="/Cart"
            onClick={onclose}
            className="hover:underline cursor-pointer"
          >
            {t("viewAll")}
          </Link>
        </p>
        <div
          className={`flex w-full flex-col ${
            total !== 0 ? "h-[310px] overflow-y" : ""
          } items-center gap-2`}
        >
          {total > 0 ? (
            cartItems.map((item, index) => (
              <CartItem
                type="headerItem"
                lngRemove={t("messageRemove")}
                key={index}
                item={item}
              />
            ))
          ) : (
            <p>{t("emptyCartMessage")}</p>
          )}
        </div>
        <div className="flex w-full items-center">
          <p className="flex flex-col px-2 pr-4">
            <span className="text-14">{t("grandtotal")}</span>
            <span>${grandTotal.toFixed(2)}</span>
          </p>
          <Link
            href="/Cart"
            onClick={onclose}
            className="flex items-center flex-1"
          >
            <button className="flex items-center px-3 gap-2 rounded-lg justify-center py-2 flex-1 text-white bg-primary">
              <span className="text-white">{t("processToCheckout")}</span>
              <TiShoppingCart color="white" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartHeader;
