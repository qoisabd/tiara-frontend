import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/features/auth/loginSlice";
import registerReducer from "@/features/auth/registerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loginReducer,
      registerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
