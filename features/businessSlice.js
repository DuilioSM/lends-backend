import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    articles: null,
  },
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBusiness } = businessSlice.actions;

export const selectBusiness = (state) => state.business.business;

export default businessSlice.reducer;
