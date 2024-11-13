import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { OrderType } from "@/types/types";
import { createOrder } from "./orderThunk";

interface OrderState {
  order: OrderType[] | null;
  status: string;
  errorMessage: string;
}

const initialState: OrderState = {
  order: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage = action.error.message || "Failed to create order";
      });
  },
});

export default orderSlice.reducer;
