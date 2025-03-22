import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../store/Order";
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
