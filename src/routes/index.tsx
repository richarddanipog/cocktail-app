import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import CocktailDetail from '../pages/CocktailDetail/CocktailDetail';
import AddCocktailForm from '../pages/AddCocktailForm/AddCocktailForm';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail/:id" element={<CocktailDetail />} />
        <Route path="/cocktail/add-cocktail" element={<AddCocktailForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
