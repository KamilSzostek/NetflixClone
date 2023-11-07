import { configureStore } from "@reduxjs/toolkit";
import planSlice from "./typePlan";
import logSlice  from "./isLogged";

const store = configureStore({
  reducer: {
    plan: planSlice,
    log: logSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store
