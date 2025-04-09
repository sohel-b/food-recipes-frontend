import React, { useState } from "react";
import { fetchByIngredients } from "../api/recipes";

// This component allows users to input ingredients and suggests dishes based on those ingredients
export const DishSuggester = ({ onSelectDish }) => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedDishes, setSuggestedDishes] = useState([]);

  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
    }
    setIngredientInput("");
  };

  // Remove ingredient from the list
  const handleRemoveIngredient = (ing) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== ing));
  };

  const handleSuggest = () => {
    if (selectedIngredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    //Route call to fetch dishes based on selected ingredients
    fetchByIngredients(selectedIngredients)
      .then((res) => setSuggestedDishes(res.data))
      .catch((err) => console.error("Error fetching suggestions:", err));
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Dish Suggester</h2>
      <p>Enter ingredients you have (e.g., rice, coconut, ghee):</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <input
          type="text"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
          placeholder="Add ingredient..."
          style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleAddIngredient}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Selected Ingredient Tags */}
      <div style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {selectedIngredients.map((ing, idx) => (
          <span
            key={idx}
            style={{
              backgroundColor: "#e0f7fa",
              padding: "5px 10px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {ing}
            <button
              onClick={() => handleRemoveIngredient(ing)}
              style={{
                border: "none",
                background: "transparent",
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Suggest Button */}
      <button
        onClick={handleSuggest}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        Suggest Dishes
      </button>

      {/* Suggestions */}
      {suggestedDishes.length > 0 && (
        <div>
          <h3>Suggested Dishes:</h3>
          <ul style={{ paddingLeft: "1rem" }}>
            {suggestedDishes.map((dish, idx) => (
              <li
                key={idx}
                onClick={() => onSelectDish(dish)}
                style={{
                  cursor: "pointer",
                  color: "#007bff",
                  textDecoration: "underline",
                  marginBottom: "0.5rem",
                }}
              >
                {dish.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestedDishes.length === 0 && selectedIngredients.length > 0 && (
        <p>No matching dishes found.</p>
      )}
    </div>
  );
}
