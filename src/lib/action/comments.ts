import { app } from "@/config/firebaseConfig";
import { CommentProps } from "@/lib/action";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(app);
export const addComment = async (
  blogId: string,
  comment: CommentProps
): Promise<CommentProps> => {
  const commentRef = doc(collection(db, "blogs", blogId, "comments"));
  await setDoc(commentRef, { ...comment, id: commentRef.id });
  return { ...comment, id: commentRef.id };
};

export const toggleLike = async (
  blogId: string,
  commentId: string,
  userId: string
) => {
  const commentRef = doc(db, "blogs", blogId, "comments", commentId);
  const commentSnap = await getDoc(commentRef);
  const commentData = commentSnap.data();

  if (commentData.likes.includes(userId)) {
    await updateDoc(commentRef, { likes: arrayRemove(userId) });
  } else {
    await updateDoc(commentRef, { likes: arrayUnion(userId) });
  }
};
