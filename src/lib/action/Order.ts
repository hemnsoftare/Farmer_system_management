// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemCartProps } from "@/lib/action";

// Load cart data from localStorage if it exists
export const loadCartFromLocalStorage = (): ItemCartProps[] => {
  var data;
  try {
    data = localStorage.getItem("cart");
  } catch (error) {}
  console.log("in get local strogae");
  return data ? JSON.parse(data) : [];
};

// Save cart data to localStorage
const saveCartToLocalStorage = (cart: ItemCartProps[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Initial state
const initialState: ItemCartProps[] = loadCartFromLocalStorage();

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemCartProps>) {
      // Find the index of the existing item by both name and color
      const existingItemIndex = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.colors.name === action.payload.colors.name
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity by adding the new quantity
        state[existingItemIndex].quantity = action.payload.quantity;
      } else {
        // If the item does not exist, add it to the cart

        state.push(action.payload);
      }

      // Save updated state to localStorage
      saveCartToLocalStorage(state);
    },

    updateItem(
      state,
      action: PayloadAction<{
        color: string;
        name: string;
        id: string;
        quantity?: number;
        type: "increase" | "decrease";
      }>
    ) {
      const updatedItems = state.map((item) => {
        if (
          item.id === action.payload.id &&
          item.colors.color === action.payload.color
        ) {
          const newQuantity =
            action.payload.type === "increase"
              ? item.quantity + 1
              : item.quantity - 1;

          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Filter out any items with quantity 0 after decreasing
      const filteredItems = updatedItems.filter((item) => item.quantity > 0);
      saveCartToLocalStorage(filteredItems); // Save updated state to localStorage
      return filteredItems;
    },
    removeItem(
      state,
      action: PayloadAction<{ name: string; id: string; color: string }>
    ) {
      const filteredItems = state.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.colors.color !== action.payload.color
      );
      saveCartToLocalStorage(filteredItems); // Save updated state to localStorage
      return filteredItems;
    },
    removeAll() {
      saveCartToLocalStorage([]); // Clear localStorage when all items are removed
      return [];
    },
  },
});

export const { addToCart, updateItem, removeItem, removeAll } = cart.actions;
export default cart.reducer;
