import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Dish } from '@/lib/types';

const defaultAllergens = [
  'Wheat', 'Rye', 'Barley', 'Oats', 'Spelt', 'Fish', 'Seafood',
  'Peanuts', 'Soy', 'Cow\'s milk', 'Almonds', 'Hazelnuts', 'Tree nuts'
];

type DishType = 'Starter' | 'Main Course' | 'Dessert' | 'Drinks' | 'To Share' | 'Side';

export function RestaurantView() {
  const { id } = useParams();
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [customAllergen, setCustomAllergen] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedType, setSelectedType] = useState<DishType>('Main Course');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Get dishes from localStorage
  const dishes = React.useMemo(() => {
    const savedDishes = localStorage.getItem('dishes');
    return savedDishes ? JSON.parse(savedDishes) as Dish[] : [];
  }, []);

  // Filter dishes based on allergens
  const filteredDishes = React.useMemo(() => {
    if (selectedAllergens.length === 0) return dishes;
    
    return dishes.filter(dish => {
      const dishAllergens = dish.allergens.toLowerCase().split(',').map(a => a.trim());
      return !selectedAllergens.some(allergen => 
        dishAllergens.includes(allergen.toLowerCase())
      );
    });
  }, [dishes, selectedAllergens]);

  const dishesByType = React.useMemo(() => {
    return filteredDishes.filter(dish => dish.type === selectedType);
  }, [filteredDishes, selectedType]);

  const handleAllergenToggle = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleAddCustomAllergen = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAllergen && !selectedAllergens.includes(customAllergen)) {
      setSelectedAllergens(prev => [...prev, customAllergen]);
      setCustomAllergen('');
    }
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const toggleFavorite = (dishId: string) => {
    setFavorites(prev =>
      prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  const dishTypes: DishType[] = ['Starter', 'Main Course', 'Dessert', 'Drinks', 'To Share', 'Side'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {!showResults ? (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Select Your Dietary Restrictions
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Choose the ingredients you want to avoid
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {defaultAllergens.map(allergen => (
                  <button
                    key={allergen}
                    onClick={() => handleAllergenToggle(allergen)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedAllergens.includes(allergen)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAddCustomAllergen} className="flex gap-2">
                <input
                  type="text"
                  value={customAllergen}
                  onChange={(e) => setCustomAllergen(e.target.value)}
                  placeholder="Add custom allergen"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  Add
                </button>
              </form>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSearch}
                className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800"
              >
                Show Available Dishes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Available Dishes
              </h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Edit Preferences
              </button>
            </div>

            {/* Dish type tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {dishTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${selectedType === type
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    {type}
                  </button>
                ))}
              </nav>
            </div>

            {/* Dishes grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {dishesByType.map((dish) => (
                <div key={dish.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {dish.image && (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{dish.name}</h3>
                      <button
                        onClick={() => toggleFavorite(dish.id)}
                        className={`p-1 rounded-full ${
                          favorites.includes(dish.id)
                            ? 'text-red-600 hover:text-red-700'
                            : 'text-gray-400 hover:text-gray-500'
                        }`}
                      >
                        ♥
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{dish.description}</p>
                    <p className="mt-2 text-sm font-medium text-gray-900">{dish.price}</p>
                    {dish.allergens && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Allergens:</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {dish.allergens.split(',').map((allergen, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {allergen.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating favorites button */}
            {favorites.length > 0 && (
              <div className="fixed bottom-4 right-4">
                <button
                  className="bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg"
                >
                  Favorites ({favorites.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}