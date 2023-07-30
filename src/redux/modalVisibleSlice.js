import { createSlice } from '@reduxjs/toolkit';
export const modalVisibleSlice = createSlice({
  name: 'auth',
  initialState: {
    loginError : false,
  },
  reducers: {
    loginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
})

export const { loginError } = modalVisibleSlice.actions

export default modalVisibleSlice.reducer
