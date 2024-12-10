import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { favorite } from "@/type";
import { app, storage } from "@/config/firebaseConfig";

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
      await updateDoc(doc(db, "Products", item.name), {
        numberFavorite: nmf,
      }).then((res) => console.log("update in number sale"));

      await setDoc(doc(db, "favorite", id, "items", item.name), {
        ...item,
        numberFavorite: nmf,
      });
    } else {
      await updateDoc(doc(db, "Products", item.name), {
        numberFavorite: nmf,
      }).then((res) => console.log("update in number sale"));
      await setDoc(doc(db, "favorite", id, "items", item.name), {
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
      // Include the document ID
      ...doc.data(), // Spread the document data
    }));

    console.log("Favorite items:", items);
    return items;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};
export const deleteFavorite = async (
  userId: string,
  numberFavorite: number,
  itemName: string
) => {
  try {
    await deleteDoc(doc(db, "favorite", userId, "items", itemName));
    console.log(numberFavorite);
    const nmf = numberFavorite - 1;
    console.log(nmf);
    await updateDoc(doc(db, "Products", itemName), {
      numberFavorite: nmf,
    }).then((res) => console.log("update in number favorite"));
    console.log(`Item "${itemName}" deleted successfully.`);
  } catch (error) {
    console.error("Error deleting favorite item:", error);
  }
};
export const getAllItemNames = async (userId: string): Promise<string[]> => {
  try {
    const itemsRef = collection(db, "favorite", userId, "items");
    const querySnapshot = await getDocs(itemsRef);
    const itemNames = querySnapshot.docs.map((doc) => doc.id);
    console.log("Item names:", itemNames);
    return itemNames;
  } catch (error) {
    console.error("Error fetching item names:", error);
    return [];
  }
};
