import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  userData: {},
  userBusiness: {
    location: {
      lat: null,
      long: null,
    },
    formatted_address: null,
    rating: null,
  },
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
    addUserBusiness: (state, action) => {
      state.userBusiness = action.payload;
    },
    updateUserBusiness: (state, action) => {
      state.userBusiness = { ...state.userBusiness, ...action.payload };
    },
    removeToken: (state) => {
      state.userToken = null;
      state.userData = {};
      state.userBusiness = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToken,
  removeToken,
  addUserData,
  addUserBusiness,
  updateUserBusiness,
} = authSlice.actions;

export const getToken = (state) => state.auth.userToken;
export const selectUser = (state) => state.auth.userData;
export const selectUserBusiness = (state) => state.auth.userBusiness;

export default authSlice.reducer;
