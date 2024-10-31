import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { ForgotPasswordType } from "@/types/types";
import { forgotPassword } from "./authThunk";

interface ForgotPasswordState {
  forgotPassword: ForgotPasswordType[];
  status: string;
  errorMessage: string;
}

const initialState: ForgotPasswordState = {
  forgotPassword: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.forgotPassword = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to forgot password";
      });
  },
});

export default forgotPasswordSlice.reducer;
