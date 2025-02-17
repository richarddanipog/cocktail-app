import './style.css';

import { FC, useMemo } from 'react';
import { TCocktail } from '../../types/cocktail';
import CocktailItem from '../CocktailItem/CocktailItem';
import { useSelector } from 'react-redux';
import {
  getCocktailsList,
  getSearchTerm,
} from '../../store/cocktails/selectors';
import { useDebounce } from '../../hooks/useDebounce';
import { useCocktailsAPI } from '../../hooks/useCocktails';
import Loader from '../common/Loader/Loader';

const CocktailList: FC = () => {
  const cocktailsList: TCocktail[] = useSelector(getCocktailsList);
  const search: string = useSelector(getSearchTerm);
  const debounceSearch: string = useDebounce(search);

  const { data: cocktails, isLoading, error } = useCocktailsAPI(debounceSearch);

  const allCocktails = useMemo(() => {
    if (isLoading) return [];

    const filteredCocktailsList = cocktailsList.filter((cocktail) =>
      cocktail.strDrink.toLowerCase().includes(search.toLowerCase())
    );

    return [...cocktails, ...filteredCocktailsList];
  }, [cocktails, cocktailsList, isLoading, search]);

  return (
    <div className="cocktails-list">
      {isLoading && <Loader />}
      {error && <p>Error loading cocktails.</p>}

      {!allCocktails?.length && !isLoading && (
        <p>Sorry, we couldn't find any cocktails. Try a different search.</p>
      )}
      {allCocktails?.map((cocktail: TCocktail) => (
        <CocktailItem key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default CocktailList;
