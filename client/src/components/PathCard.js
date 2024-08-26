import React from "react";
import { Link } from "react-router-dom";
import "./PathCard.css";

export default function PathCard({ goal, deleteGoal }) {
  return (
    <>
        <li className="path_card">
        <h1>{goal.title}</h1>
        <p><i>{goal.status}</i></p>
        <p>[ {goal.topic} ]</p>
        <br />
        <div className="path_card_buttons">
            <Link 
            className="path_card_link"
            to={`/paths/${goal.id}`}
            >
            See Details
            </Link>
        </div>
        </li>
        <br />
    </>
  );
}