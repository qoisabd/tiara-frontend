import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/features/auth/loginSlice";
import registerReducer from "@/features/auth/registerSlice";
import forgotPasswordReducer from "@/features/auth/forgotPasswordSlice";
import updateResetPasswordReducer from "@/features/auth/updateResetPasswordSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loginReducer,
      registerReducer,
      forgotPasswordReducer,
      updateResetPasswordReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
