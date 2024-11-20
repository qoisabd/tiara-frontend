import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategory } from "./adminThunk";
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
    // Get All Categories
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
  },
});

export default adminCategorySlice.reducer;
