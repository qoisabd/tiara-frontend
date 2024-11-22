import { createSlice } from "@reduxjs/toolkit";
import { Status } from "@/utils/Status";
import { logoutUser } from "./authThunk";

interface LogoutState {
  user: any;
  isAuthenticated: boolean;
  status: string;
  errorMessage: string;
}

const initialState: LogoutState = {
  user: null,
  isAuthenticated: false,
  status: Status.IDLE,
  errorMessage: "",
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = Status.SUCCESS;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { setUser } = logoutSlice.actions;
export default logoutSlice.reducer;
