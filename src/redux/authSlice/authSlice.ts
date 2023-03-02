import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { protectedBasicRoute, basicRoute } from '../../utils/fetch';
import { JwtPayload, LoginRes } from '../../types';
import jwt from 'jwt-decode';
import { clearToken, setToken } from '../../utils/token-session-storage';

export interface InitialState {
  status: 'idle' | 'loading' | 'finished' | 'error';
  isAuth: boolean;
  user: string;
}

// initial state

export const initialState: InitialState = {
  status: 'idle',
  isAuth: false,
  user: '',
};

// @ts-ignore
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  // @ts-ignore
  const results = await basicRoute.post('/auth/login', data);
  const { accessToken } = (await results.data) as LoginRes;
  return accessToken;
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (data, thunkAPI) => {
    // @ts-ignore
    await protectedBasicRoute().get('/auth/logout');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.rejected, (state) => {
        state.status = 'error';
        state.isAuth = false;
        state.user = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload: JwtPayload = jwt(action.payload);
        setToken(action.payload);
        state.status = 'finished';
        state.isAuth = true;
        state.user = payload.login;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'error';
        state.isAuth = false;
        state.user = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        clearToken();
        state.status = 'finished';
        state.isAuth = false;
        state.user = '';
      })
      .addDefaultCase((state) => {});
  },
});

interface AuthSelector {
  auth: InitialState;
}

export const authSelector = (state: AuthSelector) => state;

export const authReducer = authSlice.reducer;
