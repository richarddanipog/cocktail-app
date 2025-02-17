import { TCocktail, TIngredient } from '../types/cocktail';

export const getIngredients = (cocktail: TCocktail): TIngredient[] => {
  if (!cocktail) return [];

  const ingredients: TIngredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof TCocktail;
    const measurementKey = `strMeasure${i}` as keyof TCocktail;

    const ingredient = cocktail[ingredientKey] as string | null;
    const measurement = cocktail[measurementKey] as string | null;

    if (ingredient && measurement) {
      ingredients.push({
        ingredient,
        measurement,
      });
    }
  }

  return ingredients;
};
