import axios from "axios";

// This is the base URL for the backend. 
const BASE_URL = "http://localhost:5000";

// This function fetches all recipes from the backend
export const fetchAllRecipes = () => {
  return axios.get(`${BASE_URL}/recipes`);
};

// This function fetches a recipe by its name from the backend
export const fetchRecipeByName = (name) => {
  return axios.get(`${BASE_URL}/recipes/${name}`);
};

// This function fetches recipes by their ingredients from the backend
export const fetchByIngredients = (ingredients) => {
  return axios.post(`${BASE_URL}/recipes/by-ingredients`, { ingredients });
};
