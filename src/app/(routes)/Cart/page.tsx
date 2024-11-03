"use client";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/home/header/CartItem";

import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import NotSuccess from "@/components/Cart/NotSuccess";
import Success from "@/components/Cart/success";
import FormCheckout from "@/components/Cart/FormCheckout";
import { useSelector } from "react-redux";
import { ItemCartProps } from "@/type/globals";

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
  const totalItems = cartItems.length;
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showNotSuccess, setShowNotSuccess] = useState(false);
  const [error, seterror] = useState({
    fullName: "",
    phoneNumber: "",
    streetName: "",
    city: "",
    recipientName: "",
    phoneNumberAnother: "",
  });
  console.log(error);
  const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    streetName: z.string().min(1, "Street name is required"),
    city: z.string().min(1, "City is required"),
    recipientName: z.string().optional(),
    phoneNumberAnother: z.string().optional(),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datafrom = new FormData(e.currentTarget);
    const data = Object.fromEntries(datafrom.entries());
    console.log(data);
    const validate = formSchema.safeParse(data);

    if (validate.success) {
      setShowSuccess(true);
      // Clear errors if validation is successful
      seterror({
        fullName: "",
        phoneNumber: "",
        streetName: "",
        city: "",
        recipientName: "",
        phoneNumberAnother: "",
      });
    } else {
      // Initialize an empty error object with all properties as empty strings
      setShowNotSuccess(true);
      const errors: {
        fullName: string;
        phoneNumber: string;
        streetName: string;
        city: string;
        recipientName: string;
        phoneNumberAnother: string;
      } = {
        fullName: "",
        phoneNumber: "",
        streetName: "",
        city: "",
        recipientName: "",
        phoneNumberAnother: "",
      };

      validate.error.errors.forEach((error) => {
        const fieldName = error.path[0] as keyof typeof errors;
        errors[fieldName] = error.message;
      });

      seterror(errors);
    }
  };
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
      <div className="m-3text-18">
        <span>Home &gt;</span>{" "}
        <span className="underline underline-offset-4 text-primary"> Cart</span>
      </div>
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
      <main className="flex  items-start justify-between">
        <div className="w-[55%] flex flex-col gap-3">
          {cartItems.map((cart, index) => (
            <CartItem key={index} item={cart} />
          ))}
        </div>
        <div className="flex flex-col gap-3 border-neutral-300 shadow-md w-[35%] p-3 border-2 rounded-md items-start">
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
          <div className="bg-neutral-400 w-full h-[1px]" />
          <p className="flex items-center justify-between w-full">
            <span className="font-semibold">Grand Total</span>
            <span className="font-semibold">
              ${(totalPrice?.totalPrice - totalPrice?.discount).toFixed(2)}
            </span>
          </p>
          <div className="w-full text-center">
            <Dialog>
              <DialogTrigger className="w-full py-2 px-6 hover:bg-blue-700 duration-300 transition-all bg-primary text-white rounded-lg">
                Proceed to checkout
              </DialogTrigger>
              <DialogContent className="md:scale-[0.8] h-fit lg:scale-[0.8]">
                <DialogHeader className="flex flex-col gap-3">
                  {!showSuccess && !showNotSuccess && (
                    <DialogTitle>Address details</DialogTitle>
                  )}
                  {showNotSuccess && (
                    <NotSuccess onClose={() => setShowNotSuccess(false)} />
                  )}
                  {showSuccess && !showNotSuccess && (
                    <Success onClose={() => setShowSuccess(false)} />
                  )}
                  {!showSuccess && !showNotSuccess && (
                    <FormCheckout errors={error} handleSubmit={handleSubmit} />
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      {/* <div className="flex mt-12 mb-3 flex-col w-full">
        <h2 className="font-semibold">
          Customers who viewed items in your browsing history also viewed
        </h2>
        <ForProducts />
      </div> */}
    </div>
  );
};

export default Page;
