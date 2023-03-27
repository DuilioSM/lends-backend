import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
};

export const userSelectedSlice = createSlice({
  name: "userSelected",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory } = userSelectedSlice.actions;

export const selectCategory = (state) => state.userSelected.category;

export default userSelectedSlice.reducer;
