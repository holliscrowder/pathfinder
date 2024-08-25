import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Signup from "./Signup";

function Home() {
  const [user, setUser, isLoggedIn, handleLogout, questions] = useOutletContext();
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
      <>
        {isLoggedIn? <></> : <Signup />}
      </>
    )
}

export default Home;
