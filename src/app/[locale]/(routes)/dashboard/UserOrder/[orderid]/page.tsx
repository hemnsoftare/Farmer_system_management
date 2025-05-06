"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { selectedOrder } from "@/lib/store/filterProducts";
import { AlertCircle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const { order } = selectedOrder();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const hasValidLocation =
    order &&
    typeof order.lat === "number" &&
    typeof order.lng === "number" &&
    !isNaN(order.lat) &&
    !isNaN(order.lng);

  const fullAddress = order?.address
    ? `${order.address.streetName}, ${order.address.city}, ${order.address.region}`
    : "Address not available";

  const emailDisplay = order.email[0];
  const date: any = order.orderDate;
  const formattedDate = new Date(
    (date?.seconds || 0) * 1000
  ).toLocaleDateString("en-US");

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    setMapLoaded(true);
  };

  const handleMapError = () => {
    setMapError(
      "There was an error loading the map. Please check your connection or API key."
    );
  };

  return (
    <div className="w-full p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Order Details: <span className="text-primary">{order?.fullName}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-medium flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" /> Delivery Location
            </h2>
          </div>

          {hasValidLocation ? (
            <div className="relative h-[400px] w-full">
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                libraries={libraries}
                onError={handleMapError}
              >
                <GoogleMap
                  center={{ lat: order.lat, lng: order.lng }}
                  zoom={14}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  onLoad={handleMapLoad}
                  options={{
                    gestureHandling: "greedy",
                    zoomControl: true,
                    fullscreenControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}
                >
                  {mapLoaded &&
                  typeof window !== "undefined" &&
                  window.google ? (
                    <Marker
                      position={{ lat: order.lat, lng: order.lng }}
                      animation={window.google.maps.Animation.DROP}
                    />
                  ) : (
                    <Marker position={{ lat: order.lat, lng: order.lng }} />
                  )}
                </GoogleMap>
              </LoadScript>

              {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                  <Alert variant="destructive" className="w-5/6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Map Error</AlertTitle>
                    <AlertDescription>{mapError}</AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-gray-100">
              <Alert variant="destructive" className="w-5/6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Location Unavailable</AlertTitle>
                <AlertDescription>
                  This order does not have valid location coordinates. Please
                  verify the address manually.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-medium">Order Summary</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{order?.fullName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{order?.phoneNumber || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium break-words">{emailDisplay}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{fullAddress}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ${order?.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="flex justify-between text-green-600 mb-2">
                <span>Discount:</span>
                <span className="font-medium">
                  -${order?.totaldiscountPrice?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>
                  $
                  {(order?.totalAmount - order?.totaldiscountPrice)?.toFixed(
                    2
                  ) || "0.00"}
                </span>
              </div>
            </div>

            {order?.note && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">Customer Note</p>
                <p className="p-3 bg-gray-50 rounded-md italic">{order.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-lg font-medium">Ordered Items</h2>
        </div>
        <div className="p-6">
          {order?.orderItems?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left w-full">
                    <p className="font-medium truncate max-w-full">
                      {item.name}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start mt-1">
                      <div
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: item.colors.color }}
                      ></div>
                      <p className="text-xs text-gray-600">
                        {item.colors.name}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm">{item.quantity}x</p>
                      <p className="text-sm font-semibold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No items found for this order
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
