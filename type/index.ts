import { ReactNode } from "react";

export interface Productsprops {
  name: string;
  discount?: number;
  color?: string[];
  image: string;
  price: number;
  pointStart: number;
  persentageDiscount?: number;
}
export interface serviesProps {
  name: string;
  image: string;
}
export interface footerProps {
  name: string;
  item: { name?: string; icon?: any }[];
}
export interface userProps {
  name: string;
  image: string;
  email: string;
}
export interface Cart {
  id: number;
  imageSrc: string;
  name: string;
  color: string;
  delivery: string;
  guarantee: string;
  price: number;
  quantity: number;
}
