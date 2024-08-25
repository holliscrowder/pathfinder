import React, { useEffect, useState }from "react";
import { useOutletContext } from "react-router-dom";
import "./Paths.css";
import PathCardList from "../components/PathCardList";

export default function Paths () {

    const [, , , ,
        goals,
        setGoals,
        deleteGoal] = useOutletContext()

    return (
        <div className = "paths_screen_container">
            <div className = "paths_parent_container">
                <PathCardList className = "path_card_list" goals={goals} setGoals={setGoals} deleteGoal={deleteGoal}/>
            </div>
        </div>
    )
}