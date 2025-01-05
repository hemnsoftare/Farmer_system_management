import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { BsTabletLandscape, BsSmartwatch, BsCamera } from "react-icons/bs";
import {
  IoHeadsetOutline,
  IoGameControllerOutline,
  IoGitNetwork,
} from "react-icons/io5";
import { RiSettings3Line } from "react-icons/ri";
import {
  BlogColProps,
  Cart,
  Category,
  CommentProps,
  // FAQProps,
  FilterProps,
  footerProps,
  Productsprops,
  propsMenuItem,
  serviesProps,
  userProps,
} from "../type";

import { IconType } from "react-icons";
import {
  FaUser,
  FaTrash,
  FaGift,
  FaHome,
  FaShippingFast,
  FaDesktop,
  FaShoppingCart,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  MdAddCircleOutline,
  MdOutlineShoppingCart,
  MdOutlineVerified,
  MdShoppingBasket,
} from "react-icons/md";
import { MenuItemProps } from "@nextui-org/react";
import { BiCategoryAlt, BiSolidTimer } from "react-icons/bi";
import { FaUsersLine } from "react-icons/fa6";
const newProdcuts: Productsprops[] = [
  {
    price: 12,
    name: "Iphone 14 promax 256 gig",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.3,
    image: "/Catagory_smartPhone.svg",
  },
  {
    price: 123123,
    name: "Blackmagic Design Pocket Cinema Camera 6K Pro (Canon EF)",
    colors: [{ name: "Red", color: "#FF0000" }],
    discount: 234.34,
    pointStart: 2.3,
    image: "/Catagory_laptop.svg",
  },
  {
    price: 32,
    name: "SAMSUNG Galaxy S23 Ultra Cell Phone,256 GB",
    pointStart: 3.3,

    image: "/airPode.svg",
  },
  {
    price: 45,
    name: "Play Station 4 Pro 1Tb",
    colors: [{ name: "Red", color: "#FF0000" }],
    persentageDiscount: 23,
    discount: 342.3,
    pointStart: 4.3,
    image: "/playStation2.svg",
  },
  {
    price: 67,
    name: "camera for the photo",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.3,
    image: "/Catagory_camera.svg",
  },
  {
    price: 78,
    name: "camera for the photo",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.13,
    image: "/Catagory_Gaming.svg",
  },
  {
    price: 12243,
    name: "laptop is live for me day for the photo",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.13,
    image: "/laptop1.svg",
  },
  {
    price: 230,
    name: "laptop is live for me day for the photo",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.13,
    image: "/oldsmart.svg",
  },
  {
    price: 103,
    name: "laptop is live for me day for the photo",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.13,
    image: "/airPode.svg",
  },
];

const bestSellers: Productsprops[] = [
  {
    price: 342,
    name: "EchoX Pro H900",
    colors: [{ name: "Red", color: "#FF0000" }],

    pointStart: 1.3,
    image: "/headSet.svg",
  },
  {
    price: 342,
    name: "Apple MacBook Air 15 w/ Touch ID (2023) - Space Grey (Apple M2 Chip / 256GB SSD / 8GB RAM) - French",
    colors: [{ name: "Red", color: "#FF0000" }],
    discount: 234.34,
    pointStart: 2.3,
    image: "/laptop1.svg",
  },
  {
    price: 342,
    name: "Airpods pro2",
    pointStart: 3.3,

    image: "/airPode.svg",
  },
  {
    price: 342,
    name: "Play Station 4 Pro 1Tb",
    colors: [{ name: "Red", color: "#FF0000" }],
    persentageDiscount: 23,
    discount: 342.3,
    pointStart: 4.3,
    image: "/playStation2.svg",
  },
];
const brand: [
  "/Apple.webp",
  "/sony.svg",
  "/samsung.svg",
  "/canon.svg",
  "/huawei.svg",
  "/lenovo.svg",
] = [
  "/Apple.webp",
  "/sony.svg",
  "/samsung.svg",
  "/canon.svg",
  "/huawei.svg",
  "/lenovo.svg",
];
const servies: serviesProps[] = [
  { name: "Latest and Greatest", image: FaDesktop },
  { name: "Guarantee", image: MdOutlineVerified },
  { name: "Free Shipping over 1000$", image: FaShippingFast },
  { name: "24/7 Support", image: BiSolidTimer },
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
  image: "/",
};
const carts: Cart[] = [
  {
    id: 1,
    imageSrc: "/laptop.svg",
    name: "MacBook Pro M2 MNEJ3  LLA 13.3 inch",
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
    color: "gray",
    delivery: "Free Delivery",
    guarantee: "Guaranteed",
    price: 4800.0,
    quantity: 1,
  },
];
const blogs: BlogColProps[] = [
  {
    id: "1",
    title: "Meta Platforms plans to release free software that...",
    description:
      "The parent  at dolorum, voluptas aut quos delectus repellendus. Iusto eius, rem voluptates temporibus quae excepturi sint fugit ab sequi, perferendis ex. Illum perspiciatis rerum totam provident numquam laboriosam quod fugiat quae voluptas deleniti, nihil consectetur nostrum officia, ducimus quibusdam error esse placeat mollitia officiis cum ex sunt tenetur? Voluptate, impedit tempore. Magnam eligendi similique voluptatem, autem ab corporis beatae perferendis delectus ipsum blanditiis minima magni. Id tenetur, eos molestias a accusamus, maxime dignissimos ipsam culpa aliquam iure veritatis fuga. Fugit cum eveniet, id eum repellendus quam, ea maxime quos architecto sit cupiditate natus solut troducing software to help developers",
    date: "August 8, 2023",
    readTime: "3 min read",
    imageSrc: "/meta.svg",
    saveIconSrc: "/save-2.svg",
    catagory: "headset",
    creator: "aso afan sadiq",
  },
  {
    id: "2",
    title: "The parent company  ",
    description:
      "South Korea's antitrust regulator fines aims to ensure trans Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illo fugiat at velit nam, consequuntur nesciunt atque dolorum, voluptas aut quos delectus repellendus. Iusto eius, rem voluptates temporibus quae excepturi sint fugit ab sequi, perferendis ex. Illum perspiciatis rerum totam provident numquam laboriosam quod fugiat quae voluptas deleniti, nihil consectetur nostrum officia, ducimus quibusdam error esse placed accuracy in the telecommunications industry",
    date: "August , 4 , 2023",
    readTime: "4 min read",
    imageSrc: "/meta.svg",
    saveIconSrc: "save-2.svg",
    catagory: "headset",
    creator: "aso afan sadiq",
  },
  {
    id: "3",
    title: "Mobile Users and Shopping Behavior",
    description:
      "The parent company   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illo fugiat at velit nam, consequuntur nesciunt atque dolorum, voluptas aut quos delectus repellendus. Iusto eius, rem voluptates temporibus quae excepturi sint fugit ab sequi, perferendis ex. Illum perspiciatis rerum totam provident numquam laboriosam quod fugiat quae voluptas deleniti, nihil consectetur nostrum officia, ducimus quibusdam error esse placeat mollitia officiis cum ex sunt tenetur? Voluptate, impedit tempore. Magnam eligendi similique voluptatem, autem ab corporis beatae perferendis delectus ipsum blanditiis minima magni. Id tenetur, eos molestias a accusamus, maxime dignissimos ipsam culpa aliquam iure veritatis fuga. Fugit cum eveniet, id eum repellendus quam, ea maxime quos architecto sit cupiditate natus soluta itaque porro of Facebook, Meta Platforms, console.log('>>>>>>>>>>>',  ) is introducing software to help developers",
    date: "August , 6 , 2023",
    readTime: "4 min read",
    imageSrc: "/meta.svg",
    saveIconSrc: "save-2.svg",
    catagory: "headset",
    creator: "aso afan sadiq",
  },
  {
    id: "4",
    title: "The best gaming headsets",
    description:
      "The parent company   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illo fugiat at velit nam, consequuntur nesciunt atque dolorum, voluptas aut quos delectus repellendus. Iusto eius, rem voluptates temporibus quae excepturi sint fugit ab sequi, perferendis ex. Illum perspiciatis rerum totam provident numquam laboriosam quod fugiat quae voluptas deleniti, nihil consectetur nostrum officia, ducimus quibusdam error esse placeat mollitia officiis cum ex sunt tenetur? Voluptate, impedit tempore. Magnam eligendi similique voluptatem, autem ab corporis beatae perferendis delectus ipsum blanditiis minima magni. Id tenetur, eos molestias a accusamus, maxime dignissimos ipsam culpa aliquam iure veritatis fuga. Fugit cum eveniet, id eum repellendus quam, ea maxime quos architecto sit cupiditate natus soluta itaque porro of Facebook, Meta Platforms, console.log('>>>>>>>>>>>',  ) is introducing software to help developers",
    date: "August , 6 , 2023",
    readTime: "4 min read",
    imageSrc: "/meta.svg",
    saveIconSrc: "save-2.svg",
    catagory: "headset",
    creator: "aso afan sadiq",
  },
];
const comments: CommentProps[] = [
  {
    id: 1,

    imageSrc: "/blog1.png",
    author: "hemn software",
    date: "March 30, 2023",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, dignissimos quae? Magnam facere, tempora laborum eos quam reprehenderit delectus nihil? At repudiandae incidunt quod asperiores esse ea iste eaque non, itaque nam, animi cum recusandae delectus quia aperiam obcaecati rerum cupiditate, aliquam tenetur fugit. Ea doloremque soluta, ipsum autem atque sint commodi ut quos numquam cumque ab voluptate illo voluptatem, possimus minus voluptas nemo delectus. Necessitatibus placeat dolores eveniet laborum deserunt asperiores sint accusamus quaerat similique! Ipsa enim voluptates adipisci impedit porro quidem saepe reprehenderit quibusdam natus, deleniti nobis reiciendis eveniet facilis, corporis molestiae officiis sapiente laudantium laborum libero quo minus! Quos, dolor nam voluptatibus consequatur provident veritatis rerum quas dignissimos, harum praesentium aliquam aperiam neque itaque voluptas quis possimus!",
    showMore: false, // Toggle for showing more content
    likes: 12,
    dislikes: 12,
    isLike: {
      like: true, // User has liked this post
      disLike: false, // User has disliked this post
    },
  },
  {
    id: 2,
    imageSrc: "/blog1.png",
    author: "jane doe",
    date: "April 1, 2023",
    content:
      "Another example of a post with some content here. This post also has a lot of text to demonstrate how the 'show more' functionality works.",
    showMore: false,
    likes: 8,
    dislikes: 2,
    isLike: {
      like: false,
      disLike: true,
    },
  },
  // Add more objects as needed
];

const categories: Category[] = [
  { name: "mobile", icon: HiOutlineDevicePhoneMobile },

  { name: "tablet", icon: BsTabletLandscape },
  { name: "audio", icon: IoHeadsetOutline },
  { name: "smartwatch", icon: BsSmartwatch },
  { name: "camera", icon: BsCamera },
  { name: "gaming", icon: IoGameControllerOutline },
  { name: "network", icon: IoGitNetwork },
  { name: "accessories", icon: RiSettings3Line },
];

const Sort: { key: string; label: "new" | "priceB" | "priceA" }[] = [
  { key: "newest", label: "new" },
  { key: "Price: Low to High", label: "priceA" },
  { key: "Price: High to Low", label: "priceB" },
];

const filterItems: FilterProps[] = [
  { name: "brand", item: ["asus", "lenov", "mac", "widows"] },
  { name: "color", item: ["white", "silver", "gold", "black", "pinck"] },
];

const menuItems: propsMenuItem[] = [
  {
    name: "Personal Data",
    icon: FaUser,
    url: "/dashboard/PersonalData",
  },
  {
    name: "Category",
    icon: BiCategoryAlt,
    url: "/dashboard/category",
  },
  {
    name: "FAQ",
    icon: FaQuestionCircle,
    url: "/dashboard/faq",
  },
  {
    name: "Add Item",
    icon: MdAddCircleOutline,
    url: "/dashboard/AddItem",
  },
  {
    name: "Products",
    icon: MdShoppingBasket,
    url: "/dashboard/Products",
  },
  {
    name: "Popular Products",
    icon: FaShoppingCart,
    url: "/dashboard/popular",
  },
  {
    name: "User Orders",
    icon: MdOutlineShoppingCart,
    url: "/dashboard/UserOrder",
  },
  {
    name: "Blog",
    icon: FaUser,
    url: "/dashboard/Blog",
  },

  {
    name: "Contact Us",
    icon: FaEnvelope,
    url: "/dashboard/ContactUs",
  },
  {
    name: "Discounts",
    icon: FaGift,
    url: "/dashboard/discount",
  },
  {
    name: "About Us",
    icon: FaUsersLine,
    url: "/dashboard/aboutUs",
  },
  {
    name: "Home",
    icon: FaHome,
    url: "/",
  },
];

const colors: { name: string; color: string }[] = [
  { name: "Red", color: "#FF0000" },
  { name: "Green", color: "#00FF00" },
  { name: "Blue", color: "#0000FF" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Cyan", color: "#00FFFF" },
  { name: "Magenta", color: "#FF00FF" },
  { name: "Black", color: "#000000" },
  { name: "White", color: "#FFFFFF" },
  { name: "Orange", color: "#FFA500" },
  { name: "Purple", color: "#800080" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Brown", color: "#A52A2A" },
  { name: "Gray", color: "#808080" },
  { name: "Gold", color: "#FFD700" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Lime", color: "#00FF00" },
  { name: "Maroon", color: "#800000" },
  { name: "Salmon", color: "#FA8072" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Violet", color: "#EE82EE" },
  { name: "Beige", color: "#F5F5DC" },
];

export {
  newProdcuts,
  bestSellers,
  user,
  brand,
  servies,
  blogs,
  footer,
  carts,
  comments,
  categories,
  Sort,
  filterItems,
  menuItems,
  colors,
};
