import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  userData: {},
  userBusiness: {}
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
    removeToken: (state) => {
      state.userToken = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken, addUserData, addUserBusiness } = authSlice.actions;

export const getToken = (state) => state.auth.userToken;
export const selectUser = (state) => state.auth.userData;
export const selectUserBusiness = (state) => state.auth.userBusiness;

export default authSlice.reducer;
