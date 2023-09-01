import { configureStore } from "@reduxjs/toolkit";
import planSlice from "./typePlan";

const store = configureStore({
  reducer: {
    plan: planSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store
