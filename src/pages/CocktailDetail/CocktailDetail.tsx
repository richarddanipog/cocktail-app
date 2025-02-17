import './style.css';

import { FC, useMemo } from 'react';
import { validate } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useCocktailDetailAPI } from '../../hooks/useCocktails';
import { getIngredients } from '../../utils/helpers';
import { TCocktail } from '../../types/cocktail';
import { useSelector } from 'react-redux';
import { getCocktailsList } from '../../store/cocktails/selectors';
import Loader from '../../components/common/Loader/Loader';

const CocktailDetail: FC = () => {
  const navigate = useNavigate();
  const cocktailList: TCocktail[] = useSelector(getCocktailsList);
  const { id } = useParams<{ id: string }>();
  const {
    data: cocktail,
    isLoading,
    error,
  } = useCocktailDetailAPI(id as string);

  const currentCocktail: TCocktail = useMemo(() => {
    if (validate(id)) {
      const cocktail: TCocktail =
        cocktailList.find((item) => item.idDrink === id) || ({} as TCocktail);
      return cocktail;
    }

    return cocktail as TCocktail;
  }, [cocktail, id, cocktailList]);

  const ingredients = useMemo(() => {
    if (currentCocktail && 'ingredients' in currentCocktail) {
      return currentCocktail.ingredients as [];
    }

    return getIngredients(currentCocktail as TCocktail);
  }, [currentCocktail]);

  if (isLoading) return <Loader />;
  if (error || !currentCocktail) return <p>Error fetching cocktail details.</p>;

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleReturn}>Return home</button>
      <div className="container-detail">
        <div>
          <img
            src={currentCocktail?.strDrinkThumb}
            alt={currentCocktail?.strDrink}
            width={300}
            height={300}
          />
        </div>
        <div>
          <h1>{currentCocktail?.strDrink}</h1>
          <h3>
            <strong>Instructions:</strong>
          </h3>
          <p>{currentCocktail?.strInstructions}</p>

          {ingredients && ingredients.length > 0 && (
            <div className="detail-cocktail-ingredient-container">
              <h3>
                <strong>Ingredients:</strong>
              </h3>
              {ingredients.map((ingredient) => {
                return (
                  <p key={`${ingredient.ingredient}-${ingredient.measurement}`}>
                    {ingredient.measurement} {ingredient.ingredient}
                  </p>
                );
              })}
            </div>
          )}

          <h3>
            <strong>Glass:</strong>
          </h3>
          <p>Serve: {currentCocktail?.strGlass}</p>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
