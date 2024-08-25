import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PathCardDetails from "../components/PathCardDetails";
import "./PathDetail.css";

export default function PathDetail() {
    const {id} =  useParams();
    const [, , , , goals, setGoals, deleteGoal] = useOutletContext();

    const goal = goals.filter((goal) => {
        return (goal.id == id)
    })
    console.log(goal);

    return (
        <div className = "path_card_detail_homescreen_container">
            <div className = "path_card_detail_parent_container">
                <div >
                    <PathCardDetails 
                        className = "path_card_detail_container"
                        goal={goal} 
                        deleteGoal={deleteGoal}
                        />
                </div>
            </div>
        </div>
    )
};