import './style.css';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TCocktail } from '../../types/cocktail';

type TCocktailItemProps = {
  cocktail: TCocktail;
};

const CocktailItem: FC<TCocktailItemProps> = ({ cocktail }) => (
  <Link
    className="cocktail-item"
    to={`/cocktail/${cocktail.idDrink}`}
    key={cocktail.idDrink}
  >
    {cocktail.strDrinkThumb && (
      <img
        className="cocktail-img"
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
      />
    )}
    <div className="cocktail-name">{cocktail.strDrink}</div>
  </Link>
);

export default CocktailItem;
