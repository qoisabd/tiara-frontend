import { Status } from "@/utils/Status";
import { createSlice } from "@reduxjs/toolkit";
import { RegisterType } from "@/types/types";
import { registerUser } from "./authThunk";

interface RegisterState {
  register: RegisterType[];
  status: string;
  errorMessage: string;
}

const initialState: RegisterState = {
  register: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.register = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage = action.error.message || "Failed to register";
      });
  },
});

export default registerSlice.reducer;
