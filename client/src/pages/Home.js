import React, {useEffect, useState} from "react";
import { useOutletContext } from "react-router-dom";
import Signup from "./Signup";
import HomescreenMessage from "../components/HomescreenMessage";
import "./Home.css";

function Home() {
  const [user, setUser, isLoggedIn, handleLogout, questions] = useOutletContext();
  const [motivation, setMotivation] = useState("The distance between your dreams and reality is called action.")

  useEffect(() => {
    fetch("/api/motivation")
      .then((response) => {
        if (response.status == 200) {  
          return response.json()
        } else {
          throw response
        }
      })
      .then((data) => {
        setMotivation(data)
      })
      .catch(e => {
      });
  }, []);

    return (
      <div className = "homescreen_container">
        {isLoggedIn? 
          <>
          <div className = "parent_welcome_container">
            <div className = "welcome_container">
            <i>{motivation["message"]}</i>
            <br />
                <HomescreenMessage className = "homescreen_message"/>
            </div>
          </div>
          </> : 
          <>
          <div className = "parent_welcome_container">
            <div className = "welcome_container">
              <i>{motivation["message"]}</i>
              <br />
              <HomescreenMessage className = "homescreen_message"/>
              <Signup className="signup_component"/>
            </div>
          </div>
          </>
          }
      </div>
    )
}

export default Home;
