import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.userToken = action.payload;
    },
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    removeToken: (state) => {
      state.userToken = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken, addUserData } = authSlice.actions;

export const getToken = (state) => state.auth.userToken;
export const selectUser = (state) => state.auth.userData;

export default authSlice.reducer;
