import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchProductDetails,
} from "../thunks/productThunks";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products = action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )

      // Fetch single product
      .addCase(
        fetchProductDetails.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProductDetails.fulfilled,
        (state, action) => {
          state.loading = false;

          state.product = action.payload;
        }
      )

      .addCase(
        fetchProductDetails.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export default productSlice.reducer;