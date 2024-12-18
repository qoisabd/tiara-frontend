import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNameCategory,
  fetchAllCategory,
  createCategory,
  updateCategory,
  setInactiveCategory,
  setActiveCategory,
} from "./adminThunk";
import { Status } from "@/utils/Status";
import { CategoryType } from "@/types/types";

interface CategoryState {
  categories: CategoryType[];
  status: string;
  errorMessage: string;
}

const initialState: CategoryState = {
  categories: [],
  status: Status.IDLE,
  errorMessage: "",
};

const adminCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Name Categories
    builder
      .addCase(fetchNameCategory.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchNameCategory.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.categories = action.payload;
      })
      .addCase(fetchNameCategory.rejected, (state, action) => {
        state.status = "FAILED";
        state.errorMessage = action.error.message || "Something went wrong";
      });

    // Fetch All Categories
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = "FAILED";
        state.errorMessage = action.error.message || "Something went wrong";
      });

    // Create Category
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || "Failed to create category";
      });

    // Update Category
    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        const categoryIndex = state.categories.findIndex(
          (category) => category.ct_id === action.payload.id
        );
        if (categoryIndex !== -1) {
          state.categories[categoryIndex] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || "Failed to update category";
      });

    // Inactive Category
    builder
      .addCase(setInactiveCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.ct_id !== action.payload.id
        );
      })
      .addCase(setInactiveCategory.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || "Failed to inactive category";
      });

    // Active Category
    builder
      .addCase(setActiveCategory.fulfilled, (state, action) => {
        const categoryIndex = state.categories.findIndex(
          (category) => category.ct_id === action.payload.id
        );
        if (categoryIndex !== -1) {
          state.categories[categoryIndex] = action.payload;
        }
      })
      .addCase(setActiveCategory.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || "Failed to active category";
      });
  },
});

export default adminCategorySlice.reducer;
