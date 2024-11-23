import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { loginWithGoogle } from "./authThunk";
import Cookies from "js-cookie";
interface LoginWithGoogleState {
  status: string;
  errorMessage: string;
}

const initialState: LoginWithGoogleState = {
  status: Status.IDLE,
  errorMessage: "",
};

export const loginWithGoogleSlice = createSlice({
  name: "loginWithGoogle",
  initialState,
  reducers: {
    resetLoginWithGoogle: (state) => {
      state.status = Status.IDLE;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        Cookies.set(
          process.env.NEXT_PUBLIC_COOKIE_NAME || "",
          action.payload.data.token,
          {
            expires: action.payload.data.rememberMe,
          }
        );
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to login with Google";
      });
  },
});

export const { resetLoginWithGoogle } = loginWithGoogleSlice.actions;
export default loginWithGoogleSlice.reducer;
