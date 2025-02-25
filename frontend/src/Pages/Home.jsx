import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../Store/Slices/recipeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="p-4">
      {loading && <p className="text-blue-500">Loading recipes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="text-gray-500">No recipes found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="p-4 bg-white shadow-md rounded-lg">
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md"
            />

            {/* Recipe Details */}
            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.description}</p>

            {/* Ingredients */}
            <div className="mt-2">
              <h3 className="text-md font-semibold">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="mt-2">
              <h3 className="text-md font-semibold">Steps:</h3>
              <p className="text-gray-700">{recipe.steps.join(", ")}</p>
            </div>

            {/* Category */}
            <div className="mt-3">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
                <span className="font-medium mr-2 text-orange-400">{recipe.category}</span>
                <span className="text-gray-800">
                  {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                    // weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
