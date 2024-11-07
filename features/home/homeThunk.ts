import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryCardType } from "@/types/types";

export const fetchCategoryCard = createAsyncThunk(
  "category/fetchAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/get-all-category`
      );

      // Check if the actual data is nested in `response.data.data`
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      if (!Array.isArray(data)) {
        return rejectWithValue("Received data is not an array");
      }

      const filteredDataCard: CategoryCardType[] = data.map(
        (category: any) => ({
          ct_id: category.ct_id,
          ct_name: category.ct_name,
          ct_image: category.ct_image,
          ct_game_publisher: category.ct_game_publisher,
        })
      );

      return filteredDataCard;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
