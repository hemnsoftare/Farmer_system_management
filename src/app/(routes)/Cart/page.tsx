"use client";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/home/header/CartItem";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import Success from "@/components/Cart/success";

import { useDispatch, useSelector } from "react-redux";
import { ItemCartProps, OrderType } from "@/type";
import { setOrder } from "@/lib/action/uploadimage";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { removeAll } from "@/lib/action/Order";
import Plunk from "@plunk/node";
// import { Email } from "@/emails";//
import { render } from "@react-email/render";

import { toast } from "@/hooks/use-toast";
import { BsFillCartXFill } from "react-icons/bs";
import Email from "@/emails";
import FormCheckout from "@/components/Cart/FormCheckout";
import Link from "next/link";

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
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY || "");

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showNotSuccess, setShowNotSuccess] = useState(false);
  const { user } = useUser();
  const [order, setorder] = useState<OrderType>();
  const [error, seterror] = useState({
    fullName: "",
    phoneNumber: "",
    streetName: "",
    city: "",
    Select_region: "",
    note: "",
  });
  console.log(error);
  const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    streetName: z.string().min(1, "Street name is required"),
    city: z.string().min(1, "City is required"),
    Select_region: z.string().min(1, "region is required"),
    note: z.string().optional(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datafrom = new FormData(e.currentTarget);
    const data = Object.fromEntries(datafrom.entries());
    console.log(data);
    const validate = formSchema.safeParse(data);

    if (validate.success && user) {
      setShowSuccess(true);
      const orders: OrderType = {
        address: {
          city: (data.city as string) || "", // Cast to string if needed
          region: (data.Select_region as string) || "", // Cast to string if needed
          streetName: (data.streetName as string) || "", // Cast to string if needed
        },
        totaldiscountPrice: totalPrice.discount || 0,
        email: user.emailAddresses || [],
        fullName: user.fullName || "", // Ensure user is defined
        orderDate: new Date(), // Current date and time
        orderItems: cartItems || [], // Default to an empty array if cartItems is undefined
        phoneNumber: (data.phoneNumber as string) || "", // Cast to string if needed
        totalAmount: totalPrice?.totalPrice || 0, // Default to 0 if totalPrice is not defined
        userId: user?.id || "", // Ensure user is defined
        note: data.note ? (data.note as string) : undefined, // Use undefined if no note is provided
      };

      sendEmail({ ...orders });
      const id = await setOrder(orders);
      setorder({ ...orders, id });
      dispatch(removeAll());
    } else {
      // Initialize an empty error object with all properties as empty strings
      // setShowNotSuccess(true);
      const errors: {
        fullName: string;
        phoneNumber: string;
        streetName: string;
        city: string;
        Select_region: string;
        note: string;
      } = {
        fullName: "",
        phoneNumber: "",
        streetName: "",
        city: "",
        Select_region: "",
        note: "",
      };

      validate.error &&
        validate.error.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof typeof errors;
          errors[fieldName] = error.message;
        });

      seterror(errors);
    }
  };

  const sendEmail = async (orderDetails: OrderType) => {
    // Await the render function to ensure emailHtml is a string
    const emailHtml = await render(<Email order={orderDetails} />);
    const recipientEmail = orderDetails.email[0]?.emailAddress;

    // Check if email is a valid string
    if (typeof recipientEmail !== "string" || recipientEmail.trim() === "") {
      console.log("Error: Recipient email is not a valid string.");
      return;
    }

    // Send the email using plunk.emails.send
    plunk.emails
      .send({
        to: recipientEmail.trim(), // Trim the recipient email
        subject: "Order Confirmation",
        body: emailHtml, // Use the awaited emailHtml string
      })
      .then((res) => {
        toast({ title: "Email sent successfully" });
      })
      .catch((error) => {
        toast({ title: "Email send failed" });
        console.error("Error sending email:", error);
      });
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
      <div className="flex  items-start justify-between">
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
          <hr className="bg-neutral-400 w-full h-[1px]" />
          <p className="flex items-center justify-between w-full">
            <span className="font-semibold">Grand Total</span>
            <span className="font-semibold">
              ${(totalPrice?.totalPrice - totalPrice?.discount).toFixed(2)}
            </span>
          </p>
          <div className="w-full text-center">
            <Dialog
              onOpenChange={() =>
                seterror({
                  fullName: "",
                  phoneNumber: "",
                  streetName: "",
                  city: "",
                  Select_region: "",
                  note: "",
                })
              }
            >
              <DialogTrigger
                // disabled={!user && cartItems.length < 1}
                onClick={(e) => {
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
                }}
                className="w-full py-2 px-6 hover:bg-blue-700 duration-300 transition-all bg-primary text-white rounded-lg"
              >
                Proceed to checkout
              </DialogTrigger>
              <DialogContent className="md:scale-[0.8] h-fit lg:scale-[0.8]">
                <DialogHeader className="flex flex-col gap-3">
                  {!showSuccess && !showNotSuccess && (
                    <DialogTitle>Address details</DialogTitle>
                  )}

                  {showSuccess && !showNotSuccess && (
                    <Success
                      order={order}
                      // onClose={() => setShowSuccess(false)}
                    />
                  )}
                  {!showSuccess && !showNotSuccess && (
                    <FormCheckout errors={error} handleSubmit={handleSubmit} />
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
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
