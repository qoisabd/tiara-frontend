import { createSlice } from "@reduxjs/toolkit";
import { fetchProductDetail } from "./productThunk";
import { Status } from "@/utils/Status";
import { ProductDetailType } from "@/types/types";

interface ProductState {
  productDetail: ProductDetailType[];
  status: string;
  errorMessage: string;
}

const initialState: ProductState = {
  productDetail: [],
  status: Status.IDLE,
  errorMessage: "",
};

const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.productDetail = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch product detail";
      });
  },
});

export default productDetailSlice.reducer;
