import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterType } from "@/types/types";

export const fetchUserCount = createAsyncThunk(
  "admin/fetchUserCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-user-count`
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

export const fetchProductCount = createAsyncThunk(
  "admin/fetchProductCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-product-count`
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

export const fetchOrderCount = createAsyncThunk(
  "admin/fetchOrderCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-order-count`
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

export const fetchTotalAmount = createAsyncThunk(
  "admin/fetchTotalAmount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-total-amount`
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

export const fetchAllOrder = createAsyncThunk(
  "admin/fetchAllOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-all-order`
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

export const fetchRecentOrder = createAsyncThunk(
  "admin/fetchRecentOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-order-today`
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

export const fetchAllUser = createAsyncThunk(
  "admin/fetchAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-all-user`
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

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (data: RegisterType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create-user`,
        data
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

export const updateUserById = createAsyncThunk(
  "admin/updateUserById",
  async (
    { userId, data }: { userId: number; data: RegisterType },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update-user/${userId}`,
        data
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

export const deleteUserById = createAsyncThunk(
  "admin/deleteUserById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete-user/${userId}`
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
