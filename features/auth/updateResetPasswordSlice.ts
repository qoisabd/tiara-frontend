import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { UpdateResetPasswordType } from "@/types/types";
import { updateResetPassword } from "./authThunk";

interface UpdateResetPasswordState {
  updateResetPassword: UpdateResetPasswordType[];
  status: string;
  errorMessage: string;
}

const initialState: UpdateResetPasswordState = {
  updateResetPassword: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const updateResetPasswordSlice = createSlice({
  name: "updateResetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateResetPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(updateResetPassword.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.updateResetPassword = action.payload;
      })
      .addCase(updateResetPassword.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to update reset password";
      });
  },
});

export default updateResetPasswordSlice.reducer;
