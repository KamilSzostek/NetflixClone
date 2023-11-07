import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const logSlice = createSlice({
  name: "log",
  initialState: {
    isLogged: false,
  },
  reducers: {
    changeIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { changeIsLogged } = logSlice.actions;

export const logSelector = (state: RootState) => state.log.isLogged;

export default logSlice.reducer;
