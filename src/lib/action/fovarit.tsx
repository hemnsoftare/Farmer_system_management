import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { blogFavriteProps, BlogProps, favorite } from "@/lib/action";
import { app } from "@/config/firebaseConfig";

const db = getFirestore(app);

export const addfavorite = async ({
  id,
  item,
}: {
  id: string;
  item: favorite;
}) => {
  try {
    // Reference to the user's `items` subcollection
    const itemsRef = collection(db, "favorite", id, "items");

    // Check if the `items` subcollection has any data
    const querySnapshot = await getDocs(itemsRef);

    const nmf = item.numberFavorite + 1;
    if (!querySnapshot.empty) {
      await updateDoc(doc(db, "Products", item.id), {
        numberFavorite: nmf,
      }).then((res) => console.log("update in number sale"));

      await setDoc(doc(db, "favorite", id, "items", item.id), {
        ...item,
        numberFavorite: nmf,
      });
    } else {
      await updateDoc(doc(db, "Products", item.id), {
        numberFavorite: nmf,
      }).then((res) => console.log("update in number sale"));
      await setDoc(doc(db, "favorite", id, "items", item.id), {
        ...item,
        numberFavorite: nmf,
      });
    }
  } catch (error) {
    console.error("Error adding favorite item:", error);
  }
};

export const getfavorite = async (userId): Promise<favorite[]> => {
  try {
    // Reference to the user's `items` subcollection
    const itemsRef = collection(db, "favorite", userId, "items");

    // Fetch all documents from the `items` subcollection
    const querySnapshot = await getDocs(itemsRef);

    // Extract data from each document
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as favorite),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};
export const deleteFavorite = async (
  userId: string,
  numberFavorite: number,
  id: string
) => {
  try {
    await deleteDoc(doc(db, "favorite", userId, "items", id)).then((res) =>
      console.log("delete the products in favorite")
    );
    const nmf = numberFavorite - 1;
    await updateDoc(doc(db, "Products", id), {
      numberFavorite: nmf,
    }).then((res) => console.log("update in number favorite"));
  } catch (error) {
    console.error("Error deleting favorite item:", error);
  }
};
export const getAllItemNames = async (userId: string): Promise<string[]> => {
  if (!userId) return [];
  try {
    const itemsRef = collection(db, "favorite", userId, "items");
    const querySnapshot = await getDocs(itemsRef);
    const itemNames = querySnapshot.docs.map((doc) => doc.id);
    return itemNames;
  } catch (error) {
    console.error("Error fetching item names:", error);
    return [];
  }
};

export const addFavoriteBlog = async ({ item }: { item: blogFavriteProps }) => {
  try {
    const itemsRef = collection(db, "saveBlog", item.userId, "items");

    const querySnapshot = await getDocs(itemsRef);

    const updatedFavorites = item.numberOffavorites + 1;

    // Update blogs collection
    await updateDoc(doc(db, "blogs", item.blogId), {
      numberOffavorites: updatedFavorites,
    });

    await setDoc(doc(db, "saveBlog", item.userId, "items", item.id), {
      ...item,
      numberOffavorites: updatedFavorites,
    });
    console.log("Saved item in saveBlog subcollection");
  } catch (error) {
    console.error("Error in addFavoriteBlog function:", error);
  }
};
export const getallsaveid = async (userId: string): Promise<string[]> => {
  try {
    const itemsRef = collection(db, "saveBlog", userId, "items");
    const querySnapshot = await getDocs(itemsRef);
    const itemNames = querySnapshot.docs.map((doc) => doc.id);
    return itemNames;
  } catch (error) {
    console.error("Error fetching item names:", error);
    return [];
  }
};
export const deleteSave = async ({
  id,
  numberOffavorites,
  userId,
}: {
  userId: string;
  numberOffavorites: number;
  id: string;
}) => {
  try {
    await deleteDoc(doc(db, "saveBlog", userId, "items", id)).then((res) =>
      console.log("delete the products in favorite")
    );
    const nmf = numberOffavorites - 1;
    await updateDoc(doc(db, "blos", id), {
      numberOffavorites: nmf,
    }).then((res) => console.log("update in number favorite"));
  } catch (error) {
    console.error("Error deleting favorite item:", error);
  }
};
export const getSaveBlog = async (userId: any): Promise<blogFavriteProps[]> => {
  try {
    // Reference to the user's `items` subcollection
    const itemsRef = collection(db, "saveBlog", userId, "items");

    // Fetch all documents from the `items` subcollection
    const querySnapshot = await getDocs(itemsRef);

    // Extract data from each document
    const items = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as blogFavriteProps),
      id: doc.id,
    }));
    return items;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};
export const getAllSaveBlog = async (): Promise<blogFavriteProps[]> => {
  try {
    const itemsRef = collection(db, "saveBlog", "items");
    const querySnapshot = await getDocs(itemsRef);
    const item: blogFavriteProps[] = [];
    const items = querySnapshot.docs.map((doc) =>
      item.push({ ...(doc.data() as blogFavriteProps), id: doc.id })
    );

    return item;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};
