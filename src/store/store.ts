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
});

export type RootState = ReturnType<typeof store.getState>

middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(apiSlice.middleware)


export default store
