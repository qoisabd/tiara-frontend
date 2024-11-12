import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryDetail } from "./categoryThunk";
import { Status } from "@/utils/Status";
import { CategoryDetailType } from "@/types/types";

interface CategoryDetailState {
  categoryDetail: CategoryDetailType[];
  status: string;
  errorMessage: string;
}

const initialState: CategoryDetailState = {
  categoryDetail: [],
  status: Status.IDLE,
  errorMessage: "",
};

const CategoryDetailSlice = createSlice({
  name: "categoryDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryDetail.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchCategoryDetail.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        // Ensure action.payload is an array, otherwise, convert it to an array
        state.categoryDetail = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(fetchCategoryDetail.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch category detail";
      });
  },
});

export default CategoryDetailSlice.reducer;
