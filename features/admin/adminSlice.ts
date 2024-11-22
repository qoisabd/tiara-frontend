import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserCount,
  fetchProductCount,
  fetchOrderCount,
  fetchTotalAmount,
} from "./adminThunk";
import { Status } from "@/utils/Status";
import { AdminStateType } from "@/types/types";

const initialState: AdminStateType = {
  totalUser: null,
  totalProduct: null,
  totalOrder: null,
  totalAmount: null,
  status: Status.IDLE,
  error: {
    totalUser: null,
    totalProduct: null,
    totalOrder: null,
    totalAmount: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User Count
      .addCase(fetchUserCount.pending, (state) => {
        state.status = Status.LOADING;
        state.error.totalUser = null;
      })
      .addCase(fetchUserCount.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.totalUser = action.payload;
      })
      .addCase(fetchUserCount.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error.totalUser =
          action.error.message || "Failed to fetch user count";
      })

      // Product Count
      .addCase(fetchProductCount.pending, (state) => {
        state.status = Status.LOADING;
        state.error.totalProduct = null;
      })
      .addCase(fetchProductCount.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.totalProduct = action.payload;
      })
      .addCase(fetchProductCount.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error.totalProduct =
          action.error.message || "Failed to fetch product count";
      })

      // Order Count
      .addCase(fetchOrderCount.pending, (state) => {
        state.status = Status.LOADING;
        state.error.totalOrder = null;
      })
      .addCase(fetchOrderCount.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.totalOrder = action.payload;
      })
      .addCase(fetchOrderCount.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error.totalOrder =
          action.error.message || "Failed to fetch order count";
      })

      // Total Amount
      .addCase(fetchTotalAmount.pending, (state) => {
        state.status = Status.LOADING;
        state.error.totalAmount = null;
      })
      .addCase(fetchTotalAmount.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.totalAmount = action.payload;
      })
      .addCase(fetchTotalAmount.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error.totalAmount =
          action.error.message || "Failed to fetch total amount";
      });
  },
});

export default adminSlice.reducer;
