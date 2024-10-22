import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CartHeader from "@/components/home/header/CartHeader";
import CartItem from "@/components/home/header/CartItem";
import { carts, newProdcuts } from "@/util/data";
import { TbShoppingBag } from "react-icons/tb";
import { MdNavigateNext, MdOutlineFireTruck } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import NewProducts from "@/components/home/NewProducts";

interface Location {
  lat: number;
  lng: number;
}

const MapsCheckout: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const handleMapClick = (event: React.MouseEvent<HTMLIFrameElement>) => {
    // Dummy values for latitude and longitude, replace with actual conversion logic
    const lat = 36.19907494402343;
    const lng = 44.08488228929309;

    setLocation({ lat, lng });
  };

  const handleSubmit = () => {
    if (location) {
      console.log("Selected Location:", location);
      // Perform the submit action, e.g., sending the location to a server
    }
  };

  return (
    <DialogContent className="flex flex-col items-center justify-center">
      <DialogHeader className="w-full">
        <DialogTitle>Edit address</DialogTitle>
        <DialogDescription>Mark the location on the map</DialogDescription>
      </DialogHeader>
      <div className="w-full rounded-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103029.2186122285!2d44.08488228929309!3d36.19907494402343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x400722fe13443461%3A0x3e01d63391de79d1!2z2KfYsdio2YrZhNiMINij2LHYqNmK2YQg2YXYrdin2YHYuNip!5e0!3m2!1sar!2siq!4v1725276204270!5m2!1sar!2siq"
          width="450"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onClick={handleMapClick}
        ></iframe>
      </div>
      {location && (
        <div>
          <p>Selected Location:</p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit Location
          </button>
        </div>
      )}
    </DialogContent>
  );
};
export default MapsCheckout;
