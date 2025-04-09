import React from "react";
import { DishDetails } from "../components/DishDetails";

// This component displays the details of a selected dish and includes a back button to return to the home page
// It receives the selected dish and a function to handle the back button click as props
export const DishPage = ({ dish, onBack }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={onBack}>← Back</button>
      <DishDetails dish={dish} />
    </div>
  );
}
