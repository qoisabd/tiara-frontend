import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderResponseType } from "@/types/types";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order: OrderResponseType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/create-order-snap-transaction`,
        order
      );

      return response.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
