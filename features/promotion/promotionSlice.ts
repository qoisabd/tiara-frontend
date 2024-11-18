import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { PromoCodeType } from "@/types/types";
import { fetchAllPromotionCode } from "./promotionThunk";

interface PromotionState {
  promotion: PromoCodeType[] | null;
  status: string;
  errorMessage: string;
}

const initialState: PromotionState = {
  promotion: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPromotionCode.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchAllPromotionCode.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.promotion = action.payload;
      })
      .addCase(fetchAllPromotionCode.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch promotion";
      });
  },
});

export default promotionSlice.reducer;
