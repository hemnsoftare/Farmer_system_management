// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import CommentItem from "./CommentItem";
// import { useUser } from "@clerk/nextjs";
// import { getAllComments, setComments } from "@/lib/action/uploadimage";
// import { commentProps } from "@/type";

// const CommentsSection = ({ blogId }: { blogId: string }) => {
//   const commentInputRef = useRef<HTMLTextAreaElement>(null);
//   const [comments, setCommentsList] = useState<commentProps[]>([]);
//   const { user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchComments = async () => {
//       setIsLoading(true);
//       const data = await getAllComments(blogId);
//       setIsLoading(false);
//       setCommentsList(data);
//     };

//     fetchComments();
//   }, [blogId]);

//   const addComment = async () => {
//     if (
//       !commentInputRef.current ||
//       commentInputRef.current.value.trim() === ""
//     ) {
//       console.warn("Cannot add an empty comment");
//       return;
//     }

//     const newComment: commentProps = {
//       fullName: user?.fullName || "Anonymous",
//       image: user?.imageUrl || "",
//       userId: user?.id || "",
//       comment: commentInputRef.current.value,
//       commentReplay: "",
//       like: 0,

//       date: new Date(),
//     };

//     await setComments({ comments: newComment, id: blogId });
//     commentInputRef.current.value = "";
//     setCommentsList((prevComments) => [newComment, ...prevComments]);
//   };

//   return (
//     <main className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 space-y-6 w-full">
//       {/* Comment Input Section */}
//       <div className="flex flex-col gap-3">
//         <textarea
//           ref={commentInputRef}
//           rows={3}
//           className="border border-gray-300 px-4 py-2 rounded-lg w-full outline-none resize-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Share your thoughts..."
//         ></textarea>
//         <button
//           onClick={addComment}
//           className="self-end bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Post Comment
//         </button>
//       </div>

//       {/* Display Comments Section */}
//       {isLoading ? (
//         <p className="text-center text-gray-500">Loading comments...</p>
//       ) : comments.length > 0 ? (
//         <div className="flex flex-col gap-6">
//           {comments.map((comment, index) => (
//             <CommentItem
//               onAddlike={() => {}}
//               blogId={blogId}
//               userId={user.id}
//               key={index}
//               comment={comment}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">
//           No comments yet. Be the first to share your thoughts!
//         </p>
//       )}
//     </main>
//   );
// };

// export default CommentsSection;
