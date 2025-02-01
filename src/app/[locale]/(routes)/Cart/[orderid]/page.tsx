"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const libraries: "places"[] = ["places"];
export type OrderType = {
  id?: string;
  userId: string;
  fullName: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  address: {
    streetName: string;
    city: string;
    region: string;
  };
  email: { emailAddress: string }[];
  orderItems: ItemCartProps[];
  orderDate: Date;
  totalAmount: number;
  totaldiscountPrice: number;
  note?: string;
};

export interface ItemCartProps {
  name: string;
  id: string;
  discount?: number;
  price: number;
  colors: { name: string; color: string };
  quantity: number;
  image: string;
}

const OrderPage = ({ params }) => {
  const param: { orderid: string } = React.use(params);
  const db = getFirestore(app);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!param.orderid) return;
      const refdoc = await getDoc(doc(db, "order", param.orderid));
      if (refdoc.exists()) {
        setOrder(refdoc.data() as OrderType);
      }
    };
    getData();
  }, [param.orderid, db]);

  if (!order) {
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Order Summary */}
      <LoadScript
        language="en"
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={libraries}
      >
        <div className="relative  w-full  h-[450px]  mx-auto rounded-lg shadow-xl overflow-hidden">
          <GoogleMap
            center={{ lat: order.lat, lng: order.lng }}
            zoom={12}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={setMap}
            options={{
              gestureHandling: "greedy", // Enables one-finger drag
              zoomControl: false, // Optional: Hide zoom buttons
            }}
          >
            <Marker position={{ lat: order.lat, lng: order.lng }} />
          </GoogleMap>
        </div>
      </LoadScript>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {order.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {order.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {order.email as any}
          </p>
          <p>
            <strong>Address:</strong> {order.address.streetName},{" "}
            {order.address.city}, {order.address.region}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
          <p>
            <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <p>
            <strong>Discount:</strong> ${order.totaldiscountPrice.toFixed(2)}
          </p>
          {order.note && (
            <p>
              <strong>Note:</strong> {order.note}
            </p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Color: {item.colors.name}
                </p>
                <p className="text-sm">Quantity: {item.quantity}</p>
                <p className="text-sm font-semibold">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
    </div>
  );
};

export default OrderPage;
