import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from './types';
import { reducers } from './reducers';
import persistReducer from 'redux-persist/es/persistReducer';

const initialState: IRootState = {
  searchTerm: '',
  cocktailsList: [],
};

export const slice = createSlice({
  name: 'cocktails',
  initialState,
  reducers,
});

const cocktailsActions = slice.actions;

export { cocktailsActions };

// using persist to store new cocktails in local storage
// when user added new cocktail
const persistConfig = {
  key: 'cocktails',
  storage,
  whitelist: ['cocktailsList'],
};

const cocktailReducer = persistReducer(persistConfig, slice.reducer);

export default cocktailReducer;
