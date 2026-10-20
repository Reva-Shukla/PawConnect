
import { configureStore } from "@reduxjs/toolkit";
import shelterReducer from "./slices/shelterSlice";

export const store = configureStore({
  reducer: {
    shelters: shelterReducer,
  },
});
