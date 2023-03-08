import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { protectedBasicRoute } from '../../utils/fetch';
import {
  CreatedItemResponse,
  FetchPantryByIdResponse,
  Item,
  ICreateItemRequestData,
} from '../../types';
import { useSelector } from 'react-redux';

type IItem = Omit<Item, 'createdAt'>;

export interface InitialState {
  status: 'idle' | 'loading' | 'finished' | 'error';
  items: IItem[];
}

// initial state

export const initialState: InitialState = {
  status: 'idle',
  items: [],
};
interface IFetchItemsParam {
  pantryId: string;
  name: string;
  expiration: Date;
}
export const fetchItemsFromPantryById = createAsyncThunk(
  'items/fetch',
  async (pantryId: string, thunkAPI) => {
    const axiosInstance = protectedBasicRoute();
    const results = await axiosInstance.get(`/pantry/${pantryId}`);
    const response = (await results.data) as FetchPantryByIdResponse;
    return response.data.items;
  }
);

interface IAddItemToPantry {
  pantryId: string;
  name: string;
  expiration: Date;
}

export const addItemToPantry = createAsyncThunk(
  'items/add',
  async ({ pantryId, name, expiration }: IAddItemToPantry, thunkAPI) => {
    console.log('addItemToPantry');
    const axiosInstance = protectedBasicRoute();
    const results = await axiosInstance.post(`/pantry/${pantryId}/item`, {
      name,
      expiration,
    });
    console.log('addItems', results);
    const createdItem = results.data as IItem;
    return createdItem;
  }
);

export const removeItemFromPantry = createAsyncThunk(
  'items/remove',
  async (itemId: string, thunkAPI) => {
    const axiosInstance = protectedBasicRoute();
    await axiosInstance.delete(`/pantry/item/${itemId}`);
    return itemId;
  }
);

export const modifyItemInPantry = createAsyncThunk(
  'Items/modify',
  async ({ id, name, expiration }: IItem, thunkAPI) => {
    const axiosInstance = protectedBasicRoute();
    const data: IItem = await axiosInstance.put(`/pantry/${id}`, {
      name,
      expiration,
    });
    return data;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsFromPantryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsFromPantryById.rejected, (state, action) => {
        console.log(action.error);
        state.status = 'error';
        state.items = [];
      })
      .addCase(fetchItemsFromPantryById.fulfilled, (state, action) => {
        state.status = 'finished';
        state.items = action.payload;
      })
      .addCase(addItemToPantry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToPantry.rejected, (state, action) => {
        console.log('add error');
        state.status = 'error';
      })
      .addCase(addItemToPantry.fulfilled, (state, action) => {
        state.status = 'finished';
        state.items.push(action.payload);
      })
      .addCase(removeItemFromPantry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromPantry.rejected, (state, action) => {
        console.log('rejected', action);
        state.status = 'error';
      })
      .addCase(removeItemFromPantry.fulfilled, (state, action) => {
        state.status = 'finished';
        // @ts-ignore
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(modifyItemInPantry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyItemInPantry.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(modifyItemInPantry.fulfilled, (state, action) => {
        state.status = 'finished';
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.name = action.payload.name;
            item.expiration = action.payload.expiration;
            return item;
          }
          return item;
        });
      })
      .addDefaultCase((state) => {});
  },
});

export const itemsReducer = itemsSlice.reducer;
