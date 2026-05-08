import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";

// Create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",

  async (orderData, thunkAPI) => {
    try {
      const {
        auth: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axiosInstance.post(
        "/orders",
        orderData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

// My orders
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",

  async (_, thunkAPI) => {
    try {
      const {
        auth: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axiosInstance.get(
        "/orders/myorders",
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);