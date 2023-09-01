import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const planSlice = createSlice({
  name: "selectedPlan",
  initialState: {
    value: {
      _id: '',
      name: '',
      price: '',
      quality: '',
      resolution: ''
  },
  },
  reducers: {
    selectPlan: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectPlan } = planSlice.actions;

export const priceSelector = (state: RootState) => state.plan.value.price;

export default planSlice.reducer;
