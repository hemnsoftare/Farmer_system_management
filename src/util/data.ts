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
} from "../lib/action";
// Import all required icons from their respective libraries
import {
  FaUsers,
  FaShoppingBag,
  FaBox,
  FaBoxOpen,
  FaPercent,
  FaNewspaper,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdCategory, MdAddCircle, MdAccountBalance } from "react-icons/md";
import { BiSolidFactory } from "react-icons/bi";

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
import type { LocalizationResource } from "@clerk/types";
import {
  MdAddCircleOutline,
  MdOutlineShoppingCart,
  MdOutlineVerified,
  MdShoppingBasket,
} from "react-icons/md";
import { MenuItemProps, User } from "@nextui-org/react";
import { BiCategoryAlt, BiLogOut, BiSolidTimer } from "react-icons/bi";
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
  "/y/top1.png",
  "/y/top2.jpg",
  "/y/top3.png",
  "/y/top4.png",
  "/y/top5.svg",
] = ["/y/top1.png", "/y/top2.jpg", "/y/top3.png", "/y/top4.png", "/y/top5.svg"];

const user: userProps = {
  name: "yousif software",
  email: "yousifS14@gmail.com",
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
  // Primary navigation - most frequently used
  {
    name: "Home",
    icon: FaHome,
    url: "/dashboard/home",
  },
  {
    name: "Products",
    icon: FaShoppingBag,
    url: "/dashboard/Products",
  },
  {
    name: "User Orders",
    icon: MdOutlineShoppingCart,
    url: "/dashboard/UserOrder",
  },
  {
    name: "Popular Products",
    icon: FaShoppingCart,
    url: "/dashboard/popular",
  },
  {
    name: "Add Item",
    icon: MdAddCircle,
    url: "/dashboard/AddItem",
  },
  {
    name: "Category",
    icon: MdCategory,
    url: "/dashboard/category",
  },

  // Administrative section
  {
    name: "User",
    icon: FaUser,
    url: "/dashboard/user",
  },
  {
    name: "Personal Data",
    icon: FaUsers,
    url: "/dashboard/PersonalData",
  },
  {
    name: "Accounting",
    icon: MdAccountBalance,
    url: "/dashboard/Accounting",
  },
  {
    name: "Discounts",
    icon: FaPercent,
    url: "/dashboard/discount",
  },
  {
    name: "Manufacturer",
    icon: BiSolidFactory,
    url: "/dashboard/manufactori",
  },

  // Content management
  {
    name: "Blog",
    icon: FaNewspaper,
    url: "/dashboard/Blog",
  },
  {
    name: "FAQ",
    icon: FaQuestionCircle,
    url: "/dashboard/faq",
  },
  {
    name: "About Us",
    icon: FaInfoCircle,
    url: "/dashboard/aboutUs",
  },
  {
    name: "Contact Us",
    icon: FaEnvelope,
    url: "/dashboard/ContactUs",
  },

  // Always at the bottom
  {
    name: "Sign Out",
    icon: FaSignOutAlt,
    url: "/home",
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

export const kuSorani: any = {
  locale: "ku", // ✅ Ensure the locale property is included
  signUp: {
    start: {
      title: "دروستکردنی هەژمار",
      subtitle: "بۆ بەردەوامبوون بۆ {{applicationName}}",
      actionText: "هەژمارەکت هەیە؟",
      actionLink: "چوونەژوورەوە",
    },
    emailLink: {
      title: "پشتڕاستکردنەوەی ئیمەیڵ",
      subtitle: "بۆ بەردەوامبوون بۆ {{applicationName}}",
      formTitle: "لینکی پشتڕاستکردنەوە",
      formSubtitle: "لینکی پشتڕاستکردنەوەی نێردراو بە ئیمەیڵەکەت بەکارهێنە",
      resendButton: "لینک نەگەیشتووە؟ دووبارە بنێرە",
      verified: {
        title: "سەرکەوتووانە تۆمار بوو",
      },
      loading: {
        title: "تۆمار دەکرێت...",
      },
      verifiedSwitchTab: {
        title: "ئیمەیڵەکەت پشتڕاستکراوە",
        subtitle: "بگەڕێوە بۆ لاپەڕەی نوێکراوە بۆ بەردەوامبوون",
        subtitleNewTab: "بگەڕێوە بۆ لاپەڕەی پێشوەوە بۆ بەردەوامبوون",
      },
    },
    emailCode: {
      title: "پشتڕاستکردنەوەی ئیمەیڵ",
      subtitle: "بۆ بەردەوامبوون بۆ {{applicationName}}",
      formTitle: "کۆدی پشتڕاستکردنەوە",
      formSubtitle: "کۆدی نێردراو بە ئیمەیڵەکەت بنووسە",
      resendButton: "کۆدەکە نەگەیشتووە؟ دووبارە بنێرە",
    },
    phoneCode: {
      title: "پشتڕاستکردنەوەی ژمارەی مۆبایل",
      subtitle: "بۆ بەردەوامبوون بۆ {{applicationName}}",
      formTitle: "کۆدی پشتڕاستکردنەوە",
      formSubtitle: "کۆدی نێردراو بە ژمارەی مۆبایلەکەت بنووسە",
      resendButton: "کۆدەکە نەگەیشتووە؟ دووبارە بنێرە",
    },
    //y
    restrictedAccess: {
      actionLink: "yousif ",
      actionText: "yousif yousif text",
      blockButton__emailSupport: "hi hih ihihihi",
    },
    username: {
      title: "ناوی بەکارهێنەر",
      subtitle: "ناوی بەکارهێنەرەکەت داخل بکە",
    },
    password: {
      title: "وشەی نهێنی",
      subtitle: "وشەی نهێنییەک دیاری بکە",
    },
    continue: {
      title: "پڕکردنەوەی زانیاریەکانی بەجێماوە",
      subtitle: "بۆ بەردەوامبوون بۆ {{applicationName}}",
      actionText: "هەژمارەکت هەیە؟",
      actionLink: "چوونەژوورەوە",
    },
  },

  signIn: {
    start: {
      title: "چوونەژوورەوە",
      subtitle: "بۆ بەردەوامبوون بۆ {{applicationName}}",
      actionText: "هەژمارێک نییە؟",
      actionLink: "دروستکردنی هەژمار",
    },
    password: {
      title: "وشەی نهێنی",
      subtitle: "وشەی نهێنییەکەت بنووسە",
      // forgotPassword: "وشەی نهێنی یادت چووە؟",
    },
    username: {
      title: "ناوی بەکارهێنەر",
      subtitle: "ناوی بەکارهێنەرەکەت داخل بکە",
    },
    emailCode: {
      title: "پشتڕاستکردنەوەی ئیمەیڵ",
      subtitle: "کۆدی پشتڕاستکردنەوەی نێردراو بە ئیمەیڵەکەت داخل بکە",
      resendButton: "کۆدەکە نەگەیشتووە؟ دووبارە بنێرە",
    },
    phoneCode: {
      title: "پشتڕاستکردنەوەی ژمارەی مۆبایل",
      subtitle: "کۆدی پشتڕاستکردنەوەی نێردراو بە ژمارەی مۆبایلەکەت داخل بکە",
      resendButton: "کۆدەکە نەگەیشتووە؟ دووبارە بنێرە",
    },
  },
};
// localization/kurdishSorani.ts

// localization/kurdishSorani.ts

// export const kurdishSoraniLocalization: LocalizationResource = {
//   locale: "ckb", // Kurdish Sorani locale code
//   maintenanceMode: "دۆخی چاککردن",
//   roles: {
//     "org:teacher": "مامۆستا",
//     // Add other roles as needed
//   },
//   socialButtonsBlockButton: "بچۆ ژوورەوە لەگەڵ {{provider}}",
//   socialButtonsBlockButtonManyInView: "{{provider|titleize}}",
//   dividerText: "یان",
//   formFieldLabel__emailAddress: "ناونیشانی ئیمەیل",
//   formFieldLabel__emailAddresses: "ناونیشانی ئیمەیلەکان",
//   formFieldLabel__phoneNumber: "ژمارەی مۆبایل",
//   formFieldLabel__username: "ناوی بەکارهێنەر",
//   formFieldLabel__emailAddress_username: "ئیمەیل یان ناوی بەکارهێنەر",
//   formFieldLabel__password: "وشەی تێپەڕ",
//   formFieldLabel__currentPassword: "وشەی تێپەڕی ئێستا",
//   formFieldLabel__newPassword: "وشەی تێپەڕی نوێ",
//   formFieldLabel__confirmPassword: "دووبارەکردنەوەی وشەی تێپەڕ",
//   formFieldLabel__signOutOfOtherSessions: "دەرچوون لە هەموو ئامێرەکانی تر",
//   formFieldLabel__automaticInvitations: "بانگهێشتکردنی ئۆتۆماتیکی",
//   formFieldLabel__firstName: "ناوی یەکەم",
//   formFieldLabel__lastName: "ناوی کۆتایی",
//   formFieldLabel__backupCode: "کۆدی پشتیوانی",
//   formFieldLabel__organizationName: "ناوی ڕێکخراو",
//   formFieldLabel__organizationSlug: "سلەگی ڕێکخراو",
//   formFieldLabel__organizationDomain: "دۆمەینی ڕێکخراو",
//   formFieldLabel__organizationDomainEmailAddress:
//     "ناونیشانی ئیمەیلی دۆمەینی ڕێکخراو",
//   formFieldLabel__organizationDomainEmailAddressDescription:
//     "ئەم ئیمەیلە بۆ پەیوەندیکردن بە دۆمەینەوەیە",
//   formFieldLabel__organizationDomainDeletePending:
//     "سڕینەوەی دۆمەین چاوەڕوان دەکرێت",
//   formFieldLabel__confirmDeletion: "دڵنیابوونەوە لە سڕینەوە",
//   formFieldLabel__role: "ڕۆڵ",
//   formFieldLabel__passkeyName: "ناوی پاسکی",
//   formFieldInputPlaceholder__emailAddress: "ئیمەیلەکەت بنووسە",
//   formFieldInputPlaceholder__emailAddresses: "ئیمەیلەکان بنووسە",
//   formFieldInputPlaceholder__phoneNumber: "ژمارەی مۆبایل بنووسە",
//   formFieldInputPlaceholder__username: "ناوی بەکارهێنەر بنووسە",
//   formFieldInputPlaceholder__emailAddress_username:
//     "ئیمەیل یان ناوی بەکارهێنەر بنووسە",
//   formFieldInputPlaceholder__password: "وشەی تێپەڕ بنووسە",
//   formFieldInputPlaceholder__firstName: "ناوی یەکەم بنووسە",
//   formFieldInputPlaceholder__lastName: "ناوی کۆتایی بنووسە",
//   formFieldInputPlaceholder__backupCode: "کۆدی پشتیوانی بنووسە",
//   formFieldInputPlaceholder__organizationName: "ناوی ڕێکخراو بنووسە",
//   formFieldInputPlaceholder__organizationSlug: "سلەگی ڕێکخراو بنووسە",
//   formFieldInputPlaceholder__organizationDomain: "دۆمەینی ڕێکخراو بنووسە",
//   formFieldInputPlaceholder__organizationDomainEmailAddress:
//     "ناونیشانی ئیمەیلی دۆمەینی ڕێکخراو بنووسە",
//   formFieldInputPlaceholder__confirmDeletionUserAccount:
//     "دڵنیابوونەوە لە سڕینەوەی هەژمار",
//   formFieldError__notMatchingPasswords: "وشەی تێپەڕەکان جیاوازن",
//   formFieldError__matchingPasswords: "وشەی تێپەڕەکان هاوشێوەن",
//   formFieldError__verificationLinkExpired:
//     "بەستەری پشتڕاستکردنەوە کۆتایی هاتووە",
//   formFieldAction__forgotPassword: "وشەی تێپەڕەکەمت لەبیرکردووە؟",
//   formFieldHintText__optional: "دڵخوازە",
//   formFieldHintText__slug: "سلەگ ناونیشانێکی تایبەتییە بۆ ڕێکخراوەکەت",
//   formButtonPrimary: "بڕۆ",
//   formButtonPrimary__verify: "پشتڕاستکردنەوە",
//   signInEnterPasswordTitle: "وشەی تێپەڕەکەت بنووسە",
//   backButton: "گەڕانەوە",
//   footerActionLink__useAnotherMethod: "شێوازێکی تر بەکاربهێنە",
//   badge__primary: "سەرەکی",
//   badge__thisDevice: "ئەم ئامێرە",
//   badge__userDevice: "ئامێری بەکارهێنەر",
//   badge__otherImpersonatorDevice: "ئامێری دیکەی نیشاندەر",
//   badge__default: "بنەڕەتی",
//   badge__unverified: "پشتڕاستنەکراوە",
//   badge__requiresAction: "پێویستی بە کردارە",
//   badge__you: "تۆ",
//   footerPageLink__help: "یارمەتی",
//   footerPageLink__privacy: "تایبەتمەندی",
//   footerPageLink__terms: "مەرجەکان",
//   paginationButton__previous: "پێشوو",
//   paginationButton__next: "دواتر",
//   paginationRowText__displaying: "پیشاندان",
//   paginationRowText__of: "لە",
//   membershipRole__admin: "ئەدمین",
//   membershipRole__basicMember: "ئەندامی سەرەکی",
//   membershipRole__guestMember: "ئەندامی میوان",
//   signUp: {
//     start: {
//       title: "هەژمارێکی نوێ دروست بکە",
//       titleCombined: "هەژمارێکی نوێ دروست بکە",
//       subtitle: "بۆ دەستپێکردن، تکایە زانیارییەکانی خۆت بنووسە",
//       subtitleCombined: "بۆ دەستپێکردن، تکایە زانیارییەکانی خۆت بنووسە",
//       actionText: "هەژمارت هەیە؟",
//       actionLink: "چوونەژوورەوە",
//       actionLink__use_phone: "ژمارەی مۆبایل بەکاربهێنە",
//       actionLink__use_email: "ئیمەیل بەکاربهێنە",
//     },
//     emailLink: {
//       title: "پۆستی ئەلیکترۆنی بەکاربهێنە",
//       subtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       formTitle: "پۆستی ئەلیکترۆنی",
//       formSubtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       resendButton: "دووبارە ناردنەوە",
//       verified: {
//         title: "پشتڕاستکرایەوە",
//       },
//       loading: {
//         title: "چاوەڕوان بە...",
//       },
//       verifiedSwitchTab: {
//         title: "پشتڕاستکرایەوە",
//         subtitle: "بگەڕێوە بۆ بازدەری نوێ",
//         subtitleNewTab: "بگەڕێوە بۆ بازدەری ڕەسەن",
//       },
//       clientMismatch: {
//         title: "بازدەر جیاوازە",
//         subtitle: "بگەڕێوە بۆ بازدەری ڕەسەن",
//       },
//     },
//     emailCode: {
//       title: "پۆستی ئەلیکترۆنی بەکاربهێنە",
//       subtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       formTitle: "کۆدی پۆستی ئەلیکترۆنی",
//       formSubtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       resendButton: "دووبارە ناردنەوە",
//     },
//     phoneCode: {
//       title: "ژمارەی مۆبایل بەکاربهێنە",
//       subtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       formTitle: "کۆدی ژمارەی مۆبایل",
//       formSubtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       resendButton: "دووبارە ناردنەوە",
//     },
//     continue: {
//       title: "بەردەوام بە",
//       subtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       actionText: "هەژمارت هەیە؟",
//       actionLink: "چوونەژوورەوە",
//     },
//     restrictedAccess: {
//       title: "دەستپێگەیشتن سنووردارە",
//       subtitle: "تکایە چاوەڕوان بە",
//       subtitleWaitlist: "تکایە چاوەڕوان بە",
//       actionLink: "پەیوەندی بکە",
//       actionText: "پەیوەندی بکە",
//       blockButton__emailSupport: "پەیوەندی بکە بە پۆستی ئەلیکترۆنی",
//       blockButton__joinWaitlist: "بەشداری لە لیستی چاوەڕوانی بکە",
//     },
//     legalConsent: {
//       continue: {
//         title: "بەردەوام بە",
//         subtitle: "بۆ تۆمارکردنی هەژمارێکی نوێ",
//       },
//       checkbox: {
//         label__termsOfServiceAndPrivacyPolicy:
//           "من قبوڵ دەکەم مەرجەکان و سیاسەتی تایبەتمەندی",
//         label__onlyPrivacyPolicy: "من قبوڵ دەکەم سیاسەتی تایبەتمەندی",
//         label__onlyTermsOfService: "من قبوڵ دەکەم مەرجەکان",
//       },
//     },
//   },
//   signIn: {
//     start: {
//       title: "چوونەژوورەوە",
//       subtitle: "بخەوە بۆ هەژمارەکەت",
//       actionText: "هەژمارت نییە؟",
//       actionLink: "تۆمارکردن",
//     },
//     emailCode: {
//       title: "چوونەژوورەوە لە ڕێگەی ئیمەیلەوە",
//       subtitle: "کۆدی پشتڕاستکردنەوەی نێردراو بنووسە",
//       formTitle: "کۆدی پشتڕاستکردنەوە",
//       formSubtitle: "کۆد لە ڕێگەی ئیمەیلەوە نێردراوە",
//       resendButton: "دووبارە بنێرە",
//     },
//     phoneCode: {
//       title: "چوونەژوورەوە لە ڕێگەی مۆبایلەوە",
//       subtitle: "کۆدی پشتڕاستکردنەوەی نێردراو بنووسە",
//       formTitle: "کۆدی پشتڕاستکردنەوە",
//       resendButton: "دووبارە بنێرە",
//     },
//     emailLink: {
//       title: "چوونەژوورەوە لە ڕێگەی بەستەری ئیمەیلەوە",
//       subtitle: "بەستەرێک لە ئیمەیلت بۆ نێردراوە، تکایە پشکنین بکە",
//       formTitle: "ناونیشانی ئیمەیل",
//       resendButton: "دووبارە بنێرە",
//     },
//     password: {
//       title: "چوونەژوورەوە بە وشەی تێپەڕ",
//       subtitle: "وشەی تێپەڕەکەت بنووسە",
//       actionLink: "وشەی تێپەڕم لەبیرکردووە",
//     },
//     forgotPasswordAlternative: {
//       title: "وشەی تێپەڕم لەبیرکردووە",
//       subtitle: "کۆدی پشتڕاستکردنەوە لە ڕێگەی ئیمەیل یان مۆبایلەوە وەرگرە",
//       formTitle: "ناونیشانی ئیمەیل یان ژمارەی مۆبایل",
//       formSubtitle: "ئیمەیل یان مۆبایلەکەت بنووسە",
//       actionText: "هەژمارت نییە؟",
//       actionLink: "تۆمارکردن",
//     },
//     alternativeMethods: {
//       title: "شێوازێکی تر بەکاربهێنە",
//       subtitle: "شێوازێکی تر هەڵبژێرە بۆ چوونەژوورەوە",
//       actionText: "پێویست بە یارمەتی هەیە؟",
//       actionLink: "پەیوەندیکردن بە پشتیوانی",
//     },
//     socialButtonsBlockButton: "چوونەژوورەوە لەگەڵ {{provider}}",
//     dividerText: "یان",
//     footerActionLink__useAnotherMethod: "شێوازێکی تر بەکاربهێنە",
//   },
//   userProfile: {
//     mobileButton__menu: "مەنوو",
//     formButtonPrimary: "پاشەکەوتکردن",
//     formButtonReset: "هەڵوەشاندنەوە",
//     formButtonSecondary: "پاشگەزبونەوە",
//     formButtonDelete: "سڕینەوە",
//     badge__primary: "سەرەکی",
//     badge__default: "بنەڕەتی",
//     badge__unverified: "پشتڕاستنەکراوە",
//     badge__requiresAction: "پێویستی بە کردارە",
//     badge__you: "تۆ",

//     start: {
//       headerTitle: "هەژمارەکەت بەڕێوەببەرە",
//       headerSubtitle: "زانیارییە تایبەتییەکانت تازە بکەرەوە",
//       section__profile: {
//         title: "زانیاری کەسی",
//         primaryButton: "زانیارییەکان تازە بکەرەوە",
//         successMessage: "زانیارییەکان نوێکرایەوە",
//       },
//       section__emailAddresses: {
//         title: "ئیمەیلەکان",
//         primaryButton: "ئیمەیل زیاد بکە",
//         detailsTitle__primary: "ئیمەیل سەرەکی",
//         detailsTitle__backup: "ئیمەیل پشتیوانی",
//         detailsTitle__unverified: "پشتڕاستنەکراوە",
//         detailsTitle__emailAddress: "ئیمەیل",
//       },
//       section__phoneNumbers: {
//         title: "ژمارە مۆبایل",
//         primaryButton: "ژمارە مۆبایل زیاد بکە",
//         detailsTitle__primary: "ژمارەی مۆبایلی سەرەکی",
//         detailsTitle__backup: "ژمارەی مۆبایلی پشتیوانی",
//         detailsTitle__unverified: "پشتڕاستنەکراوە",
//         detailsTitle__phoneNumber: "ژمارە مۆبایل",
//       },
//       section__connectedAccounts: {
//         title: "هەژمارە پەیوەندیدارەکان",
//         primaryButton: "پەیوەندی زیاد بکە",
//         message: "لەگەڵ ئەم خزمەتگوزارییانەوە پەیوەندیت هەیە",
//       },
//       section__security: {
//         title: "پاراستن و سەرچاوەکان",
//         primaryButton: "پێوەندییەکانی پاراستن تازە بکەرەوە",
//       },
//       section__sessions: {
//         title: "کۆتایی هاتنەژوورەوەکان",
//         primaryButton: "کۆتایی هاتن زیاد بکە",
//         successMessage: "کۆتایی هاتن نوێکرایەوە",
//       },
//       section__danger: {
//         title: "مەترسی",
//         deleteAccount: {
//           title: "سڕینەوەی هەژمار",
//           subtitle: "هەژمارەکەت بە تەواوی سڕدرێتەوە",
//           dangerButton: "هەژمار بسڕەوە",
//           successMessage: "هەژمارەکەت سڕدرایەوە",
//         },
//       },
//     },
//     deletePage: {
//       title: "هەژمار بسڕەوە",
//       messageLine1: "ئایا تۆ دڵنیایت لە سڕینەوەی هەژمارەکەت؟",
//       messageLine2: "ئەم کردارە گەڕانەوەی نییە.",
//       confirmText: "دڵنیام",
//       successMessage: "هەژمارەکەت سڕدرایەوە.",
//     },
//   },
// };
// localization/kurdishSorani.ts

export const kurdishSoraniLocalization: LocalizationResource = {
  locale: "ckb", // Kurdish Sorani locale code
  maintenanceMode: "دۆخی چاککردن",
  roles: {
    "org:teacher": "مامۆستا",
    // Add other roles as needed
  },
  socialButtonsBlockButton: "بچۆ ژوورەوە لەگەڵ {{provider}}",
  dividerText: "یان",
  formFieldLabel__emailAddress: "ناونیشانی ئیمەیل",
  formFieldLabel__password: "وشەی تێپەڕ",
  formFieldLabel__username: "ناوی بەکارهێنەر",
  formFieldLabel__firstName: "ناوی یەکەم",
  formFieldLabel__lastName: "ناوی کۆتایی",
  formFieldLabel__organizationName: "ناوی ڕێکخراو",
  formFieldLabel__organizationSlug: "سلەگی ڕێکخراو",
  formFieldLabel__organizationDomain: "دۆمەینی ڕێکخراو",
  formFieldLabel__organizationDomainEmailAddress:
    "ناونیشانی ئیمەیلی دۆمەینی ڕێکخراو",
  formFieldLabel__confirmDeletion: "دڵنیابوونەوە لە سڕینەوە",
  formFieldLabel__role: "ڕۆڵ",
  formFieldLabel__passkeyName: "ناوی پاسکی",
  formFieldInputPlaceholder__emailAddress: "ئیمەیلەکەت بنووسە",
  formFieldInputPlaceholder__password: "وشەی تێپەڕ بنووسە",
  formFieldInputPlaceholder__username: "ناوی بەکارهێنەر بنووسە",
  formFieldInputPlaceholder__firstName: "ناوی یەکەم بنووسە",
  formFieldInputPlaceholder__lastName: "ناوی کۆتایی بنووسە",
  formFieldInputPlaceholder__organizationName: "ناوی ڕێکخراو بنووسە",
  formFieldInputPlaceholder__organizationSlug: "سلەگی ڕێکخراو بنووسە",
  formFieldInputPlaceholder__organizationDomain: "دۆمەینی ڕێکخراو بنووسە",
  formFieldInputPlaceholder__organizationDomainEmailAddress:
    "ناونیشانی ئیمەیلی دۆمەینی ڕێکخراو بنووسە",
  formFieldError__notMatchingPasswords: "وشەی تێپەڕەکان جیاوازن",
  formFieldError__matchingPasswords: "وشەی تێپەڕەکان هاوشێوەن",
  formFieldError__verificationLinkExpired:
    "بەستەری پشتڕاستکردنەوە کۆتایی هاتووە",
  formFieldAction__forgotPassword: "وشەی تێپەڕەکەمت لەبیرکردووە؟",
  formFieldHintText__optional: "دڵخوازە",
  formFieldHintText__slug: "سلەگ ناونیشانێکی تایبەتییە بۆ ڕێکخراوەکەت",
  formButtonPrimary: "بڕۆ",
  formButtonPrimary__verify: "پشتڕاستکردنەوە",
  signInEnterPasswordTitle: "وشەی تێپەڕەکەت بنووسە",
  backButton: "گەڕانەوە",
  footerActionLink__useAnotherMethod: "شێوازێکی تر بەکاربهێنە",
  badge__primary: "سەرەکی",
  badge__thisDevice: "ئەم ئامێرە",
  badge__userDevice: "ئامێری بەکارهێنەر",
  badge__otherImpersonatorDevice: "ئامێری دیکەی نیشاندەر",
  badge__default: "بنەڕەتی",
  badge__unverified: "پشتڕاستنەکراوە",
  badge__requiresAction: "پێویستی بە کردارە",
  badge__you: "تۆ",
  footerPageLink__help: "یارمەتی",
  footerPageLink__privacy: "تایبەتمەندی",
  footerPageLink__terms: "مەرجەکان",
  paginationButton__previous: "پێشوو",
  paginationButton__next: "دواتر",
  paginationRowText__displaying: "پیشاندان",
  paginationRowText__of: "لە",
  membershipRole__admin: "ئەدمین",
  membershipRole__basicMember: "ئەندامی سەرەکی",
  membershipRole__guestMember: "ئەندامی میوان",
  signUp: {
    start: {
      title: "هەژمارێکی نوێ دروست بکە",
      // titleCombined: "هەژمارێکی نوێ دروست بکە",
      subtitle: "بۆ دەستپێکردن، تکایە زانیارییەکانی خۆت بنووسە",
      // subtitleCombined: "بۆ دەستپێکردن، تکایە زانیارییەکانی خۆت بنووسە",
      actionText: "هەژمارت هەیە؟",
      actionLink: "چوونەژوورەوە",
      actionLink__use_phone: "ژمارەی مۆبایل بەکاربهێنە",
      actionLink__use_email: "ئیمەیل بەکاربهێنە",
    },
    // Add translations for other sections...
  },
  signIn: {
    start: {
      title: "چوونەژوورەوە",
      // titleCombined: "چوونەژوورەوە",
      subtitle: "بۆ دەستپێکردن، تکایە زانیارییەکانی خۆت بنووسە",
      // subtitleCombined: "بۆ دەستپێکردن، تکایە زانیارییەکانی خۆت بنووسە",
      actionText: "هەژمارت نییە؟",
      actionLink: "هەژمارێکی نوێ دروست بکە",
      actionLink__use_email: "ئیمەیل بەکاربهێنە",
      actionLink__use_phone: "ژمارەی مۆبایل بەکاربهێنە",
      actionLink__use_username: "ناوی بەکارهێنەر بەکاربهێنە",
      actionLink__use_email_username: "ئیمەیل یان ناوی بەکارهێنەر بەکاربهێنە",
      actionLink__use_passkey: "پاسکی بەکاربهێنە",
    },
    // Add translations for other sections...
  },
  userProfile: {
    mobileButton__menu: "مێنوو",
    formButtonPrimary__continue: "بڕۆ",
    formButtonPrimary__save: "پاشەکەوت بکە",
    formButtonPrimary__finish: "تەواو بکە",
    formButtonPrimary__remove: "سڕینەوە",
    formButtonPrimary__add: "زیاد بکە",
    formButtonReset: "هەڵوەشاندنەوە",
    navbar: {
      title: "پڕۆفایل",
      description: "بەڕێوەبردنی زانیارییەکانی هەژمارەکەت",
      account: "هەژمار",
      security: "ئاسایش",
    },
    start: {
      headerTitle__account: "هەژمار",
      headerTitle__security: "ئاسایش",
      profileSection: {
        title: "پڕۆفایل",
        primaryButton: "نوێکردنەوەی پڕۆفایل",
      },
      usernameSection: {
        title: "ناوی بەکارهێنەر",
        primaryButton__updateUsername: "نوێکردنەوەی ناوی بەکارهێنەر",
        primaryButton__setUsername: "دانانی ناوی بەکارهێنەر",
      },
      emailAddressesSection: {
        title: "ناونیشانی ئیمەیل",
        primaryButton: "زیادکردنی ناونیشانی ئیمەیل",
        detailsAction__primary: "سەرەکی",
        detailsAction__nonPrimary: "ناسەرەکی",
        detailsAction__unverified: "پشتڕاستنەکراوە",
        destructiveAction: "سڕینەوە",
      },
      phoneNumbersSection: {
        title: "ژمارەی مۆبایل",
        primaryButton: "زیادکردنی ژمارەی مۆبایل",
        detailsAction__primary: "سەرەکی",
        detailsAction__nonPrimary: "ناسەرەکی",
        detailsAction__unverified: "پشتڕاستنەکراوە",
        destructiveAction: "سڕینەوە",
      },
      connectedAccountsSection: {
        title: "هەژمارە پەیوەندیدارەکان",
        primaryButton: "زیادکردنی هەژمارە پەیوەندیدارەکان",
        actionLabel__connectionFailed: "پەیوەندی شکستی هێنا",
        subtitle__disconnected: "پەیوەندی پچڕاوە",
        destructiveActionTitle: "سڕینەوە",
      },
      passwordSection: {
        title: "وشەی تێپەڕ",
        primaryButton__updatePassword: "نوێکردنەوەی وشەی تێپەڕ",
        primaryButton__setPassword: "دانانی وشەی تێپەڕ",
      },
      passkeysSection: {
        title: "پاسکی",
        menuAction__rename: "گۆڕینی ناو",
        menuAction__destructive: "سڕینەوە",
      },
      mfaSection: {
        title: "دوو هەنگاوە",
        primaryButton: "زیادکردنی دوو هەنگاوە",
        phoneCode: {
          destructiveActionLabel: "سڕینەوە",
          actionLabel__setDefault: "دانانی وەک پێشگریمان",
        },
        backupCodes: {
          headerTitle: "کۆدی پشتیوانی",
          title__regenerate: "دووبارە دروستکردنەوەی کۆدی پشتیوانی",
          subtitle__regenerate: "دووبارە دروستکردنەوەی کۆدی پشتیوانی",
          actionLabel__regenerate: "دووبارە دروستکردنەوە",
        },
        totp: {
          headerTitle: "کۆدی دوو هەنگاوە",
          destructiveActionTitle: "سڕینەوە",
        },
      },
      activeDevicesSection: {
        title: "ئامێرە چالاکەکان",
        destructiveAction: "سڕینەوە",
      },
      web3WalletsSection: {
        title: "جەڵتەی وێب ٣",
        primaryButton: "زیادکردنی جەڵتەی وێب ٣",
        destructiveAction: "سڕینەوە",
      },
      dangerSection: {
        title: "مەترسی",
        deleteAccountButton: "سڕینەوەی هەژمار",
      },
    },
    profilePage: {
      title: "پڕۆفایل",
      imageFormTitle: "وێنەی پڕۆفایل",
      imageFormSubtitle: "وێنەی پڕۆفایل بار بکە",
      imageFormDestructiveActionSubtitle: "سڕینەوەی وێنەی پڕۆفایل",
      fileDropAreaHint: "وێنەی پڕۆفایل بار بکە",
      readonly: "تەنیا خوێندنەوە",
      successMessage: "پڕۆفایلەکەت بە سەرکەوتوویی نوێکرایەوە",
    },
    usernamePage: {
      successMessage: "ناوی بەکارهێنەرەکەت بە سەرکەوتوویی نوێکرایەوە",
      title__set: "دانانی ناوی بەکارهێنەر",
      title__update: "نوێکردنەوەی ناوی بەکارهێنەر",
    },
    emailAddressPage: {
      title: "ناونیشانی ئیمەیل",
      verifyTitle: "پشتڕاستکردنەوەی ناونیشانی ئیمەیل",
      // formHint: "ناونیشانی ئیمەیل بنووسە",
      emailCode: {
        formTitle: "کۆدی پۆستی ئەلیکترۆنی",
        formSubtitle: "کۆدی ناردنەوەی ناونیشانی ئیمەیل",
        resendButton: "دووبارە ناردنەوە",
        successMessage: "ناونیشانی ئیمەیلەکەت بە سەرکەوتوویی پشتڕاستکرایەوە",
      },
      emailLink: {
        formTitle: "بەستەری پۆستی ئەلیکترۆنی",
        formSubtitle: "بەستەری ناردنەوەی ناونیشانی ئیمەیل",
        resendButton: "دووبارە ناردنەوە",
        successMessage: "ناونیشانی ئیمەیلەکەت بە سەرکەوتوویی پشتڕاستکرایەوە",
      },
      // enterpriseSSOLink: {
      //   formSubtitle: "بەستەری ناردنەوەی ناونیشانی ئیمەیل",
      //   formButton: "پەیوەندی بکە",
      // },
      removeResource: {
        title: "سڕینەوەی ناونیشانی ئیمەیل",
        messageLine1: "دڵنیای لە سڕینەوەی ناونیشانی ئیمەیل؟",
        messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
        successMessage: "ناونیشانی ئیمەیلەکەت بە سەرکەوتوویی سڕایەوە",
      },
    },
    passkeyScreen: {
      title__rename: "گۆڕینی ناوی پاسکی",
      subtitle__rename: "گۆڕینی ناوی پاسکی",
      removeResource: {
        title: "سڕینەوەی پاسکی",
        messageLine1: "دڵنیای لە سڕینەوەی پاسکی؟",
      },
    },
    phoneNumberPage: {
      title: "ژمارەی مۆبایل",
      verifyTitle: "پشتڕاستکردنەوەی ژمارەی مۆبایل",
      verifySubtitle: "ژمارەی مۆبایل بنووسە",
      successMessage: "ژمارەی مۆبایلەکەت بە سەرکەوتوویی پشتڕاستکرایەوە",
      infoText: "ژمارەی مۆبایل بنووسە",
      removeResource: {
        title: "سڕینەوەی ژمارەی مۆبایل",
        messageLine1: "دڵنیای لە سڕینەوەی ژمارەی مۆبایل؟",
        messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
        successMessage: "ژمارەی مۆبایلەکەت بە سەرکەوتوویی سڕایەوە",
      },
    },
    connectedAccountPage: {
      title: "هەژمارە پەیوەندیدارەکان",
      formHint: "هەژمارە پەیوەندیدارەکان زیاد بکە",
      formHint__noAccounts: "هیچ هەژمارێکی پەیوەندیدار نییە",
      socialButtonsBlockButton: "پەیوەندی بکە بە {{provider}}",
      successMessage: "هەژمارە پەیوەندیدارەکەت بە سەرکەوتوویی زیادکرا",
      removeResource: {
        title: "سڕینەوەی هەژمارە پەیوەندیدارەکان",
        messageLine1: "دڵنیای لە سڕینەوەی هەژمارە پەیوەندیدارەکان؟",
        messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
        successMessage: "هەژمارە پەیوەندیدارەکەت بە سەرکەوتوویی سڕایەوە",
      },
    },
    web3WalletPage: {
      title: "جەڵتەی وێب ٣",
      subtitle__availableWallets: "جەڵتەی وێب ٣ زیاد بکە",
      subtitle__unavailableWallets: "هیچ جەڵتەیەکی وێب ٣ بەردەست نییە",
      web3WalletButtonsBlockButton: "جەڵتەی وێب ٣ زیاد بکە",
      successMessage: "جەڵتەی وێب ٣ەکەت بە سەرکەوتوویی زیادکرا",
      removeResource: {
        title: "سڕینەوەی جەڵتەی وێب ٣",
        messageLine1: "دڵنیای لە سڕینەوەی جەڵتەی وێب ٣؟",
        messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
        successMessage: "جەڵتەی وێب ٣ەکەت بە سەرکەوتوویی سڕایەوە",
      },
    },
    passwordPage: {
      successMessage__set: "وشەی تێپەڕەکەت بە سەرکەوتوویی دانرا",
      successMessage__update: "وشەی تێپەڕەکەت بە سەرکەوتوویی نوێکرایەوە",
      successMessage__signOutOfOtherSessions: "دەرچوون لە هەموو ئامێرەکانی تر",
      checkboxInfoText__signOutOfOtherSessions:
        "دەرچوون لە هەموو ئامێرەکانی تر",
      readonly: "تەنیا خوێندنەوە",
      title__set: "دانانی وشەی تێپەڕ",
      title__update: "نوێکردنەوەی وشەی تێپەڕ",
    },
    mfaPage: {
      title: "دوو هەنگاوە",
      formHint: "دوو هەنگاوە زیاد بکە",
    },
    mfaTOTPPage: {
      title: "کۆدی دوو هەنگاوە",
      verifyTitle: "پشتڕاستکردنەوەی کۆدی دوو هەنگاوە",
      verifySubtitle: "کۆدی دوو هەنگاوە بنووسە",
      successMessage: "کۆدی دوو هەنگاوەکەت بە سەرکەوتوویی پشتڕاستکرایەوە",
      authenticatorApp: {
        infoText__ableToScan: "دەتوانیت کۆدەکە بخوێنیتەوە",
        infoText__unableToScan: "ناتوانیت کۆدەکە بخوێنیتەوە",
        inputLabel__unableToScan1: "کۆدەکە بنووسە",
        inputLabel__unableToScan2: "کۆدەکە بنووسە",
        buttonAbleToScan__nonPrimary: "دەتوانیت کۆدەکە بخوێنیتەوە",
        buttonUnableToScan__nonPrimary: "ناتوانیت کۆدەکە بخوێنیتەوە",
      },
      removeResource: {
        title: "سڕینەوەی کۆدی دوو هەنگاوە",
        messageLine1: "دڵنیای لە سڕینەوەی کۆدی دوو هەنگاوە؟",
        messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
        successMessage: "کۆدی دوو هەنگاوەکەت بە سەرکەوتوویی سڕایەوە",
      },
    },
    mfaPhoneCodePage: {
      title: "کۆدی ژمارەی مۆبایل",
      primaryButton__addPhoneNumber: "ژمارەی مۆبایل زیاد بکە",
      backButton: "گەڕانەوە",
      subtitle__availablePhoneNumbers: "ژمارەی مۆبایل زیاد بکە",
      subtitle__unavailablePhoneNumbers: "هیچ ژمارەیەکی مۆبایل بەردەست نییە",
      successTitle: "کۆدی ژمارەی مۆبایلەکەت بە سەرکەوتوویی پشتڕاستکرایەوە",
      successMessage1: "کۆدی ژمارەی مۆبایلەکەت بە سەرکەوتوویی پشتڕاستکرایەوە",
      successMessage2: "دەتوانیت دووبارە زیاد بکەیتەوە",
      removeResource: {
        title: "سڕینەوەی کۆدی ژمارەی مۆبایل",
        messageLine1: "دڵنیای لە سڕینەوەی کۆدی ژمارەی مۆبایل؟",
        messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
        successMessage: "کۆدی ژمارەی مۆبایلەکەت بە سەرکەوتوویی سڕایەوە",
      },
    },
    backupCodePage: {
      title: "کۆدی پشتیوانی",
      title__codelist: "کۆدی پشتیوانی",
      subtitle__codelist: "کۆدی پشتیوانی زیاد بکە",
      infoText1: "کۆدی پشتیوانی زیاد بکە",
      infoText2: "دەتوانیت دووبارە زیاد بکەیتەوە",
      successSubtitle: "کۆدی پشتیوانی زیادکرا",
      successMessage: "کۆدی پشتیوانیەکەت بە سەرکەوتوویی زیادکرا",
      actionLabel__copy: "کۆپی بکە",
      actionLabel__copied: "کۆپی کراوە",
      actionLabel__download: "داگرتن",
      actionLabel__print: "چاپکردن",
    },
    deletePage: {
      title: "سڕینەوەی هەژمار",
      messageLine1: "دڵنیای لە سڕینەوەی هەژمارەکەت؟",
      messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
      actionDescription: "دڵنیابوونەوە لە سڕینەوە",
      confirm: "سڕینەوە",
    },
  },
  userButton: {
    action__manageAccount: "بەڕێوەبردنی هەژمار",
    action__signOut: "دەرچوون",
    action__signOutAll: "دەرچوون لە هەموو ئامێرەکان",
    action__addAccount: "زیادکردنی هەژمار",
  },
  organizationSwitcher: {
    personalWorkspace: "کارگەی کەسی",
    notSelected: "هیچ هەڵبژاردنێک نەکراوە",
    action__createOrganization: "دروستکردنی ڕێکخراو",
    action__manageOrganization: "بەڕێوەبردنی ڕێکخراو",
    action__invitationAccept: "قبوڵکردنی بانگهێشت",
    action__suggestionsAccept: "قبوڵکردنی پێشنیارەکان",
    suggestionsAcceptedLabel: "پێشنیارەکان قبوڵکران",
  },
  impersonationFab: {
    title: "نیشاندەر",
    action__signOut: "دەرچوون",
  },
  organizationProfile: {
    navbar: {
      title: "ڕێکخراو",
      description: "بەڕێوەبردنی زانیارییەکانی ڕێکخراوەکەت",
      general: "گشتی",
      members: "ئەندامان",
    },
    badge__unverified: "پشتڕاستنەکراوە",
    badge__automaticInvitation: "بانگهێشتکردنی ئۆتۆماتیکی",
    badge__automaticSuggestion: "پێشنیاری ئۆتۆماتیکی",
    badge__manualInvitation: "بانگهێشتکردنی دەستی",
    start: {
      headerTitle__members: "ئەندامان",
      headerTitle__general: "گشتی",
      profileSection: {
        title: "پڕۆفایل",
        primaryButton: "نوێکردنەوەی پڕۆفایل",
        uploadAction__title: "بارکردنی وێنەی پڕۆفایل",
      },
    },
    profilePage: {
      title: "پڕۆفایل",
      successMessage: "پڕۆفایلەکەت بە سەرکەوتوویی نوێکرایەوە",
      dangerSection: {
        title: "مەترسی",
        leaveOrganization: {
          title: "دەرچوون لە ڕێکخراو",
          messageLine1: "دڵنیای لە دەرچوون لە ڕێکخراو؟",
          messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
          successMessage: "دەرچوون لە ڕێکخراو بە سەرکەوتوویی",
          actionDescription: "دڵنیابوونەوە لە دەرچوون",
        },
        deleteOrganization: {
          title: "سڕینەوەی ڕێکخراو",
          messageLine1: "دڵنیای لە سڕینەوەی ڕێکخراو؟",
          messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
          actionDescription: "دڵنیابوونەوە لە سڕینەوە",
          successMessage: "ڕێکخراوەکەت بە سەرکەوتوویی سڕایەوە",
        },
      },
      domainSection: {
        title: "دۆمەین",
        subtitle: "بەڕێوەبردنی دۆمەینەکان",
        primaryButton: "زیادکردنی دۆمەین",
        menuAction__verify: "پشتڕاستکردنەوە",
        menuAction__remove: "سڕینەوە",
        menuAction__manage: "بەڕێوەبردن",
      },
    },
    createDomainPage: {
      title: "دروستکردنی دۆمەین",
      subtitle: "دروستکردنی دۆمەینی نوێ",
    },
    verifyDomainPage: {
      title: "پشتڕاستکردنەوەی دۆمەین",
      subtitle: "پشتڕاستکردنەوەی دۆمەین",
      subtitleVerificationCodeScreen: "کۆدی پشتڕاستکردنەوە بنووسە",
      formTitle: "کۆدی پشتڕاستکردنەوە",
      formSubtitle: "کۆدی پشتڕاستکردنەوە بنووسە",
      resendButton: "دووبارە ناردنەوە",
    },
    verifiedDomainPage: {
      title: "دۆمەینی پشتڕاستکراو",
      subtitle: "دۆمەینی پشتڕاستکراو",
      start: {
        headerTitle__enrollment: "تۆمارکردن",
        headerTitle__danger: "مەترسی",
      },
      enrollmentTab: {
        subtitle: "تۆمارکردنی ئەندامان",
        manualInvitationOption__label: "بانگهێشتکردنی دەستی",
        manualInvitationOption__description: "بانگهێشتکردنی دەستی بۆ ئەندامان",
        automaticInvitationOption__label: "بانگهێشتکردنی ئۆتۆماتیکی",
        automaticInvitationOption__description:
          "بانگهێشتکردنی ئۆتۆماتیکی بۆ ئەندامان",
        automaticSuggestionOption__label: "پێشنیاری ئۆتۆماتیکی",
        automaticSuggestionOption__description:
          "پێشنیاری ئۆتۆماتیکی بۆ ئەندامان",
        calloutInfoLabel: "زانیاری",
        calloutInvitationCountLabel: "ژمارەی بانگهێشتەکان",
        calloutSuggestionCountLabel: "ژمارەی پێشنیارەکان",
      },
      dangerTab: {
        removeDomainTitle: "سڕینەوەی دۆمەین",
        removeDomainSubtitle: "سڕینەوەی دۆمەین",
        removeDomainActionLabel__remove: "سڕینەوە",
        calloutInfoLabel: "زانیاری",
      },
    },
    invitePage: {
      title: "بانگهێشتکردن",
      subtitle: "بانگهێشتکردنی ئەندامان",
      successMessage: "بانگهێشتەکەت بە سەرکەوتوویی نێردرا",
      detailsTitle__inviteFailed: "بانگهێشتکردن شکستی هێنا",
      formButtonPrimary__continue: "بەردەوام بە",
      selectDropdown__role: "ڕۆڵ",
    },
    removeDomainPage: {
      title: "سڕینەوەی دۆمەین",
      messageLine1: "دڵنیای لە سڕینەوەی دۆمەین؟",
      messageLine2: "دەتوانیت دووبارە زیاد بکەیتەوە",
      successMessage: "دۆمەینەکەت بە سەرکەوتوویی سڕایەوە",
    },
    membersPage: {
      detailsTitle__emptyRow: "هیچ ئەندامێک نییە",
      action__invite: "بانگهێشتکردن",
      // action__search: "گەڕان",
      start: {
        headerTitle__members: "ئەندامان",
        headerTitle__invitations: "بانگهێشتەکان",
        headerTitle__requests: "داواکاریەکان",
      },
      activeMembersTab: {
        tableHeader__user: "بەکارهێنەر",
        tableHeader__joined: "بەشداری کرد",
        tableHeader__role: "ڕۆڵ",
        tableHeader__actions: "کردارەکان",
        menuAction__remove: "سڕینەوە",
      },
      invitedMembersTab: {
        tableHeader__invited: "بانگهێشتکراو",
        menuAction__revoke: "هەڵوەشاندنەوە",
      },
      invitationsTab: {
        table__emptyRow: "هیچ بانگهێشتێک نییە",
        autoInvitations: {
          headerTitle: "بانگهێشتە ئۆتۆماتیکیەکان",
          headerSubtitle: "بانگهێشتە ئۆتۆماتیکیەکان",
          primaryButton: "بانگهێشتکردن",
        },
      },
      requestsTab: {
        tableHeader__requested: "داواکراو",
        menuAction__approve: "پەسەندکردن",
        menuAction__reject: "ڕەتکردنەوە",
        table__emptyRow: "هیچ داواکاریێک نییە",
        autoSuggestions: {
          headerTitle: "پێشنیارە ئۆتۆماتیکیەکان",
          headerSubtitle: "پێشنیارە ئۆتۆماتیکیەکان",
          primaryButton: "پێشنیارکردن",
        },
      },
    },
  },
  createOrganization: {
    title: "دروستکردنی ڕێکخراو",
    formButtonSubmit: "دروستکردن",
    invitePage: {
      formButtonReset: "هەڵوەشاندنەوە",
    },
  },
  organizationList: {
    createOrganization: "دروستکردنی ڕێکخراو",
    title: "ڕێکخراوەکان",
    titleWithoutPersonal: "ڕێکخراوەکان",
    subtitle: "بەڕێوەبردنی ڕێکخراوەکان",
    action__invitationAccept: "قبوڵکردنی بانگهێشت",
    invitationAcceptedLabel: "بانگهێشتەکان قبوڵکران",
    action__suggestionsAccept: "قبوڵکردنی پێشنیارەکان",
    suggestionsAcceptedLabel: "پێشنیارەکان قبوڵکران",
    action__createOrganization: "دروستکردنی ڕێکخراو",
  },
  unstable__errors: {
    // Add error messages as needed
  },
  dates: {
    previous6Days: "٦ ڕۆژی پێشوو",
    lastDay: "دوایین ڕۆژ",
    sameDay: "هەمان ڕۆژ",
    nextDay: "ڕۆژی دواتر",
    next6Days: "٦ ڕۆژی دواتر",
    numeric: "ژمارەیی",
  },
  // waitlist: {
  //   start: {
  //     title: "چاوەڕوانی",
  //     subtitle: "چاوەڕوانی بۆ دەستپێکردن",
  //     formButton: "چاوەڕوانی",
  //     actionText: "چاوەڕوانی",
  //     actionLink: "چاوەڕوانی",
  //   },
  //   success: {
  //     title: "سەرکەوتوو",
  //     subtitle: "چاوەڕوانی بۆ دەستپێکردن",
  //     message: "چاوەڕوانی بۆ دەستپێکردن",
  //   },
  // },
};
export {
  newProdcuts,
  bestSellers,
  user,
  brand,
  blogs,
  carts,
  categories,
  Sort,
  filterItems,
  menuItems,
  colors,
};
