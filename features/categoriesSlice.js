import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = [...state.categories, action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCategories } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;
