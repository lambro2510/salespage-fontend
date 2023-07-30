import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import typeReducer from './typeSlice';
import storeReducer from './storeSlice';
import profileReducer from './profileSlice';
import modalVisibleReducer from './modalVisibleSlice'
export const store = configureStore({
  reducer: {
    auth : authReducer,
    type : typeReducer,
    store : storeReducer,
    profile : profileReducer,
    modal : modalVisibleReducer,
  },
})