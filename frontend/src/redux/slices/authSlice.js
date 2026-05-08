import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
} from "../thunks/authThunks";

const userInfoFromStorage = localStorage.getItem(
  "userInfo"
)
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.userInfo = null;

      localStorage.removeItem("userInfo");
    },
  },

  extraReducers: (builder) => {
    builder

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.userInfo = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.userInfo = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;