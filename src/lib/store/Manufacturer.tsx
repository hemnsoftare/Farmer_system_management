import { create } from "zustand";
import { ProductFormInput } from "../action";

interface ManufacturerStore {
  items: ProductFormInput[];
  addItem: (product: ProductFormInput) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  toggleItem: (product: ProductFormInput) => void; // New function
}

export const selectedProductsManufacturer = create<ManufacturerStore>((set) => {
  const savedItems = localStorage.getItem("manufacturerItems");
  const initialItems = savedItems ? JSON.parse(savedItems) : [];

  return {
    items: initialItems,
    addItem: (product) =>
      set((state) => {
        const newItems = [...state.items, product];
        localStorage.setItem("manufacturerItems", JSON.stringify(newItems));
        return { items: newItems };
      }),
    removeItem: (productId) =>
      set((state) => {
        const newItems = state.items.filter((item) => item.id !== productId);
        localStorage.setItem("manufacturerItems", JSON.stringify(newItems));
        return { items: newItems };
      }),
    clearItems: () => {
      localStorage.removeItem("manufacturerItems");
      set({ items: [] });
    },
    toggleItem: (product) =>
      set((state) => {
        const exists = state.items.some((item) => item.id === product.id);
        const newItems = exists
          ? state.items.filter((item) => item.id !== product.id)
          : [...state.items, product];
        localStorage.setItem("manufacturerItems", JSON.stringify(newItems));
        return { items: newItems };
      }),
  };
});
