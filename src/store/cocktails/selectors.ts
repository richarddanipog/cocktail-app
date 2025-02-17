import { RootState } from '../index';

const getSearchTerm = (state: RootState) => state.cocktailsReducer.searchTerm;

const getCocktailsList = (state: RootState) =>
  state.cocktailsReducer.cocktailsList;

export { getSearchTerm, getCocktailsList };
