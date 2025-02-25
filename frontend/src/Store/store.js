import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import recipeReducer from "./Slices/recipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
  },
});
