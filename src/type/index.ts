import { IconType } from "react-icons";

interface Productsprops {
  name: string;
  discount?: number;
  colors?: { name: string; color: string }[];
  image: string;
  price: number;
  pointStart: number;
  persentageDiscount?: number;
}
interface serviesProps {
  name: string;
  image: string;
}
interface footerProps {
  name: string;
  item: { name?: string; icon?: any }[];
}
interface userProps {
  name: string;
  image: string;
  email: string;
}
interface Cart {
  id: number;
  imageSrc: string;
  name: string;
  color: string;
  delivery: string;
  guarantee: string;
  price: number;
  quantity: number;
}
interface BlogColProps {
  catagory: string;
  creator: string;
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  imageSrc: string;
  saveIconSrc: string;
}
interface LikeStatus {
  like: boolean; // Indicates if the post is liked by the user
  disLike: boolean; // Indicates if the post is disliked by the user
}

interface CommentProps {
  id: number; // Unique identifier for the post
  imageSrc: string; // Source path for the author's image
  author: string; // Name of the author
  date: string; // Publication date of the post
  content: string; // Text content of the post
  showMore: boolean; // Controls whether the full content is displayed
  likes: number; // Number of likes the post has received
  dislikes: number; // Number of dislikes the post has received
  isLike: LikeStatus; // Like status object tracking user interaction
}

// Type representing an array of Post objects

interface Category {
  name: string;
  icon: IconType;
}

interface FilterProps {
  name: string;
  item: string[];
}

interface typeFilter {
  color: string[];
  discount: any;
  brand: string[];
  price: number[];
}
interface imageHeaderProps {
  imageBig: string;
  images: string[];
}
interface ProductInfoProps {
  name: string;
  colors: { name: string; color: string }[];
  infos: { title: string; description: string }[];
  price: number;
  brand?: string;
  discount?: number;
}

interface FAQProps {
  title: string;
  QA: { questions: string[]; answers: string[] }[];
}
interface errorCheckOutProps {
  fullName: string;
  phoneNumber: string;
  streetName: string;
  city: string;
  recipientName: string;
  phoneNumberAnother: string;
}

interface propsMenuItem {
  name: string;
  icon: IconType;
  url?: string;
}

interface ProductFormInput {
  id?: string;
  name: string; // Required product name
  price: number; // Required product price
  brand: string; // Required brand
  colors: { name: string; color: string }[]; // Required colors array
  category: string; // Required category
  Bigimage: string | null; // Main image file, required
  imageSmall?: string[] | undefined; // Optional small image file
  discount?: number; // Optional discount
  details: { title: string; description: string }[];
  numberFavorite: number;
  numberSale: number;
  date: Date;
  colorsName: string[];
  isDiscount: boolean;
  bigimageUrl: string;
  smallimageUrl: string[];
}
type CategoryImage = {
  name: string;
  link: string;
};
interface catagoryProps {
  name: string;
  image: CategoryImage;
  brands: string[]; // Assuming 'brands' is an array of brand names
  colors: { name: string; color: string }[]; // Assuming 'colors' is an array of color names
}

export type {
  Productsprops,
  serviesProps,
  footerProps,
  userProps,
  Cart,
  BlogColProps,
  CommentProps,
  Category,
  FilterProps,
  typeFilter,
  imageHeaderProps,
  ProductInfoProps,
  FAQProps,
  errorCheckOutProps,
  propsMenuItem,
  ProductFormInput,
  catagoryProps,
};
