import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      action.payload.map((item) => state.items.push(item))
    },

  },
});

// Action creators are generated for each case reducer function
export const { addOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.items;

export default ordersSlice.reducer;
