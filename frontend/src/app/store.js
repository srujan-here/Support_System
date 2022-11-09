import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSllice'

export const store = configureStore({
  reducer: {
    auth:authReducer

  },
});
