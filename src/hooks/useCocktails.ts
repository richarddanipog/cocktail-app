import { useQuery } from '@tanstack/react-query';
import {
  getCocktailById,
  getCocktailMetadata,
  getCocktails,
} from '../services/cocktailService';

export const useCocktailsAPI = (search: string) => {
  return useQuery({
    queryKey: ['cocktails', search], // Caches requests by search term
    queryFn: () => getCocktails(search),
  });
};

export const useCocktailDetailAPI = (cocktailId: string) => {
  return useQuery({
    queryKey: ['cocktailById', cocktailId],
    queryFn: () => getCocktailById(cocktailId),
    enabled: !!cocktailId, // Only fetch when cocktailId is not empty
  });
};

export const useCocktailMetadataAPI = (type: string) => {
  return useQuery({
    queryKey: [`cocktailMetadata-${type}`],
    queryFn: () => getCocktailMetadata(type),
  });
};
