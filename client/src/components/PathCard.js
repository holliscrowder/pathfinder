import React from "react";
import "./PathCard.css";

export default function PathCard( {goal, deleteGoal} ) {

    return (
        <li className = "path_card">
            <h1>{goal.title}</h1>
            <p>{goal.description}</p>
            <p><i>{goal.status}</i></p>
            <p>[ {goal.topic} ]</p>
            <div className = "path_buttons">
                <button className = "path_card_button">
                    update status
                </button>
                <button 
                    className = "path_card_button"
                    onClick={() => deleteGoal(goal)}>
                        delete goal
                </button>
            </div>
        </li>
    )
}