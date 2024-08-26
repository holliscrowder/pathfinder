import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { NewPathForm } from "./NewPathForm";
import "./PathCard.css";

export default function CreatePathCard() {
  const { id } = useParams();
  const [, , , , goals, , deleteGoal, updateGoal] = useOutletContext();

  const goal = goals.find((goal) => goal.id == id);

  return (
    <li className="new_path_card">
      <h1>Create New Path</h1>
        <NewPathForm />
    </li>
  );
}