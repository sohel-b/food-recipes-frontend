import React, { useEffect, useState } from "react";

// This component displays the header with a search bar and suggestions for dishes
// It receives a function to handle dish selection and the list of recipes as props
export const Header = ({ onSelectDish, recipes }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter recipes based on search text, convert search text and recipe properties to lowercase for case-insensitive comparison
    const text = searchText.toLowerCase();
    const filtered = recipes.filter((dish) => {
      return (
        dish.name.toLowerCase().includes(text) ||
        dish.ingredients.toLowerCase().includes(text) ||
        dish.state.toLowerCase().includes(text) ||
        dish.region.toLowerCase().includes(text)
      );
    });

    setSuggestions(filtered.slice(0, 5)); // limit to 5 suggestions
  }, [searchText, recipes]);

  // Clear suggestions when the input is empty
  const handleSelect = (dish) => {
    setSearchText("");
    setSuggestions([]);
    onSelectDish(dish);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>HEADER</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search by dish, ingredient, or origin..."
        style={{ width: "300px", padding: "0.5rem" }}
      />
      {suggestions.length > 0 && (
        <ul style={{ listStyle: "none", padding: "0", marginTop: "0.5rem", backgroundColor: "#f9f9f9", border: "1px solid #ccc", width: "300px" }}>
          {suggestions.map((dish, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(dish)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
            >
              {dish.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
