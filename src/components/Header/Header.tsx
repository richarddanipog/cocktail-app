import './style.css';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchTerm } from '../../store/cocktails/selectors';
import { cocktailsActions } from '../../store/cocktails/slice';
import TextInput from '../common/TextInput/TextInput';
import { AppDispatch } from '../../store';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const search: string = useSelector(getSearchTerm);

  const handleChange = (value: string) => {
    dispatch(cocktailsActions.setSearchTerm(value));
  };

  return (
    <div>
      <h1>Cocktails</h1>
      <div className="actions">
        <div>
          <TextInput
            value={search}
            onChange={handleChange}
            placeholder="Search a cocktail..."
          />
        </div>

        <button
          type="button"
          onClick={() => navigate('/cocktail/add-cocktail')}
        >
          Add new cocktail
        </button>
      </div>
    </div>
  );
};

export default Header;
