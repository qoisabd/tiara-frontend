import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUser,
  createUser,
  updateUserById,
  deleteUserById,
} from "./adminThunk";
import { RegisterType } from "@/types/types";
import { Status } from "@/utils/Status";
import { Users } from "lucide-react";

interface AdminUserState {
  users: RegisterType[];
  status: string;
  errorMessage: string | null;
}

const initialState: AdminUserState = {
  users: [],
  status: Status.IDLE,
  errorMessage: null,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All User
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.users = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage = action.error.message || "Failed to fetch users";
      })

      //   Create User
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        console.log(state.users);
      })

      //   Update User
      .addCase(updateUserById.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (user) => user.us_id === action.payload.userId
        );
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
      })

      //   Delete User
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.us_id !== action.payload.id
        );
      });
  },
});

export default adminUserSlice.reducer;
