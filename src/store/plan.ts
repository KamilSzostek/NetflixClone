import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const planSlice = createSlice({
  name: "plan",
  initialState: {
    name: '',
    price: ''
  },
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    }
  },
});

export const { setPrice, setName } = planSlice.actions;

export const planPriceSelector = (state: RootState) => state.plan.price
export const planNameSelector = (state: RootState) => state.plan.name

export default planSlice.reducer;
