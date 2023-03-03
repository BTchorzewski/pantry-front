import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { protectedBasicRoute } from '../../utils/fetch';
import {
  JwtPayload,
  LoginRes,
  ShortPantry,
  FetchShortPantriesResponse,
  CreatePantryResponse,
} from '../../types';
import jwt from 'jwt-decode';
import { setToken } from '../../utils/token-session-storage';

export interface InitialState {
  status: 'idle' | 'loading' | 'finished' | 'error';
  pantries: ShortPantry[];
}

// initial state

export const initialState: InitialState = {
  status: 'idle',
  pantries: [],
};

// @ts-ignore
export const fetchShortPantries = createAsyncThunk(
  'pantries/fetch',
  async (data, thunkAPI) => {
    const axiosInstance = protectedBasicRoute();
    const results = await axiosInstance.get('/pantry/stats');
    const response = (await results.data) as FetchShortPantriesResponse;
    return response.data;
  }
);

export const addShortPantries = createAsyncThunk(
  'pantries/add',
  async (data: { name: string }, thunkAPI) => {
    const axiosInstance = protectedBasicRoute();
    const results = await axiosInstance.post('/pantry', data);
    const { pantryId: id } = results.data as CreatePantryResponse;
    return { id, name: data.name };
  }
);

export const removeShortPantries = createAsyncThunk(
  'pantries/remove',
  async (pantryId: string, thunkAPI) => {
    const axiosInstance = protectedBasicRoute();
    await axiosInstance.delete(`/pantry/${pantryId}`);
    return pantryId;
  }
);

const pantriesSlice = createSlice({
  name: 'pantries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortPantries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShortPantries.rejected, (state, action) => {
        console.log('rejected', action);
        state.status = 'error';
        state.pantries = [];
      })
      .addCase(fetchShortPantries.fulfilled, (state, action) => {
        state.status = 'finished';
        // @ts-ignore
        state.pantries = action.payload;
      })
      .addCase(addShortPantries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addShortPantries.rejected, (state, action) => {
        console.log('rejected', action);
        state.status = 'error';
      })
      .addCase(addShortPantries.fulfilled, (state, action) => {
        state.status = 'finished';
        // @ts-ignore
        state.pantries.push({
          id: action.payload.id,
          name: action.payload.name,
          stats: {
            fresh: 0,
            total: 0,
            expiredSoon: 0,
            expired: 0,
          },
        } as ShortPantry);
      })
      .addCase(removeShortPantries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeShortPantries.rejected, (state, action) => {
        console.log('rejected', action);
        state.status = 'error';
      })
      .addCase(removeShortPantries.fulfilled, (state, action) => {
        state.status = 'finished';
        // @ts-ignore
        state.pantries = state.pantries.filter(
          (shortPantry) => shortPantry.id !== action.payload
        );
      })
      .addDefaultCase((state) => {});
  },
});

interface PantriesSelector {
  pantries: InitialState;
}

export const pantriesSelector = (state: PantriesSelector): InitialState =>
  state.pantries;

export const pantriesReducer = pantriesSlice.reducer;
