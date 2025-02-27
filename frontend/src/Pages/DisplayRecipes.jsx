import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../Store/Slices/recipeSlice";
import { debounce } from "lodash";

const DisplayRecipes = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  // Search query, category, and pagination state
  const [query, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12; // Fixed limit for pagination

  // Debounced API call to prevent excessive API requests
  const fetchFilteredRecipes = useCallback(
    debounce((query, category, page) => {
      dispatch(fetchRecipes({ query, category, page, limit })).catch((err) =>
        console.error("Error fetching recipes:", err)
      );
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    fetchFilteredRecipes(query, category, page);

    return () => fetchFilteredRecipes.cancel(); // Cleanup on unmount
  }, [query, category, page, fetchFilteredRecipes]);

  // ✅ Prevents crash by ensuring `recipes` is an array
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  return (
    <div className="p-4">
      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </div>

      {/* ✅ Error, Loading, and No Results Handling */}
      {loading && <p className="text-blue-500">Loading recipes...</p>}
      {error && <p className="text-red-500">Error: {error.message || "Something went wrong"}</p>}
      {!loading && !error && safeRecipes.length === 0 && (
        <p className="text-gray-500">No recipes found.</p>
      )}

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeRecipes.map((recipe) => (
          <div key={recipe._id} className="p-4 bg-white shadow-md rounded-lg">
            {/* Recipe Image */}
            <img
              src={recipe.image || "/placeholder.jpg"}
              alt={recipe.title || "No Title"}
              className="w-full h-48 object-cover rounded-md"
            />

            {/* Recipe Details */}
            <h2 className="text-xl font-semibold mt-2">{recipe.title || "Untitled"}</h2>
            <p className="text-gray-600">{recipe.description || "No description available."}</p>

            {/* Ingredients */}
            <div className="mt-2">
              <h3 className="text-md font-semibold">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
                ) : (
                  <li>No ingredients listed.</li>
                )}
              </ul>
            </div>

            {/* Steps */}
            <div className="mt-2">
              <h3 className="text-md font-semibold">Steps:</h3>
              <p className="text-gray-700">
                {Array.isArray(recipe.steps) && recipe.steps.length > 0
                  ? recipe.steps.join(", ")
                  : "No steps available."}
              </p>
            </div>

            {/* Category & Date */}
            <div className="mt-3">
              <span className="text-sm px-2 py-1 rounded-md">
                <span className="font-medium mr-2 bg-gray-200 px-2 py-1 rounded-md text-orange-400">
                  {recipe.category || "Uncategorized"}
                </span>
                <span className="text-gray-800 bg-blue-100 px-2 py-1 rounded-md">
                  {recipe.createdAt
                    ? new Date(recipe.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown Date"}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-blue-500 text-white rounded-md">Page {page}</span>
        <button
          onClick={() => setPage((prev) => (safeRecipes.length < limit ? prev : prev + 1))}
          disabled={safeRecipes.length < limit}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DisplayRecipes;
