import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { OrderHistoryType } from "@/types/types";
import { fetchRecentOrder } from "./adminThunk";

interface RecentOrderState {
  recentOrder: OrderHistoryType[];
  status: string;
  errorMessage: string;
}

const initialState: RecentOrderState = {
  recentOrder: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const recentOrderSlice = createSlice({
  name: "recentOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentOrder.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchRecentOrder.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.recentOrder = action.payload;
      })
      .addCase(fetchRecentOrder.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch order history";
      });
  },
});

export default recentOrderSlice.reducer;
