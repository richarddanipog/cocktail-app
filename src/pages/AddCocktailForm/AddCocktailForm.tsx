import 'react-toastify/dist/ReactToastify.css';
import './style.css';

import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { TIngredient, TCategory, TGlass } from '../../types/cocktail';
import { useCocktailMetadataAPI } from '../../hooks/useCocktails';
import { cocktailsActions } from '../../store/cocktails/slice';
import ErrorText from '../../components/common/ErrorText/ErrorText';
import TextInput from '../../components/common/TextInput/TextInput';
import { AppDispatch } from '../../store';

const AddCocktailForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { data: categories } = useCocktailMetadataAPI('c');
  const { data: glassesTypes } = useCocktailMetadataAPI('g');

  const [formData, setFormData] = useState({
    strDrink: '',
    strCategory: '',
    strInstructions: '',
    ingredients: [{ ingredient: '', measurement: '' }] as TIngredient[],
    strDrinkThumb: '',
    strGlass: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (key: string, value: string) => {
    setErrors((prev) => ({ ...prev, [key]: '' }));
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleIngredientChange = (
    index: number,
    key: keyof TIngredient,
    value: string
  ) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][key] = value;

    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
    setErrors((prev) => ({ ...prev, ingredients: '' }));
  };

  const handleAddIngredient = () => {
    setErrors((prev) => ({ ...prev, ingredients: '' }));
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient: '', measurement: '' }],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({
          ...prev,
          strDrinkThumb: reader.result as string,
        }));
      reader.readAsDataURL(file);

      setErrors((prev) => ({ ...prev, strDrinkThumb: '' }));
    }
  };

  const handleRemove = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.filter((_, i) => i !== index),
    }));
  };

  const validateFormData = (): boolean => {
    const errors: { [key: string]: string } = {};

    const trimmedDrink = formData.strDrink.trim();
    const trimmedCategory = formData.strCategory.trim();
    const trimmedInstructions = formData.strInstructions.trim();
    const trimmedGlass = formData.strGlass.trim();

    if (!trimmedDrink) errors.strDrink = 'Cocktail name is required';
    if (!trimmedCategory) errors.strCategory = 'Please select a category';
    if (!trimmedInstructions)
      errors.strInstructions = 'Instructions are required';
    if (!trimmedGlass) errors.strGlass = 'Please select a glass type';

    if (!formData.strDrinkThumb)
      errors.strDrinkThumb = 'Cocktail Image is required';

    const validIngredients = formData.ingredients.filter(
      (i) => i.ingredient.trim() && i.measurement.trim()
    );

    if (validIngredients.length === 0)
      errors.ingredients =
        'At least one ingredient with a measurement is required';

    setErrors(errors);

    return Object.keys(errors).length === 0; // No errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormData()) {
      toast.warning('Please fill all requirements');
      return;
    }

    const newCocktail = {
      ...formData,
      idDrink: uuidv4(),
      ingredients: formData.ingredients.filter(
        (i) => i.ingredient.trim() && i.measurement.trim()
      ),
    };

    toast.success('New cocktail was added successfully.');

    dispatch(cocktailsActions.addCocktail(newCocktail));
    setFormData({
      strDrink: '',
      strCategory: '',
      strInstructions: '',
      ingredients: [{ ingredient: '', measurement: '' }],
      strDrinkThumb: '',
      strGlass: '',
    });
  };

  return (
    <div>
      <button type="button" onClick={() => navigate('/')}>
        Return
      </button>
      <form onSubmit={handleSubmit} className="cocktail-form">
        <h2>Add a New Cocktail</h2>

        <div className="section">
          <TextInput
            placeholder="Name"
            value={formData.strDrink}
            onChange={(val) => handleChange('strDrink', val)}
          />
          <ErrorText message={errors.strDrink} />
        </div>

        <div className="section">
          <textarea
            name="instructions"
            value={formData.strInstructions}
            onChange={(e) => handleChange('strInstructions', e.target.value)}
            placeholder="Instructions"
          />
          <ErrorText message={errors.strInstructions} />
        </div>

        <div className="section">
          <select
            name="category"
            value={formData.strCategory}
            onChange={(e) => handleChange('strCategory', e.target.value)}
          >
            <option value="">Select category</option>
            {categories?.map((cat: TCategory, i: number) => (
              <option key={`${i}-${cat.strCategory}`} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
          <ErrorText message={errors.strCategory} />
        </div>

        <div className="section">
          <select
            name="glass"
            value={formData.strGlass}
            onChange={(e) => handleChange('strGlass', e.target.value)}
          >
            <option value="">Select glass type</option>
            {glassesTypes?.map((cat: TGlass, i: number) => (
              <option key={`${i}-${cat.strGlass}`} value={cat.strGlass}>
                {cat.strGlass}
              </option>
            ))}
          </select>
          <ErrorText message={errors.strGlass} />
        </div>

        <div className="section">
          <h3>Ingredients</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredients">
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemove(index)}
              >
                X
              </button>

              <TextInput
                placeholder="Ingredient name"
                value={ingredient.ingredient}
                onChange={(val) =>
                  handleIngredientChange(index, 'ingredient', val)
                }
              />
              <TextInput
                placeholder="Amount"
                value={ingredient.measurement}
                onChange={(val) =>
                  handleIngredientChange(index, 'measurement', val)
                }
              />
            </div>
          ))}
          <ErrorText message={errors.ingredients} />
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className="file-section">
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <ErrorText message={errors.strDrinkThumb} />
          {formData.strDrinkThumb && (
            <img
              src={formData.strDrinkThumb}
              alt="Cocktail Preview"
              className="preview-img"
              width={250}
              height={250}
            />
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCocktailForm;
