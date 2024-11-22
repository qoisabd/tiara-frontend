import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllPromotionCode = createAsyncThunk(
  "promotion/fetchAllPromotionCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/promotion/get-all-promotion`
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
