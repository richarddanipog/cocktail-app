import { TCocktail } from '../types/cocktail';
import api from './api';

export const getCocktails = async (search: string) => {
  try {
    const searchTerm = search || 'a'; // 'a' for fetch default results
    const { data } = await api.get(`/search.php?s=${searchTerm}`);
    const persistedState = JSON.parse(
      localStorage.getItem('persist:cocktails') || '{}'
    );

    if (persistedState.cocktailsList && data.drinks) {
      const cocktails = JSON.parse(persistedState.cocktailsList);

      const filteredCocktailsList = cocktails.filter((cocktail: TCocktail) =>
        cocktail.strDrink.toLowerCase().includes(search.toLowerCase())
      );

      return [...data.drinks, ...filteredCocktailsList];
    }

    return data.drinks || [];
  } catch (error) {
    console.error('Error fetching cocktails:', error);

    return [];
  }
};

export const getCocktailById = async (cocktailId: string) => {
  try {
    const { data } = await api.get(`/lookup.php?i=${cocktailId}`);
    const cocktail: TCocktail = data.drinks ? data.drinks[0] : {};

    return cocktail;
  } catch (error) {
    console.error('Error fetching cocktail:', error);

    return {} as TCocktail;
  }
};

export const getCocktailMetadata = async (type: string) => {
  try {
    const { data } = await api.get(`list.php?${type}=list`);

    return data.drinks;
  } catch (error) {
    console.error(`Error fetching cocktail ${type} list:`, error);
    return [];
  }
};
