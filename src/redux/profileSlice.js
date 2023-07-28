import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    token: null,
    username: null,
    role: 'USER',
    id: null,
    email: null,
    phoneNumber: null,
    displayName: null,
    dateOfBirth: null,
    firstName: null,
    lastName: null,
    imageUrl: null,
    rate: {
      totalPoint: 0,
      totalRate: 0,
      avgPoint: 0
    },
    balance: {
      type: "VND",
      money: 0
    }
  },
  reducers: {
    setProfile: (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.displayName = action.payload.displayName;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.imageUrl = action.payload.imageUrl;
      state.rate = action.payload.rate;
      state.balance = action.payload.balance;
    },
    deleteProfile: (state) => {
      state.username = null;
      state.id = null;
      state.email = null;
      state.phoneNumber = null;
      state.displayName = null;
      state.dateOfBirth = null;
      state.firstName = null;
      state.lastName = null;
      state.imageUrl = null;
      state.rate = {
        totalPoint: 0,
        totalRate: 0,
        avgPoint: 0
      };
      state.balance = {
        type: "VND",
        money: 0
      };
    },
  },
});

export const { setProfile, deleteProfile } = profileSlice.actions;

export default profileSlice.reducer;
