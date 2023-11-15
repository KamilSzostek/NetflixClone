import { configureStore } from "@reduxjs/toolkit";
import planSlice from "./plan";
import logSlice  from "./isLogged";
import profileSlice from "./selectedProfile";

const store = configureStore({
  reducer: {
    plan: planSlice,
    log: logSlice,
    profile: profileSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store
