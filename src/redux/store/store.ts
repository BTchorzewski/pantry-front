import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../authSlice/authSlice';
import { pantriesReducer } from '../pantriesSlice/pantriesSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pantries: pantriesReducer,
  },
});
