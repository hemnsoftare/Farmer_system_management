// "use client";
// import React, { useEffect, useState } from "react";
// import { BlogColProps, BlogProps } from "../../../../type";
// import { blogs } from "@/util/data";
// import Image from "next/image";
// import { LiaCommentDots } from "react-icons/lia";
// import { AiOutlineLike } from "react-icons/ai";
// import { BiSolidLike } from "react-icons/bi";
// import Comments from "@/components/blog/Comments";
// import BlogRow from "@/components/blog/BlogRow";
// import ReactPlayer from "react-player";
// import Link from "next/link";
// import { getBlog } from "@/lib/action/uploadimage";

// const Page = ({ params }: { params: { id: string } }) => {
//   const data: BlogColProps = blogs[1]; // Replace with your dynamic logic
//   const [blog, setblog] = useState<BlogProps>();

//   useEffect(() => {
//     const getData = async () => {
//       const data = await getBlog(params.id);
//       setblog({ ...data });
//     };
//     getData();
//   }, [params.id]);
//   if (blog)
//     return (
//       <div className="flex py-9 px-3 flex-col justify-start items-start lg:flex-row gap-2 sm:gap-4 w-full">
//         <main className="flex flex-col lg:w-[65%] w-full gap-3">
//           {/* Breadcrumb */}
//           <span className="text-12 mb-5 font-light">
//             <Link href={"/"} className="sm:hover:text-blue-600">
//               {" "}
//               home{" "}
//             </Link>
//             &gt;
//             <Link href={"/blog"} className="sm:hover:text-blue-600">
//               {" "}
//               blog
//             </Link>{" "}
//           </span>

//           <div className="flex overflow-hidden w-full flex-col gap-3">
//             {/* Title and Metadata */}
//             <h2 className="sm:text-20 text-18 font-bold">{blog.title}</h2>
//             <p className="text-neutral-500 text-12">
//               By {data.creator} on {new Date(blog.date).toLocaleDateString()}
//             </p>

//             {/* Conditional Rendering for Video or Image */}
//             {blog.type === "video" ? (
//               <ReactPlayer
//                 url={blog.video}
//                 width="100%"
//                 height="100%"
//                 controls
//                 className="absolute top-0 left-0"
//               />
//             ) : (
//               <Image
//                 src={blog.image}
//                 alt="Blog Cover"
//                 width={900}
//                 height={400}
//                 className="object-cover shadow-lg shadow-slate-300 w-screen min-h-[400px] bg-red-50 max-h-[400px] border rounded-xl  px-3 overflow-hidden  "
//               />
//             )}

//             {/* Description */}
//             <p className="sm:text-12 text-10 indent-2 text-neutral-600 w-full">
//               {blog.description}
//             </p>

//             {/* Comment and Like Section */}
//             {/* <div className="flex cursor-pointer justify-end gap-4 px-10">
//             <div
//               onClick={() => setShowComments(!showComments)}
//               className="flex gap-2 hover:bg-blue-500 duration-300 transition-all px-2 rounded-md items-center"
//             >
//               <LiaCommentDots />
//               <span className="text-14">12 Comments</span>
//             </div>
//             <div
//               onClick={() => setIsLike(!isLike)}
//               className="flex hover:bg-blue-500 duration-300 transition-all px-2 rounded-md gap-2 items-center"
//             >
//               {isLike ? <BiSolidLike color="blue" /> : <AiOutlineLike />}
//               <span className="text-14">123 Likes</span>
//             </div>
//           </div> */}

//             {/* Comments Section */}
//             {/* {showComments && <Comments />} */}
//           </div>
//         </main>

//         {/* Blog Rows */}
//         <div className="flex flex-col gap-2 items-center lg:mt-28 mt-2 lg:w-[43%] justify-center md:w-full"></div>
//       </div>
//     );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import { BlogProps } from "../../../../type";
import Image from "next/image";
import ReactPlayer from "react-player";
import Link from "next/link";
import { getAllComments, getBlog, getBlogs } from "@/lib/action/uploadimage";
import BlogRow from "@/components/blog/BlogRow";
import { LiaCommentDots } from "react-icons/lia";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useUser } from "@clerk/nextjs";
import HardCooment from "@/components/blog/Comments";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [blog, setBlog] = useState<BlogProps>({
    id: "",
    title: "",
    description: "",
    video: "",
    image: "",
    type: "image", // Default type
    date: new Date(),
    user: "",
    numberOfLikes: 0,
    numberOfDislikes: 0,
    numberOfComments: 0,
    comments: [],
    numberOfViews: 0,
    numberOffavorites: 0,
    numberOfSearches: 0,
  });

  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (!id) return; // Don't fetch data if id is missing

    const getData = async () => {
      try {
        const data = await getBlog(id);
        const blogList = await getBlogs();
        const comments = await getAllComments(id);

        console.log("Blog data:", data);
        console.log("Related blogs:", blogList);
        console.log("Comments:", comments);

        setBlogs(blogList);
        setBlog({ ...data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row py-9 px-3 gap-6 w-full">
      {/* Main Content Section */}
      <main className="flex flex-col w-full lg:w-[65%] gap-6">
        {/* Breadcrumb */}
        <span className="text-sm font-light">
          <Link href="/" className="hover:text-blue-600">
            home
          </Link>
          &gt;
          <Link href="/blog" className="hover:text-blue-600">
            blog
          </Link>
        </span>

        {/* Blog Content */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-bold">{blog.title}</h2>
          <p className="text-neutral-500 text-sm">
            By {blog.user} on {new Date(blog.date).toLocaleDateString()}
          </p>

          {/* Conditional Rendering for Video or Image */}
          {blog.type === "video" ? (
            <div className="w-full aspect-video">
              <ReactPlayer
                url={blog.video}
                width="100%"
                height="100%"
                controls
                className="rounded-xl overflow-hidden"
              />
            </div>
          ) : (
            <Image
              src={blog.image}
              alt="Blog Cover"
              width={900}
              height={400}
              className="object-cover shadow-lg rounded-xl w-full max-h-[400px]"
            />
          )}

          <p className="text-sm leading-relaxed text-neutral-600">
            {blog.description}
          </p>
        </div>

        {/* Comment and Like Section */}
        <div className="flex cursor-pointer justify-end gap-4 px-10">
          <div className="flex gap-2 hover:bg-blue-500 duration-300 transition-all px-2 rounded-md items-center">
            <LiaCommentDots />
            <span className="text-14">12 Comments</span>
          </div>
          <div className="flex hover:bg-blue-500 duration-300 transition-all px-2 rounded-md gap-2 items-center">
            {true ? <BiSolidLike color="blue" /> : <AiOutlineLike />}
            <span className="text-14">123 Likes</span>
          </div>
        </div>

        {/* Comments Section */}
        {id && <HardCooment blogId={"DTOdnzwS5pjvvqCvwbDA"} />}
      </main>

      {/* Sidebar Section */}
      <aside className="flex flex-col lg:w-[35%] w-full gap-4">
        <div className="w-full p-4 bg-white gap-4 flex flex-col justify-center items-center shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Related Blogs</h3>
          {blogs
            .filter((item) => item.type === "image")
            .map((item) => (
              <BlogRow item={item} key={item.id} />
            ))}
        </div>
      </aside>
    </div>
  );
};

export default Page;
