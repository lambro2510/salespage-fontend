import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin : false,
    token: null,
    username: null,
    role : "USER",
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.username = null;
      role : "USER";
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
