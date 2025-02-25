import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000/api/v1"; // Fallback URL

// Fetch Recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetch",
  async ({ query = "", category = "" } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BACKEND_URI}/recipe/getall-Recipe`, {
        params: { query, category },
        withCredentials: true,
      });

      if (data) console.log("Fetched Recipes", data.data.recipes);
      return data.data.recipes;
    } catch (error) {
      return rejectWithValue({
        message: "Error while fetching Recipes",
        details: error.response?.data || "No details available",
      });
    }
  }
);

// Add Recipe
export const addRecipe = createAsyncThunk("recipes/add", async (recipe, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BACKEND_URI}/recipe/create-Recipe`, recipe, {
      withCredentials: true,
    });
    if (data) console.log(data);
    return data;
  } catch (error) {
    return rejectWithValue({
      message: "Error while adding Recipe",
      details: error.response?.data || "No details available",
    });
  }
});

// Initial state
const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

// Recipe Slice
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recipes = payload;
      })
      .addCase(fetchRecipes.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch recipes";
      })

      // Add Recipe
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recipes.push(payload);
      })
      .addCase(addRecipe.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to add recipe";
      });
  },
});

export default recipeSlice.reducer;
