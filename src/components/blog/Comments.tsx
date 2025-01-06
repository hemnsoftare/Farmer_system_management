"use client";
import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useUser } from "@clerk/nextjs";
import { getAllComments, setComments } from "@/lib/action/uploadimage";
import { commentProps } from "@/type";

const HardCooment = ({ blogId }: { blogId: string }) => {
  console.log("Comments component rendered");
  console.log("Received blog ID:", blogId);

  // const refComment = React.useRef<HTMLTextAreaElement>(null);
  // const [comments, setCommentsState] = useState<commentProps[]>([]);
  // const { user } = useUser();

  // useEffect(() => {
  //   console.log("useEffect triggered for blog ID:", blogId);

  //   const fetchComments = async () => {
  //     try {
  //       console.log("Fetching comments from API...");
  //       const data = await getAllComments(blogId);
  //       console.log("Fetched comments data:", data);
  //       setCommentsState(data as commentProps[]);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };

  //   fetchComments();
  // }, [blogId]);

  // const handleAddComment = async () => {
  //   if (!user) {
  //     alert("You need to log in to comment!");
  //     return;
  //   }
  //   const comment: commentProps = {
  //     fullName: user.fullName || "Anonymous",
  //     image: user.imageUrl || "",
  //     userId: user.id || "",
  //     comment: refComment.current?.value.trim() || "",
  //     commentReplay: "",
  //     like: 0,
  //     disLike: 0,
  //     date: new Date(),
  //   };

  //   if (!comment.comment) {
  //     alert("Comment cannot be empty!");
  //     return;
  //   }

  //   try {
  //     console.log("Submitting new comment:", comment);
  //     await setComments({ comments: comment, id: blogId });
  //     console.log("Comment successfully added!");

  //     if (refComment.current) refComment.current.value = "";

  //     setCommentsState((prev) => [comment, ...prev]);
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <main className="bg-gray-50 border shadow-lg rounded-lg flex flex-col p-3 gap-4 w-full px-3">
      <div className="flex items-center gap-2">
        <textarea
          // ref={refComment}
          rows={1}
          className="border-neutral-400 px-5 py-2 border outline-none rounded-lg bg-white w-full"
          placeholder="Write your comment here..."
        ></textarea>
        <button
          // onClick={handleAddComment}
          className="text-blue-800 px-4 py-2 border rounded-lg border-blue-500 hover:bg-white"
        >
          Submit
        </button>
      </div>

      {/* {comments.length > 0 ? (
        comments.map((item) => (
          <CommentItem key={item.date.toString()} comment={item} />
        ))
      ) : (
        <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
      )} */}
    </main>
  );
};

export default HardCooment;
