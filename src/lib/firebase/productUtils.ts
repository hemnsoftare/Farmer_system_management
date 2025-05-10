import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import type { ProductFormInput } from "@/lib/action";

// Add proper TypeScript typing for the function parameters
type ProductQueryParams = {
  category?: string;
  sortBy?: string;
  isPrivate?: boolean;
  isev?: boolean;
};

export const getProductsFromFirebase = async ({
  category = "",
  sortBy = "date",
  isPrivate = false,
  isev = false,
}: ProductQueryParams): Promise<any[]> => {
  try {
    const collectionName = isPrivate ? "PrivateProducts" : "Products";
    let productsRef = collection(db, collectionName);
    let constraints = [];

    if (category && category !== "all") {
      constraints.push(where("category", "==", category));
    }

    if (isev) {
      constraints.push(where("isev", "==", true));
    }

    constraints.push(orderBy(sortBy, "desc"));

    const productsQuery = query(productsRef, ...constraints);
    const querySnapshot = await getDocs(productsQuery);

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const deleteProduct = async (
  productId: string,
  isPrivate: boolean = false
): Promise<{ success: boolean; error?: any }> => {
  try {
    const collectionName = isPrivate ? "PrivateProducts" : "Products";
    await deleteDoc(doc(db, collectionName, productId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error };
  }
};
