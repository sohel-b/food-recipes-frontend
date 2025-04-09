import React, { useEffect, useState } from "react";
import { fetchAllRecipes } from "../api/recipes";

export const DishesList = ({ onSelectDish }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchAllRecipes()
      .then((res) => setDishes(res.data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Complete Details of Dishes</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Diet</th>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>Flavor</th>
            <th>Course</th>
            <th>State</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish, index) => (
            <tr key={index}>
              <td
                onClick={() => onSelectDish(dish)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {dish.name}
              </td>
              <td>{dish.ingredients}</td>
              <td>{dish.diet}</td>
              <td>{dish.prep_time}</td>
              <td>{dish.cook_time}</td>
              <td>{dish.flavor_profile}</td>
              <td>{dish.course}</td>
              <td>{dish.state}</td>
              <td>{dish.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
