// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { commentProps, CommentProps } from "@/type";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { BiSolidLike } from "react-icons/bi";
// import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
// // import { Addlike } from "@/lib/action/uploadimage";
// const CommentItem = ({
//   comment,
//   blogId,
//   userId,
// }: {
//   comment: commentProps;
//   userId: string;
//   blogId: string;
//   onAddlike: () => void;
// }) => {
//   const [showMore, setshowMore] = useState<boolean>(false);
//   const handleAddLike = async () => {
//     Addlike({
//       like: comment.like,
//       blogID: blogId,
//       comment: comment.comment,
//       date: comment.date,
//       userIdLike: userId,
//     });
//   };
//   return (
//     <article className="flex flex-col gap-3">
//       <header className="flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <Image
//             src={comment.image}
//             alt=""
//             width={50}
//             height={50}
//             className="w-[50px] h-[50px] rounded-[100%]"
//           />
//           <div className="flex flex-col">
//             <p className="text-16">{comment.fullName}</p>
//             {/* <span className="text-12 text-neutral-400">{comment.date}</span> */}
//           </div>
//         </div>
//       </header>
//       <p
//         className={`text-13 ${
//           showMore === true ? "h-fit" : "line-clamp-2"
//         } duration-300 transition-all  overflow-hidden`}
//       >
//         {comment.comment} Lorem ipsum dolor sit amet consectetur adipisicing
//         elit. Provident architecto consectetur quaerat ut, est, necessitatibus
//         velit asperiores odit commodi quisquam vel incidunt ab id cupiditate
//         dignissimos. Aut voluptatibus maiores possimus.
//       </p>
//       <div
//         onClick={() => setshowMore((pre) => !pre)}
//         className="flex hover:bg-blue-100 cursor-pointer self-end items-center gap-0 text-blue-700"
//       >
//         <span>show more</span>
//         <RiArrowDropDownLine color="blue" className="w-[30px] h-[30px]" />
//       </div>
//       <div className="flex self-end items-center gap-3 pr-6 text-blue-700">
//         <div className="flex gap-2 hover:bg-blue-200 cursor-pointer duration-300 transition-all px-2 rounded-lg items-center">
//           {comment.like ? (
//             <BiSolidLike onClick={handleAddLike} color="blue" />
//           ) : (
//             <AiOutlineLike color="blue" />
//           )}
//           <span>{comment.like}</span>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default CommentItem;
