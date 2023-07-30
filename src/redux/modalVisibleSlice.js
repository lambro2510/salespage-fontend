import { createSlice } from '@reduxjs/toolkit';
export const modalVisibleSlice = createSlice({
  name: 'auth',
  initialState: {
    loginError : false,
    paymentError : false
  },
  reducers: {
    loginError: (state, action) => {
      state.loginError = action.payload;
    },
    paymentError: (state, action) => {
      state.paymentError = action.payload;
    },
  },
})

export const { loginError, paymentError } = modalVisibleSlice.actions

export default modalVisibleSlice.reducer
