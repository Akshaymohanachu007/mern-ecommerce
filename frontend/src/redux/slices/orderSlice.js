import { createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  fetchMyOrders,
} from "../thunks/orderThunks";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        createOrder.fulfilled,
        (state, action) => {
          state.loading = false;

          state.order = action.payload;
        }
      )

      .addCase(
        createOrder.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )

   
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchMyOrders.fulfilled,
        (state, action) => {
          state.loading = false;

          state.orders = action.payload;
        }
      )

      .addCase(
        fetchMyOrders.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export default orderSlice.reducer;