import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { LoginType } from "@/types/types";
import { loginUser } from "./authThunk";
import Cookies from "js-cookie";
interface LoginState {
  login: LoginType[];
  status: string;
  errorMessage: string;
}

const initialState: LoginState = {
  login: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.login = action.payload;
        Cookies.set("Authentication-User-Rifqi-Topup", action.payload.token, {
          expires: 1,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage = action.error.message || "Failed to login";
      });
  },
});

export default loginSlice.reducer;
