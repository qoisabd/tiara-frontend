import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/get-all-category`
      );
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
