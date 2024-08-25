import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PathStatusDropdown from "./PathStatusDropdown";
import "./PathCardDetails.css";

export default function PathCardDetails() {
  const { id } = useParams();
  const [, , , , goals, , deleteGoal] = useOutletContext();

  const goal = goals.find((goal) => goal.id == id);

  // Handle case where goal is not found
  if (!goal) {
    return <div>Goal not found</div>; 
  }

  return (
    <div className="path_card_detail_parent_container">
      <div className="path_card_detail_container">
        <p><b>Title: </b>{goal.title}</p>
        <p><b>Description: </b> {goal.description}</p>
        <p><b>Current Status: </b> <i>{goal.status}</i></p>
        <PathStatusDropdown />
        <p><b>Topic: </b>{goal.topic}</p>
        <button 
          className="path_card_button"
          onClick={() => deleteGoal(goal)}
        >
          delete goal
        </button>
      </div>
    </div>
  );
}