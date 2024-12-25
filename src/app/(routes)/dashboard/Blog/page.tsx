import Link from "next/link";
import React from "react";
import Blog from "./_components/Blog";

const Page = () => {
  return (
    <div className="flex flex-col mt-9 items-start px-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="text-30 font-semibold">Blog</h1>
        <Link
          className="px-7 py-2 bg-cyan-600  md:hover:bg-cyan-800 duration-300 transition-all   text-white rounded-lg text-20 "
          href={"/dashboard/Blog/CreateBlog"}
        >
          Create Blog
        </Link>
      </header>
      <div className="flex items-center mt-7 justify-start gap-4">
        <Blog
          date="2/2/2000"
          description="lorem sdfjakd ka jasdf asdf jkjas kjasdfjklasdfjkl jkd jkldfs jkl  jklsdf  jsdjsdfjlasdf asdf klsdf ikojsdf  ijwer oisdf klj iljsdf ljsdf klasdf jkl sdfajsdkla fjasdf klj kljk "
          image="/blog-row.jpg"
          title="iphone 16 por max"
        />
      </div>
    </div>
  );
};

export default Page;
