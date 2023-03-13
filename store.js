import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import basketReducer from "./features/basketSlice";
import businessReducer from "./features/businessSlice";
import authReducer from "./features/authSlice";
import ordersReducer from "./features/ordersSlice";
import categoriesReducer from "./features/categoriesSlice";
import { businessApi } from "./services/businessApi";
import { categoriesApi } from "./services/categoriesApi";

export const store = configureStore({
  reducer: {
    [businessApi.reducerPath]: businessApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    basket: basketReducer,
    business: businessReducer,
    auth: authReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      businessApi.middleware,
      categoriesApi.middleware
    ),
});

setupListeners(store.dispatch);
