import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import instituteReducer from "./slices/instituteSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    institute: instituteReducer,
  },
});
