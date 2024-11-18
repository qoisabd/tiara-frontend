import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { OrderHistoryType } from "@/types/types";
import { fetchOrdersByUserId } from "./orderThunk";

interface OrderHistoryState {
  orderHistory: OrderHistoryType[];
  status: string;
  errorMessage: string;
}

const initialState: OrderHistoryState = {
  orderHistory: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch order history";
      });
  },
});

export default orderHistorySlice.reducer;
