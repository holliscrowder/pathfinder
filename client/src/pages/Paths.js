import React, { useEffect, useState }from "react";
import "./Paths.css";
import PathCardList from "../components/PathCardList";

export default function Paths () {
    const [goals, setGoals] = useState([]);

    const fetchGoals = () => {
        fetch("/api/goals")
        .then((response) => {
            if (response.status === 200) {  
            return response.json()
            } else {
            throw response
            }
        })
        .then((data) => {
            setGoals(data)
        })
        .catch(e => {
            console.log(e)
        });
    }

    useEffect(() => {
        fetchGoals();
  }, []);

    const deleteGoal = (goal) => {
        fetch("/api/goals", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goal),
        })
        .then((response) => {
            if (response.status === 200 || response.status === 204) {
                console.log("Goal deleted successfully")
                fetchGoals();
            }
            else {
                return response.json().then((error) => {
                    throw new Error(error.message || "Failed to delete goal");
                });
            }
        })
        .catch((error) => {
            console.error("Error deleting gaol:", error)
        });
    }

    return (
        <div className = "paths_screen_container">
            <div className = "paths_parent_container">
                    <PathCardList className = "path_card_list" goals={goals} setGoals={setGoals} deleteGoal={deleteGoal}/>
            </div>
        </div>
    )
}