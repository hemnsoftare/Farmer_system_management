import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { blogFavriteProps, favorite } from "@/lib/action";
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

export const getfavorite = async (userId) => {
  try {
    // Reference to the user's `items` subcollection
    const itemsRef = collection(db, "favorite", userId, "items");

    // Fetch all documents from the `items` subcollection
    const querySnapshot = await getDocs(itemsRef);

    // Extract data from each document
    const items = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
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
    console.log(numberFavorite);
    const nmf = numberFavorite - 1;
    console.log(nmf);
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
    console.log(itemNames);
    return itemNames;
  } catch (error) {
    console.error("Error fetching item names:", error);
    return [];
  }
};

export const addFavoriteBlog = async ({ item }: { item: blogFavriteProps }) => {
  try {
    const itemsRef = collection(db, "saveBlog", item.userId, "items");
    console.log("itemsRef initialized:", itemsRef);

    const querySnapshot = await getDocs(itemsRef);
    console.log("Query Snapshot:", querySnapshot);

    const updatedFavorites = item.numberOffavorites + 1;

    // Update blogs collection
    console.log("Updating blogs collection for blogId:", item.blogId);
    await updateDoc(doc(db, "blogs", item.blogId), {
      numberOffavorites: updatedFavorites,
    });
    console.log("Updated numberOffavorites in blogs");

    // Save item in saveBlog
    console.log(
      "Saving item in saveBlog subcollection for userId:",
      item.userId
    );
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
    console.log(itemNames);
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
    console.log(numberOffavorites);
    const nmf = numberOffavorites - 1;
    console.log(nmf);
    await updateDoc(doc(db, "blos", id), {
      numberOffavorites: nmf,
    }).then((res) => console.log("update in number favorite"));
  } catch (error) {
    console.error("Error deleting favorite item:", error);
  }
};
export const getSaveBlog = async (userId: any) => {
  try {
    // Reference to the user's `items` subcollection
    const itemsRef = collection(db, "saveBlog", userId, "items");

    // Fetch all documents from the `items` subcollection
    const querySnapshot = await getDocs(itemsRef);

    // Extract data from each document
    const items = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(items);
    return items;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};
