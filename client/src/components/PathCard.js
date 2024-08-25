import React from "react";
import "./PathCard.css";

export default function PathCard( {goal} ) {

    return (
        <li className = "path_card">
            <h1>{goal.title}</h1>
            <p>{goal.description}</p>
            <p>{goal.status}</p>
            <p>{goal.topic}</p>
        </li>
    )
}