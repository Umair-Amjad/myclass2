import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import instituteReducer from "./slices/instituteSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    institute: instituteReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
      immutableCheck: { warnAfter: 128 },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
