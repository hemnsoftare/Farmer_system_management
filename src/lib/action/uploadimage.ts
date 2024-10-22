import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "../../../config/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { catagoryProps, ProductFormInput, typeFilter } from "@/type";

const db = getFirestore(app);
// Function to upload the image
export async function uploadImage(file: File): Promise<string> {
  try {
    // Create a storage reference
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
export const getFireBase = async (dbName: string): Promise<catagoryProps[]> => {
  const q = await getDocs(collection(db, dbName));

  // Ensure TypeScript understands the expected return type of item.data()
  const catagory = q.docs.map((item) => item.data() as catagoryProps);

  return catagory;
};
export const getProducts = async (
  filter: typeFilter,
  categoroy: string
): Promise<ProductFormInput[]> => {
  console.log("in get products");
  console.log();
  const conditions: any[] = []; // Array to hold query conditions

  // Add brand condition if filter.brand is provided and not empty
  if (filter.brand && filter.brand.length > 0) {
    conditions.push(where("brand", "in", filter.brand));
  }

  // Add color condition if filter.color is provided and not empty
  if (filter.color && filter.color.length > 0) {
    conditions.push(where("colorsName", "array-contains-any", filter.color));
  }

  // Add discount condition
  conditions.push(where("isDiscount", "==", filter.discount));

  // Add price conditions
  conditions.push(where("price", ">=", filter.price[0])); // Set minimum price
  conditions.push(where("price", "<=", filter.price[1])); // Set maximum price
  conditions.push(where("category", "==", categoroy));
  // Build the query with dynamic conditions
  const q = query(collection(db, "Products"), ...conditions);

  const product: ProductFormInput[] | null = [];
  const qsanpshot = await getDocs(q);
  console.log(qsanpshot);
  qsanpshot.forEach((item) => {
    console.log("object");
    console.log(item);
    product.push({
      ...(item.data() as ProductFormInput),
      id: item.id as string,
    });
  });
  console.log(product);
  return product;
};

export const getproductByCategory = async (
  category: string
): Promise<ProductFormInput[]> => {
  const q = query(
    collection(db, "Products"),
    where("category", "==", category)
  );
  const products: ProductFormInput[] = [];
  // Ensure TypeScript understands the expected return type of item.data()
  const qsanpshot = await getDocs(q);
  qsanpshot.forEach((item) => {
    products.push(item.data() as ProductFormInput);
  });

  return products;
};
