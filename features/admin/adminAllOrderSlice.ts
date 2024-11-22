import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { OrderHistoryType } from "@/types/types";
import { fetchAllOrder } from "./adminThunk";

interface AllOrderState {
  adminAllOrder: OrderHistoryType[];
  status: string;
  errorMessage: string;
}

const initialState: AllOrderState = {
  adminAllOrder: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const AdminAllOrderSlice = createSlice({
  name: "allOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrder.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.adminAllOrder = action.payload;
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch order history";
      });
  },
});

export default AdminAllOrderSlice.reducer;
