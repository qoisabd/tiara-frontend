import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("darkMode") === "true";
  }
  return false;
};

const initialState: ThemeState = {
  darkMode: getInitialDarkMode(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", state.darkMode.toString());
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", action.payload.toString());
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
