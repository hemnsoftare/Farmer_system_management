// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemCartProps } from "@/type/globals";

const initialState: ItemCartProps[] = [];
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemCartProps>) {
      const isExistaName = state.some(
        (item) => item.name === action.payload.name
      );
      const isExistColor = state.some(
        (item) =>
          item.colors.name === action.payload.colors.name &&
          item.name === action.payload.name
      );
      if (!isExistColor) {
        state.push(action.payload);
      } else if (!isExistaName) {
        state.push(action.payload);
      } else {
        return state.map((item) =>
          item.name === action.payload.name &&
          item.colors.name === action.payload.colors.name
            ? { ...item, quantity: action.payload.quantity } // Update quantity
            : item
        );
      }
    },
    updateItem(
      state,
      action: PayloadAction<{
        color: string;
        name: string;
        quantity?: number;
        type: "increase" | "decrease";
      }>
    ) {
      // Map through the items to update the quantity based on the action type
      const updatedItems = state.map((item) => {
        if (
          item.name === action.payload.name &&
          item.colors.color === action.payload.color
        ) {
          const newQuantity =
            action.payload.type === "increase"
              ? item.quantity + 1
              : item.quantity - 1;

          // Return updated item with new quantity
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Filter out any items with quantity 0 after decreasing
      return updatedItems.filter((item) => item.quantity > 0);
    },
    removeItem(state, action: PayloadAction<{ name: string; color: string }>) {
      return state.filter(
        (item) =>
          item.name !== action.payload.name &&
          action.payload.color === item.colors.color
      );
    },
  },
});
console.log(cart.getInitialState);
export const { addToCart, updateItem, removeItem } = cart.actions;
export default cart.reducer;
