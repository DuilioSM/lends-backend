import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import businessReducer from "./features/businessSlice";
import authReducer from "./features/authSlice";
import ordersReducer from "./features/ordersSlice";
import categoriesReducer from "./features/categoriesSlice";


export const store = configureStore({
  reducer: {
    basket: basketReducer,
    business: businessReducer,
    auth: authReducer,
    orders: ordersReducer,
    categories: categoriesReducer
  },
});
