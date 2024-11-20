import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProduct,
  updateProductById,
} from "./adminThunk";
import { Status } from "@/utils/Status";
import { ProductType } from "@/types/types";

interface ProductState {
  products: ProductType[];
  status: string;
  errorMessage: string;
}

const initialState: ProductState = {
  products: [],
  status: Status.IDLE,
  errorMessage: "",
};

const adminProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "FAILED";
        state.errorMessage = action.error.message || "Something went wrong";
      });

    // update Product
    builder
      .addCase(updateProductById.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.products = state.products.map((product) => {
          if (product.pr_id === action.payload.pr_id) {
            return action.payload;
          }
          return product;
        });
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.status = "FAILED";
        state.errorMessage = action.error.message || "Something went wrong";
      });

    // Fetch Product
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.products = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.status = "FAILED";
        state.errorMessage = action.error.message || "Something went wrong";
      });
  },
});

export default adminProductSlice.reducer;
