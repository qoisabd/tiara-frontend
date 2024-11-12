import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/features/auth/loginSlice";
import registerReducer from "@/features/auth/registerSlice";
import forgotPasswordReducer from "@/features/auth/forgotPasswordSlice";
import updateResetPasswordReducer from "@/features/auth/updateResetPasswordSlice";
import loginWithGoogleReducer from "@/features/auth/loginWithGoogleSlice";
import themeReducer from "@/features/theme/themeSlice";
import categoryReducer from "@/features/category/categorySlice";
import categoryDetailReducer from "@/features/category/categoryDetailSlice";
import productDetailReducer from "@/features/product/productDetailSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loginReducer,
      registerReducer,
      forgotPasswordReducer,
      updateResetPasswordReducer,
      loginWithGoogleReducer,
      themeReducer,
      categoryReducer,
      categoryDetailReducer,
      productDetailReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
