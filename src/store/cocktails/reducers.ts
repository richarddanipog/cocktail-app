import { PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from './types';
import { TCocktail } from '../../types/cocktail';

const reducers = {
  setSearchTerm: (
    state: IRootState,
    action: PayloadAction<IRootState['searchTerm']>
  ) => ({
    ...state,
    searchTerm: action.payload,
  }),
  addCocktail: (state: IRootState, action: PayloadAction<TCocktail>) => {
    state.cocktailsList.push(action.payload);
  },
};

export { reducers };
