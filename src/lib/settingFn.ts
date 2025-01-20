import { app } from "@/config/firebaseConfig";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  getFirestore,
  query,
  where,
  updateDoc,
  setDoc,
} from "firebase/firestore";
const db = getFirestore(app);
export async function clear_data_user({
  table,
  userid,
}: {
  table: string;
  userid: string;
}) {
  if (table !== "order") {
    try {
      const userDocRef = doc(db, table, userid);
      const itemsCollectionRef = collection(userDocRef, "items");
      const itemsSnapshot = await getDocs(itemsCollectionRef);
      const deletePromises = itemsSnapshot.docs.map((itemDoc) =>
        deleteDoc(itemDoc.ref)
      );
      await Promise.all(deletePromises);
      await deleteDoc(userDocRef);
      console.log(`User document and subcollection deleted for ID: ${userid}`);
    } catch (error) {
      console.error("Error deleting user and items:", error);
    }
  } else {
    console.log("order");
    console.log(userid);
    const q = query(collection(db, "order"), where("userId", "==", userid));
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach(async (item) => {
      console.log(item.id);
      await deleteDoc(doc(db, "order", item.id)).then((res) =>
        console.log("delelte order")
      );
    });
  }
}

export const search_setting = async ({
  userid,
  search,
}: {
  userid?: string;
  search: ("category" | "product" | "blog" | "team_member")[];
}) => {
  console.log("User ID: ", userid);

  if (!userid) {
    // Save to localStorage if userid exists
    localStorage.setItem("search", JSON.stringify({ search }));
  } else {
    try {
      const docRef = doc(db, "searchSetting", userid);
      await setDoc(
        docRef,
        { search },
        { merge: true } // Merges with existing data or creates a new doc
      )
        .then((res) => console.log("update"))
        .catch((err) => console.log(err));
      console.log("Search settings updated or created successfully.");
    } catch (error) {
      console.error("Error updating or creating search settings:", error);
    }
  }
};
