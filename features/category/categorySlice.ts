import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { CategoryCardType } from "@/types/types";
import { fetchCategoryCard } from "./categoryThunk";

interface CategoryState {
  category: CategoryCardType[];
  status: string;
  errorMessage: string;
}

const initialState: CategoryState = {
  category: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryCard.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchCategoryCard.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.category = action.payload;
      })
      .addCase(fetchCategoryCard.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage = action.error.message || "Failed to fetch category";
      });
  },
});

export default categorySlice.reducer;
