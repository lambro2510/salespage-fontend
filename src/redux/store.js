import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlide';
import typeReducer from './typeSlider';
import storeReducer from './storeSlider';
export const store = configureStore({
  reducer: {
    auth : authReducer,
    type : typeReducer,
    store : storeReducer
  },
})