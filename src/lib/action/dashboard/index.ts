import { db } from "@/config/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  BlogProps,
  favorite,
  OrderType,
  ProductFormInput,
  teamProps,
  userProps,
  UserType,
} from "..";

export async function getAllUsers(): Promise<userProps[]> {
  try {
    const usersRef = collection(db, "user");
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users as userProps[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
export const getAllBlogs = async (): Promise<BlogProps[]> => {
  const data = await getDocs(collection(db, "blogs"));
  const blogs = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    date: doc.data().date ? doc.data().date.toDate() : new Date(),
  })) as BlogProps[];
  return blogs;
};
export const getAllOrder = async (): Promise<OrderType[]> => {
  const getorder = await getDocs(collection(db, "order"));
  const data: OrderType[] = [];
  getorder.forEach((item) =>
    data.push({ ...(item.data() as OrderType), id: item.id })
  );
  return data;
};
export const getAllTeam = async (): Promise<teamProps[]> => {
  const data = await getDocs(collection(db, "team"));
  const result: teamProps[] = [];
  data.forEach((item) =>
    result.push({ ...(item.data() as teamProps), id: item.id })
  );
  return result;
};

// get all products
export const getAllProducts = async (): Promise<ProductFormInput[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));

    const products: ProductFormInput[] = querySnapshot.docs.map((doc) => {
      const data = doc.data(); // Firestore document data

      return {
        id: doc.id,
        name: data.name ?? "", // Ensure required fields have default values
        price: data.price ?? 0,
        brand: data.brand ?? "",
        colors: data.colors ?? [], // Ensure it's an array
        category: data.category ?? "",
        Bigimage: data.Bigimage ?? null,
        imageSmall: data.imageSmall ?? [],
        discount: data.discount ?? 0,
        details: data.details ?? [],
        numberFavorite: data.numberFavorite ?? 0,
        numberSale: data.numberSale ?? 0,
        date: data.date ? new Date(data.date) : new Date(), // Convert Firestore timestamp to Date
        colorsName: data.colorsName ?? [],
        isDiscount: data.isDiscount ?? false,
        bigimageUrl: data.bigimageUrl ?? "",
        numSearch: data.numSearch ?? 0,
        smallimageUrl: data.smallimageUrl ?? [],
      };
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const getAllFavorite = async () => {
  const userDocs = await getDocs(collection(db, "favorite"));
  let allFavorites = [];

  if (userDocs.empty) {
    return [];
  }

  for (const userDoc of userDocs.docs) {
    const itemsCollectionRef = collection(db, "favorite", userDoc.id, "items");
    const itemsSnapshot = await getDocs(itemsCollectionRef);

    if (itemsSnapshot.empty) {
      continue;
    }

    const userFavorites = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    allFavorites.push(...userFavorites);
  }
  return allFavorites;
};

export const getAllUser = async (): Promise<UserType[]> => {
  try {
    const usersRef = collection(db, "user");
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as UserType),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
export const getUserById = async (userId: string): Promise<UserType | null> => {
  try {
    const usersRef = doc(db, "user", userId);
    const usersSnapshot = await getDoc(usersRef);
    const user: UserType = usersSnapshot.data() as UserType;

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};
export const getOrder = async (userid: string): Promise<OrderType[]> => {
  const q = query(collection(db, "order"), where("userId", "==", userid));
  const querySnapshot = await getDocs(q);

  const newProducts: OrderType[] = [];
  querySnapshot.forEach((doc) => {
    newProducts.push({ ...(doc.data() as OrderType), id: doc.id });
  });
  return newProducts;
};
export const getProductsBYDiscountAndCategoryAndSale = async ({
  col,
  category,
}: {
  col: string;
  category: string;
}): Promise<ProductFormInput[]> => {
  let q;
  if (col === "date") {
    q =
      category !== ""
        ? query(
            collection(db, "Products"),
            where("category", "==", category), // ✅ Correct placement
            orderBy(col, "desc")
          )
        : query(collection(db, "Products"), orderBy(col, "asc"));
  } else if (col !== "discount") {
    q =
      category !== ""
        ? query(
            collection(db, "Products"),
            where("category", "==", category), // ✅ Correct placement
            orderBy(col, "desc")
          )
        : query(collection(db, "Products"), orderBy(col, "desc"));
  } else {
    q =
      category !== ""
        ? query(
            collection(db, "Products"),
            where("category", "==", category), // ✅ Correct placement
            where("isDiscount", "==", true)
          )
        : query(collection(db, "Products"), where("isDiscount", "==", true));
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as ProductFormInput), // Spread item data
    id: doc.id, // Add the `id` field
  }));
};

export const deleteBlog = async (id: string) => {
  try {
    await deleteDoc(doc(db, "blogs", id)).then(() => {});
  } catch (error) {}
};
