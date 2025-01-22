"use client";
import React, { useState, ReactNode, createContext } from "react";

// Define the context type
type ContextType = {
  showSlider: boolean;
  showSliderCart: boolean;
  handleHideSlider: () => void;
  handleShowSlider: () => void;
  handleShowCartSlider: () => void;
};

// Create the context with default values
export const cont = createContext<ContextType>({
  showSlider: false,
  showSliderCart: false,
  handleHideSlider: () => {},
  handleShowSlider: () => {},
  handleShowCartSlider: () => {},
});

// Define the props for the provider to include `children`
interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  // Define the internal state and functions for the context
  const [show, setShow] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const handleShow = () => {
    console.log("Showing slider");
    setShow(true);
    setShowCart(false);
  };
  const handleHide = () => {
    console.log("Hiding slider");
    setShow(false);
  };
  const hnaldeShowCart = () => {
    setShowCart(true);
    setShow(false);
  };
  const val_context: ContextType = {
    handleShowSlider: handleShow,
    handleHideSlider: handleHide,
    showSlider: show,
    showSliderCart: showCart,
    handleShowCartSlider: hnaldeShowCart,
  };

  // Provide the context value to the children
  return <cont.Provider value={val_context}>{children}</cont.Provider>;
};

export default ContextProvider;
