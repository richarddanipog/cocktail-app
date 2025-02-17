import { TCocktail } from '../../types/cocktail';

export interface IRootState {
  searchTerm: string;
  cocktailsList: TCocktail[];
}
