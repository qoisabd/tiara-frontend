import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUser,
  createUser,
  updateUserById,
  deleteUserById,
} from "./adminThunk";
import { RegisterType } from "@/types/types";
import { Status } from "@/utils/Status";

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
      })
      .addCase(createUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Failed to create user";
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
      .addCase(updateUserById.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Failed to update user";
      })

      //   Delete User
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.us_id !== action.payload.id
        );
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Failed to delete user";
      });
  },
});

export default adminUserSlice.reducer;
