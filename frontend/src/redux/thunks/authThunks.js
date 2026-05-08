import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/users/login",
        userData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/users/register",
        userData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);