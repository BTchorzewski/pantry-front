import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../authSlice/authSlice';
import { pantriesReducer } from '../pantriesSlice/pantriesSlice';
import { itemsReducer } from '../itemSlice/itemsSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pantries: pantriesReducer,
    items: itemsReducer,
  },
});
