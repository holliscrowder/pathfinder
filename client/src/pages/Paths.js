import React, { useEffect, useState }from "react";
import "./Paths.css";

export default function Paths () {
    const [goals, setGoals] = useState("");

    useEffect(() => {
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
  }, []);

    return (
        <div className = "paths_screen_container">
            <div className = "paths_parent_container">
                <div className = "paths_container">

                </div>
            </div>
        </div>
    )
}