import { create } from "zustand";
import {
  FilterProps,
  OrderType,
  ProductFormInput,
  typeFilter,
} from "../action";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface FilterState {
  category: string;
  sortBy: string;
  filter: {
    brand: string[];
    color: string[];
    discount: boolean;
    price: number[];
  };
  setSortBy: (sortBy: string) => void;
  setCategory: (category: string) => void;
  setAllFilter: (filterData: typeFilter) => void;
  updateBrand: (brand: string) => void;
  updateColor: (color: string) => void;
  updateDiscount: () => void;
  updatePrice: (price: number[]) => void;
  resetAll: () => void;
}

const useFilterProducts = create<FilterState>((set) => ({
  category: "",
  sortBy: "new",
  filter: {
    brand: [],
    color: [],
    discount: false,
    price: [1, 100000],
  },
  setSortBy: (sortBy: string) => {
    console.log(sortBy);
    set({ sortBy });
  },
  setCategory: (category: string) => set({ category }),
  setAllFilter: (filterData: typeFilter) => {
    console.log(filterData);

    // set({ filter: filterData })
  },
  updateBrand: (brand: string) =>
    set((state) => ({
      filter: {
        ...state.filter,
        brand: state.filter.brand.includes(brand)
          ? state.filter.brand.filter((item: string) => item !== brand)
          : [...state.filter.brand, brand],
      },
    })),
  updateColor: (color: string) =>
    set((state) => ({
      filter: {
        ...state.filter,
        color: state.filter.color.includes(color)
          ? state.filter.color.filter((item: string) => item !== color)
          : [...state.filter.color, color],
      },
    })),
  updateDiscount: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        discount: !state.filter.discount,
      },
    })),
  updatePrice: (price: number[]) =>
    set((state) => ({
      filter: {
        ...state.filter,
        price,
      },
    })),
  resetAll: () =>
    set(() => ({
      filter: {
        brand: [],
        color: [],
        discount: false,
        price: [1, 100000],
      },
    })),
}));

export default useFilterProducts;
export const selectedProduct = create<{
  item: ProductFormInput;
  selectProduct: (item: ProductFormInput) => void;
}>((set) => ({
  item: JSON.parse(localStorage.getItem("selectedProduct")) || null,
  selectProduct: (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    set(() => ({ item }));
  },
}));

export const selectedOrder = create<{
  order: OrderType;
  selectOrder: (order: OrderType) => void;
}>((set) => ({
  order: JSON.parse(localStorage.getItem("selectedOrder")) || null,
  selectOrder: (order) => {
    localStorage.setItem("selectedOrder", JSON.stringify(order));
    set(() => ({ order }));
  },
}));

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
