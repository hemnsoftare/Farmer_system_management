import Banner from "@/components/home/Banner";
import Blog from "@/components/home/blog";
import Brand from "@/components/home/Brand";
import Catagory from "@/components/home/Catagory";
import Hero from "@/components/home/Hero";
import NewProducts from "@/components/home/NewProducts";
import Reklam from "@/components/home/Reklam";
import Sales from "@/components/home/Sales";
import Servies from "@/components/home/Servies";
import { Button } from "@/components/ui/button";
import { bestSellers, newProdcuts } from "@/util/data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Catagory />
      <Sales />
      <NewProducts data={newProdcuts} title="New products" />
      <Reklam />
      <NewProducts data={bestSellers} title="bset Sellers  " />
      <Brand />
      <Banner />
      <Blog />
      <Servies />
      <br />
      <br />
    </div>
  );
}
