import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { SendEmailType } from "@/types/types";
import { forgotPassword, sendEmailVerification } from "./authThunk";

interface SendEmailState {
  sendEmail: SendEmailType[];
  status: string;
  errorMessage: string;
}

const initialState: SendEmailState = {
  sendEmail: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.sendEmail = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to forgot password";
      });

    // send email verification
    builder
      .addCase(sendEmailVerification.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(sendEmailVerification.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.sendEmail = action.payload;
      })
      .addCase(sendEmailVerification.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to send email verification";
      });
  },
});

export default sendEmailSlice.reducer;
