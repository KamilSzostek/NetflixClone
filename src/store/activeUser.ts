import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: '',
        password: '',
        plan: '',
        phoneNumber: '',
        creditCard: {
            firstName: '',
            lastName: '',
            cardNumber: '',
            CVV: 0,
            expirationDate: ''
        },
        profiles: [],
        isMembershipPayed: false
    },
    reducers: {
        update: (state, action) => {
            state.profiles = action.payload
        },
    }
})