import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  addDoc,
  collection,
  deleteDoc,
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
import {
  catagoryProps,
  contactUSProps,
  ProductFormInput,
  SearchBlogsProps,
  SearchCategoryProps,
  searchProps,
  typeFilter,
  UserType,
} from "@/type";
import { app, storage } from "@/config/firebaseConfig";
import { OrderType } from "@/type";
import { number, string } from "zod";
import { title } from "process";

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
  category: string,
  sortBy?: string,
  filter?: typeFilter
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

  // Add discount condition only if filter.discount is true
  if (filter.discount === true)
    conditions.push(where("isDiscount", "==", true));

  // Add price conditions
  conditions.push(where("price", ">=", filter.price[0])); // Set minimum price
  conditions.push(where("price", "<=", filter.price[1])); // Set maximum price
  conditions.push(where("category", "==", category));

  // Build the query with dynamic conditions
  const q = query(
    collection(db, "Products"),
    ...conditions,
    orderBy(
      sortBy === "new" ? "date" : "price",
      sortBy === "new" ? "desc" : sortBy === "priceA" ? "asc" : "desc"
    )
  );

  const products: ProductFormInput[] = [];
  const qSnapshot = await getDocs(q);
  qSnapshot.forEach((item) => {
    products.push({
      ...(item.data() as ProductFormInput),
      id: item.id as string,
    });
  });

  return products;
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
  type quantity = { id: string; quantitiy: number }[];
  let update: quantity = [];
  order.orderItems.map((item) => {
    let sum = 0;
    order.orderItems.filter((orderitem) =>
      orderitem.name === item.name ? (sum += orderitem.quantity) : null
    );
    let itemupdate = { id: item.id, quantitiy: sum };
    if (!update.some((itemupdateed) => itemupdateed.id === item.id)) {
      update.push(itemupdate);
    }
  });
  try {
    const refSendData = await addDoc(collection(db, "order"), {
      address: {
        city: order.address.city || "",
        region: order.address.region || "",
        streetName: order.address.streetName || "",
      },
      email: order.email.map((email) => email.emailAddress) || [],
      fullName: order.fullName || "",
      orderDate: new Date(),
      orderItems: order.orderItems.map((item) => ({
        name: item.name || "",
        id: item.id || "",
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
      const getitem = await getDoc(doc(db, "Products", item.id));
      const currentNumberSale = getitem.exists() && getitem.data().numberSale;
      await updateDoc(doc(db, "Products", item.id), {
        numberSale: item.quantitiy + currentNumberSale,
      }).then((res) => console.log("update in number sale"));
    });

    return refSendData.id;
  } catch (error) {
    console.error("Error saving order:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const Search = async (searchValue: string): Promise<searchProps[]> => {
  const querySnapshot = await getDocs(collection(db, "Products"));
  const results: searchProps[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.name.toLowerCase().includes(searchValue.toLowerCase())) {
      results.push({
        name: data.name,
        id: data.id,
        numSearch: data.numSearch,
        category: data.category,
      });
    }
  });

  return results;
};
export const SearchBlog = async (searchValue): Promise<SearchBlogsProps[]> => {
  const data = await getDocs(collection(db, "blogs"));
  const results: SearchBlogsProps[] = [];
  data.forEach(async (item) => {
    if (item.data().title.toLowerCase().includes(searchValue.toLowerCase())) {
      results.push({
        id: item.id as string,
        name: item.data().title as string,
        numberOfSearches: item.data().numberOfSearches as number,
      });
    }
  });

  return results;
};
export const SearchCategory = async (
  searchValue: string
): Promise<SearchCategoryProps[]> => {
  const data = await getDocs(collection(db, "category"));
  const results: SearchCategoryProps[] = [];
  data.forEach(async (item) => {
    if (item.data().name.toLowerCase().includes(searchValue.toLowerCase())) {
      results.push({
        id: item.id as string,
        name: item.data().name as string,
        numberOfSearches: item.data().numberOfSearches as number,
      });
    }
  });

  return results;
};
export const getAllOrder = async (): Promise<OrderType[]> => {
  const getorder = await getDocs(collection(db, "order"));
  const data: OrderType[] = [];
  getorder.forEach((item) =>
    data.push({ ...(item.data() as OrderType), id: item.id })
  );
  return data;
};
export const deleteProducts = async (id: string) => {
  await deleteDoc(doc(db, "Products", id))
    .then(() => console.log("Document successfully deleted!"))
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
export const addContactUs = async ({
  title,
  formMessage,
  imageUrl,
}: contactUSProps): Promise<string> => {
  const refSet = await addDoc(collection(db, "ContactUs"), {
    title,
    formMessage,
    imageUrl,
  });
  return refSet.id;
};
export const getConactUs = async (): Promise<contactUSProps[]> => {
  const results: contactUSProps[] = [];
  const data = await getDocs(collection(db, "ContactUs"));
  data.forEach((item) =>
    results.push({ ...(item.data() as contactUSProps), id: item.id })
  );
  return results;
};
export const deleteContactUs = async (id: string) => {
  await deleteDoc(doc(db, "ContactUs", id)).then((res) =>
    console.log("delete the concat us ")
  );
};
export const UpdateContactUUs = async ({
  title,
  formMessage,
  imageUrl,
  id,
}: contactUSProps) => {
  await updateDoc(doc(db, "ContactUs", id), {
    title,
    formMessage,
    imageUrl,
  });
};
