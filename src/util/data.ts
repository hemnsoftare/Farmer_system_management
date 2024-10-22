import { Icon } from "lucide-react";
import {
  Cart,
  footerProps,
  Productsprops,
  serviesProps,
  userProps,
} from "../../type";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
const newProdcuts: Productsprops[] = [
  {
    price: 342,
    name: "Iphone 14 promax 256 gig",
    color: ["#83f3da", "#f69dfa", "#f596b2 ", "#efebb1", "black"],

    pointStart: 1.3,
    image: "Catagory_smartPhone.svg",
  },
  {
    price: 342,
    name: "Blackmagic Design Pocket Cinema Camera 6K Pro (Canon EF)",
    color: ["#83f3da", "#b7c2c5"],
    discount: 234.34,
    pointStart: 2.3,
    image: "Catagory_laptop.svg",
  },
  {
    price: 342,
    name: "SAMSUNG Galaxy S23 Ultra Cell Phone,256 GB",
    pointStart: 3.3,

    image: "airPode.svg",
  },
  {
    price: 342,
    name: "Play Station 4 Pro 1Tb",
    color: ["#83f3da"],
    persentageDiscount: 23,
    discount: 342.3,
    pointStart: 4.3,
    image: "playStation2.svg",
  },
];

const bestSellers: Productsprops[] = [
  {
    price: 342,
    name: "EchoX Pro H900",
    color: ["#83f3da", "#f69dfa", "#f596b2 ", "#efebb1", "black"],

    pointStart: 1.3,
    image: "headSet.svg",
  },
  {
    price: 342,
    name: "Apple MacBook Air 15 w/ Touch ID (2023) - Space Grey (Apple M2 Chip / 256GB SSD / 8GB RAM) - French",
    color: ["#83f3da", "#b7c2c5"],
    discount: 234.34,
    pointStart: 2.3,
    image: "laptop1.svg",
  },
  {
    price: 342,
    name: "Airpods pro2",
    pointStart: 3.3,

    image: "airPode.svg",
  },
  {
    price: 342,
    name: "Play Station 4 Pro 1Tb",
    color: ["#83f3da"],
    persentageDiscount: 23,
    discount: 342.3,
    pointStart: 4.3,
    image: "playStation2.svg",
  },
];
const brand: [
  "apple.svg",
  "sony.svg",
  "samsung.svg",
  "canon.svg",
  "huawei.svg",
  "lenovo.svg"
] = [
  "apple.svg",
  "sony.svg",
  "samsung.svg",
  "canon.svg",
  "huawei.svg",
  "lenovo.svg",
];
const servies: serviesProps[] = [
  { name: "Latest and Greatest Tech", image: "/servies-computer.png" },
  { name: "Guarantee", image: "/servies-sucrity.png" },
  { name: "Free Shipping over 1000$", image: "/servies-delivery.png" },
  { name: "24/7 Support", image: "/servies-time.png" },
];
const footer: footerProps[] = [
  {
    name: "Company",
    item: [
      { name: "about us" },
      { name: "blog" },
      { name: "returns" },
      { name: "order status" },
    ],
  },
  {
    name: "Info",
    item: [
      { name: "How it works?" },
      { name: "our promises" },
      { name: "FAQ" },
    ],
  },
  {
    name: "Contact us",
    item: [
      { name: "123 Main Street, Anytown, USA", icon: "location" },
      { name: "+1 (555) 123-4567", icon: "phone" },
      { name: "TechHeimSupport@gmail.com", icon: "eamil" },
    ],
  },
];
const user: userProps = {
  name: "hemnsoftware",
  email: "hamnfarhad14@gmail.com",
  image: "",
};
const carts: Cart[] = [
  {
    id: 1,
    imageSrc: "laptop.svg",
    name: "MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch",
    color: "blue",
    delivery: "Free Delivery",
    guarantee: "Guaranteed",
    price: 4300.0,
    quantity: 1,
  },
  {
    id: 2,
    imageSrc: "/bag1.png",
    name: "MacBook Air M1 2020 13.3 inch",
    color: "silver",
    delivery: "Free Delivery",
    guarantee: "Guaranteed",
    price: 3800.0,
    quantity: 1,
  },
  {
    id: 3,
    imageSrc: "/monitar.png",
    name: "MacBook Pro M1 2021 14 inch",
    color: "space gray",
    delivery: "Free Delivery",
    guarantee: "Guaranteed",
    price: 4800.0,
    quantity: 1,
  },
  // Add more products up to 10
];
export { newProdcuts, bestSellers, user, brand, servies, footer, carts };
