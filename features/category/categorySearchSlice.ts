import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { CategoryCardType } from "@/types/types";
import { fetchSearchCategory } from "./categoryThunk";

interface CategoryState {
  category: CategoryCardType[];
  searchResults: CategoryCardType[];
  status: string;
  errorMessage: string;
}

const initialState: CategoryState = {
  category: [],
  searchResults: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const categorySearchSlice = createSlice({
  name: "categorySearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch search category
    builder
      .addCase(fetchSearchCategory.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchSearchCategory.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchCategory.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch search results";
      });
  },
});

export default categorySearchSlice.reducer;
