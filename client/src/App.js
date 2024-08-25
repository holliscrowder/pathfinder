import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user
  const navigate = useNavigate();

  // check session and assign user, if any
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => {
        if (response.status == 200) {  
          return response.json()
        } else {
          throw response
        }
      })
      .then((data) => {
        setUser(data)
    
      })
      .catch(e => {
      });
  }, []);

  // fetch user goals
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

  // delete selected goal
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
          console.error("Error deleting goal:", error)
      });
  }

  const updateGoal = (goal) => {
    fetch("/api/goals", {
        method: "PATCH",
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
        console.error("Error deleting goal:", error)
    });
  }

  // logout
  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }})
    .then((response) => {
      if (response.message == "204: No Content") {
        return response.json()
      }
    })
    .then((data) => {
      setUser(null)
      navigate("/")
    })
  }

return (
    <div className = "App">
      {isLoggedIn? 
        <div className = "NavBar">
          <NavBar user={user} isLoggedIn={isLoggedIn}/>
          <button className = "logout" onClick = {handleLogout}>Logout</button>
        </div> :
        <></> }
      <main className = "Outlet">
        <Outlet 
          context = {[
            user,
            setUser,
            isLoggedIn,
            handleLogout,
            goals,
            setGoals,
            deleteGoal
          ]}
        />
      </main>
    </div>
  );
}

export default App;
