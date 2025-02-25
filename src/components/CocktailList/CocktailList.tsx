import './style.css';

import { FC, memo } from 'react';
import { TCocktail } from '../../types/cocktail';
import CocktailItem from '../CocktailItem/CocktailItem';

type TCocktailListProps = {
  cocktails: TCocktail[];
};

const CocktailList: FC<TCocktailListProps> = ({ cocktails }) => {
  return (
    <div className="cocktails-list">
      {cocktails.map((cocktail: TCocktail) => (
        <CocktailItem key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default memo(CocktailList);
