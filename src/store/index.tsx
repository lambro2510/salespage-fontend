import { combineReducers, configureStore } from '@reduxjs/toolkit';
import adminSlice, { AuthState } from './slices/authSlice';
import baseSlice, { BaseState } from './slices/baseSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: CONFIG.appName,
  storage,
};

const rootReducer = combineReducers({
  auth: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = {
  auth: AuthState;
  base: BaseState;
};
export type AppDispatch = typeof store.dispatch;
