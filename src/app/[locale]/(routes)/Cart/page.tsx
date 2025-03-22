"use client"; // Ensure it runs on the client side

import React, { useEffect, useState } from "react";
import CartItem from "@/components/header/CartItem";

import { useDispatch, useSelector } from "react-redux";
import { ItemCartProps } from "@/lib/action";
// import { Email } from "@/emails";//

import { Link } from "navigation";

const Page = () => {
  const cartItems = useSelector(
    (state: { cart: ItemCartProps[] }) => state.cart || []
  );
  const [totalPrice, settotalPrice] = useState<{
    discount: number;
    totalPrice: number;
  }>({
    discount: 0,
    totalPrice: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const totalPriceitem = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );

    const totalDiscount = cartItems.reduce(
      (accumulator, item) =>
        accumulator +
        (item.discount
          ? item.price * item.quantity * (0.01 * item.discount)
          : 0),
      0
    );

    settotalPrice({ totalPrice: totalPriceitem, discount: totalDiscount });
  }, [cartItems]);

  return (
    <div className="fled py-8 flex-col  justify-center px-2 items-center">
      <p className="m-3 text-18">
        <Link href={"/"}>Home &gt;</Link>{" "}
        <span className=" bgpri  bgpri-offset-4 text-primary"> Cart</span>
      </p>
      {/* header  */}
      {/* <header className="flex mx-auto relative w-fit py-5 self-center items-center gap-20 justify-center">
        <div className="bg-neutral-400 z-[0] absolute top-[50%] w-full left-0 h-[3px]" />
        <span className="rounded-full z-[3] border-2 p-2 bg-white border-blue-600">
          <TbShoppingBag color="blue" className="w-8 h-8" />
        </span>
        <span className="rounded-full z-[3] border-2 p-2 bg-neutral-400">
          <MdOutlineFireTruck color="white" className="w-6 h-6" />
        </span>
        <span className="rounded-full z-[3] border-2 p-2 bg-neutral-400">
          <FaRegCreditCard color="white" className="w-6 h-6" />
        </span>
      </header> */}
      <br />
      <h2>total price {totalPrice?.totalPrice}</h2>
      <div className="flex flex-col sm:flex-row  items-start justify-between">
        <div className="sm:w-[55%] w-full flex flex-col gap-3">
          {cartItems.map((cart, index) => (
            <CartItem key={index} lngRemove="u" item={cart} />
          ))}
        </div>
        <br />
        <div className="flex flex-col gap-3 border-neutral-300 shadow-md sm:w-[35%] w-full p-2 sm:p-3 border-2 rounded-md items-start">
          <h2 className="font-semibold">Payment Details</h2>
          <ul className="w-full text-12">
            <li className="w-full capitalize flex items-center justify-between text-neutral-500">
              <span>Subtotal</span>
              <span>${totalPrice?.totalPrice}</span>
            </li>
            <li className="w-full capitalize flex items-center justify-between text-neutral-500">
              <span>Discount</span>
              <span>-${totalPrice?.discount}</span>
            </li>
          </ul>
          <hr className="bg-neutral-400 w-full h-[1px]" />
          <p className="flex items-center justify-between w-full">
            <span className="font-semibold">Grand Total</span>
            <span className="font-semibold">
              ${(totalPrice?.totalPrice - totalPrice?.discount).toFixed(2)}
            </span>
          </p>
          <div className="w-full text-center">
            <Link
              href="/Cart/checkout"
              // disabled={!user && cartItems.length < 1}
              /* onClick={(e) => {
                  if (!user) {
                    e.preventDefault(); // Prevents the dialog from opening
                    toast({
                      title: "You need an account to proceed",
                      description: (
                        <div className="flex gap-2">
                          <SignInButton>
                            <button className="text-white px-3 py-1 rounded-lg  bg-primary ">
                              Sign In
                            </button>
                          </SignInButton>
                          <SignUpButton>
                            <button className="text-blue-50   bg-orange-500 rounded-lg px-3 py-1 ">
                              Sign Up
                            </button>
                          </SignUpButton>
                        </div>
                      ),
                    });
                  } else if (cartItems.length < 1) {
                    e.preventDefault(); // Prevents the dialog from opening
                    toast({
                      description: (
                        <div className="flex text-red-600 text-14 items-center px-2 font-bold gap-2">
                          <BsFillCartXFill color="red" />{" "}
                          <p> have not product in cart</p>
                        </div>
                      ),
                      style: {
                        backgroundColor: "#fef2f2",
                        color: "red", // Red color for error
                        borderColor: "red",
                        borderWidth: "2px",
                        borderRadius: "4px",
                        padding: "8px",
                      },
                    });
                  }
                }} */
              className="w-full py-2 px-6 hover:bg-blue-700 duration-300 transition-all bg-primary text-white rounded-lg"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
