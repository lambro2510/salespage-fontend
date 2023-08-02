import { createSlice } from '@reduxjs/toolkit';
export const modalVisibleSlice = createSlice({
  name: 'auth',
  initialState: {
    loginError : false,
    paymentError : false,
    payment: false
  },
  reducers: {
    loginError: (state, action) => {
      state.loginError = action.payload;
    },
    paymentError: (state, action) => {
      state.paymentError = action.payload;
    },
    payment: (state, action) => {
      state.payment = action.payload;
    },
  },
})

export const { loginError, paymentError, payment } = modalVisibleSlice.actions

export default modalVisibleSlice.reducer
