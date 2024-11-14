import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-all-product`
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      if (!Array.isArray(data)) {
        return rejectWithValue("Received data is not an array");
      }

      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "product/fetchProductDetail",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-detail/${categoryId}`
      );

      const data = response.data.data;

      if (!data) {
        return rejectWithValue("Received data is not an object");
      }

      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
