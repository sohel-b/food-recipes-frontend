import React, { useEffect, useState } from "react";

// This component displays a list of dishes with filters and sorting options, pagination to display a limited number of dishes per page
export const DishesListWithFilters = ({ onSelectDish, recipes, filteredRecipes, setFilteredRecipes }) => {

  const [sortKey, setSortKey] = useState("");
  const [filters, setFilters] = useState({ diet: "", flavor: "", state: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // This effect runs whenever the filters or sortKey change
  // It filters the recipes based on the selected filters and sorts
  useEffect(() => {
    let filtered = [...recipes];

    if (filters.diet) {
      filtered = filtered.filter((dish) => dish.diet === filters.diet);
    }

    if (filters.flavor) {
      filtered = filtered.filter((dish) => dish.flavor_profile === filters.flavor);
    }

    if (filters.state) {
      filtered = filtered.filter((dish) => dish.state === filters.state);
    }

    // Sorting
    if (sortKey) {
      filtered.sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name);
        return parseInt(a[sortKey]) - parseInt(b[sortKey]);
      });
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1); // reset to first page on filter/sort change
  }, [filters, sortKey, recipes]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / pageSize);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle filter changes. This function updates the filters state when a filter is changed
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Dishes List</h2>

      {/* Filters */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <select name="diet" onChange={handleFilterChange} value={filters.diet}>
          <option value="">All Diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non vegetarian">Non-Vegetarian</option>
        </select>

        <select name="flavor" onChange={handleFilterChange} value={filters.flavor}>
          <option value="">All Flavors</option>
          <option value="sweet">Sweet</option>
          <option value="spicy">Spicy</option>
          <option value="sour">Sour</option>
        </select>

        <select name="state" onChange={handleFilterChange} value={filters.state}>
          <option value="">All States</option>
          {[...new Set(recipes.map((r) => r.state))].map((state, idx) => (
            <option key={idx} value={state}>{state}</option>
          ))}
        </select>

        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="prep_time">Preparation Time</option>
          <option value="cook_time">Cooking Time</option>
        </select>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>Diet</th>
            <th>Flavor</th>
            <th>State</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecipes.map((dish, idx) => (
            <tr key={idx}>
              <td
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => onSelectDish(dish)}
              >
                {dish.name}
              </td>
              <td>{dish.prep_time}</td>
              <td>{dish.cook_time}</td>
              <td>{dish.diet}</td>
              <td>{dish.flavor_profile}</td>
              <td>{dish.state}</td>
              <td>{dish.region}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
