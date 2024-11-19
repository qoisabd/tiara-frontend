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
import orderReducer from "@/features/order/orderSlice";
import orderHistoryReducer from "@/features/order/orderHistorySlice";
import promotionReducer from "@/features/promotion/promotionSlice";
import adminReducer from "@/features/admin/adminSlice";
import recentOrderReducer from "@/features/admin/adminRecentOrderSlice";
import adminUserReducer from "@/features/admin/adminUserSlice";

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
      orderReducer,
      orderHistoryReducer,
      promotionReducer,
      adminReducer,
      recentOrderReducer,
      adminUserReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
