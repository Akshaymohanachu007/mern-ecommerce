import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "/products"
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

// Fetch single product
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",

  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/products/${id}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);