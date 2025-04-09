import React, { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { Home } from "./pages/Home.js";
import { DishPage } from "./pages/DishPage.js";
import { fetchAllRecipes } from "./api/recipes.js";

// This is the main App component that manages the state of the application
export const App = () => {
  const [selectedDish, setSelectedDish] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch all recipes on render and set the initial state for recipes and filteredRecipes
  useEffect(() => {
    fetchAllRecipes()
      .then((res) => {
        setRecipes(res.data)
        setFilteredRecipes(res.data);
      })
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  // This function sets the selected dish when a dish is clicked
  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
  };

  // This function resets the selected dish to null when the back button is clicked and returns to the home page
  const handleBack = () => {
    setSelectedDish(null);
  };

  return (
    <div>
      <Header onSelectDish={handleSelectDish} recipes={recipes} />
      {selectedDish ? (
        <DishPage dish={selectedDish} onBack={handleBack} />
      ) : (
        <Home onSelectDish={handleSelectDish} recipes={recipes} filteredRecipes={filteredRecipes} setFilteredRecipes={setFilteredRecipes} />
      )}
    </div>
  );
}
