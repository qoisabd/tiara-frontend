import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "@/types/types";
import { fetchAllCategory } from "./homeThunk";

interface CategoryState {
  category: CategoryType[];
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
      .addCase(fetchAllCategory.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.category = action.payload.data;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage = action.error.message || "Failed to fetch category";
      });
  },
});

export default categorySlice.reducer;
