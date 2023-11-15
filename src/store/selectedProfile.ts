import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import DefaultIcon from '../../public/assets/profiles/default.png'

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    icon: DefaultIcon,
    isSelected: false,
    isAdultContent: false,
  },
  reducers: {
    setProfileName(state, action) {
      state.name = action.payload;
    },
    setProfileIcon(state, action) {
      state.icon = action.payload
    },
    changeIsProfileSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setIsAdultContent: (state, action) => {
      state.isAdultContent = action.payload
    }
  },
});

export const { setProfileName, setProfileIcon, changeIsProfileSelected, setIsAdultContent } = profileSlice.actions;

export const profileNameSelector = (state: RootState) => state.profile.name;
export const profileIconSelector = (state: RootState) => state.profile.icon;
export const isProfileSelector = (state: RootState) => state.profile.isSelected;
export const adultContentSelector = (state: RootState) => state.profile.isAdultContent;

export default profileSlice.reducer;
