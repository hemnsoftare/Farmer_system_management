import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Order";
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
