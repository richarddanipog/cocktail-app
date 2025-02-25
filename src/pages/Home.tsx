import { useSelector } from 'react-redux';
import CocktailList from '../components/CocktailList/CocktailList';
import Header from '../components/Header/Header';
import { getSearchTerm } from '../store/cocktails/selectors';
import { useDebounce } from '../hooks/useDebounce';
import { useCocktailsAPI } from '../hooks/useCocktails';
import Loader from '../components/common/Loader/Loader';

const Home = () => {
  const search: string = useSelector(getSearchTerm);
  const debounceSearch: string = useDebounce(search);

  const { data: cocktails, isLoading, error } = useCocktailsAPI(debounceSearch);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <p className="error-message">Error loading cocktails.</p>;
    }

    if (!cocktails?.length) {
      return (
        <p className="empty-state-message">
          Sorry, we couldn't find any cocktails. Try a different search.
        </p>
      );
    }

    return <CocktailList cocktails={cocktails} />;
  };

  return (
    <main>
      <Header />
      {renderContent()}
    </main>
  );
};

export default Home;
