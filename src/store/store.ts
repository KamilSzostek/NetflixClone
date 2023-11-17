import { configureStore } from "@reduxjs/toolkit";
import planSlice from "./plan";
import logSlice  from "./isLogged";
import profileSlice from "./selectedProfile";
import { apiSlice } from "./features/api";

const store = configureStore({
  reducer: {
    plan: planSlice,
    log: logSlice,
    profile: profileSlice,
    [apiSlice.reducerPath]: apiSlice.reducer  
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export default store
