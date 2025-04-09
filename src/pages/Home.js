import React from "react";
// import DishesList from "../components/DishesList";
import { DishesListWithFilters } from "../components/DishesListWithFilters";
import { DishSuggester } from "../components/DishSuggester";

// This component serves as the home page of the application. It displays a list of dishes and a dish suggester
export const Home = ({ onSelectDish, recipes, filteredRecipes, setFilteredRecipes }) => {
  return (
    <div>
      {/* <DishesList onSelectDish={onSelectDish} /> */}
      <DishesListWithFilters onSelectDish={onSelectDish} recipes={recipes} filteredRecipes={filteredRecipes} setFilteredRecipes={setFilteredRecipes} />
      <DishSuggester onSelectDish={onSelectDish} />
    </div>
  );
}
