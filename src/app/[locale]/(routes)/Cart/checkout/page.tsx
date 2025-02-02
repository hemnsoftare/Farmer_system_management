"use client"; // Ensure it runs on the client side

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { ItemCartProps, OrderType } from "@/lib/action";
import { setOrder } from "@/lib/action/uploadimage";
import { useUser } from "@clerk/nextjs";
import { removeAll } from "@/lib/action/Order";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";

import { toast } from "@/hooks/use-toast";
import Email from "@/emails";
import FormCheckout from "@/components/Cart/FormCheckout";
import { redirect } from "next/navigation";

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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    streetName: z.string().min(1, "Street name is required"),
    city: z.string().min(1, "City is required"),
    Select_region: z.string().min(1, "Region is required"),
    note: z.string().optional(),
    lat: z.number().min(1),
    lng: z.number().min(1),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datafrom = new FormData(e.currentTarget);
    const data = Object.fromEntries(datafrom.entries());
    console.log(data);
    const validate = formSchema.safeParse({
      ...data,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    });

    if (validate.success && user && cartItems.length > 0) {
      setShowSuccess(true);
      const orders: OrderType = {
        address: {
          city: (data.city as string) || "", // Cast to string if needed
          region: (data.Select_region as string) || "", // Cast to string if needed
          streetName: (data.streetName as string) || "", // Cast to string if needed
        },
        totaldiscountPrice: totalPrice.discount || 0,
        lat: markerPosition.lat || 0,
        lng: markerPosition.lng || 0,
        email: user.emailAddresses || [],
        fullName: user.fullName || "", // Ensure user is defined
        orderDate: new Date(), // Current date and time
        orderItems: cartItems || [], // Default to an empty array if cartItems is undefined
        phoneNumber: (data.phoneNumber as string) || "", // Cast to string if needed
        totalAmount: totalPrice?.totalPrice || 0, // Default to 0 if totalPrice is not defined
        userId: user?.id || "", // Ensure user is defined
        note: data.note ? (data.note as string) : undefined, // Use undefined if no note is provided
      };

      const id = await setOrder(orders);
      setorder({ ...orders, id });
      handleWhatsAppClick();
      sendEmail({ ...orders });
      dispatch(removeAll());
      redirect("/");
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
        lat: number;
        lng: number;
      } = {
        fullName: "",
        phoneNumber: "",
        streetName: "",
        city: "",
        Select_region: "",
        note: "",
        lat: 0,
        lng: 0,
      };
      if (cartItems.length === 0) {
        toast({
          title: "Your cart is empty",
          description: "Please add items to your cart before checkout",
          style: { color: "red", backgroundColor: "#ffd6ce" },
        });
        return;
      }
      validate.error &&
        validate.error.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof typeof errors;
          errors[fieldName as any] = error.message;
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

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMarkerPosition({ lat, lng });

        map?.panTo({ lat, lng });
      }
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "9647508927181"; // Remove "+" from the phone number
    console.log("Handle WhatsApp message send");

    const orderUrl = encodeURIComponent(
      `https://tech-heim-three.vercel.app/Cart/${order.id}`
    );
    const message = encodeURIComponent(`Check your order details: ${orderUrl}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderUrl}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMarkerPosition({
        lat: position.coords.latitude || 36.1911,
        lng: position.coords.longitude || 44.0092,
      });
    });
  }, []);
  console.log(markerPosition);
  return (
    <div className=" flex flex-col px-1 py-8 gap-4 items-center justify-center ">
      <h1 className="font-bold text23 md:text-34">checkout</h1>
      <LoadScript
        language="en"
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={libraries}
      >
        <div className="relative bg-[#ffd6ce] md:w-1/2 w-full  h-[450px]  mx-auto rounded-lg shadow-xl overflow-hidden">
          <GoogleMap
            center={markerPosition}
            zoom={12}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={setMap}
            onClick={(e) => {
              if (e.latLng) {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                setMarkerPosition({ lat, lng });
              }
            }}
            options={{
              gestureHandling: "greedy", // Enables one-finger drag
              zoomControl: false, // Optional: Hide zoom buttons
            }}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </div>
      </LoadScript>
      <div className="md:w-1/2 w-full  py-5">
        <FormCheckout errors={error} handleSubmit={handleSubmit} />
        <input type="hidden" name="lat" value={markerPosition.lat} />
        <input type="hidden" name="lng" value={markerPosition.lng} />

        {/*
         <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
            <p className="text-gray-600">
              Fill in your details to complete the order.
            </p>
          </div>

          {[
            { label: "Full Name", type: "text", id: "name" },
            { label: "Email", type: "email", id: "email" },
            { label: "Phone Number", type: "tel", id: "phone" },
            { label: "Street Name", type: "text", id: "street" },
          ].map(({ label, type, id }) => (
            <div key={id} className="relative">
              <input
                type={type}
                id={id}
                className="peer w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 placeholder-transparent"
                placeholder={label}
              />
              <label
                htmlFor={id}
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1"
              >
                {label}
              </label>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "City", id: "city" },
              { label: "Region", id: "region" },
            ].map(({ label, id }) => (
              <div key={id} className="relative">
                <input
                  type="text"
                  id={id}
                  className="peer w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 placeholder-transparent"
                  placeholder={label}
                />
                <label
                  htmlFor={id}
                  className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className="relative">
            <textarea
              id="note"
              className="peer w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 placeholder-transparent"
              placeholder="Order Notes (Optional)"
              rows={3}
            ></textarea>
            <label
              htmlFor="note"
              className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 bg-white px-1"
            >
              Order Notes (Optional)
            </label>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Proceed to Payment
          </button>
        </section> 
        */}
      </div>
    </div>
  );
};

export default Page;
