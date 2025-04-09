import React from "react";

// This component displays the details of a selected dish
export const DishDetails = ({ dish }) => {
  // If no dish is selected, return null
  if (!dish) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>{dish.name}</h2>
      <p><strong>Ingredients:</strong> {dish.ingredients}</p>
      <p><strong>Diet:</strong> {dish.diet}</p>
      <p><strong>Preparation Time:</strong> {dish.prep_time} minutes</p>
      <p><strong>Cooking Time:</strong> {dish.cook_time} minutes</p>
      <p><strong>Flavor:</strong> {dish.flavor_profile}</p>
      <p><strong>Course:</strong> {dish.course}</p>
      <p><strong>State:</strong> {dish.state}</p>
      <p><strong>Region:</strong> {dish.region}</p>
    </div>
  );
}
