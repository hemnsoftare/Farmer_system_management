import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { catagoryProps, ProductFormInput, typeFilter, UserType } from "@/type";
import { app, storage } from "@/config/firebaseConfig";
import { OrderType } from "@/type";

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
  categoroy: string,
  sortBy: string
): Promise<ProductFormInput[]> => {
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
  console.log(conditions);
  const q = query(
    collection(db, "Products"),
    ...conditions,
    orderBy(
      sortBy === "new" ? "date" : "price",
      sortBy === "new" ? "asc" : sortBy === "priceA" ? "asc" : "desc"
    )
  );

  const product: ProductFormInput[] | null = [];
  const qsanpshot = await getDocs(q);
  qsanpshot.forEach((item) => {
    product.push({
      ...(item.data() as ProductFormInput),
      id: item.id as string,
    });
  });
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

export const setUser = async (user: UserType) => {
  // Sanitize the user data for Firestore
  const sanitizedUser = {
    id: user.id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    fullName: user.fullName || "",
    username: user.username || "",
    emailAddresses:
      user.emailAddresses?.map((email) => email.emailAddress) || [],
    primaryEmailAddressId: user.primaryEmailAddressId || "",
  };

  await setDoc(doc(db, "user", user.id), sanitizedUser)
    .then(() => console.log("User saved"))
    .catch((error) => console.error("Error saving user", error));
};

export const setOrder = async (order: OrderType): Promise<string> => {
  type quantity = { name: string; quantitiy: number }[];
  let update: quantity = [];
  order.orderItems.map((item) => {
    let sum = 0;
    order.orderItems.filter((orderitem) =>
      orderitem.name === item.name ? (sum += orderitem.quantity) : null
    );
    let itemupdate = { name: item.name, quantitiy: sum };
    if (!update.some((itemupdateed) => itemupdateed.name === item.name)) {
      update.push(itemupdate);
    }
  });
  console.log(update);
  try {
    // Pass the orders object directly to addDoc
    const refSet = await addDoc(collection(db, "order"), {
      address: {
        city: order.address.city || "",
        region: order.address.region || "",
        streetName: order.address.streetName || "",
      },
      // email: order.email.length > 0 ? order.email : [{ emailAddress: "" }], // Ensure it’s an array
      fullName: order.fullName || "",
      orderDate: new Date(),
      orderItems: order.orderItems.map((item) => ({
        name: item.name || "",
        discount: item.discount || 0,
        price: item.price || 0,
        colors: {
          name: item.colors.name || "",
          color: item.colors.color || "",
        },
        quantity: item.quantity || 0,
        image: item.image || "",
      })),
      phoneNumber: order.phoneNumber || "",
      totalAmount: order.totalAmount || 0,
      totaldiscountPrice: order.totaldiscountPrice || 0,
      userId: order.userId || "",
      note: order.note || "",
    });
    update.map(async (item) => {
      const getitem = await getDoc(doc(db, "Products", item.name));
      const currentNumberSale = getitem.exists() && getitem.data().numberSale;
      await updateDoc(doc(db, "Products", item.name), {
        numberSale: item.quantitiy + currentNumberSale,
      }).then((res) => console.log("update in number sale"));
    });

    return refSet.id; // Return the document ID
  } catch (error) {
    console.error("Error saving order:", error);
    throw error; // Rethrow the error for further handling
  }
};
