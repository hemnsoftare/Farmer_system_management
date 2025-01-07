// "use client";

// // import { useEffect, useState, useRef } from "react";
// // import CommentItem from "./CommentItem";
// // import { useUser } from "@clerk/nextjs";
// // import { getAllComments, setComments } from "@/lib/action/uploadimage";
// // import { commentProps } from "@/type";

// const HardComment = ({ blogId }: { blogId: string }) => {
//   console.log("hard comments");
//   return <h1>in commments</h1>;
//   // Debugging
//   // console.log("Rendered HardComment for Blog ID:", blogId);

//   // // State and Refs
//   // const refComment = useRef<HTMLTextAreaElement>(null);
//   // const [comments, setCommentsState] = useState<commentProps[]>([]);
//   // const { user } = useUser();

//   // // Fetch comments when component loads
//   // useEffect(() => {
//   //   const fetchComments = async () => {
//   //     try {
//   //       const data = await getAllComments(blogId);
//   //       setCommentsState(data as commentProps[]);
//   //     } catch (error) {
//   //       console.error("Failed to fetch comments:", error);
//   //     }
//   //   };

//   //   fetchComments();
//   // }, [blogId]);

//   // // Handle adding a new comment
//   // const handleAddComment = async () => {
//   //   try {
//   //     const newComment: commentProps = {
//   //       fullName: user?.fullName || "Anonymous",
//   //       image: user?.imageUrl || "",
//   //       userId: user?.id || "",
//   //       comment: refComment.current.value,
//   //       commentReplay: "",
//   //       like: 0,
//   //       disLike: 0,
//   //       date: new Date(),
//   //     };

//   //     // Save comment via API
//   //     await setComments({ comments: newComment, id: blogId }).finally(() => {
//   //       console.log("hi bye");
//   //     });

//   //     // Update local state with the new comment
//   //     console.log("add coment ");
//   //     // Clear the text area
//   //     refComment.current.value = "";
//   //   } catch (error) {
//   //     console.error("Failed to add comment:", error);
//   //   }
//   // };

//   // return (
//   //   <main className="bg-gray-50 border shadow-lg rounded-lg flex flex-col p-4 gap-4 w-full">
//   //     {/* Comment Input Section */}
//   //     <div className="flex items-center gap-2">
//   //       <textarea
//   //         ref={refComment}
//   //         rows={2}
//   //         className="border border-neutral-400 px-4 py-2 rounded-lg w-full outline-none resize-none"
//   //         placeholder="Write your comment here..."
//   //       ></textarea>
//   //       <button
//   //         onClick={handleAddComment}
//   //         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//   //       >
//   //         Submit
//   //       </button>
//   //     </div>

//   //     {/* Display Comments Section */}
//   //     {comments.length > 0 ? (
//   //       <div className="flex flex-col gap-4">
//   //         {comments.map((item, index) => (
//   //           <CommentItem key={index} comment={item} />
//   //         ))}
//   //       </div>
//   //     ) : (
//   //       <p className="text-sm text-gray-500">
//   //         No comments yet. Be the first to comment!
//   //       </p>
//   //     )}
//   //   </main>
//   // );
// };

// export default HardComment;
