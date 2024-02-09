import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "../features/listSlice";

export const store = configureStore({
  reducer: formDataReducer,
});
