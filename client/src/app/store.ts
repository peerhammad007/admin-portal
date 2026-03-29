import { configureStore } from "@reduxjs/toolkit";
import policyReducer from "../features/policies/store/policySlice";

export const store = configureStore({
  reducer: {
    policy: policyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;